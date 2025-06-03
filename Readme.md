<h1 id="title">🎓 TubeAcademy</h1>

<ul>
<li>Developed a full-stack web application for a coaching institute, supporting three user roles: Admin, Teacher,
and Student.</li>
<li>Implemented Admin functionalities to register students/teachers, manage salaries, and assign subjects.</li>
<li>Enabled Teachers to upload, edit, and delete educational videos for students.</li>
<li>Designed the Student experience to access and watch course videos seamlessly.</li>
<li>Created individual profile pages for all users, allowing them to update their information.</li>
<li>Built a secure authentication and authorization system for role-based access control.</li>
<li>Ensured a responsive and user-friendly UI using React and CSS.</li>
</ul>

<h2>🌐 Deployed Link</h2>

<a href="https://tube-academy.vercel.app/" target="_blank">https://tube-academy.vercel.app/</a>

  
  
<h2>🚀 Features</h2>

Here're some of the project's best features:

*   Responsive Design: Ensures compatibility across various devices and screen sizes.
*   Modern UI/UX: Clean and intuitive interface for enhanced user experience.
*   Educational Content: Access to a range of learning materials and resources.

<h2>📁 Directory Structure</h2>

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

<h2>🛠️ Installation Steps:</h2>

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

<h2>🛠️ Technologies Used</h2>

*   Frontend: React JS, CSS
*   Backend: Express, Node JS
*   Database: Mongo DB
*   Deployment: Vercel, Render