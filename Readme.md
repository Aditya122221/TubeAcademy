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
ª   Readme.md
ª   structure.txt
ª   
+---Backend
ª   ª   .env
ª   ª   .env.example
ª   ª   .eraserdiagram
ª   ª   .gitignore
ª   ª   index.js
ª   ª   package-lock.json
ª   ª   package.json
ª   ª   
ª   +---Images
ª   +---Modal
ª   ª       adminUserData.js
ª   ª       email_from_client.js
ª   ª       studentUserData.js
ª   ª       teacherUserData.js
ª   ª       uploadVideo.js
ª   ª       
ª   +---Routes
ª           cloudinary.js
ª           multer.js
ª           userRoutes.js
ª           
+---Frontend
    ª   .env
    ª   .env.example
    ª   .gitignore
    ª   eslint.config.js
    ª   index.html
    ª   package-lock.json
    ª   package.json
    ª   vercel.json
    ª   vite.config.js
    ª   
    +---public
    ª       favicon.ico
    ª       
    +---src
        ª   App.css
        ª   App.jsx
        ª   main.jsx
        ª   
        +---Component
        ª       AdminHomePage.jsx
        ª       AdminProfile.jsx
        ª       AskAI.jsx
        ª       ClassEleven.jsx
        ª       ClassNine.jsx
        ª       ClassTen.jsx
        ª       ClassTwelve.jsx
        ª       ContactUs.jsx
        ª       Error404.jsx
        ª       HomePage.jsx
        ª       LogIn.jsx
        ª       Logout.jsx
        ª       PasswordUpdate.jsx
        ª       Profile.jsx
        ª       SignUp.jsx
        ª       StudentHomePage.jsx
        ª       StudentProfile.jsx
        ª       TeacherHomePage.jsx
        ª       TeacherProfile.jsx
        ª       UpdateUser.jsx
        ª       VideoEdit.jsx
        ª       
        +---CSS
        ª       AdminHome.module.css
        ª       AdminProfile.module.css
        ª       AskAI.module.css
        ª       Boxex.module.css
        ª       CardDesign.module.css
        ª       ClassNine.module.css
        ª       ContactUs.module.css
        ª       Error404.module.css
        ª       Filter.module.css
        ª       Footer.module.css
        ª       Heading.module.css
        ª       Home.module.css
        ª       LogIn.module.css
        ª       Navbar.module.css
        ª       Profile.module.css
        ª       SendButton.module.css
        ª       SignUp.module.css
        ª       Slider.module.css
        ª       StudentProfile.module.css
        ª       TeacherProfile.module.css
        ª       update.module.css
        ª       UpdateUser.module.css
        ª       VideoEdit.module.css
        ª       
        +---Images
        ª       Aboutt.jpg
        ª       DismantledBot.png
        ª       grass.png
        ª       header_img.png
        ª       Logo.png
        ª       plane.png
        ª       SignUpImg.png
        ª       TeamLeader.png
        ª       
        +---JSX
            ª   Filter.jsx
            ª   Footer.jsx
            ª   Function.jsx
            ª   Heading.jsx
            ª   ImageSlider.jsx
            ª   Navbar.jsx
            ª   
            +---AdminUI
            ª       AdminRightFour.jsx
            ª       AdminRightOne.jsx
            ª       AdminRightThree.jsx
            ª       AdminRightTwo.jsx
            ª       
            +---HomePage
            ª       ClassEleven.jsx
            ª       ClassNine.jsx
            ª       ClassTen.jsx
            ª       ClassTwelve.jsx
            ª       
            +---StudentUI
            ª       StudentRightOne.jsx
            ª       StudentRightTwo.jsx
            ª       
            +---TeacherUI
                    TeacherRightOne.jsx
                    TeacherRightThree.jsx
                    TeacherRightTwo.jsx
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