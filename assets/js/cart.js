import { Table } from './modules/Table.js'
import { Cart } from './modules/Cart.js'

const ProductsTable = new Table('http://localhost:3000', 'products')
const myCart = new Cart()

const productsContainer = document.querySelector('#cart-container')
const numberOfItems = document.querySelector('.number_of_item')
const totalElt = document.querySelector('.total')
numberOfItems.innerHTML += myCart.getLenCart()

let total = 0
myCart.getItems().forEach((cart) => {
    ProductsTable.findOneBy('id', cart.id).then((product) => {
        productsContainer.innerHTML += `
            <div href="./product.html?id=${product.id}" class="product">
                <img src="./assets/img/${product.img}" alt="product image" />
                <h2>${product.name}</h2>
                <p>${product.price}</p>
                <p>${cart.quantity}</p>
                <button class="remove_from_cart btn" data-product="${product.id}">Delete</button>
            </div>
            `
        const removeProductButtons =
            productsContainer.querySelectorAll('.remove_from_cart')

        removeProductButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                myCart.removeItem(btn.dataset.product)
                btn.parentNode.innerHTML = ''
                numberOfItems.innerHTML =
                    'Number of item : ' + myCart.getLenCart()
                totalElt.innerHTML = cart.quantity * product.price
            })
        })

        total += cart.quantity * product.price
        totalElt.innerHTML += total
    })
})

const checkoutBtn = document.querySelector('#checkout')

checkoutBtn.addEventListener('click', () => {
    myCart.clearCart()
    productsContainer.innerHTML = ''
    numberOfItems.innerHTML = 'Number of item : ' + myCart.getLenCart()
})
