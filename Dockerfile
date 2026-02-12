# Build stage
FROM oven/bun:1.3.6-slim as builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Verify schema (optional, remove if not needed)
RUN bun run verify 2>/dev/null || true

# Runtime stage
FROM oven/bun:1.3.6-slim

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app /app

# Expose port
EXPOSE 3536

# Create startup script that runs migrations and seeds
RUN echo '#!/bin/bash\nset -e\necho "Running migrations..."\nbun run migrate || true\necho "Seeding database..."\nbun run seed || true\necho "Seeding products..."\nbun run seed:products || true\necho "Starting server..."\nexec bun run dev' > /app/start.sh && chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD bun run -e "fetch('http://localhost:3536/').then(r => r.ok ? process.exit(0) : process.exit(1))" || exit 1

# Start server with migrations and seeds
CMD ["/app/start.sh"]

