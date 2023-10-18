import { Cart } from './modules/Cart.js'
import { Table } from './modules/Table.js'

const myCart = new Cart()
myCart.setNumber()

const form = document.querySelector('form')
const UsersTable = new Table('http://localhost:3000', 'users')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputEmail = form.querySelector('input[type=email]')
    const inputPass = form.querySelector('input[type=password]')
    var pass = true

    if (inputEmail.value == '') {
        pass = false
        console.log('email')
    }

    if (inputPass.value == '') {
        pass = false
        console.log('pass')
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
                })
                window.location.href = '/frontend/cart.html'
            }
        })
    }
})
