const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forcast');

console.log(__dirname); // directory path
console.log(__filename); // filename path
console.log(path.join(__dirname,'../public')); // points toward the public directory

const app = express();

// DEFINED paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
// customize express where to look for templates instead of views folder
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath);
// HANDLEBARS ALLOWS US TO HANDLE DYNAMIC PAGES AND EASILY CREATE CODE THAT CAN BE REUSED ACCROSS DIFFERENT PAGES
app.set('view engine','hbs')// key, value 
hbs.registerPartials(partialsPath);// give path to partials

// static webpage
app.use(express.static(publicDirectoryPath)); // overrides the default app.get('') res.send with the index.html content

// HANDLEBARS ALLOWS US TO HANDLE DYNAMIC PAGES AND EASILY CREATE CODE THAT CAN BE REUSED ACCROSS DIFFERENT PAGES using render
// app.com
app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Jonathan Kim'
    }) // allows us to render the index.hbs file in views WITH second value as a parameter into index.hbs
});

// app.com/about dynamically 
app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Jonathan Kim'
    })
});

// app.com/help dynamically
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name:'Jonathan Kim',
        message: 'This is the help page. What are you looking for?'
    })
})

// app.com/weather
app.get('/weather', (req,res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geoCode(req.query.address, (geoError, geoData) => {
        if (geoError) {
            return res.send({geoError})
        }
    
        forecast(geoData.latitude.toFixed(3), geoData.longitude.toFixed(3), (error, data) => {
    
            if (error) {return res.send({error})}
            res.send({
                forcastData: data,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: 'Los Angeles',
    //     forecast: 'cloudy with a chance of rain',
    //     address: req.query.address
    // })
})

// create endpoint
app.get('/products', (req,res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search);
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404-help', {
        title: '404',
        name:'Jonathan Kim',
        message : 'Help article not found.'
    })
})

// app.com/ all other not listed *= match anything
// this must come last
app.get('*',(req,res)=> {
    res.render('404-help', {
        title: '404',
        name:'Jonathan Kim',
        message : 'Page not found.'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000');
});