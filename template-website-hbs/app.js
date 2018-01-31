const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set("view engine", "hbs");
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
    const now = new Date().toString();
    if (!req.url.includes("favicon")) {
        const log = `${now}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile('server.log', log + "\n", (error) => {
            if (error) {
                console.log("error:::::::::", error)
            }
        })
    }
    next();
})
/**
 * Middlerware for maintenance status
 */
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'Maintenance',
//         pageTitle: 'Maintenance Page'
//     })
// });


app.get("/home", (req, res) => {
    res.render('home.hbs', {
        title: 'home',
        pageTitle: 'Home Page'
    })
})

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        title: 'about',
        pageTitle: 'About Page'
    })
})

app.get("*", (req, res) => {
    res.send("<h1>Hello From Express Server</h1>")
})

app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT)
})