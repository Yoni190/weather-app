const apiKey = "9KRBVXZCNGBUSEQLWL2SA9HTW"
const button = document.querySelector('button')
const form = document.querySelector('form');


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
    const location = document.querySelector('#location')
    if(location.value == ''){
        location.setCustomValidity("Enter a location")
        form.reportValidity()
    } else {
        const returned = processData(loadWeatherData(location.value))

        const labels = document.querySelectorAll('h2')
        let index = 1

        if(form.contains(document.querySelector('.info'))){
            const infos = document.querySelectorAll('.info')
            infos.forEach((info)=>{
                form.removeChild(info)
            })
        }

        returned.then((data)=>{
            ["address", "temp", "description"].forEach((key)=>{
                const p = document.createElement('p')
                p.className = 'info'
                
                p.innerHTML = data[key]
                form.insertBefore(p, labels[index])
                labels[index].removeAttribute('hidden')
                index++
            })
            labels[0].removeAttribute('hidden')
        })
    }
})





