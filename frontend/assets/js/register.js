import { Table } from './modules/Table.js'

const form = document.querySelector('form')
const UsersTable = new Table('http://localhost:3000', 'users')

if (sessionStorage.getItem('user')) {
    window.location.href = '/frontend/cart.html'
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputEmail = form.querySelector('input[type=email]')
    const inputPass = form.querySelector('input[type=password]')
    var pass = true

    if (inputEmail.value == '') {
        pass = false
        const error = inputEmail.parentNode.querySelector('ul')
        error.innerHTML = ''
        error.innerHTML += '<li>Veuillez remplir le champs</li>'
        error.style.display = 'block'
    }

    if (inputPass.value == '') {
        pass = false
        const error = inputPass.parentNode.querySelector('ul')
        error.innerHTML = ''
        error.innerHTML += '<li>Veuillez remplir le champs</li>'
        error.style.display = 'block'
    }

    if (pass == true) {
        UsersTable.findOneBy('email', inputEmail.value).then((data) => {
            const errorContainer = document.querySelector('#error-container')
            if (data) {
                errorContainer.innerHTML =
                    '<div class="danger">Account already exists</div>'
                errorContainer.style.display = 'block'
            } else {
                UsersTable.add({
                    email: inputEmail.value,
                    password: inputPass.value,
                }).then((data) => {
                    sessionStorage.setItem('user', data.id)
                    var urlParams = new URLSearchParams(window.location.search)
                    var cart = urlParams.get('cart')
                    window.location.href = cart
                        ? '/frontend/shipping.html'
                        : '/frontend/cart.html'
                })
            }
        })
    }
})
