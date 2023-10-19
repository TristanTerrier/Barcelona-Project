import { Table } from './modules/Table.js'

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
                // regarde si password correspond
                if (data.pass == inputPass.value) {
                    sessionStorage.setItem('user', data.id)
                }
            } else {
                errorContainer.innerHTML =
                    '<div class="danger">Account not find</div>'
                errorContainer.style.display = 'block'
            }
        })
    }
})
