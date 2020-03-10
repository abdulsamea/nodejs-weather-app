const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const port = process.env.port || 3000
const app = express()

//set path for static files such as index.html
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//set new path for hbs views. The default path is root_dir/views.
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//set new path for hbs partials, such as header and footer.
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//set up handlebars templating engine
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'My weather app',
        name: 'Abdul Samea'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About my weather app',
        name: 'Abdul Samea'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help is near from my weather app!',
        name: 'Abdul Samea'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address field provided!'
        })
    }

    else{
        const address = req.query.address
        //destructuring lat, long, location and assigning default values in case not able to destructure.
        geocode(address, (error, {latitude, longitude, location} = {}) => {
          
          if(error){
            console.log('error for geocoding = ' + error)
            return res.send({
                address: req.query.address,
                error: error,
                version: '1.0.0',
        })
          }
         
      
          else if(latitude && longitude && location){
            console.log('Location is = ' + location)
            forecast(latitude, longitude, (error, foreCastData) => {
          
              if(error){
                console.log('error for weather forecast = ' + error)
                return res.send({
                    address: req.query.address,
                    error: error,
                    version: '1.0.0'
            })
              }
      
              if(foreCastData){
              console.log('data for weather forecast =  ' + foreCastData)
                return  res.send({
                content: foreCastData,
                version: '1.0.0',
                address: location
            })
              }
      
            })
            
          }
        })
      }
      

    //  res.send({
    //         content: 'weather info',
    //         version: '1.0.0',
    //         address: req.query.address
    // })

})


app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'My weather app',
        errorText:'Help article not found.',
        name: 'Abdul Samea'        
})
})


app.get('*', (req, res) => {
    res.render('notfound',{
        title: '404',
        errorText:'Page not found.',
        name: 'Abdul Samea'
})
})

app.listen(port, () => {
    console.log('weather app listening at ' + port)
})