# Real-Time Chat App

A full-stack real-time chat application built with **PostgreSQL**, **Express**, **Node.js**, **Next.js**, and **Redis**. This app supports **one-to-one and group messaging**, utilizes **JWT-based authentication**, and enables **real-time communication** with **Socket.IO**.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: Next.js (React)
- **Database**: PostgreSQL (via Prisma ORM)
- **Caching & Real-time Pub/Sub**: Redis
- **Authentication**: JWT-based authentication with secure socket handshake

## ✨ Features

- 🔐 **Secure user authentication** using JWT
- 💬 **Real-time one-to-one & group messaging**
- ⚡ **Redis** for efficient pub/sub communication
- 🧠 **Prisma ORM** for type-safe PostgreSQL queries
- 📱 **Fully responsive UI** powered by Next.js
- 🔄 **Message sync and storage** in PostgreSQL

## 🛠️ Setup Instructions

### 1. Clone the repository:

First, you need to clone this repository to your local machine:

```bash
git clone https://github.com/Prontent11/Let-sChat.git
cd your-repo-name
```

### 2. Install Dependencies:

Run the following command to install all required dependencies:

```bash
npm install
```

**Why npm install?**  
This command installs all the dependencies listed in the package.json file. These are essential libraries and tools for running your application, such as Express, Prisma, Redis, and Socket.IO. Without these installed, your app won't work as it depends on these packages.

### 3. Set Up Environment Variables:

Create a `.env` file in the root of your project and set up the following variables:

```plaintext
DATABASE_URL=postgres://user:password@localhost:5432/chatapp
JWT_SECRET=your_jwt_secret
```

**Explanation:**
- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `JWT_SECRET`: A secret key for signing JWT tokens.


### 4. Run the Development Server:

Start your development server by running:

```bash
npm run dev
```

This will launch your app at http://localhost:3000.

## 🧠 Additional Information

- **PostgreSQL**: You need to have a PostgreSQL server running locally or remotely. Make sure to create a database named `chatapp` or change the `DATABASE_URL` in your `.env` to match your setup.

- **Redis**: Redis is used for caching and real-time message broadcasting. Make sure Redis is installed and running on `localhost:6379` or update the connection URL in your `.env` file.
