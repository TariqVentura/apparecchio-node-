const btn_search = document.getElementById('btn-search')

btn_search.addEventListener('click', function () {
    let value = document.getElementById('search').value
    location.href = 'http://localhost:80/clientes/' + value
})
