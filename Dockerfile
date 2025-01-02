# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager lock files and install dependencies
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema and generate Prisma client
COPY ./prisma ./prisma

# Copy environment variables
COPY .env .env

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in the builder stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

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
&& adduser --system --uid 1001 nextjs

# Copy application files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

# Set permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
