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

function openCreate() {
    const { value: formValues } = Swal.fire({

        title: 'Crear Producto',
        width: "40%",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#9e7676",
        html:
            '<div class="row"> <div class="col"><img src="https://img.icons8.com/ios-glyphs/30/null/product.png"/><input id="swal-input1" placeholder="Nombre" class="swal2-input"></div> <div class="col"><img src="https://img.icons8.com/ios-filled/30/null/price-tag.png"/><input id="swal-input2" placeholder="Precio" class="swal2-input"></div></div>' +

            '<div class="row flex-nowrap"><div class="col"><br><br><img src="https://img.icons8.com/sf-black-filled/32/null/overview-pages-2.png"/><input id="swal-input3" placeholder="Descripción" class="swal2-input" ></div><div class="col"><br><br><img src="https://img.icons8.com/ios-filled/30/null/idea--v1.png"/><input id="swal-input4" placeholder="Cantidad" class="swal2-input"> </div></div>' +

            '<div class="row"><div class="col"><br><br><select class="form-select" aria-label="Categorias"><option selected>Categorias</option><option value="1">Refrigeradores</option><option value="2">Cocinas</option><option value="3">Lavadoras</option></select></div><div class="col"><br><br><select class="form-select" aria-label="Marcas"><option selected>Marcas</option><option value="1">Sony</option><option value="2">Samsung</option><option value="3">Edragas</option></select> </div></div>' +

            '<br><select class="form-select" aria-label="Estado"><option selected>Estado</option><option value="1">Existente</option><option value="2">Inexistente</option>',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Seleccionar Imagen del producto'
        },
        showconfirmButton: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value                
            ]
        }
    })

    if (formValues) {
        Swal.fire(JSON.stringify(formValues))
    }
}

function openUpdate() {
    const { value: formValues } = Swal.fire({

        title: 'Actualizar Producto',
        width: "40%",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#9e7676",
        html:
            '<div class="row"> <div class="col"><img src="https://img.icons8.com/ios-glyphs/30/null/product.png"/><input id="swal-input1" placeholder="Nombre" class="swal2-input"></div> <div class="col"><img src="https://img.icons8.com/ios-filled/30/null/price-tag.png"/><input id="swal-input2" placeholder="Precio" class="swal2-input"></div></div>' +

            '<div class="row flex-nowrap"><div class="col"><br><br><img src="https://img.icons8.com/sf-black-filled/32/null/overview-pages-2.png"/><input id="swal-input3" placeholder="Descripción" class="swal2-input" ></div><div class="col"><br><br><img src="https://img.icons8.com/ios-filled/30/null/idea--v1.png"/><input id="swal-input4" placeholder="Cantidad" class="swal2-input"> </div></div>' +

            '<div class="row"><div class="col"><select class="form-select" aria-label="Categorias"><option selected>Categorias</option><option value="1">Refrigeradores</option><option value="2">Cocinas</option><option value="3">Lavadoras</option></select></div><div class="col"><select class="form-select" aria-label="Marcas"><option selected>Marcas</option><option value="1">Sony</option><option value="2">Samsung</option><option value="3">Edragas</option></select> </div></div>' +

            '<br><select class="form-select" aria-label="Estado"><option selected>Estado</option><option value="1">Existente</option><option value="2">Inexistente</option>',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Seleccionar Imagen del producto'
        },
        showconfirmButton: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value                
            ]
        }
    })

    if (formValues) {
        Swal.fire(JSON.stringify(formValues))
    }
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
        title: 'Estas seguro de eliminar este Producto?',
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
                'El producto a sido eliminad',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'El producto no se a eliminado',
                'error'
            )
        }
    })
}
