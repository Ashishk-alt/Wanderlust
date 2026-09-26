# 🏡 Wanderlust – Full-Stack Property Rental Platform

Wanderlust is a full-stack property rental and booking web application inspired by modern vacation-rental platforms.

The project was built to solve a common problem in travel and property booking: users need a simple platform where they can discover suitable stays, view complete property information, create their own listings, and interact with other users through reviews.

The application provides a complete flow for browsing properties, managing listings, uploading property images, authentication, reviews, and searching for available stays.

---

## 🚀 Live Demo

🌐 **Live Application:**  
https://wanderlust-mfmh.onrender.com/listings

📂 **GitHub Repository:**  
https://github.com/Ashishk-alt/Wanderlust

---

## 🎯 Problem Statement

Finding and managing rental properties can become difficult when information about properties, images, reviews, and user interactions is scattered across different platforms.

Wanderlust was developed to provide a centralized platform where:

- Users can discover rental properties.
- Users can search for suitable listings.
- Property owners can create and manage their listings.
- Users can view detailed property information.
- Users can upload property images.
- Users can leave reviews and ratings.
- Authentication ensures that users can securely manage their content.

The goal was to build a practical full-stack application that demonstrates how a real-world rental platform can be designed and developed.

---

## ✨ Features

### 👤 User Authentication

- User registration and login
- Session-based authentication
- Protected routes
- Authorization for user-specific operations
- Users can manage their own listings and reviews

### 🏠 Property Listings

- Browse available properties
- View detailed property information
- Create new property listings
- Edit existing listings
- Delete listings
- Display property images and details

### 🔍 Search

- Search through available listings
- Find properties based on relevant information
- Pagination for listing results

### ⭐ Reviews

- Users can add reviews to listings
- Display reviews on property pages
- Delete reviews where authorized
- Rating-based feedback

### 📷 Image Upload

- Property image upload functionality
- Cloud-based image storage
- Images are displayed dynamically with listings

### 🗄️ Database

The application uses MongoDB to store:

- Users
- Property listings
- Reviews

The production deployment uses MongoDB Atlas.

### 📱 Responsive Interface

The application provides a responsive web interface designed to work across different screen sizes.

---

## 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication

- Passport.js
- Express Session

### Image Storage

- Cloudinary

### Deployment

- Render

---

## 🏗️ Project Structure

```text
Wanderlust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── init/
│   └── ...
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── ...
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   └── ...
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── ...
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── .gitignore

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/Ashishk-alt/Wanderlust.git
2. Navigate into the project
cd Wanderlust
3. Install dependencies
npm install
4. Create a .env file

Create a .env file in the root directory:

ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

Use your own credentials and never commit the .env file to GitHub.

5. Start the application
node app.js

The application will run locally on:

http://localhost:3001
