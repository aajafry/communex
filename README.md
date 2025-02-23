# CommuneX - Frontend 💬

This is the **frontend** for **CommuneX**, a real-time chat application built using React, Socket.IO, and modern UI libraries.

## 🚀 Features

- **User Authentication**: Login, signup, and logout functionality.
- **Real-time Messaging**: Send and receive messages instantly using Socket.IO.
- **Group Chats**: Create and manage group conversations.
- **Media Uploads**: Upload images and attachments (future feature).
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop).

## 🛠️ Tech Stack

- **React**: Frontend library for building the user interface.
- **Vite**: Fast build tool for development.
- **Socket.IO**: Real-time communication.
- **Axios**: API communication.
- **TailwindCSS / Shadcn**: UI design components.
- **React Router**: Page navigation.

## 📦 Installation

1. Clone the repository:

```bash
   git clone https://github.com/aajafry/communex.git
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
    npm run dev
```

4. Open the app in your browser:

```arduino
    http://localhost:5173
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_BACKEND=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=(set your cloudinary cloud name)
VITE_CLOUDINARY_UPLOAD_PRESET=(set your cloudinary upload preset)
```

## 🔗 API Integration

The frontend interacts with the backend via REST APIs and socket events. Ensure the backend is running before testing the frontend to avoid API errors.

The CommuneX API can be found at [CommuneX API Repo](https://github.com/aajafry/communex_api.git).
