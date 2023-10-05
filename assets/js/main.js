import { Cart } from './modules/Cart.js'
const myCart = new Cart()

const total = myCart.getLenCart()

const cart_icon = document.querySelector('.cart-icon > .number_in_cart')

cart_icon.innerHTML = total
