var nav = document.getElementById('menu')
var check = document.getElementById('invalidCheck')
var loginbutton = document.getElementById('loginbutton')
var overlay = document.querySelector('.overlay');

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
    console.log(loginbutton)
    overlay.classList.add('active')
})

function confirmacion() {
    Swal.fire({
        icon: 'success',
        text: 'Compra realizada exitosamente',
        footer: '<a href="../../views/public/productos.html">Seguir comprando?</a>',
        background: '#fff8eb',
        color: '#584342',
        button: '#fff8eb'
    })
}

function addcart() {
    Swal.fire({
        icon: 'success',
        text: 'Producto añadido exitosamente',
        footer: '<a href="../../views/public/carrito.html">Ver mis pedidos</a>',
        background: '#fff8eb'
    })
}
