import { Cart } from './modules/Cart.js'

const myCart = new Cart()
const number_in_cart = myCart.setNumber()
const productsContainer = document.querySelector('#cart-container')

const cartElt = document.querySelector('#cart')
const cartItems = myCart.getItems()

if (number_in_cart > 0) {
    const maxMin = (quantity) => {
        if (quantity.value <= 0) {
            quantity.value = 1
        }
    }

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
                        <input type="number" value="${
                            cart.quantity
                        }" class='quantity_product-cart btn' data-id="${
            cart.product.id
        }"/>
                        <p class='total_prdt'>Total : ${
                            cart.product.price * cart.quantity
                        } €</p>
                    </div>
                    <button class="remove_from_cart btn" data-id="${
                        cart.product.id
                    }">Delete</button>
                </div>
                `
    })

    cartElt.innerHTML += `            
    <div class="checkout-container grid">
        <h1>Order summary</h1>
        <p class="number_of_item">Number of item : ${number_in_cart}</p>
        <p class="total">Total : ${myCart.getTotal()} €</p>
        <a href='./shipping.html' id="checkout" class="btn">Checkout</a>
    </div>`

    const removeProductButtons = document.querySelectorAll('.remove_from_cart')
    removeProductButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            myCart.removeItem(btn.dataset.id)
            btn.parentElement.remove()
            myCart.setCheckout()
            myCart.setNumber()
            if (myCart.setNumber() == 0) {
                cartElt.innerHTML = '<h1>No product in cart</h1>'
            }
        })
    })

    const quantitysProduct = document.querySelectorAll('.quantity_product-cart')

    quantitysProduct.forEach((input) => {
        const total_product = input.parentNode.querySelector('.total_prdt')
        input.addEventListener('input', () => {
            maxMin(input)
            const product = myCart.changeQuantity(
                input.dataset.id,
                parseInt(input.value, 10)
            )
            total_product.innerHTML = `Total : ${
                product.product.price * product.quantity
            } €`
            myCart.setCheckout()
        })
    })
} else {
    cartElt.innerHTML = '<h1>No product in cart</h1>'
}
