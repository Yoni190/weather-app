const apiKey = "9KRBVXZCNGBUSEQLWL2SA9HTW"
const button = document.querySelector('button')

async function loadWeatherData(location){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
    const data = await fetch(url)

    const json = await data.json()
    return json
}

async function processData(promise){
    const response = await promise
    const address = response.address
    const temp = response.currentConditions.temp
    const description = response.description

    return {address, temp, description}

}

button.addEventListener('click', ()=>{
    const returned = processData(loadWeatherData('Ethiopia'))

    returned.then((data)=>{
        console.log(data)
    })

})

