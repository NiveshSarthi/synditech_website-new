# =========================
# Stage 1: Build React Frontend
# =========================
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies (safe for CI)
RUN npm ci || npm install

# Copy source code
COPY frontend/ .

# Environment variables
ENV VITE_API_URL=/api
ENV CI=false

# Build frontend
RUN npm run build


# =========================
# Stage 2: Node.js Backend
# =========================
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./

# Install production dependencies (npm 9+ compatible)
RUN npm ci --omit=dev || npm install --omit=dev

# Copy backend source
COPY backend/ .

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./dist

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Set ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# App config
ENV NODE_ENV=production
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', r => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start app
CMD ["npm", "start"]
