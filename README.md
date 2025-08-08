# E-commerce Store

This is a full-stack e-commerce application built with Next.js, a modern React framework. It includes features like product browsing, a shopping cart, user authentication, and order management.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env.local` file in the root of the project and add the environment variables as described in the next section.

4.  Run the development server
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

`MONGO_URI`: Your MongoDB connection string.
`TOKEN_SECRET`: A secret key for signing JWT tokens.

Example `.env.local` file:

```
MONGO_URI="your-mongodb-connection-string"
TOKEN_SECRET="your-super-secret-token-key"
```

## Technologies Used

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) - React framework for production
    *   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
    *   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
    *   [Zustand](https://github.com/pmndrs/zustand) - Small, fast and scalable bearbones state-management solution
*   **Backend:**
    *   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For building the backend API
    *   [MongoDB](https://www.mongodb.com/) - NoSQL database
    *   [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB
*   **Authentication:**
    *   [JWT (JSON Web Tokens)](https://jwt.io/) - For securing the API
    *   [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For hashing passwords

## Developer

*   **Name:** Ali Rehan Haider
*   **Website:** [https://www.alirehanhaider.com/](https://www.alirehanhaider.com/)
