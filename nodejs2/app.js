const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const app = express();
require('dotenv').config();


////// connect to MongoDB

const dbURI = process.env.MONGO_URI;  
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })  // the second argument will stop deprecation messages from logging, although it's unnecessary in this case
     .then(result => app.listen(3002))
     .then(()=>console.log('connected'))
     .catch(err => console.log(`Error: ${err}`));


///// register view engine

app.set('view engine', 'ejs');


//// middleware and static files

app.use(express.static('public'));  // everything in the 'public' folder will be available to the front end
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));


/// routes

app.get('/', (req, res) => {  // route handler function
    res.redirect('/blogs'); 
})                         

app.get("/about", (req, res) => {
  res.render("about", { title: "About" }); 
});


//blog routes
app.use('/blogs', blogRoutes);


// 404 -- has to be at the bottom so express can go through all the other options
app.use((req, res) => {   // this is also middleware
    res.status(404).render("404", { title: "Error" });
})



// app.use((req, res, next) => {       //Middleware from scratch
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })



// app.get('/about-us', (req, res) => {
//     res.redirect('/about')  //  this would redirect from the old to the new route 
// })

// app.get("/contact", (req, res) => {
//   res.send("<h1>contact keech</h1>");
// });