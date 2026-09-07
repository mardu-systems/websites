# mardu.de auf Coolify (ersetzt das frühere Vercel-Setup).
# Muster: offizieller Bun-Docker-Guide (oven/bun, Multi-Stage).
# Bun-Workspace-Monorepo: Install am Root (bun.lock + packages/*),
# Build und Start in apps/mardu-de. Payload-Runtime, Admin und
# Content-API laufen in derselben Next.js-Instanz.
FROM oven/bun:1.3.14 AS base
WORKDIR /usr/src/app

# 1) Dependencies in ein Temp-Volume installieren (Cache-Layer).
FROM base AS install
COPY package.json bun.lock bunfig.toml ./
COPY packages ./packages
COPY apps/mardu-de/package.json ./apps/mardu-de/package.json
RUN bun install --frozen-lockfile

# 2) Quellen dazu und Production-Build.
FROM base AS prerelease
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=install /usr/src/app/apps ./apps
COPY --from=install /usr/src/app/packages ./packages
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Next-16-/Payload-Build ist speicherhungrig (Peak hängt von der CPU-Zahl ab,
# da Next pro Kern Worker startet). Für kleine Server bewusst niedrig;
# zusätzlich Swap auf dem Host einplanen. Bei OOM im Dashboard-Log erhöhen.
ENV NODE_OPTIONS=--max-old-space-size=2048
# Hinweis: bun 1.3.14 stürzt auf linux/arm64 beim Prozess-Teardown NACH
# erfolgreicher Kompilierung ab (SIGTRAP, bisher nur dort beobachtet).
# Der Guard akzeptiert einen Non-Zero-Exit nur, wenn die Build-Zusammenfassung
# die vollständige Kompilierung belegt; echte Build-Fehler schlagen weiter fehl.
RUN bun run --cwd apps/mardu-de build > /tmp/next-build.log 2>&1; code=$?; \
  tail -8 /tmp/next-build.log; \
  if [ $code -ne 0 ]; then \
    grep -q "prerendered as static content" /tmp/next-build.log || exit $code; \
    echo "note: ignoring bun teardown crash after successful build"; \
  fi

# 3) Schlankes Release-Image: Deps, Quellen und Build-Artefakt.
FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=install /usr/src/app/apps ./apps
COPY --from=install /usr/src/app/packages ./packages
COPY --from=install /usr/src/app/package.json /usr/src/app/bun.lock /usr/src/app/bunfig.toml ./
COPY --from=prerelease /usr/src/app/apps/mardu-de ./apps/mardu-de
# Persistente Payload-Medien (Coolify-Volume nach /data/media mounten,
# siehe PAYLOAD_MEDIA_DIR in apps/mardu-de/.env.example). App-Verzeichnis
# gehört bun (Next-Runtime-Cache, Uploads); bei Volume-Permission-Problemen
# im Coolify-Dashboard die Mount-Berechtigung prüfen.
RUN mkdir -p /data/media && chown -R bun:bun /usr/src/app/apps/mardu-de /data/media

USER bun
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3000/').then((r) => { if (!r.ok) process.exit(1) })"

WORKDIR /usr/src/app/apps/mardu-de
ENTRYPOINT ["bun", "run", "start"]
