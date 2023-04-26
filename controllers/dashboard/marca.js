const btn_search = document.getElementById('btn-search')

btn_search.addEventListener('click', function(){
    let value = document.getElementById('search').value
    location.href = 'http://localhost:80/marcas/' + value
})

function openCreate() {
    Swal.fire({
        title: "Agregar Marca",
        input: "text",
        inputPlaceholder: "Marca",
        showCancelButton: true,
        confirmButtonColor: "#9e7676"
    })
}

function openUpdate() {
    Swal.fire({
        title: "Actualizar Marca",
        input: "text",
        inputPlaceholder: "Marca",
        showCancelButton: true,
        confirmButtonColor: "#9e7676"
    })
}


function openDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de eliminar la marca?',
        text: "Sera eliminado para siempre!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si eliminar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Elimnado!',
                'La marca a sido eliminada',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'La marca no se a eliminado',
                'error'
            )
        }
    })
}


