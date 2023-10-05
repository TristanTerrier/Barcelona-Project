import { Cart } from './modules/Cart.js'

const myCart = new Cart()
const number_in_cart = myCart.setNumber()
const productsContainer = document.querySelector('#cart-container')

const cartElt = document.querySelector('#cart')
const cartItems = myCart.getItems()

if (number_in_cart > 0) {
    cartItems.forEach((cart) => {
        productsContainer.innerHTML += `
                <div class="product-cart grid">
                    <img src="./assets/img/${
                        cart.product.img
                    }" alt="product image" />
                    <div class="product-cart-header">
                        <h2>${cart.product.name}</h2>
                        <p>${cart.product.price} €</p>
                    </div>
                    <div class="product-total">
                        <p>Quantity : ${cart.quantity}</p>
                        <p>Total : ${cart.product.price * cart.quantity} €</p>
                    </div>
                    <button class="remove_from_cart btn" >Delete</button>
                </div>
                `
    })

    cartElt.innerHTML += `            
    <div class="checkout-container grid">
        <h1>Order summary</h1>
        <p class="number_of_item">Number of item : ${number_in_cart}</p>
        <p class="total">Total : ${myCart.getTotal()}</p>
        <button id="checkout" class="btn">Checkout</button>
    </div>`

    const checkoutBtn = document.querySelector('#checkout')
    checkoutBtn.addEventListener('click', () => {
        myCart.clearCart()
        cartElt.innerHTML = '<h1>Aucun produit dans le panier</h1>'
    })

    const removeProductButtons = document.querySelectorAll('.remove_from_cart')
    removeProductButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            myCart.removeItem(cartItems[i])
            btn.parentElement.remove()
            myCart.setCheckout()
            if (myCart.setNumber() == 0) {
                cartElt.innerHTML = '<h1>Aucun produit dans le panier</h1>'
            }
        })
    })
} else {
    cartElt.innerHTML = '<h1>Aucun produit dans le panier</h1>'
}
