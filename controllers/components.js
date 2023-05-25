var nav = document.getElementById('menu')
var check = document.getElementById('invalidCheck')
var loginbutton = document.getElementById('loginbutton')
var overlay = document.querySelector('.overlay')
var closelogin = document.getElementById('close-login')
let btn_buscar = document.getElementById('btn-buscar')


btn_buscar.addEventListener('click', function () {
    let value = document.getElementById('buscador').value
    location.href = 'http://localhost:3000/productos/' + value
})

window.onscroll = function () {
    var y = window.scrollY
    if (y != 0) {
        nav.classList.add('active')
    }
    else {
        nav.classList.remove('active')
    }
}

loginbutton.addEventListener('click', function () {
    overlay.classList.add('active')
})

closelogin.addEventListener('click', function () {
    overlay.classList.remove('active')
})

function confirmacion() {
    Swal.fire({
        icon: 'success',
        text: 'Compra realizada exitosamente',
        footer: '<a href="/productos">Seguir comprando?</a>',
        background: '#fff8eb',
        color: '#584342',
        button: '#fff8eb'
    })
}

function addcart() {
    Swal.fire({
        icon: 'success',
        text: 'Producto añadido exitosamente',
        footer: '<a href="/carrito">Ver mis pedidos</a>',
        background: '#fff8eb'
    })
}
