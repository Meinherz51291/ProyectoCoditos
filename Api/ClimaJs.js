// Seleccionar elementos del DOM
const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

// Agregar evento de envío al formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Llamar a la API de clima
    callAPI(nameCity.value, nameCountry.value);
})

// Función para llamar a la API de clima
function callAPI(city, country){
    const apiId = '222081bc5417a8d431109df2988e915e';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    // Realizar la solicitud a la API utilizando fetch
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            // Verificar si se encontró la ciudad o si ocurrió un error
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

// Función para mostrar el clima en el DOM
function showWeather(data){
    // Extraer los datos necesarios del objeto de respuesta
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    // Convertir las temperaturas de Kelvin a Celsius
    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    // Crear elementos HTML dinámicamente para mostrar el clima
    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    // Agregar el contenido al DOM
    result.appendChild(content);
}

// Función para mostrar mensajes de error
function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    // Agregar el mensaje de error al formulario
    form.appendChild(alert);

    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Función para convertir Kelvin a Celsius
function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

// Función para limpiar el contenido del resultado en el DOM
function clearHTML(){
    result.innerHTML = '';
}



