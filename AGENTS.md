# AGENTS.md
Keep the git initialized work on a branch names pooja 
## Repository Overview

This repository contains the Synditech website split into two applications:

- `frontend/`: React + Vite marketing site
- `backend/`: Express + MongoDB API for contact, lead, and newsletter flows

The root also includes deployment-oriented files:

- `Dockerfile`
- `docker-compose.yml`

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
  package.json
  server.js

frontend/
  public/
  src/
  package.json
  vite.config.js
```

## Local Development

Install dependencies separately in each app:

```powershell
cd backend
npm install

cd ../frontend
npm install
```

Run the backend:

```powershell
cd backend
npm run dev
```

Run the frontend:

```powershell
cd frontend
npm run dev
```

## Scripts

### Backend

- `npm start`: start the Express server
- `npm run dev`: run the server with `nodemon`
- `npm test`: placeholder script, currently not implemented

### Frontend

- `npm run dev`: start Vite dev server
- `npm run build`: create a production build
- `npm run preview`: preview the production build locally
- `npm test`: placeholder script, currently not implemented

## Environment Notes

The backend expects these environment variables:

- `MONGODB_URI`
- `CLIENT_URL`
- `EMAIL_USER`
- `EMAIL_PASS`
- `NODE_ENV`
- `PORT`

Backend defaults:

- API port: `5000` when `PORT` is not set
- CORS origin: `http://localhost:3000` when `CLIENT_URL` is not set

Frontend defaults:

- Vite dev server port: `3000`
- `/api` proxy target: `http://localhost:5001`

Important: the current frontend proxy target (`5001`) does not match the backend default port (`5000`). If local API calls fail in development, align one side with the other before debugging deeper.

## Backend Behavior

The Express app in `backend/server.js` currently:

- connects to MongoDB with Mongoose
- exposes `GET /api/health`
- handles contact submissions at `POST /api/contact`
- handles lead creation/listing at `/api/leads`
- handles newsletter subscription/listing at `/api/newsletter`
- sends email through Gmail via Nodemailer
- serves static files from `backend/dist`

Because static files are served from `backend/dist`, production deployment may expect the frontend build output to be copied or generated there.

## Working Conventions

- Treat this repo as a two-app project; check both `frontend` and `backend` before changing cross-cutting behavior.
- Keep API contract changes coordinated with frontend form usage.
- Prefer adding real tests before relying on the placeholder `npm test` scripts.
- Be careful with environment-dependent features such as MongoDB and email delivery; they can fail even when the server boots successfully.

## Good First Checks

Before assuming an app bug, verify:

1. backend dependencies are installed
2. frontend dependencies are installed
3. required backend environment variables are present
4. frontend proxy target matches the backend port
5. MongoDB is reachable
6. Gmail credentials are valid for Nodemailer
