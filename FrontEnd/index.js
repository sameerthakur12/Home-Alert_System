/**
import express from "express";
import bodyParser from "body-parser"; 
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true}));

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    const email = req.body["email"];
    if(email === "sameer.tomar1619@gmail.com" && password === "12345678"){
        userIsAuthorised = true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/Login/login.html");
})

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
            res.sendFile(__dirname + "/public/homePage.html");        
    }
    else{
        res.sendStatus(404);
    }

    app.get("/features", (req, res) => {
        res.sendFile(__dirname + "/public/Features/feature.html");
        
    })
    
    app.get("/pricing", (req, res) => {
        res.sendFile(__dirname + "/public/Pricing/pricing.html");
        
    })
    
    app.get("/contact", (req, res) => {
        res.sendFile(__dirname + "/public/ContactUS/contactUs.html");
    })
    
    app.get("/about", (req, res) => {
        res.sendFile(__dirname + "/public/AboutUs/aboutUs.html");
    })
    
    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/public/Login/login.html");
    })
    
    app.get("/registration", (req, res) => {
        res.sendFile(__dirname + "/public/Login/registration.html");
    })
    
    app.get("/price", (req, res) => {
        res.sendFile(__dirname + "/public/Pricing/price.html");
    })
})




app.listen(port, (req,res) => {
    console.log(`Listening on port ${port}`)
})
*/







import express from "express";
import bodyParser from "body-parser"; 
import session from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


app.use(express.static(__dirname));


function ensureAuthenticated(req, res, next) {
    if (req.session.userIsAuthorised) {
        return next();
    }
    res.redirect('/');
}


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/Login/login.html");
});

app.post("/check", (req, res) => {
    const password = req.body["password"];
    const email = req.body["email"];

    if (email === "sameer.tomar1619@gmail.com" && password === "12345678") {
        req.session.userIsAuthorised = true;
        res.redirect('/home');
    } else {
        res.redirect('/');
    }
});

// Home route (authenticated users only)
app.get("/home", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/homePage.html");
});

// Route handlers (authenticated users only)
app.get("/features", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/Features/feature.html");
});

app.get("/pricing", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/Pricing/pricing.html");
});

app.get("/contact", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/ContactUS/contactUs.html");
});

app.get("/about", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/AboutUs/aboutUs.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/Login/login.html");
});

app.get("/registration", (req, res) => {
    res.sendFile(__dirname + "/public/Login/registration.html");
});

app.get("/price", ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/public/Pricing/price.html");
});

// Logout route
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
