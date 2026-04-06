# DevFolio — Premium Freelancing Portfolio

A modern, full-stack freelancing portfolio website built with **React + Vite + Firebase**.

## ✨ Features

- 🏠 **5 Pages**: Home, About, Services, Projects, Contact
- 🔥 **Dynamic Projects**: Stored and fetched from Firebase Firestore
- 📄 **Project Detail Pages**: Individual pages per project at `/project/:id`
- 💬 **Enquiry Popup**: Triggered by CTA buttons, leads saved to Firebase
- 🔐 **Admin Panel**: Full CRUD for projects + lead viewer at `/admin`
- 📱 **Fully Responsive**: Mobile-first design
- 🎨 **Premium UI**: Dark theme, gold accents, smooth animations

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (Spark plan is free)
3. Enable **Firestore Database** (start in test mode)
4. Go to Project Settings → Web App → Copy config

### 3. Set Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_PASSWORD=your_secure_password
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Navbar, Footer, EnquiryModal, SectionHeader
│   ├── home/            # Hero, Services, Projects, Testimonials, etc.
│   ├── projects/        # ProjectCard
│   └── admin/           # AdminLogin, AdminDashboard, ProjectsManager, LeadsManager
├── context/
│   ├── AdminContext.jsx  # Admin auth state
│   └── EnquiryContext.jsx # Enquiry modal state
├── firebase/
│   ├── config.js         # Firebase initialization
│   └── services.js       # All Firestore operations
├── pages/               # Route-level page components
└── styles/
    └── globals.css       # Tailwind + custom CSS
```

---

## 🗃️ Firebase Collections

### `projects`
| Field | Type | Description |
|-------|------|-------------|
| title | string | Project name |
| description | string | Full description |
| techStack | array | e.g. ["React", "Firebase"] |
| image | string | Image URL |
| liveLink | string | Live demo URL |
| createdAt | timestamp | Auto-set on creation |

### `leads`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Enquirer's name |
| email | string | Enquirer's email |
| phone | string | Enquirer's phone |
| message | string | Enquiry message |
| createdAt | timestamp | Auto-set on creation |

---

## 🔒 Admin Panel

Visit `/admin` in your browser. Use the password set in `VITE_ADMIN_PASSWORD`.

**Features:**
- Add / Edit / Delete projects
- View all enquiry leads
- Reply to leads via email

> ⚠️ The admin password is stored in session storage — it expires when the browser tab closes. For production, consider upgrading to Firebase Authentication.

---

## 🎨 Customization

### Personal Info
Update these files with your own details:
- `src/pages/AboutPage.jsx` — Bio, skills, timeline
- `src/components/common/Footer.jsx` — Social links
- `src/pages/ContactPage.jsx` — Email, phone, location
- `src/components/home/HeroSection.jsx` — Headline copy

### Colors
Edit `tailwind.config.js` and `src/styles/globals.css` to change the color palette.

### Projects
Add projects via the **Admin Panel** at `/admin` — no code changes needed.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```
Add your `.env` variables in Vercel's project settings.

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | Frontend framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Firebase Firestore | Database |
| react-hot-toast | Notifications |
| lucide-react | Icons |

---

## 📝 License

MIT — Free to use and customize for your own portfolio.
