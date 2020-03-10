const fetch = require('node-fetch')


const forecast = (latitude, longitude , callback) => {

     try{
        const darkSkyUrl ='https://api.darksky.net/forecast/df7fd753c2e3d206be2b06a8c89e0697/' + latitude + ',' + longitude + '?units=si&lang=en'
   
        fetch(darkSkyUrl)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                callback('Error for Dark Sky response is '  + data.error);
            }
                      
            else{
                callback(undefined, data.hourly.summary + ' The temperature is ' + data.currently.temperature + ' degrees, there is ' + data.currently.precipProbability + '%' + ' chance of rain today. The humidity level is ' + data.currently.humidity + ', and the windspeed is ' + data.currently.windSpeed + '.')
            }
        })
        .catch(err => callback(err))
}

    catch(e){
        console.log('Error is = ' + e)
    }



}


module.exports = forecast