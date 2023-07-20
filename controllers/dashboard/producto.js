const btn_search = document.getElementById('btn-search')
const msj = document.getElementById('mensaje').value
const icon = document.getElementById('icon').value
const confirmation = document.getElementById('confirmation').value
let inputs = document.getElementsByClassName('categorieProduct')
let inputsCategorieCount = document.getElementsByClassName('categorieProductCount')
let inputsDataCategorie = []
let inputsDataCategorieCount = []

document.addEventListener("DOMContentLoaded", function (event) {
    if (confirmation == 'true') {
        Swal.fire({
            icon: icon,
            text: msj
        })
    }

    for (let i = 0; i < inputs.length; i++) {
        let valor = inputs[i].value
        inputsDataCategorie.push(valor)
    }

    for (let i = 0; i < inputsCategorieCount.length; i++) {
        let valor = inputsCategorieCount[i].value
        inputsDataCategorieCount.push(valor)
    }

    const PRODUCT_CATEGORIE = document.getElementById('categorieProducts');
    console.log(inputsDataCategorie)
    new Chart(PRODUCT_CATEGORIE, {
        type: 'pie',
        data: {
            labels: inputsDataCategorie,
            datasets: [{
                label: 'Productos Activos e Inactivos',
                data: inputsDataCategorieCount,
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