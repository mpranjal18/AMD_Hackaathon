# NutriMind - AI-Powered Smart Food & Health Assistant

Premium full-stack health dashboard built with Next.js App Router, Tailwind CSS, Framer Motion, Firebase, and Cloud Run-ready Docker packaging.

## Highlights

- Apple-style glassmorphism UI with animated layers and smooth transitions
- Dynamic AI suggestion engine based on nutrition and habit data
- Recommended Food Choices with optimized images and macro metadata
- Habit tracking rings (water, meals, junk intake)
- Secure API routes with validation and user checks
- Firebase Firestore and Storage security rules
- Unit tests for AI logic and API service layer

## Tech Stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- Backend: Next.js Route Handlers + Firebase Admin SDK
- Data: Firestore + Storage
- Testing: Vitest
- Deployment: Docker, Cloud Run

## Data Model

### Users

- uid
- name
- age
- weight
- goal
- diet_type

### Meals

- userId
- name
- calories
- protein
- carbs
- fat
- timestamp

### Habits

- userId
- water
- junk
- meals
- date

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Run quality checks:

```bash
npm run lint
npm run test
npm run build
```

## API Endpoints

- `POST /api/suggestions`
  - Headers: `x-user-id`
  - Body: nutrition snapshot payload
  - Returns: dynamic suggestions + health score

- `POST /api/meals`
  - Headers: `x-user-id`
  - Body: validated meal object
  - Persists to Firestore when admin credentials are configured

## Security

- Firestore security rules in `firestore.rules`
- Storage security rules in `storage.rules`
- Input validation with Zod schemas
- Basic API request identity guard with `x-user-id`
- Secrets supplied via environment variables only

## Cloud Run Deployment

Build and run container locally:

```bash
docker build -t nutrimind .
docker run -p 8080:8080 --env-file .env.local nutrimind
```

Deploy to Cloud Run:

```bash
gcloud builds submit --tag gcr.io/<PROJECT_ID>/nutrimind
gcloud run deploy nutrimind \
  --image gcr.io/<PROJECT_ID>/nutrimind \
  --platform managed \
  --region <REGION> \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

## Firebase Setup

- Deploy security rules:

```bash
firebase deploy --only firestore:rules,storage
```

- Deploy Cloud Functions (optional `functions/` package):

```bash
cd functions
npm install
firebase deploy --only functions
```
