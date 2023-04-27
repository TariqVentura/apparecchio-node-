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
btn_search.addEventListener('click', function(){
    let value = document.getElementById('search').value
    location.href = 'http://localhost:80/usuarios/' + value
})