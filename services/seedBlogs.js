const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

async function createDummyBlogs() {
    try {
        const dummyBlogExists = await Blog.findOne({
            title: "Getting Started with Node.js",
        });

        if (dummyBlogExists) {
            console.log("Dummy blogs already exist");
            return;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        let admin = await User.findOne({
            email: adminEmail,
        });

        if (!admin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            admin = await User.create({
                name: "Blogify Admin",
                email: adminEmail,
                password: hashedPassword,
            });
        }

        await Blog.create([
            {
                title: "Getting Started with Node.js",

                body: `Node.js is an open-source JavaScript runtime built on Chrome's V8 engine. It allows developers to use JavaScript not only in the browser but also on the server, making full-stack JavaScript development possible.

One of the biggest advantages of Node.js is its non-blocking, event-driven architecture. Instead of waiting for one task to finish before starting another, Node.js can handle multiple requests simultaneously, making it highly efficient for modern web applications.

Node.js comes with npm (Node Package Manager), which provides access to millions of open-source packages. Developers can quickly install libraries for authentication, file uploads, APIs, databases, and much more.

Frameworks like Express.js make backend development easier by simplifying routing, middleware, and request handling. Together, Node.js and Express form the foundation of many production-ready web applications.

If you're planning to become a MERN Stack Developer, learning Node.js is the first step toward building scalable and high-performance backend applications.`,

                category: "Node.js",

                coverImageURL: "/images/nodejs.png",

                createdBy: admin._id,
            },

            {
                title: "Understanding MongoDB and Mongoose",

                body: `MongoDB is a NoSQL database that stores information in flexible JSON-like documents instead of traditional rows and tables. This makes it an excellent choice for applications with changing data structures.

Unlike relational databases, MongoDB allows developers to store complex objects without creating multiple tables or joins. This flexibility speeds up development and makes the database easier to maintain.

Mongoose is an Object Data Modeling (ODM) library that provides a structured way to interact with MongoDB using JavaScript. It allows developers to define schemas, validate data, and simplify database operations.

Using Mongoose, you can easily create models, perform CRUD operations, establish relationships, and implement middleware for advanced functionality.

MongoDB and Mongoose together provide a powerful database solution for MERN stack applications, offering speed, scalability, and developer-friendly tools.`,

                category: "MongoDB",

                coverImageURL: "/images/mongodb.png",

                createdBy: admin._id,
            },

            {
                title: "JWT Authentication Explained",

                body: `Authentication is one of the most important features of any web application. JSON Web Token (JWT) provides a secure and efficient method of verifying user identity without storing session data on the server.

When a user successfully logs in, the server creates a signed JWT containing essential information such as the user's ID and role. This token is then sent back to the client.

For future requests, the client includes the token in cookies or headers. The server verifies the token before allowing access to protected routes, ensuring only authenticated users can access sensitive resources.

JWT authentication is stateless, making it suitable for scalable applications where multiple servers handle incoming requests.

Most modern web applications, including MERN stack projects, use JWT because it offers security, simplicity, and excellent performance for authentication systems.`,

                category: "Authentication",

                coverImageURL: "/images/jwt.png",

                createdBy: admin._id,
            },

            {
                title: "Building REST APIs with Express",

                body: `Express.js is a lightweight and flexible web framework built on top of Node.js. It simplifies backend development by providing a clean way to define routes, middleware, and request handlers.

REST APIs allow communication between the frontend and backend using HTTP methods like GET, POST, PUT, PATCH, and DELETE. Express makes implementing these endpoints straightforward.

Middleware is one of Express's most powerful features. It enables developers to process requests, authenticate users, validate input, log activity, and handle errors before reaching the final route.

Express integrates seamlessly with MongoDB through Mongoose, allowing developers to build complete CRUD applications with minimal boilerplate code.

Whether you're creating a blog platform, an e-commerce website, or a social media application, Express provides the tools needed to build fast and maintainable backend services.`,

                category: "Express.js",

                coverImageURL: "/images/express.png",

                createdBy: admin._id,
            },

            {
                title: "MERN Stack Roadmap for Beginners",

                body: `The MERN stack consists of MongoDB, Express.js, React.js, and Node.js. Together, these technologies enable developers to build complete full-stack web applications using JavaScript.

A beginner should first master HTML, CSS, and JavaScript before moving to Node.js and Express for backend development. Understanding APIs, authentication, and databases forms the backbone of full-stack development.

Once the backend concepts are clear, learning React becomes much easier. React helps developers create interactive and reusable user interfaces using components and state management.

After learning each technology individually, the next step is integrating them into real-world projects such as blog platforms, task managers, chat applications, or e-commerce websites.

Consistent practice, project building, GitHub contributions, and solving Data Structures and Algorithms problems alongside MERN development are key to becoming placement-ready and landing software development roles.`,

                category: "MERN",

                coverImageURL: "/images/mern.png",

                createdBy: admin._id,
            },
        ]);

        console.log("Dummy blogs created successfully");
    } catch (error) {
        console.error("Error creating dummy blogs:", error);
    }
}

module.exports = createDummyBlogs;