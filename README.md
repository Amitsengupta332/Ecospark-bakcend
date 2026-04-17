# Planora 🎉

**Planora** is a secure, full-stack event management platform where **Admins and Users** can create, manage, and participate in events. Events can be **Public or Private**, with optional **registration fees and payment integration**.

---

# 🚀 Features

## 🔐 Authentication & Security

* JWT-based authentication
* Role-based access control (Admin & User)
* Protected routes and APIs

## 📅 Event Management

* Create, update, and delete events
* Public & Private event support
* Free and Paid event options

## 👥 Participation System

* Join public events instantly
* Request access to private events
* Payment-based participation for paid events
* Host approval system for participants

## 💳 Payment Integration

* SSLCommerz / ShurjoPay (or Stripe)
* Secure payment workflow
* Payment status tracking

## 📩 Invitation System

* Event hosts can invite users
* Users can accept/decline invitations
* Paid invitations require payment before acceptance

## ⭐ Reviews & Ratings

* Rate events
* Add, edit, and delete reviews
* Review moderation window

## 🛠 Admin Controls

* Monitor all users and events
* Remove inappropriate content
* Manage user accounts

---

# 🧱 Tech Stack

## Frontend

* Next.js
* Tailwind CSS

## Backend

* Node.js
* Express.js
* Prisma ORM

## Database

* PostgreSQL

## Authentication

* JWT / Custom Auth / Passport

## Payment

* SSLCommerz / ShurjoPay / Stripe

---

# 📄 Pages & UI Structure

## 🏠 Homepage

* Hero section with featured event
* Upcoming events slider (9 events)
* Event category filters
* Call-to-action section

## 📌 Events Page

* Search by title or organizer
* Filter by:

  * Public Free
  * Public Paid
  * Private Free
  * Private Paid

## 📖 Event Details Page

* Event info (title, date, venue, description)
* Organizer details
* Fee information
* Action buttons based on event type

## 📊 Dashboard

### Sidebar

* My Events
* Invitations
* My Reviews
* Settings

### Features

* Event CRUD
* Manage participants
* Handle approvals/rejections
* Manage invitations
* Review management

---

# 🔑 Roles & Permissions

## 👑 Admin

* Monitor all events
* Monitor users
* Delete events
* Remove users

## 🙋 User

### Authentication

* Register
* Login

### Event Management

* Create events
* Update events
* Delete events

### Participation

* Join public events
* Request private event access
* Pay for paid events

---

# 💸 Payment Workflow

### Public Paid Event

1. User clicks **Pay & Join**
2. Payment is processed
3. Request goes to **Pending approval**

### Private Paid Event

1. User clicks **Pay & Request**
2. Payment is processed
3. Await host approval

---

# ⚙️ Core Functionalities

* JWT Authentication
* Role-based access control
* Event CRUD operations
* Payment system integration
* Invitation system
* Approval and banning system
* Reviews & ratings

---

# ⚠️ Error Handling

## Validation

* Required fields
* Email validation
* Fee validation

## UI States

* Loading indicators
* Payment processing states

## Error Messages

* Invalid login
* Payment failure
* Unauthorized access

---

# 🎨 UI/UX Guidelines

* Fully responsive design
* Mobile, tablet, desktop support
* Clean and modern UI
* Consistent Tailwind styling
* Reusable components

---

# 🧪 Commit Requirements

* Minimum **20 meaningful commits** for:

  * Client
  * Server

---

# 🎥 Video Demonstration (5–10 minutes)

Include the following in your demo:

1. User Registration
2. Login
3. Create Event
4. Join Public Free Event
5. Paid Event Payment
6. Private Event Join Request
7. Host Approval Process
8. Dashboard Features
9. Admin Moderation
10. Event Reviews

---

# 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/planora.git

# Navigate to project
cd planora
```

## Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start server
npm run dev
```

## Frontend Setup

```bash
cd client
npm install

# Start development server
npm run dev
```

---

# 🔧 Environment Variables (Example)

## Backend

```
DATABASE_URL=
JWT_SECRET=
PAYMENT_API_KEY=
PAYMENT_SECRET=
```

## Frontend

```
NEXT_PUBLIC_API_URL=
```

---
# project workflow 

* Auth → User → Event → Participation → (Payment) → Review → Admin

# 📌 Future Improvements

* Real-time notifications
* Email integration
* Advanced analytics dashboard
* Event reminders

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙌 Acknowledgements

* Next.js
* Prisma
* Tailwind CSS
* Payment Gateways (SSLCommerz, Stripe)

---

## 📌 Example Submission Format

```
Frontend Repo    : https://github.com/Amitsengupta332/Planora-Frontend
Backend Repo     : https://github.com/Amitsengupta332/Planora

Frontend Live    : https://planora-frontend-psi.vercel.app/
Backend Live     : https://planora-opal-chi.vercel.app/

Demo Video       : https://drive.google.com/file/d/abc/view

Admin Email      : admin@gmail.com
Admin Password   : password123
```

---

# 🎉 Have a great day!# Ecospark-bakcend
