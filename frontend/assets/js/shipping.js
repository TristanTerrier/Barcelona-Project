const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputs = form.querySelectorAll('input')
    var pass = true

    inputs.forEach((input) => {
        const error = input.parentNode.querySelector('ul')
        error.innerHTML = ''
        if (input.value == '') {
            pass = false
            error.innerHTML += '<li>Veuillez remplir le champs</li>'
            error.style.display = 'block'
        }
    })

    if (pass == true) {
        window.location.href = '/frontend/payment.html'
    }
})
