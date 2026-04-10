#!/bin/sh
set -e

mkdir -p /app/uploads
chown -R nodejs:nodejs /app/uploads

exec su-exec nodejs "$@"
