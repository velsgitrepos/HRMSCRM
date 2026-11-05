# TALENT CARPET WEBSITE – INSTALLATION, RUN & DEPLOYMENT GUIDE

| Document Parameter | Details |
| :--- | :--- |
| **Project Name** | Talent Carpet HR Consultancy Website |
| **Document Title** | Installation, Local Development & Production Deployment Guide |
| **Version** | 1.0.0 |
| **Date** | October 01, 2026 |
| **Author** | Talent Carpet Engineering & Technical Team |
| **Developed By** | **Usman / Carpet Group of Companies** |
| **Target Audience** | Software Engineers, System Administrators, DevOps Team |

---

## 1. Prerequisites

Before setting up or deploying the application, ensure your environment meets the following software requirements:

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x LTS` or `v24.x`)
- **npm**: `v9.0.0` or higher
- **MySQL Server**: `v8.0` or higher (Local Windows Service `MySQL80`, XAMPP, or Cloud RDS / Aiven)
- **Git**: `v2.30` or higher
- **Code Editor**: Visual Studio Code (Recommended extensions: ESLint, Tailwind CSS IntelliSense)

---

## 2. Project Setup

### 2.1 Repository Cloning
Clone the project repository to your local workspace:

```bash
git clone https://github.com/talentcarpet/talent-carpet-web.git
cd "Talent Carpet1"
```

### 2.2 Directory Structure
The repository contains two main modules:
- `backend/` — Express.js Node API server
- `frontend/` — React 19 Single Page Application (SPA)

---

## 3. Environment Variables Reference

Environment variables must be configured separately for both backend and frontend.

### 3.1 Backend `.env` (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
# Node Server Options
PORT=5005
FRONTEND_URL=http://localhost:5173

# MySQL Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=talent_carpet
DB_USER=root
DB_PASSWORD=your_mysql_password_here

# JWT Security Secret
JWT_SECRET=your_jwt_secret_key_here

# Admin Default Credentials (Used by seed script)
ADMIN_USERNAME=TCadmin
ADMIN_PASSWORD=your_secure_admin_password_here

# AI Provider API Keys (Keep Strictly Secret)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# SMTP Email Notification Placeholders (Future Automated Alerts)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@talentcarpet.com
SMTP_PASSWORD=your-smtp-password
ADMIN_RECIPIENT_EMAIL=mubeen@talentcarpet.com
```

### 3.2 Frontend Environment Configuration (`frontend/.env`)

Create a `.env` file inside the `frontend/` directory:

```env
# Optional Production Backend URL Override (Default fallback in appConfig.js: http://localhost:5005)
VITE_BACKEND_URL=http://localhost:5005

# External Google API Keys if needed
VITE_GOOGLE_MAP_API_KEY=your_google_maps_api_key
```

> ⚠️ **CRITICAL SECURITY NOTE**: Never commit `.env` files to Git. All secret keys must remain isolated on server environments.

---

## 4. `.gitignore` Configuration

Ensure `.gitignore` in both `backend/` and `frontend/` includes sensitive environment and build folders:

```text
# Dependencies
node_modules/
.pnpm-store/

# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Builds & Outputs
dist/
build/

# Uploaded Static Files & Logs
public/uploads/*
!public/uploads/.gitkeep
logs/
*.log
```

---

## 5. MySQL Setup

### Option A: Local MySQL Service (Windows MySQL80 / XAMPP)
1. Ensure the Windows MySQL service is running (`MySQL80`):
   ```powershell
   Get-Service *mysql*
   ```
2. Log into MySQL client or command line:
   ```sql
   mysql -u root -p
   ```
3. Create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS talent_carpet 
   CHARACTER SET utf8mb4 
   COLLATE utf8mb4_unicode_ci;
   ```
4. Configure your `backend/.env` with your password (`DB_PASSWORD=YourPassword`).

### Option B: Cloud MySQL (AWS RDS / DigitalOcean / Aiven / PlanetScale)
1. Create a MySQL 8.0 instance on your preferred cloud provider.
2. Obtain hostname, port, database name, username, and password.
3. Update `backend/.env`:
   ```env
   DB_HOST=mysql-cloud-host.example.com
   DB_PORT=3306
   DB_NAME=talent_carpet
   DB_USER=admin
   DB_PASSWORD=YourCloudPassword
   ```
4. Ensure your server/local IP is allowed in the cloud security group / IP allowlist.

---

## 6. Backend Setup & Local Execution

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. (Optional) Run Database Seeder script to initialize default Admin credentials and sample job postings:
   ```bash
   npm run seed
   ```
4. Start development server with auto-reload:
   ```bash
   npm run dev
   ```
   The backend API will run on **`http://localhost:5005`**.

---

## 7. Frontend Setup & Local Execution

1. Open a second terminal window and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install frontend npm dependencies:
   ```bash
   npm install
   ```
3. Start Vite development server:
   ```bash
   npm run dev
   ```
   The React frontend will be available at **`http://localhost:5173`**.

---

## 8. Running the Application Locally

| Terminal Window | Directory | Command | Endpoint |
| :--- | :--- | :--- | :--- |
| **Terminal 1** | `backend/` | `npm run dev` | `http://localhost:5005/api` |
| **Terminal 2** | `frontend/` | `npm run dev` | `http://localhost:5173` |

### Key URLs:
- **Public Website**: `http://localhost:5173/`
- **Careers & Jobs Page**: `http://localhost:5173/careers`
- **Contact Us**: `http://localhost:5173/contact`
- **Admin Login Portal**: `http://localhost:5173/admin`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard`
- **Backend Health Check**: `http://localhost:5005/api/health`

---

## 9. Admin Login & Credentials Management

### Default Admin Credentials:
- **Username**: `TCadmin`
- **Password**: `[Configured in backend/.env as ADMIN_PASSWORD]`

### Resetting or Adding Admin Users:
Administrators are managed via MySQL under the `admins` table.
Passwords are automatically hashed using **bcrypt** (10 salt rounds) prior to saving via Sequelize `beforeCreate`/`beforeUpdate` hooks.

To seed or reset an admin user, execute:
```bash
cd backend
npm run seed
```

---

## 10. SMTP Setup (Future Notification Guide)

To enable automated email alerts when candidate applications or employer inquiries arrive:

1. Configure SMTP credentials in `backend/.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=mubeen@talentcarpet.com
   SMTP_PASSWORD=your_app_password
   ADMIN_RECIPIENT_EMAIL=mubeen@talentcarpet.com
   ```
2. Enable 2-Factor Authentication on your email account and generate an **App Password**.

---

## 11. WhatsApp Business Integration Guide (Future Architecture)

To connect WhatsApp Business Cloud API for instant candidate updates:

1. Register an application on **Meta for Developers** and activate **WhatsApp Business API**.
2. Store API tokens in `backend/.env`:
   ```env
   WHATSAPP_TOKEN=your_meta_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   ```
3. Trigger WhatsApp templates on `POST /api/applications` submission using standard HTTP POST calls to Meta Graph API.

---

## 12. Deployment Guide (Vercel + Render / VPS + MySQL)

### 12.1 Deploy Backend API to Render (or VPS / AWS EC2)

1. Create a new **Web Service** on [Render.com](https://render.com) or configure your VPS.
2. Connect your GitHub repository and select `backend/` directory.
3. Configure build settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
4. Add Environment Variables:
   - `PORT`: `5005`
   - `DB_HOST`: `your-mysql-host.example.com`
   - `DB_PORT`: `3306`
   - `DB_NAME`: `talent_carpet`
   - `DB_USER`: `your_mysql_user`
   - `DB_PASSWORD`: `your_mysql_password`
   - `JWT_SECRET`: `your_production_jwt_secret_here`
   - `OPENAI_API_KEY`: `your_openai_api_key_here`
   - `GEMINI_API_KEY`: `your_gemini_api_key_here`
   - `FRONTEND_URL`: `https://talent-carpet-web.vercel.app`
5. Deploy Web Service. Render will generate a live HTTPS endpoint:
   `https://talent-carpet-backend.onrender.com`

---

### 12.2 Deploy Frontend SPA to Vercel

1. Create a project on [Vercel](https://vercel.com).
2. Import GitHub repository and select `frontend/` as Root Directory.
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables on Vercel:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://talent-carpet-backend.onrender.com` (Your deployed backend URL)
   - **Type / Visibility**: `Plaintext` / `Config` (NOT Secret)
5. Deploy. Vercel will host your website live at `https://talent-carpet-web.vercel.app`.

---

## 13. Custom Domain & DNS Setup

To link a custom domain (e.g. `talentcarpet.com`):

1. On Vercel: Go to **Project Settings** $\rightarrow$ **Domains** $\rightarrow$ Add `talentcarpet.com`.
2. On your DNS Registrar (GoDaddy, Namecheap, Cloudflare):
   - Add **CNAME** record: `@` or `www` $\rightarrow$ `cname.vercel-dns.com`
   - Add **A** record: `@` $\rightarrow$ `76.76.21.21` (Vercel IP)
3. SSL certificates are automatically provisioned by Let's Encrypt via Vercel.

---

## 14. Production Environment Variables Checklist

- [x] `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` configured for production MySQL.
- [x] `JWT_SECRET` set to high-entropy random string.
- [x] `FRONTEND_URL` configured to production frontend domain.
- [x] `VITE_BACKEND_URL` configured on Vercel pointing to live backend.
- [x] Secret keys (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `DB_PASSWORD`) excluded from client bundle.

---

## 15. Database Backup & Recovery

### 15.1 Manual Local Backup (`mysqldump`)
```bash
mysqldump -u root -p talent_carpet > /backups/talent_carpet_$(date +%F).sql
```

### 15.2 Restore Database (`mysql`)
```bash
mysql -u root -p talent_carpet < /backups/talent_carpet_backup.sql
```

### 15.3 Automated Cron Backup
Configure a daily cron job on your server:
```cron
0 2 * * * mysqldump -u root -p'YourPassword' talent_carpet > /backups/talent_carpet_$(date +\%F).sql
```

---

## 16. Troubleshooting Guide

| Problem | Possible Cause | Recommended Solution |
| :--- | :--- | :--- |
| **CORS Policy Error** | `FRONTEND_URL` mismatch or browser hitting `localhost` from live Vercel domain | Verify `VITE_BACKEND_URL` is set in Vercel environment variables and re-deploy frontend. |
| **MySQL Connection Failed** | Local MySQL80 service inactive or wrong `DB_PASSWORD` | Verify Windows service with `Get-Service *mysql*` and test credentials in `backend/.env`. |
| **Admin Login Failed (401)** | Incorrect credentials or invalid JWT secret | Run `npm run seed` inside `backend/` to seed default admin credentials (`TCadmin` / configured `ADMIN_PASSWORD`). |
| **Images Not Displaying** | Relative image path or static upload directory missing | Ensure `public/uploads` directory exists inside `backend/` and Express static route is mounted. |
| **Page Refresh / 404 Error on Direct URL** | Hosting server missing SPA rewrite rule | Pre-configured `frontend/vercel.json`, `_redirects`, and `.htaccess` fix this automatically. For Nginx, ensure `try_files $uri $uri/ /index.html;` is present. |
| **AI Chatbot Error** | Missing or invalid API key | Verify `GEMINI_API_KEY` or `OPENAI_API_KEY` in `backend/.env`. Check rate limit headers. |

---

## 17. Production Pre-Flight Checklist

- [ ] Node server starting clean without errors on port 5005.
- [ ] MySQL connection established cleanly (`MySQL Database Connected: 127.0.0.1`).
- [ ] Frontend build compiling via `npm run build` with zero errors.
- [ ] Admin login functioning and issuing valid JWT token.
- [ ] Active career openings displaying on `/careers`.
- [ ] Job application submission functional.
- [ ] Contact proposal form functional with dropdown and "Other Services" text field.
- [ ] Floating **Talent Carpet AI** chatbot responding to user questions.
- [ ] Mobile navigation drawer and responsive layout verified on phone viewports.
- [ ] All `.env` files excluded from Git commit history.

---

## 18. Developer Handover Information

| Parameter | Handover Details |
| :--- | :--- |
| **Project Repository** | `Talent Carpet1` |
| **Developed By** | **Usman** / **Carpet Group of Companies** |
| **Developer Contact** | [Contact via Official Channels] |
| **Primary Contact Email** | `mubeen@talentcarpet.com` |
| **Support Contact**| [Available via Official Website Contact Form] |
| **Office Address** | Plot No 19, Flat F2, 1st Floor, S.V.S Nagar 1st Main Road, Valasaravakkam, Chennai - 600087 |
| **Backend Port** | `5005` |
| **Frontend Port** | `5173` |
| **Default Admin Username** | `TCadmin` |
| **Default Admin Password** | `[Configured in backend/.env as ADMIN_PASSWORD]` |

---

## 19. Document Revision History

| Revision | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| **v1.0.0** | October 01, 2026 | Talent Carpet Engineering Team | Initial release of full Installation, Setup & Deployment Guide. |
