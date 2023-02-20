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

function confirmacion() {
    Swal.fire({
        icon: 'success',
        text: 'Compra realizada exitosamente',
        footer: '<a href="file:///D:/web/productos.html">Seguir comprando?</a>',
        background: '#fff8eb',
        color: '#584342',
        button: '#fff8eb'
    })
}

function addcart() {
    Swal.fire({
        icon: 'success',
        text: 'Producto añadido exitosamente',
        footer: '<a href="file:///D:/web/carrito.html">Ver mis pedidos</a>',
        background: '#fff8eb'
    })
}

function login() {
    Swal.fire({
        title: 'L O G I N',
        html:
            '<label for="exampleInputEmail1" class="form-label">Email address</label>' +
            '<input type="email" class="form-control text-light my-3" id="exampleInputEmail1" aria-describedby="emailHelp">' +
            '<label for="exampleInputPassword1" class="form-label">Password</label>' +
            '<input type="password" class="form-control text-light" id="exampleInputPassword1">',
        confirmButtonText: 'Ingresar',
        confirmButtonColor: '#584342',
        footer: '<a href="file:///D:/web/cuenta.html">crear una cuenta</a>'
    })
}