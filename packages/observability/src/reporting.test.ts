import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { test } from "node:test";

const fixture = fileURLToPath(
  new URL("./fixtures/report-errors.ts", import.meta.url),
);

function runFixture(dsn = ""): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fixture], {
      env: { ...process.env, TEST_GLITCHTIP_DSN: dsn },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      output += String(chunk);
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(output)),
    );
  });
}

test("reporting stays inactive without a DSN", async () => {
  await runFixture();
});

test("SDK delivers manual, console and Next request errors without request secrets", async () => {
  const envelopes: string[] = [];
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => {
      const body = Buffer.concat(chunks);
      envelopes.push(
        (request.headers["content-encoding"] === "gzip"
          ? gunzipSync(body)
          : body
        ).toString(),
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end("{}");
    });
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    await runFixture(`http://publickey@127.0.0.1:${address.port}/1`);
    const received = envelopes.join("\n");
    for (const message of [
      "manual-test-error",
      "console-test-error",
      "server-catch-test-error",
      "request-test-error",
    ]) {
      assert.ok(received.includes(message), `Missing ${message}`);
    }
    assert.ok(received.includes('"app":"platform"'));
    assert.ok(received.includes('"release":"glitchtip-test"'));
    assert.ok(!received.includes("never-send-this"), received);
    assert.ok(!received.includes('"type":"session"'));
    assert.ok(!received.includes('"type":"transaction"'));
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
