# Use the official Node.js image as the base image
FROM node:lts AS base

# Install dependencies only when needed
FROM base AS deps
ARG NO_CACHE
RUN if [ "$NO_CACHE" = "true" ]; then echo "Skipping cache..." && rm -rf /; fi

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libc6 \
    openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package manager lock files and install dependencies
COPY --chown=nextjs:nodejs package.json pnpm-lock.yaml ./
COPY --chown=nextjs:nodejs ./prisma ./prisma
COPY --chown=nextjs:nodejs ./prisma/migrations ./prisma/migrations
COPY --chown=nextjs:nodejs ./prisma/migrations/20241206170101_made_link_optional/migration.sql ./prisma/migrations/20241206170101_made_link_optional/migration.sql
COPY --chown=nextjs:nodejs ./prisma/migrations/20241210151140_add_user_id_language_unique/migration.sql ./prisma/migrations/20241210151140_add_user_id_language_unique/migration.sql
COPY --chown=nextjs:nodejs ./prisma/migrations/20241217152551_add_project_card_translations/migration.sql ./prisma/migrations/20241217152551_add_project_card_translations/migration.sql

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in the builder stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Generate Prisma client and build the application
RUN npx prisma generate \
&& pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir -p /app/blob_storage \
    && chown -R nextjs:nodejs /app/blob_storage \
    && chmod -R 750 /app/blob_storage

# Copy application files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY --from=builder /app/prisma/migrations/20241206170101_made_link_optional/migration.sql ./prisma/migrations/20241206170101_made_link_optional/migration.sql
COPY --from=builder /app/prisma/migrations/20241210151140_add_user_id_language_unique/migration.sql ./prisma/migrations/20241210151140_add_user_id_language_unique/migration.sql
COPY --from=builder /app/prisma/migrations/20241217152551_add_project_card_translations/migration.sql ./prisma/migrations/20241217152551_add_project_card_translations/migration.sql

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

USER nextjs

EXPOSE 3000

# Start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
