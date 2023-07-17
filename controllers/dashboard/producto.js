const btn_search = document.getElementById('btn-search')
const msj = document.getElementById('mensaje').value
const icon = document.getElementById('icon').value
const confirmation = document.getElementById('confirmation').value

document.addEventListener("DOMContentLoaded", function (event) {
    console.log(confirmation)
    if (confirmation == 'true') {
        Swal.fire({
            icon: icon,
            text: msj
        })
    }


});

btn_search.addEventListener('click', function () {
    let value = document.getElementById('search').value
    location.href = 'http://localhost:80/productos/' + value
})

const PRODUCT_STATUS = document.getElementById('StatusProducts');

new Chart(PRODUCT_STATUS, {
    type: 'bar',
    data: {
        labels: ['Activo', 'Inactivo'],
        datasets: [{
            label: 'Productos Activos e Inactivos',
            data: [document.getElementById('CT').value, document.getElementById('CF').value],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
