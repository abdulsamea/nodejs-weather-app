console.log('js loaded!')
var messageSuccess = document.querySelector('#message-success')
var messageError = document.querySelector('#message-fail')

//fetching weather data

function getWeatherInfo(location) {
fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log('Error is = ' + data.error)
            messageSuccess.textContent = '';
            messageError.textContent = data.error;
        }
        else{
            console.log(data.address + ", " + data.content);
            messageSuccess.textContent =  'Location is '+ data.address + ", " + data.content;
            messageError.textContent = '';
        }
    })

})
.catch(error =>{
    console.log('Error is = '  + error);
})

}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    //to avoid default reload feature of form submission
    e.preventDefault();

    const location = search.value;
    if(location == ''){
        console.log('You must enter an address to get weather updates!')
        messageError.textContent = 'You must enter an address to get weather updates!';
    }
    // console.log(location)
    else{
    getWeatherInfo(location);
    }
})