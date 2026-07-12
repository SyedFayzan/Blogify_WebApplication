require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");
const User = require("./models/user");
const Comment = require("./models/comment");

const upload = require("./middleware/multer");

const {
    checkForAuthentication,
    restrictToLoggedInUserOnly,
    redirectIfAuthenticated
} = require("./middleware/authentication");

const {
    createTokenForUser
} = require("./middleware/auth");


const app = express();

const PORT = process.env.PORT || 8000;


// --------------------
// View Engine
// --------------------

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// --------------------
// Middlewares
// --------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));


app.use(checkForAuthentication);


app.use((req, res, next) => {

    res.locals.user = req.user;

    next();

});



// --------------------
// Dummy Blog Creation
// --------------------

async function createDummyBlogs(){


    const dummyBlogExists = await Blog.findOne({
        title:"Getting Started with Node.js"
    });


    if(dummyBlogExists){

        console.log("Dummy blogs already exist");

        return;

    }



    const user = await User.findOne();


    if(!user){

        console.log("No user found. Create user first.");

        return;

    }



    await Blog.create([

        {
            title:"Getting Started with Node.js",

            body:
            "Node.js is a powerful JavaScript runtime used for backend development.",

            category:"Node.js",

            coverImageURL:"/images/nodejs.png",

            createdBy:user._id
        },


        {
            title:"Understanding MongoDB and Mongoose",

            body:
            "MongoDB is a NoSQL database that stores data in flexible documents.",

            category:"MongoDB",

            coverImageURL:"/images/mongodb.png",

            createdBy:user._id
        },


        {
            title:"JWT Authentication Explained",

            body:
            "JSON Web Token authentication is used to securely authenticate users.",

            category:"Authentication",

            coverImageURL:"/images/jwt.png",

            createdBy:user._id
        },


        {
            title:"Building REST APIs with Express",

            body:
            "Express.js makes backend development simple. Learn routing and APIs.",

            category:"Express.js",

            coverImageURL:"/images/express.png",

            createdBy:user._id
        },


        {
            title:"MERN Stack Roadmap for Beginners",

            body:
            "Learn MongoDB, Express, React and Node.js step by step.",

            category:"MERN",

            coverImageURL:"/images/mern.png",

            createdBy:user._id
        }

    ]);


    console.log("Dummy blogs created successfully");

}





// --------------------
// MongoDB Connection
// --------------------

mongoose.connect(process.env.MONGO_URL)

.then(async()=>{


    console.log("MongoDB Connected Successfully!!");


    await createDummyBlogs();


})

.catch((err)=>{

    console.log(err);

});





// --------------------
// Home Route
// --------------------

app.get("/", async(req,res)=>{


    const blogs = await Blog.find()
        .populate("createdBy");


    res.render("home",{

        blogs

    });


});





// --------------------
// Authentication Routes
// --------------------


app.get("/signin",
redirectIfAuthenticated,
(req,res)=>{


    res.render("signin",{

        error:req.query.error

    });


});



app.get("/signup",
redirectIfAuthenticated,
(req,res)=>{


    res.render("signup",{

        error:req.query.error

    });


});



app.post("/user/signup",

async(req,res)=>{


    const {
        name,
        email,
        password

    } = req.body;



    const existingUser = await User.findOne({
        email
    });



    if(existingUser){

        return res.redirect(
            "/signup?error=Email already exists"
        );

    }



    const hashedPassword = await bcrypt.hash(
        password,
        10
    );



    await User.create({

        name,

        email,

        password:hashedPassword

    });



    res.redirect("/signin");


});



app.post("/user/signin",

async(req,res)=>{


    const {
        email,
        password

    } = req.body;



    const user = await User.findOne({
        email
    });



    if(!user){

        return res.redirect("/signup");

    }



    const isMatch = await bcrypt.compare(
        password,
        user.password
    );



    if(!isMatch){

        return res.redirect(
            "/signin?error=Incorrect password"
        );

    }



    const token = createTokenForUser(user);



    res.cookie(
        "token",
        token
    );


    res.redirect("/");


});



app.get("/logout",(req,res)=>{


    res.clearCookie("token");

    res.redirect("/");


});
// --------------------
// Add Blog Page
// --------------------

app.get(
    "/blog/add",

    restrictToLoggedInUserOnly,

    (req,res)=>{

        res.render("addBlog");

    }
);





// --------------------
// Create Blog
// --------------------

app.post(
    "/blog",

    restrictToLoggedInUserOnly,

    upload.single("coverImage"),

    async(req,res)=>{


        const {
            title,
            body,
            category

        } = req.body;



        await Blog.create({

            title,

            body,

            category,


            coverImageURL:
            `/images/${req.file.filename}`,


            createdBy:req.user._id


        });



        res.redirect("/");


    }
);





// --------------------
// Single Blog Page
// --------------------

app.get(
    "/blog/:id",

    async(req,res)=>{


        const blog = await Blog.findById(
            req.params.id
        )
        .populate("createdBy");



        const comments = await Comment.find({

            blogId:req.params.id

        })
        .populate("createdBy");



        if(!blog){

            return res.redirect("/");

        }



        res.render("blog",{

            blog,

            comments

        });


    }
);





// --------------------
// Add Comment
// --------------------

app.post(

    "/blog/:id/comment",

    restrictToLoggedInUserOnly,


    async(req,res)=>{


        await Comment.create({

            content:req.body.content,

            createdBy:req.user._id,

            blogId:req.params.id

        });



        res.redirect(
            `/blog/${req.params.id}`
        );


    }

);





// --------------------
// Edit Blog Page
// --------------------

app.get(

    "/blog/edit/:id",

    restrictToLoggedInUserOnly,


    async(req,res)=>{


        const blog = await Blog.findById(
            req.params.id
        );



        if(!blog){

            return res.redirect("/");

        }



        if(
            blog.createdBy.toString()
            !== req.user._id
        ){

            return res.status(403)
            .send("Access Denied");

        }



        res.render(
            "editBlog",
            {
                blog
            }
        );


    }

);





// --------------------
// Update Blog
// --------------------

app.post(

    "/blog/edit/:id",

    restrictToLoggedInUserOnly,


    upload.single("coverImage"),


    async(req,res)=>{


        const blog = await Blog.findById(
            req.params.id
        );



        if(!blog){

            return res.redirect("/");

        }



        if(
            blog.createdBy.toString()
            !== req.user._id
        ){

            return res.status(403)
            .send("Access Denied");

        }



        blog.title = req.body.title;

        blog.body = req.body.body;

        blog.category = req.body.category;



        if(req.file){

            blog.coverImageURL =
            `/images/${req.file.filename}`;

        }



        await blog.save();



        res.redirect(
            `/blog/${blog._id}`
        );


    }

);





// --------------------
// Delete Blog
// --------------------

app.post(

    "/blog/delete/:id",

    restrictToLoggedInUserOnly,


    async(req,res)=>{


        const blog = await Blog.findById(
            req.params.id
        );



        if(!blog){

            return res.redirect("/");

        }



        if(
            blog.createdBy.toString()
            !== req.user._id
        ){

            return res.status(403)
            .send("Access Denied");

        }




        await Comment.deleteMany({

            blogId:blog._id

        });



        await Blog.findByIdAndDelete(
            blog._id
        );



        res.redirect("/");


    }

);





// --------------------
// All Blogs Page
// --------------------

app.get(

    "/blogs",

    async(req,res)=>{


        const blogs = await Blog.find()

        .populate("createdBy")

        .sort({
            createdAt:-1
        });



        res.render(
            "blogs",
            {
                blogs
            }
        );


    }

);





// --------------------
// About
// --------------------

app.get(

    "/about",

    (req,res)=>{


        res.render("about");


    }

);





// --------------------
// Profile
// --------------------

app.get(

    "/profile",

    restrictToLoggedInUserOnly,


    async(req,res)=>{


        const user = await User.findById(
            req.user._id
        );



        const blogs = await Blog.find({

            createdBy:req.user._id

        })

        .sort({

            createdAt:-1

        });



        res.render(

            "profile",

            {

                user,

                blogs

            }

        );


    }

);





// --------------------
// Start Server
// --------------------

app.listen(
    PORT,

    ()=>{

        console.log(
            `Server started at port ${PORT}`
        );

    }
);