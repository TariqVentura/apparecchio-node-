const btn_search = document.getElementById('btn-search')
const msj = document.getElementById('mensaje').value
const icon = document.getElementById('icon').value

const confirmation = document.getElementById('confirmation').value

let inputs = document.getElementsByClassName('categorieProduct')
let inputsCategorieCount = document.getElementsByClassName('categorieProductCount')
let inputsDataCategorie = []
let inputsDataCategorieCount = []

let inputsName = document.getElementsByClassName('nameProduct')
let inputsReview = document.getElementsByClassName('reviewProduct')
let dataName = []
let dataReview = []

document.addEventListener("DOMContentLoaded", function (event) {
    if (confirmation == 'true') {
        Swal.fire({
            icon: icon,
            text: msj
        })
    }
    categorieCount()
    productReview()
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
            label: 'Productos por Estado',
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

function categorieCount() {
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
}

function productReview() {
    for (let i = 0; i < inputsName.length; i++) {
        let valor = inputsName[i].value
        dataName.push(valor)
    }

    for (let i = 0; i < inputsReview.length; i++) {
        let valor = inputsReview[i].value
        dataReview.push(valor)
    }

    const PRODUCT_REVIEW = document.getElementById('reviewProducts');
    new Chart(PRODUCT_REVIEW, {
        type: 'line',
        data: {
            labels: dataName,
            datasets: [{
                label: 'Calificacion promedio de producto',
                data: dataReview,
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
}