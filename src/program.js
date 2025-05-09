const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware setup
app.use(session({
    secret: "mysecretkey",  // Secret key for session encryption
    resave: false,          // Prevents resaving sessions if nothing changed
    saveUninitialized: true // Saves new sessions that are uninitialized
}));

// Simple user database (for demonstration purposes)
const users = { admin: "password123" };

// **Middleware to check authentication**
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
}

// **Login Route (GET) - Show Login Form**
app.get("/login", (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    `);
});

// **Login Route (POST) - Authenticate User**
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username;  // Store username in session
        return res.redirect("/dashboard");
    }
    res.send("Invalid username or password. <a href='/login'>Try again</a>");
});

// **Protected Route (Dashboard)**
app.get("/dashboard", isAuthenticated, (req, res) => {
    res.send(`
        <h1>Welcome, ${req.session.user}!</h1>
        <a href="/logout">Logout</a>
    `);
});

// **Logout Route**
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

// **Start Server**
app.listen(3000, () => console.log("Server running on http://localhost:3000"));