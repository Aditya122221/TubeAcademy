# 🎓 TubeAcademy

A comprehensive full-stack web application designed for educational institutions, providing a complete learning management system with role-based access control for administrators, teachers, and students.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login system
- Role-based access control (Admin, Teacher, Student)
- JWT-based authentication
- Password update functionality
- Profile management for all user types

### 👨‍💼 Admin Features
- Register and manage students and teachers
- Assign subjects to teachers
- Manage teacher salaries
- View comprehensive user analytics
- System-wide video content management

### 👨‍🏫 Teacher Features
- Upload educational videos with metadata
- Edit and delete video content
- Manage assigned subjects
- Track student engagement
- Profile customization

### 👨‍🎓 Student Features
- Access course videos by class (9th, 10th, 11th, 12th)
- Watch educational content seamlessly
- Update personal profile
- Contact support system
- AI-powered assistance

### 🎥 Video Management
- Cloud-based video storage (Cloudinary)
- Video categorization by class and subject
- Responsive video player
- Video metadata management

### 🎨 User Interface
- Modern, responsive design
- Mobile-friendly interface
- Intuitive navigation
- Role-specific dashboards
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **React Router DOM 7.6.1** - Client-side routing
- **Vite 6.3.5** - Fast build tool and dev server
- **Axios 1.9.0** - HTTP client for API calls
- **React Toastify 11.0.5** - Notification system
- **Lucide React 0.525.0** - Icon library
- **CSS Modules** - Scoped styling

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.15.1** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Media storage and management
- **Multer** - File upload handling
- **Nodemailer** - Email functionality

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

## 🌐 Live Demo

**Frontend:** [https://tube-academy.vercel.app/](https://tube-academy.vercel.app/)

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account (for media storage)

### 1. Clone the Repository
```bash
git clone https://github.com/Aditya122221/TubeAcademy.git
cd TubeAcademy
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

## 📖 Usage

### Getting Started
1. Visit the application URL
2. Register as a new user or login with existing credentials
3. Based on your role, you'll be redirected to the appropriate dashboard

### User Roles

#### Admin
- Access admin dashboard
- Register new teachers and students
- Manage user accounts and permissions
- View system analytics

#### Teacher
- Access teacher dashboard
- Upload and manage educational videos
- View assigned subjects
- Monitor student progress

#### Student
- Access student dashboard
- Browse videos by class (9th, 10th, 11th, 12th)
- Watch educational content
- Update profile information

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/update-password` - Update password

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/update-profile` - Update user profile
- `GET /api/users/check` - Check user existence

### Video Management
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/fetch` - Fetch videos
- `PUT /api/videos/edit` - Edit video
- `DELETE /api/videos/delete` - Delete video

### Admin Operations
- `GET /api/admin/staff-details` - Get staff details
- `POST /api/admin/query-action` - Handle admin queries

## 📁 Project Structure

```
TubeAcademy/
├── Backend/
│   ├── Controller/          # Route controllers
│   │   ├── EmailSendController.js
│   │   ├── LoginController.js
│   │   ├── PasswordUpdateController.js
│   │   ├── ProfileController.js
│   │   ├── ProfileUpdateController.js
│   │   ├── QueryActionController.js
│   │   ├── SignupController.js
│   │   ├── StaffDetailController.js
│   │   ├── UserCheckController.js
│   │   ├── UserDetailsController.js
│   │   ├── VideoActionController.js
│   │   └── VideoFetchController.js
│   ├── Modal/              # Database models
│   │   ├── adminUserData.js
│   │   ├── email_from_client.js
│   │   ├── studentUserData.js
│   │   ├── teacherUserData.js
│   │   └── uploadVideo.js
│   ├── Routes/             # API routes
│   │   ├── cloudinary.js
│   │   ├── multer.js
│   │   └── userRoutes.js
│   ├── Images/             # Static images
│   ├── index.js            # Server entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── Component/      # React components
│   │   │   ├── AdminHomePage.jsx
│   │   │   ├── AdminProfile.jsx
│   │   │   ├── AskAI.jsx
│   │   │   ├── ClassEleven.jsx
│   │   │   ├── ClassNine.jsx
│   │   │   ├── ClassTen.jsx
│   │   │   ├── ClassTwelve.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Error404.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LogIn.jsx
│   │   │   ├── Logout.jsx
│   │   │   ├── PasswordUpdate.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── StudentHomePage.jsx
│   │   │   ├── StudentProfile.jsx
│   │   │   ├── TeacherHomePage.jsx
│   │   │   ├── TeacherProfile.jsx
│   │   │   ├── UpdateUser.jsx
│   │   │   └── VideoEdit.jsx
│   │   ├── CSS/            # Styling files
│   │   ├── Images/         # Static assets
│   │   ├── JSX/            # Reusable components
│   │   │   ├── AdminUI/
│   │   │   ├── StudentUI/
│   │   │   └── TeacherUI/
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── public/             # Public assets
│   ├── index.html
│   └── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions to TubeAcademy! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📞 Contact

**Project Maintainer:** Aditya
- **GitHub:** [@Aditya122221](https://github.com/Aditya122221)
- **Project Link:** [https://github.com/Aditya122221/TubeAcademy](https://github.com/Aditya122221/TubeAcademy)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Special thanks to the open-source community for the amazing tools and libraries
- Educational institutions for providing valuable feedback during development

---

⭐ **Star this repository if you found it helpful!**