const btn_search = document.getElementById('btn-search')

if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        alert('Nice, you triggered this alert message!', 'success')
    })
}

btn_search.addEventListener('click', function () {
    let value = document.getElementById('search').value
    location.href = 'http://localhost:80/categorias/' + value
})

function openCreate() {
    Swal.fire({
        title: "Agregar Categoria",
        input: "text",
        inputPlaceholder: "Categoria",
        showCancelButton: true,
        confirmButtonColor: "#9e7676"
    })
}

function openUpdate() {
    Swal.fire({
        title: "Actualizar Categoria",
        input: "text",
        inputPlaceholder: "Categoria",
        showCancelButton: true,
        confirmButtonColor: "#9e7676"
    })
}


function openDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de eliminar esta categoria?',
        text: "Sera eliminado para siempre!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si eliminar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = "/api/categories/delete?id=<%= data._id %>"
            swalWithBootstrapButtons.fire(
                'Elimnado!',
                'La categoria a sido eliminada',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'La categoria no se a eliminado',
                'error'
            )
        }
    })
}