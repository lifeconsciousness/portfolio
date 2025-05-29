
GrinChat is a full-stack real-time chat platform that enables users to connect and communicate instantly. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for real-time communication, GrinChat delivers a smooth and responsive user experience.

### [🚀 Live Demo](https://grinchat-8yvp.onrender.com/)


## 🌟 Features

- **🔐 User Authentication**  
  Secure JWT-based registration and login system, including password hashing and salting. 

- **⚡ Real-time Messaging**  
  Instant, bi-directional communication using WebSockets with Socket.IO.

- **💬 Message Persistence**  
  All messages are stored in MongoDB, ensuring conversations are accessible anytime.

- **📱 Responsive Design**  
  Fully responsive UI using Chakra UI, optimized for both desktop and mobile devices.

- **👥 Group Chats**  
  Create and manage group conversations with multiple participants.


## 🧠 Architecture Overview

GrinChat follows a modular full-stack architecture:

- **Frontend (React + Chakra UI)**  
  - State management via React Context  
  - Real-time updates using Socket.IO-client  
  - REST API calls via Axios  
  - Responsive layout with custom components

- **Backend (Node.js + Express)**  
  - RESTful API for user, chat, and message management  
  - WebSocket server powered by Socket.IO  
  - JWT authentication middleware  
  - MongoDB models via Mongoose

- **Database (MongoDB)**  
  - Stores users, chat metadata, and message history  
  - Mongoose schemas with population for relational-like data access


## 📸 Screenshots

Active chats

[![image.png](https://i.postimg.cc/0NRSK8fJ/image.png)](https://postimg.cc/9Db0vHsW)

## Development Challenges

- **Handling WebSocket Events**: Implementing a reliable and efficient event-based communication system for chat, typing indicators, and online status.
- **Authentication Flow**: Ensuring secure token-based login and protecting WebSocket connections with user context.
- **Scalability**: Structuring the backend to support future features like notifications, file sharing, or video calls.


## 🔮 Future Improvements

- ✅ Typing indicators and read receipts  
- ✅ Profile customization and avatars  
- 🚧 Push notifications  
- 🚧 File/image sharing in chats  
- 🚧 Improved error handling and offline fallback  
