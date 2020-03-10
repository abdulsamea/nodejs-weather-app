const fetch = require('node-fetch')

const geocode = (address, callback) => {
    try{
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJkdWxzYW1lYSIsImEiOiJjazc3dnVza2kwY2IxM2twN21uZmM3NGR5In0.dTs5noyDh6syJkFoix2qnw&limit=1'
  
    fetch(mapBoxUrl)
    .then(response => response.json())
    .then(data => {
      if(data.message){
        callback(undefined, data.message)
      }
      
      else if(data.features.length == 0){
        callback('Unable to get search location for submitted query. Please try again with a different search term.')
      }

      else{
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name
        })
            
      }


    })

    .catch(err =>  callback('Unable to connect to location services!'))
    
  }
    catch(e){
      callback('Error is  = '  +e)
    }
  }
  
  module.exports = geocode