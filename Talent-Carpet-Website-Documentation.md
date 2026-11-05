# TALENT CARPET WEBSITE – PROJECT & FEATURE DOCUMENTATION

| Document Parameter | Details |
| :--- | :--- |
| **Project Name** | Talent Carpet HR Consultancy Website |
| **Document Title** | Comprehensive Project & Feature Documentation |
| **Version** | 1.0.0 |
| **Date** | October 01, 2026 |
| **Author** | Talent Carpet Engineering & Technical Team |
| **Developed By** | **Usman / Carpet Group of Companies** |
| **Technology Stack** | React (Vite), Node.js, Express.js, MySQL (Sequelize), Tailwind CSS |

---

## 1. Project Overview

### 1.1 Business Purpose & Objectives
**Talent Carpet** is a premium HR consultancy and recruitment enterprise based in Chennai, India. The Talent Carpet website serves as a digital platform connecting corporate employers with top-tier professional talent across IT and Non-IT sectors.

The primary objectives of the platform are:
- **Corporate Client Acquisition**: Showcase specialized recruitment solutions (Contract Staffing, Contract-to-Hire, Permanent Hiring, Executive Search, Payroll & SOP Advisory) to employers.
- **Candidate Talent Pool Sourcing**: Enable job seekers to explore active career opportunities, submit job applications, and upload credentials directly.
- **Interactive AI Assistance**: Provide an automated AI assistant (**Talent Carpet AI**) to assist visitors 24/7 with job search, service inquiries, and candidate applications.
- **Centralized Administration**: Equip company administrators with a secure dashboard to manage job openings, track job applications, review employer inquiries, and update public team and testimonial content.

### 1.2 Target Users
1. **Candidates & Job Seekers**: Professionals seeking contract, full-time, or executive roles.
2. **Corporate Employers & HR Leaders**: Companies looking to outsource talent sourcing, CTH, or HR operations.
3. **Internal Administrators**: Talent Carpet consultants managing candidate applications and client leads.

### 1.3 System Architecture Overview

```
                   ┌──────────────────────────────────────────┐
                   │    Web Browser / Mobile Client           │
                   │    (React 19 + Vite + Tailwind CSS)      │
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼ (REST API / JSON / HTTP)
                   ┌──────────────────────────────────────────┐
                   │       Express.js Backend Server          │
                   │     (JWT Auth, Multer, Rate Limiter)     │
                   └───────┬──────────────────────────┬───────┘
                           │                          │
                           ▼                          ▼
            ┌──────────────────────────┐  ┌──────────────────────────┐
            │   MySQL Database         │  │  AI API Services         │
            │   (Sequelize ORM)        │  │  (Google Gemini / OpenAI)│
            └──────────────────────────┘  └──────────────────────────┘
```

---

## 2. Technology Stack

| Layer / Subsystem | Technology | Purpose in Project |
| :--- | :--- | :--- |
| **Frontend Framework** | React `v19.2` + Vite `v8.1` | Ultra-fast Single Page Application (SPA) rendering and component state management. |
| **Routing** | `react-router-dom` `v7.18` | Client-side routing, navigation guardrails, and page transitions. |
| **Styling & Icons** | Tailwind CSS `v3.4` + `lucide-react` | Responsive utility-first styling, glassmorphism UI, and modern icon set. |
| **Animations & Smooth Scroll** | `framer-motion` `v12.42` + GSAP + Lenis | Page transitions, hero entrance animations, and smooth inertia scrolling. |
| **HTTP Client** | `axios` `v1.18` | Asynchronous API requests between React frontend and Express backend. |
| **Backend Runtime** | Node.js + Express.js `v4.19` | RESTful API server handling business logic, authentication, file storage, and DB operations. |
| **Database & ORM** | MySQL + Sequelize `v6` (`mysql2`) | Relational SQL database with foreign key relationships, connection pooling, and model mapping for jobs, applications, inquiries, team, and admins. |
| **Authentication** | `jsonwebtoken` `v9.0` + `bcryptjs` `v2.4` | Stateless Bearer token verification and salted password hashing for admin login. |
| **File Upload Storage** | Multer `v1.4.5` (Disk Storage) | Local file upload middleware storing team and client media in `public/uploads/`. |
| **Rate Limiting** | `express-rate-limit` `v7.5` | Backend middleware mitigating DDoS and spam attacks on public endpoints (e.g. `/api/ai/chat`). |
| **AI Integration** | `@google/generative-ai` / `openai` | AI prompt processing powering the floating **Talent Carpet AI** assistant. |

---

## 3. Website Structure

The website comprises public client-facing pages and protected administration routes:

| Route Path | Page Component | Access Level | Description & Key Responsibilities |
| :--- | :--- | :--- | :--- |
| `/` | `Home.jsx` | Public | Hero banner, company statistics, core services, founder feature, active jobs preview, testimonials, and team grid. |
| `/about` | `About.jsx` | Public | Detailed company vision, mission, Founder & MD feature (Mubeen Irshad), key milestones, and FAQ accordion. |
| `/services/employers` | `ForEmployers.jsx` | Public | Dedicated employer solutions page covering Contract Staffing, CTH, Executive Search, and Payroll. |
| `/services/candidates` | `ForCandidates.jsx` | Public | Career roadmap, candidate recruitment steps, skill matching, and resume guidance. |
| `/careers` | `Careers.jsx` | Public | Active job board, job filtering, position details, application submission modal, and general CV drop. |
| `/contact` | `Contact.jsx` | Public | Contact details, office map, social links, and employer proposal inquiry form with dropdowns. |
| `/privacy-policy` | `PrivacyPolicy.jsx` | Public | Official company data protection policies, candidate data usage rules, and retention policy. |
| `/terms` | `Terms.jsx` | Public | Website terms of use, intellectual property rights, user representations, and legal disclaimers. |
| `/admin` | `AdminLogin.jsx` | Public (Form) | Secure password-protected login portal for Talent Carpet internal administrators. |
| `/admin/dashboard` | `AdminDashboard.jsx` | Protected (JWT) | Comprehensive admin panel for managing jobs, applications, inquiries, team members, and testimonials. |
| `*` | `NotFound.jsx` | Public | 404 fallback page with redirection back to Home. |

---

## 4. Home Page (`Home.jsx`)

The Homepage acts as the primary landing hub designed to impress corporate clients and job candidates.

### Key Sections:
1. **Navbar (`Navbar.jsx`)**: Sticky top navigation bar featuring company logo, page links, WhatsApp CTA, mobile drawer, and dynamic scroll styling.
2. **Hero Section**: High-impact heading *"Smarter Recruitment & Staffing Solutions"*, value propositions, quick search triggers, and dynamic stat counters.
3. **About Preview & Founder Section**: Overview of Talent Carpet's track record and leadership feature highlighting Founder & Managing Director **Mubeen Irshad**.
4. **Services Grid**: Card grid showcasing Contract Staffing, CTH, Permanent Hiring, Executive Search, and Payroll Compliance.
5. **Active Job Openings Preview**: Real-time job cards fetched from MySQL with position title, location, experience requirements, and direct application links.
6. **Client & Candidate Testimonials**: Infinite horizontal marquee displaying verified client reviews with rating stars and company details.
7. **Team Showcase**: Grid displaying core recruitment leadership team members with photos, designations, and LinkedIn profile links.
8. **Contact & Footer (`Footer.jsx`)**: Quick contact cards, social links, quick navigation links, and developer copyright attribution.

---

## 5. HR Services

Talent Carpet provides six core specialized service models:

| Service Model | Target Audience | Description & Value Proposition | Associated Web Workflow |
| :--- | :--- | :--- | :--- |
| **Contract Staffing** | IT & Enterprise Clients | On-demand staffing for project-specific needs without long-term headcount overhead. | Quick inquiry form on `/services/employers` |
| **Contract-to-Hire (CTH)** | Growing Companies | Evaluation of candidate performance on contract before extending permanent offers. | Service selection dropdown on `/contact` |
| **Permanent Hiring** | Corporate Enterprises | Full-lifecycle recruitment for core talent across IT, Finance, Engineering, and Operations. | Proposal submission on `/contact` |
| **Executive & Lateral Search**| C-Suite & Leadership | Confidential recruitment of CXOs, VPs, Directors, and senior specialized leaders. | Direct consultant call / WhatsApp CTA |
| **IT & Non-IT Sourcing** | Tech Startups & Plants | Specialized domain sourcing for software developers, cloud engineers, plant managers, etc. | Job listing filter on `/careers` |
| **Payroll & SOP Support** | Enterprises | Complete HR documentation, NDA creation, salary structuring, and compliance management. | Inquiry submission on `/contact` |

---

## 6. Candidate Features (`Careers.jsx`)

Candidates can search, review, and apply for open positions seamlessly.

```
Candidate Workflow:
[ Visit /careers ] ──► [ Filter/Search Openings ] ──► [ Click "Apply Now" ]
                                                              │
[ Receive Success Alert ] ◄── [ Store in MySQL ] ◄── [ Submit Application Form ]
```

### Key Capabilities:
- **Real-Time Job Board**: Displays active open positions fetched from backend `/api/careers`.
- **Search & Filtering**: Filter jobs by title keyword, employment type (Full-time, Contract, Internship), or location.
- **Job Details View**: Inspect experience requirements, job descriptions, location, and application contact email.
- **Application Modal**: Submit Full Name, Email Address, and Phone Number.
- **General CV Drop**: Candidates seeking unlisted roles can submit general career inquiries via the spontaneous CV form.

---

## 7. Employer Features (`ForEmployers.jsx` & `Contact.jsx`)

Employers can evaluate Talent Carpet's service catalog and submit staffing requirements.

```
Employer Inquiry Workflow:
[ Visit /contact ] ──► [ Fill Name, Email, Phone, Company, Service, Message ]
                                                              │
[ Success Confirmation ] ◄── [ Save in MySQL `inquiries` Table ] ◄── [ Submit Inquiry Form ]
```

### Key Capabilities:
- **Service Breakdown**: Explains service level agreements (SLAs), turnaround times, and domain expertise.
- **Custom Service Requirement**: Dropdown selector including *Permanent Recruitment*, *Contract Staffing*, *Executive Search*, *HR Consulting*, *Payroll*, *Campus Hiring*, *IT/Non-IT Sourcing*, and an **Other Services** option with a dynamic text field.

---

## 8. Contact & Inquiry Management

Inquiries submitted across the platform are validated and stored in MySQL under the `inquiries` table.

- **Frontend Validation**: Ensures name, email format, phone number, company, and message are non-empty.
- **API Endpoint**: `POST /api/inquiries` receives payload and persists record in database.
- **Admin Review**: All submissions appear in the Admin Dashboard (`AdminDashboard.jsx`) under the *Client Inquiries* tab for lead tracking.

---

## 9. Testimonials Management (`Testimonial.js`)

Testimonials showcase social proof from employers and candidates.

- **Types**: Categorized into `Employer` and `Candidate`.
- **Display**: Displayed on Homepage (`Home.jsx`), `/services/employers`, and `/services/candidates` in infinite auto-scrolling horizontal marquees.
- **Admin CRUD**: Administrators can add new client reviews, upload avatar images, assign star ratings (1–5), edit existing reviews, or delete them.

---

## 10. Team Management (`Team.js`)

Displays key leadership members of Talent Carpet.

- **Fields**: Name, Designation, Experience, LinkedIn URL, and Image URL.
- **Admin CRUD**: Administrators can add team members, upload profile photos via Multer, update designations, and remove profiles.

---

## 11. Careers / Job Management (`Career.js` & `Application.js`)

Manages the core recruitment job board and application flow.

- **Job Posting**: Admin creates jobs specifying `jobTitle`, `location`, `experience`, `employmentType`, `description`, `applyEmail`, and `status` (`Open`/`Closed`).
- **Application Tracking**: Applications submitted by job seekers are stored in `Application` collection with reference `jobId`.
- **Status Lifecycle**: Admin can update applicant status (`Applied` $\rightarrow$ `Shortlisted` $\rightarrow$ `Rejected`).

---

## 12. Admin Panel (`AdminDashboard.jsx`)

The Admin Panel is a single-page management dashboard accessible at `/admin/dashboard`.

```
                    ┌────────────────────────────────────────┐
                    │    Admin Panel Navigation Tabs         │
                    └───┬──────────────┬──────────────┬──────┘
                        │              │              │
                        ▼              ▼              ▼
                 [ Job Postings ] [ Candidate Apps ] [ Client Inquiries ]
                        │              │              │
                        ▼              ▼              ▼
                 [ Testimonials ] [ Team Members ]   [ Live Website Link ]
```

### Available Modules:
1. **Overview Metrics**: Summary stat cards displaying Total Jobs, Active Applications, Client Inquiries, and Published Testimonials.
2. **Job Postings Module**: Create, edit, toggle status (`Open`/`Closed`), and delete career openings.
3. **Job Applications Module**: Filter applications by candidate name/email, review job reference, update status (`Shortlisted`/`Rejected`), and delete applications.
4. **Client Inquiries Module**: View employer proposal requests, company names, contact phone numbers, selected service requirements, and inquiry messages.
5. **Testimonials Module**: Create, edit, upload photos, and manage employer/candidate reviews.
6. **Team Members Module**: Add and update staff profiles, designations, photos, and social links.
7. **Live Website Link**: Button in header allowing admin to navigate seamlessly to the live frontend homepage.

---

## 13. Authentication & Authorization

- **Authentication Protocol**: JSON Web Token (JWT) Bearer Authentication.
- **Login Endpoint**: `POST /api/auth/login` checks username and bcrypt password. On success, issues a signed JWT token valid for 30 days.
- **Storage**: Token is saved in browser `localStorage` (`talent_carpet_admin_token`) via `AuthContext.jsx`.
- **Protected Middleware**: `protect` middleware in `backend/src/middleware/auth.js` verifies incoming `Authorization: Bearer <token>` header before granting access to sensitive routes.

---

## 14. Database Documentation

The application connects to **MySQL** using **Sequelize ORM** (`mysql2` driver) with connection pooling and virtual `_id` support for 100% frontend compatibility.

### 14.1 `admins` Table (`Admin.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Admin unique record ID |
| `username` | VARCHAR(100) | NOT NULL, UNIQUE | Admin login username |
| `password` | VARCHAR(255) | NOT NULL | Salted bcrypt hash |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last modification timestamp |

### 14.2 `careers` Table (`Career.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique job opening ID |
| `job_title` | VARCHAR(255) | NOT NULL | Title of the position |
| `location` | VARCHAR(255) | NOT NULL | Office location or Remote status |
| `experience` | VARCHAR(100) | NOT NULL | Required experience range |
| `employment_type`| ENUM | 'Full-time', 'Part-time', 'Contract', 'Internship' | Job contract type |
| `description` | TEXT | NOT NULL | Detailed job description |
| `apply_email` | VARCHAR(255) | NOT NULL | Target recipient email for CVs |
| `status` | ENUM | 'Open', 'Closed', DEFAULT 'Open' | Active listing status |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Job posted timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 14.3 `applications` Table (`Application.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique application submission ID |
| `job_id` | INT UNSIGNED | NOT NULL, FOREIGN KEY -> `careers(id)` | Applied job reference (CASCADE) |
| `name` | VARCHAR(150) | NOT NULL | Applicant's full name |
| `email` | VARCHAR(150) | NOT NULL | Candidate email address |
| `phone` | VARCHAR(50) | NOT NULL | Candidate phone number |
| `status` | ENUM | 'Applied', 'Shortlisted', 'Rejected', DEFAULT 'Applied' | Processing status |
| `applied_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Submission timestamp |

### 14.4 `inquiries` Table (`Inquiry.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique inquiry submission ID |
| `name` | VARCHAR(150) | NOT NULL | Sender name |
| `email` | VARCHAR(150) | NOT NULL | Sender email address |
| `phone` | VARCHAR(50) | NOT NULL | Contact phone number |
| `company` | VARCHAR(150) | NOT NULL | Company or client organization |
| `requirement` | VARCHAR(150) | NOT NULL | Selected service requirement |
| `message` | TEXT | NOT NULL | Detailed proposal message |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Submission timestamp |

### 14.5 `teams` Table (`Team.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique team member record ID |
| `name` | VARCHAR(150) | NOT NULL | Staff member full name |
| `designation` | VARCHAR(150) | NOT NULL | Job title / designation |
| `experience` | VARCHAR(100) | NOT NULL | Industry experience duration |
| `linkedin_url`| VARCHAR(500) | DEFAULT '' | LinkedIn profile link |
| `whatsapp_number`| VARCHAR(50)| DEFAULT '' | Direct WhatsApp contact number |
| `image_url` | VARCHAR(500) | DEFAULT '' | Path to profile headshot |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 14.6 `testimonials` Table (`Testimonial.js`)
| Column | Type | Constraints / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique testimonial ID |
| `client_name` | VARCHAR(150) | NOT NULL | Author name |
| `company` | VARCHAR(150) | DEFAULT '' | Organization / Candidate company |
| `rating` | TINYINT UNSIGNED | DEFAULT 5 (Range: 1 - 5) | Star rating |
| `review` | TEXT | NOT NULL | Testimonial review text |
| `client_image_url`| VARCHAR(500)| DEFAULT '' | Client profile photo URL |
| `type` | ENUM | 'Employer', 'Candidate', DEFAULT 'Employer' | Review category |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

---

## 15. API Documentation

### 15.1 Authentication Routes (`/api/auth`)
- `POST /api/auth/login` (Public): Login with `{ username, password }`. Returns JWT token and admin info.
- `GET /api/auth/me` (Protected): Returns current logged-in admin payload.

### 15.2 Careers & Jobs Routes (`/api/careers`)
- `GET /api/careers` (Public): Returns list of all job postings.
- `POST /api/careers` (Protected): Create new job opening.
- `PUT /api/careers/:id` (Protected): Update existing job opening.
- `DELETE /api/careers/:id` (Protected): Remove job opening.

### 15.3 Applications Routes (`/api/applications`)
- `POST /api/applications` (Public): Candidate submits job application `{ jobId, name, email, phone }`.
- `GET /api/applications` (Protected): Fetch all candidate applications (populated with job details).
- `PUT /api/applications/:id/status` (Protected): Update application status (`Shortlisted`/`Rejected`).
- `DELETE /api/applications/:id` (Protected): Delete candidate application record.

### 15.4 Inquiries Routes (`/api/inquiries`)
- `POST /api/inquiries` (Public): Submit employer/client contact proposal.
- `GET /api/inquiries` (Protected): Fetch all client inquiries.
- `DELETE /api/inquiries/:id` (Protected): Remove inquiry record.

### 15.5 Team Routes (`/api/team`)
- `GET /api/team` (Public): Retrieve team members.
- `POST /api/team` (Protected, Multipart Upload): Add team member with profile image.
- `PUT /api/team/:id` (Protected, Multipart Upload): Update team member info/image.
- `DELETE /api/team/:id` (Protected): Delete team member.

### 15.6 Testimonials Routes (`/api/testimonials`)
- `GET /api/testimonials` (Public): Retrieve testimonials.
- `POST /api/testimonials` (Protected, Multipart Upload): Add testimonial with optional image.
- `PUT /api/testimonials/:id` (Protected, Multipart Upload): Update testimonial.
- `DELETE /api/testimonials/:id` (Protected): Remove testimonial.

### 15.7 AI Chatbot Route (`/api/ai`)
- `POST /api/ai/chat` (Public, Rate-Limited): Receives `{ message, conversation }`, queries active MySQL jobs if relevant, and returns AI response.

---

## 16. AI Chatbot (**Talent Carpet AI**)

The website includes a production-grade floating AI Chatbot (**Talent Carpet AI**):

- **Floating Component**: Mounted globally in `App.jsx` at `bottom-24 right-6`.
- **System Instructions**: Configured with strict Talent Carpet persona instructions in `backend/src/services/aiService.js`.
- **MySQL Integration**: Dynamically queries active open positions from the `careers` table and injects them into the AI prompt context when candidates ask about jobs.
- **Provider Fallback**: Uses Google Gemini API (`gemini-1.5-flash`) as primary engine with OpenAI (`gpt-3.5-turbo`) and smart local rule fallbacks.
- **Security & Rate Limiting**: Rate limited to 30 requests/minute per IP (`express-rate-limit`). Read-only database access prevents prompt injection exploits.

---

## 17. Email / SMTP System

- **Current Status**: Form submissions (Inquiries & Applications) are currently logged and stored reliably in MySQL for review inside the Admin Panel (`AdminDashboard.jsx`).
- **SMTP Architecture Ready**: Backend structure is prepared to integrate Nodemailer/SMTP for automated email notifications.
- **Email Placeholders**:
  ```env
  SMTP_HOST=your-smtp-host
  SMTP_PORT=587
  SMTP_USER=your-email@talentcarpet.com
  SMTP_PASSWORD=your-smtp-password
  ADMIN_RECIPIENT_EMAIL=mubeen@talentcarpet.com
  ```

---

## 18. File / Image Upload System

- **Storage Engine**: Multer `diskStorage` storing files locally in `backend/public/uploads/`.
- **Supported Formats**: `jpg`, `jpeg`, `png`, `webp`, `gif`.
- **Size Limit**: 5MB maximum file size per upload.
- **Static Access**: Express static middleware serves uploaded images at `http://localhost:5005/uploads/<filename>`.

---

## 19. Website UI/UX & Design Architecture

- **Color Palette**: Royal Blue (`#1E378B`), Brand Green (`#75BB3F`), Dark Navy (`#0B132B`), and Slate Light (`#F8FAFC`).
- **Smooth Inertia Scroll**: Powered by `lenis` smooth scroll engine across desktop and mobile.
- **Animations**: Entrance fade-ins and scroll reveals powered by `framer-motion` and GSAP.
- **Responsive Layouts**: Fully responsive grid layouts adapted for mobile phones, tablets, laptops, and ultra-wide desktops.

---

## 20. SEO & Security Overview

### Implemented Security:
1. **JWT Bearer Token Authentication** for all admin API endpoints.
2. **Bcrypt Salt Hashing** (10 rounds) for password security.
3. **Environment Isolation**: Sensitive keys (`JWT_SECRET`, `DB_PASSWORD`, `OPENAI_API_KEY`, `GEMINI_API_KEY`) stored exclusively in backend `.env`.
4. **Rate Limiting**: Defends AI endpoints against spam and resource exhaustion.
5. **Read-Only Chatbot**: Chatbot cannot modify database records or execute admin commands.

---

## 21. Complete User Workflows

### Candidate Application Workflow
```
[ Visitor Opens /careers ] ──► [ Views Active Job Cards ] ──► [ Clicks "Apply Now" ]
                                                                      │
[ Candidate Sees Success Toast ] ◄── [ Saved to `applications` Table ] ◄── [ Submits Modal Form ]
```

### Employer Inquiry Workflow
```
[ Employer Opens /contact ] ──► [ Selects Service (e.g. CTH / Other) ] ──► [ Enters Proposal Message ]
                                                                                   │
[ Admin Views in Dashboard ] ◄── [ Saved to `inquiries` Table ] ◄── [ Clicks "Send Message" ]
```

---

## 22. Project Folder Structure

```text
Talent Carpet1/
├── backend/
│   ├── public/
│   │   └── uploads/                  # Static uploaded images
│   ├── src/
│   │   ├── config/                   # db.js (MySQL connection pool) & appConfig.js
│   │   ├── controllers/              # Business logic controllers (Sequelize queries)
│   │   ├── middleware/               # Auth & Multer upload middleware
│   │   ├── models_sql/               # Sequelize models (Admin, Application, Career, etc.)
│   │   ├── routes/                   # Express API routes
│   │   ├── services/                 # AI service integration
│   │   └── server.js                 # Express server entry point
│   ├── .env                          # Backend environment configuration (MySQL credentials)
│   └── package.json
│
└── frontend/
    ├── public/                       # Static logo images & assets
    ├── src/
    │   ├── components/
    │   │   ├── AIChatbot/            # Talent Carpet AI Chatbot components
    │   │   ├── Footer.jsx            # Shared footer component
    │   │   ├── Navbar.jsx            # Shared navigation header
    │   │   └── ScrollReveal.jsx      # Animation wrapper
    │   ├── context/
    │   │   └── AuthContext.jsx       # Admin Auth state context
    │   ├── pages/                    # All page components (Home, About, Careers, Contact, etc.)
    │   ├── services/                 # aiApi.js API client
    │   ├── App.jsx                   # Router & global layout setup
    │   └── main.jsx                  # React DOM root entry point
    ├── index.html
    └── package.json
```

---

## 23. Current Implementation Status

### 23.1 Completed Features
- ✅ Public responsive pages (Home, About, For Employers, For Candidates, Careers, Contact, Privacy, Terms).
- ✅ Dynamic active job listings, filtering, and job detail views.
- ✅ Job application modal & candidate application backend tracking.
- ✅ Client proposal contact forms with custom "Other Services" specification field.
- ✅ Full Admin Panel with JWT login, job CRUD, application status updates, inquiry review, team & testimonial CRUD.
- ✅ **Talent Carpet AI** floating assistant with MySQL job context integration and fallback engines.
- ✅ WhatsApp direct contact integration.
- ✅ **MySQL Relational Database** with Sequelize ORM and connection pooling.

### 23.2 Future Enhancements
- 🔮 Nodemailer / SMTP automated email alerts to admin on new job application.
- 🔮 WhatsApp Business Cloud API integration for instant candidate notification.
- 🔮 Cloudinary / AWS S3 cloud storage for uploaded media.

---

## 25. Developed By & Developer Attribution

This project was designed, engineered, and developed by:

- **Developer**: **Usman**
- **Organization**: **Carpet Group of Companies**
- **Direct Contact**: [Available via Official Channels]
- **Website / Footer Attribution**: Designed & Developed by Usman / Carpet Group of Companies

---

## 26. Document Revision History

| Revision | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| **v1.0.0** | October 01, 2026 | Talent Carpet Engineering Team | Initial release of full project documentation. |
