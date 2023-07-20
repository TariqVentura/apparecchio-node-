const axios = require('axios/dist/browser/axios.cjs')


axios.get('http://localhost:80/api/products')
    .then(function (response) {
        console.log("Data received:", response);
    })
    .catch(err => {
        res.send(err)
    })

// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#myChart");
// Las etiquetas son las que van en el eje X. 
const etiquetas = ["enero", "febrero", "marzo", "abril"]
// Podemos tener varios conjuntos de datos. Comencemos con uno
const datosVentas2020 = {
    label: "Ventas por mes",
    data: [5000, 1500, 8000, 5102], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
new Chart($grafica, {
    type: 'line',// Tipo de gráfica
    data: {
        labels: etiquetas,
        datasets: [
            datosVentas2020,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});