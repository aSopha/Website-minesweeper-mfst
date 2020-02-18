let update = document.getElementById('update');

update.addEventListener('click', function() {
    fetch('scores', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Darth Vader',
            'score': '9000!'
        })
    })
    window.location.reload();
})
