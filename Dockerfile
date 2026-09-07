# mardu.de auf Coolify (ersetzt das frühere Vercel-Setup).
# Bun-Workspace-Monorepo: Install am Root (bun.lock + packages/*),
# Build und Start in apps/mardu-de. Payload-Runtime, Admin und
# Content-API laufen in derselben Next.js-Instanz.
FROM oven/bun:1.3.14

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Next-16-/Payload-Build ist speicherhungrig; bei OOM im Dashboard erhöhen.
ENV NODE_OPTIONS=--max-old-space-size=3072

# 1) Manifeste für einen cache-freundlichen Dependency-Layer.
COPY package.json bun.lock bunfig.toml ./
COPY packages ./packages
COPY apps/mardu-de/package.json ./apps/mardu-de/package.json
RUN bun install --frozen-lockfile

# 2) Quellen und Production-Build.
COPY . .
RUN bun run --cwd apps/mardu-de build

# 3) Persistente Payload-Medien (Coolify-Volume nach /data/media mounten,
#    siehe PAYLOAD_MEDIA_DIR in apps/mardu-de/.env.example).
RUN mkdir -p /data/media

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3000/').then((r) => { if (!r.ok) process.exit(1) })"

CMD ["bun", "run", "--cwd", "apps/mardu-de", "start"]
