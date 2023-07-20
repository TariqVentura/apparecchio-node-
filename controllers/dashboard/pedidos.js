const btn_search = document.getElementById('btn-search')
let inputs = document.getElementsByClassName('statusOrder')
let inputsOrderCount = document.getElementsByClassName('statusOrderCount')
let inputsDataOrder = []
let inputsDataOrderCount = []
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
    for (let i = 0; i < inputs.length; i++) {
        let valor = inputs[i].value
        inputsDataOrder.push(valor)
    }

    for (let i = 0; i < inputsOrderCount.length; i++) {
        let valor = inputsOrderCount[i].value
        inputsDataOrderCount.push(valor)
    }

    const ORDER = document.getElementById('statusOrder');
    console.log(inputsDataOrder)
    new Chart(ORDER, {
        type: 'pie',
        data: {
            labels: inputsDataOrder,
            datasets: [{
                label: 'Productos Activos e Inactivos',
                data: inputsDataOrderCount,
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
    location.href = 'http://localhost:80/pedidos/' + value
})

