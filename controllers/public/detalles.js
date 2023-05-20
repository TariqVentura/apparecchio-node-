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