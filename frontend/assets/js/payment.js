const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputs = form.querySelectorAll('input')
    var pass = true

    inputs.forEach((input) => {
        const error = input.parentNode.querySelector('ul')
        error.innerHTML = ''
        if (input.value == '') {
            pass = false
            error.innerHTML += '<li>Veuillez remplir le champs</li>'
        }
    })

    if (pass == true) {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
})
