📘 Student Life Lessons
A Digital Life Lessons Platform
🔗 Live Website: https://student-life-lessons.web.app
🔗 Client Repository: https://github.com/rajes124/Student-life-lessons-Clint-side.git
🔗 Server Repository: https://github.com/rajes124/Lessons-backend.git

📖 Project Overview
Student Life Lessons is a full-stack web application where users can create, store, and share meaningful life lessons, personal growth insights, and real-life wisdom.
The platform encourages mindful reflection, continuous learning, and community-driven growth by allowing users to explore lessons shared by others.
Users can manage their own lessons, save favorites, interact through likes and comments, and upgrade to a Premium plan for exclusive content access.

🎯 Why This Project
People often gain valuable lessons in life but forget them over time.
This platform helps users preserve personal wisdom, track learning progress, and grow by exploring insights from a diverse community.

🔐 Authentication & User Roles
Email & Password Authentication (Firebase)
Google Sign-In
JWT Token Verification using Firebase Admin SDK
Secure private/protected routes
Role-based access (User / Admin)

💎 Subscription & Premium System
All users start with a Free plan
Premium Plan: ৳1500 (One-time Lifetime Payment via Stripe)
Stripe Checkout & Webhook integration
Premium users can:
View premium lessons
Create premium lessons
Access exclusive content
Free users see premium lessons blurred with upgrade prompt
MongoDB is the single source of truth for user subscription status

🧩 Core Features
🔹 Lesson Management
Create life lessons with:
Title
Full description / story
Category
Emotional tone
Image (optional)
Visibility (Public / Private)
Access Level (Free / Premium)
Update and delete lessons (owner only)
Premium access control

🔹 Public Lessons
Browse all public lessons
Filter by:
Category
Emotional tone
Search by title or keyword
Sort by:
Newest
Most saved
Pagination implemented
Premium lessons locked for free users

🔹 Lesson Details (Private Route)
Full lesson content with metadata
Author profile section
Estimated reading time
Engagement stats:
Likes
Favorites
Views (static/random)
Interactive features:
Like / Unlike
Save to favorites
Comment
Report lesson
Social sharing

🔹 Favorites System
Save / remove lessons from favorites
Dedicated dashboard page
Filter favorites by category or emotional tone

🧑‍💻 Dashboard (User)
📊 Dashboard Home
Total lessons created
Total favorites
Recently added lessons
Activity analytics chart
➕ Add Lesson
Premium validation for premium lessons
Success toast on submission
Lottie animation on completion
📋 My Lessons
View all created lessons
Update visibility & access level
Edit or delete lessons with confirmation
👤 Profile
View & update display name and photo
See lesson stats
Premium badge display
View all public lessons by the user

🛡️ Admin Dashboard
📈 Admin Overview
Total users
Total lessons
Reported lessons
Most active contributors
Platform analytics
👥 Manage Users
View all users
Promote user to admin
Remove users (optional)
📚 Manage Lessons
Delete inappropriate content
Feature lessons
Filter lessons by status
🚩 Reported Lessons
View reported lessons
See report reasons & reporter info
Take action (Delete / Ignore)

🧪 Additional Features
Search, Filter & Sort
Pagination
Token-based route protection
Toast / SweetAlert notifications
Loading spinner
Custom 404 page
Responsive design (Mobile, Tablet, Desktop)

🎨 UI & UX Highlights
Clean and professional layout
Consistent typography and spacing
Equal card height & grid layout
Reusable button styles
Modern icons (Updated X logo)
Calm, readable color palette

🛠️ Technologies Used
Frontend
React
JavaScript
Tailwind CSS
React Router
Axios
Lottie React
React Hot Toast
Backend
Node.js
Express.js
MongoDB
Firebase Admin SDK
Stripe Payment Gateway
Tools
Git & GitHub
Environment Variables (.env)
Vercel / Netlify / Render

🚀 How to Run Locally
Client Side
git clone https://github.com/rajes124/Student-life-lessons-Clint-side.git
npm install
npm run dev

Server Side
git clone https://github.com/rajes124/Lessons-backend.git
cd student-life-lessons-server
npm install
npm run start


📌 Key Rules Followed
No lorem ipsum text used
No default browser alerts
Environment variables secured
Reload-safe routes
Minimum commit requirements maintained
Unique project idea and design

👨‍💻 Author
Anonto Rishi
MRN Stack Developer
📍 Sylhet, Moulvibazar, Bangladesh
📧 rajesray307@gmail.com
📞Phon : 01407539879



