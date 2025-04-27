# Event Management Platform

A full-stack event management platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, manage, and discover events.

[LIVE LINK](https://eventhandler.vercel.app/)

## Features

### User Features
- User authentication (Register/Login)
- Create and manage events
- Save/unsave events
- View event details
- Filter events by category
- Search events
- Sort events by date and price
- Responsive design for all devices

### Event Management
- Create new events with details (title, description, date, time, location, price, category, image)
- Edit existing events
- Delete events
- View saved events
- View created events

### Categories
- Browse events by categories
- View events in each category
- Category-based filtering

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- React Toastify for notifications
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin requests

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-management-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get event by ID
- POST /api/events/create - Create new event
- PATCH /api/events/:id - Update event
- DELETE /api/events/:id - Delete event
- POST /api/events/:id/save - Save/unsave event

### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get category by ID

## Project Structure

```
event-management-platform/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features to be Added

- User profile management
- Event comments and ratings
- Event sharing
- Email notifications
- Payment integration
- Admin dashboard
- Event analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)
- Design inspiration from various event management platforms
