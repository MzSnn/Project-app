# Online Makeup Appointment App
GlamUp is a stylish and responsive web application that allows users to easily book makeup appointments. Users can choose a date, select a time slot, and receive a beautiful confirmation message — complete with confetti and smooth animations.

# Technologies Used
**Frontend**: HTML, CSS, AngularJS, ngAnimate  
**Backend**: Node.js, Express  
**Database**: MongoDB (via Mongoose)  
**Styling**: Google Fonts, Custom CSS  
**Extras**: Confetti.js, Toast notifications  

# Installation & Setup
```bash
git clone https://github.com/yourusername/online-makeup-app.git
cd online-makeup-app

-Install server dependencies-
cd makeup/server
npm install

-env. file-
MONGO_URI=your-mongodb-connection-url

-backend-
cd makeup/server
node index.js

-frontend-
cd client (outside makeup folder)
http-server
Starting up http-server, serving ./

Available on:
  http://192.168.151.45:8080
  http://127.0.0.1:8080
