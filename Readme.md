## 🎓 TubeAcademy


* Developed a full-stack web application for a coaching institute, supporting three user roles: Admin, Teacher,
and Student.
* Implemented Admin functionalities to register students/teachers, manage salaries, and assign subjects.
* Enabled Teachers to upload, edit, and delete educational videos for students.
* Designed the Student experience to access and watch course videos seamlessly.
* Created individual profile pages for all users, allowing them to update their information.
* Built a secure authentication and authorization system for role-based access control.
* Ensured a responsive and user-friendly UI using React and CSS.</li>

## 🌐 Deployed Link

<a href="https://tube-academy.vercel.app/" target="_blank">https://tube-academy.vercel.app/</a>

## 📁 Directory Structure

```
.
├── README.md
├── Backend/
│   ├── .env
│   ├── .env.example
│   ├── .eraserdiagram
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── Images/
│   ├── Modal/
│   │   ├── adminUserData.js
│   │   ├── email_from_client.js
│   │   ├── studentUserData.js
│   │   ├── teacherUserData.js
│   │   └── uploadVideo.js
│   └── Routes/
│       ├── cloudinary.js
│       ├── multer.js
│       └── userRoutes.js
├── Frontend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
│   ├── public/
│   │   └── favicon.ico
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── Component/
│       │   ├── AdminHomePage.jsx
│       │   ├── AdminProfile.jsx
│       │   ├── AskAI.jsx
│       │   ├── ClassEleven.jsx
│       │   ├── ClassNine.jsx
│       │   ├── ClassTen.jsx
│       │   ├── ClassTwelve.jsx
│       │   ├── ContactUs.jsx
│       │   ├── Error404.jsx
│       │   ├── HomePage.jsx
│       │   ├── LogIn.jsx
│       │   ├── Logout.jsx
│       │   ├── PasswordUpdate.jsx
│       │   ├── Profile.jsx
│       │   ├── SignUp.jsx
│       │   ├── StudentHomePage.jsx
│       │   ├── StudentProfile.jsx
│       │   ├── TeacherHomePage.jsx
│       │   ├── TeacherProfile.jsx
│       │   ├── UpdateUser.jsx
│       │   └── VideoEdit.jsx
│       ├── CSS/
│       │   ├── AdminHome.module.css
│       │   ├── AdminProfile.module.css
│       │   ├── AskAI.module.css
│       │   ├── Boxex.module.css
│       │   ├── CardDesign.module.css
│       │   ├── ClassNine.module.css
│       │   ├── ContactUs.module.css
│       │   ├── Error404.module.css
│       │   ├── Filter.module.css
│       │   ├── Footer.module.css
│       │   ├── Heading.module.css
│       │   ├── Home.module.css
│       │   ├── LogIn.module.css
│       │   ├── Navbar.module.css
│       │   ├── Profile.module.css
│       │   ├── SendButton.module.css
│       │   ├── SignUp.module.css
│       │   ├── Slider.module.css
│       │   ├── StudentProfile.module.css
│       │   ├── TeacherProfile.module.css
│       │   ├── update.module.css
│       │   ├── UpdateUser.module.css
│       │   └── VideoEdit.module.css
│       ├── Images/
│       │   ├── Aboutt.jpg
│       │   ├── DismantledBot.png
│       │   ├── grass.png
│       │   ├── header_img.png
│       │   ├── Logo.png
│       │   ├── plane.png
│       │   ├── SignUpImg.png
│       │   └── TeamLeader.png
│       └── JSX/
│           ├── Filter.jsx
│           ├── Footer.jsx
│           ├── Function.jsx
│           ├── Heading.jsx
│           ├── ImageSlider.jsx
│           ├── Navbar.jsx
│           ├── AdminUI/
│           │   ├── AdminRightFour.jsx
│           │   ├── AdminRightOne.jsx
│           │   ├── AdminRightThree.jsx
│           │   └── AdminRightTwo.jsx
│           ├── HomePage/
│           │   ├── ClassEleven.jsx
│           │   ├── ClassNine.jsx
│           │   ├── ClassTen.jsx
│           │   └── ClassTwelve.jsx
│           ├── StudentUI/
│           │   ├── StudentRightOne.jsx
│           │   └── StudentRightTwo.jsx
│           └── TeacherUI/
│               ├── TeacherRightOne.jsx
│               ├── TeacherRightThree.jsx
│               └── TeacherRightTwo.jsx
```

## 🛠️ Installation Steps:

<p>1. Clone Repository</p>

```
git clone https://github.com/Aditya122221/TubeAcademy.git
```

<p>2. Frontend Installation</p>

```
cd Frontend
```
```
npm install
```

<p>3. Backend Installation</p>

```
cd Backend
```
```
npm install
```

<p>4. .env Set up</p>
Create .env file in both Frontend and Backend directory and follow the .env.example file to setup the .env file

## 🛠️ Technologies Used

*   Frontend: React JS, CSS
*   Backend: Express, Node JS
*   Database: Mongo DB
*   Deployment: Vercel, Render