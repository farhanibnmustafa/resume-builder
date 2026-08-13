# BanglaCERT — Cyber Incident Reporting & Awareness Portal

Brief: A Django-based incident reporting and awareness platform tailored for BanglaCERT.

**Project Overview**
- **Purpose:** Centralize cyber incident reporting, evidence management, awareness content, and analytics for BanglaCERT.
- **Repository layout:** Backend Django project in `BanglaCERT/` and a front-end React/Vite app in `frontend/`.

**Tech Stack**
- **Language:** Python (as pinned in `Pipfile`: 3.14)
- **Web Framework:** Django 6.0.2 (`BanglaCERT/BanglaCERT/settings.py`)
- **Database:** PostgreSQL (configured via `dj-database-url`, `DATABASE_URL`) with a local fallback `postgres://localhost/banglacert`
- **ORM & DB Driver:** Django ORM + `psycopg2-binary`
- **Static & Media:** `whitenoise` for static serving; optional Supabase-compatible S3 via `django-storages` + `boto3` (configured by environment variables)
- **Frontend:** React + Vite (`frontend/`, `package.json`)
- **Deployment / Hosting:** Intended to deploy on Vercel (see `vercel.json`) + Postgres provider (Supabase or other). Uses Vercel environment variables for production secrets.
- **Other libs/tools:** `dj-database-url`, `python-dotenv` (env loader), `django-storages`, `whitenoise`, `boto3`.

**Major Django Apps & Features**
- **`accounts`**: User authentication, profiles, forms, and account management.
- **`incidents`**: Core incident models, reporting forms, evidence storage, staff tools and admin views for triage and handling.
- **`awareness`**: Content pages, educational resources, and awareness campaigns.
- **`analytics`**: Usage and incident analytics dashboards and reporting services.
- **`auditlog`**: Action logging for important events and model changes.
- **`notifications`**: Email notification pipeline and asynchronous notification settings.
- **`search`**: Search filters and services for incidents and site content.

Cross-cutting capabilities:
- Static asset caching and long max-age via WhiteNoise (`WHITENOISE_MAX_AGE`).
- Optional S3-backed storage for file/media hosting when Supabase S3 env vars are present.
- Email backend configurable via env (SMTP or console) and async queue toggle `NOTIFICATION_EMAIL_ASYNC`.

**Environment & Configuration**
Key environment variables (see `BanglaCERT/BanglaCERT/settings.py` and `.env` loader):
- `DJANGO_SECRET_KEY` — Django secret key.
- `DEBUG` — `true`/`false`.
- `DATABASE_URL` — Primary database connection (Postgres recommended).
- `SUPABASE_ACCESS_KEY_ID`, `SUPABASE_SECRET_ACCESS_KEY`, `SUPABASE_STORAGE_BUCKET`, `SUPABASE_S3_ENDPOINT` — Enable S3-compatible storage.
- `EMAIL_BACKEND`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` — Email configuration.
- `DJANGO_ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS` — Host/CSRF settings for production like Vercel domains.

Example local `.env` (not committed):

```
DJANGO_SECRET_KEY=dev-only-change-me
DEBUG=true
DATABASE_URL=postgres://localhost/banglacert
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

**Local Development**
1. Create virtual environment and install dependencies (Pipfile/Pipenv or requirements.txt):

```bash
pip install pipenv
pipenv install --dev
pipenv shell
python manage.py migrate
python manage.py runserver
```

2. Frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Recommended: run Django with `DEBUG=true` and the local Postgres database.

**Testing & Linting**
- No centralized test runner documented in the repo root; run Django tests with:

```bash
python manage.py test
```

**Deployment Notes**
- `vercel.json` present for Vercel deployment. Configure environment variables in the Vercel dashboard.
- Production DB should be a managed Postgres instance. For object storage, enable the Supabase S3-compatible settings.
- Static files are collected to `STATIC_ROOT` and served with WhiteNoise or via the S3-backed storage when enabled.

**Project Structure (high-level)**
- `BanglaCERT/` — Django project & apps (`accounts`, `incidents`, `awareness`, `analytics`, `notifications`, `search`, `auditlog`, `core`).
- `frontend/` — React + Vite frontend assets and SPA code.
- `static/`, `templates/` — Shared static and template assets.
- `Pipfile`, `requirements.txt`, `vercel.json`, `build_files.sh` — project tooling & deployment config.

**How to Contribute**
- Open an issue or PR describing bug/feature.
- Run linters/tests locally before submitting changes.

**Where to look in the codebase**
- Django settings: `BanglaCERT/BanglaCERT/settings.py`
- Incident logic & models: `BanglaCERT/incidents/`
- Frontend app: `frontend/`

**License**
- Check project root for a license file or ask maintainers for licensing details.

---
If you want, I can also: (1) create a shorter README badge header, (2) add a CONTRIBUTING.md, or (3) open a PR with this README.
