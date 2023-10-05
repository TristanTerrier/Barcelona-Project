import { Table } from './modules/Table.js'
import { Cart } from './modules/Cart.js'

const ProductsTable = new Table('http://localhost:3000', 'products')

const myCart = new Cart()
myCart.saveCart()

var urlParams = new URLSearchParams(window.location.search)
var productId = urlParams.get('id')

ProductsTable.findOneBy('id', productId).then((product) => {
    const productsContainer = document.querySelector('#product-container')
    productsContainer.innerHTML += `
        <img src="./assets/img/${product.img}" alt="product image" />
        <div class="product-data grid">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <input type="number" id='quantity_product' class="btn" value="1"/>
            <button id='add_to_cart' class="btn">Add to cart</button>
        </div>
    `

    const addCartButton = productsContainer.querySelector('#add_to_cart')
    const quantityProduct = productsContainer.querySelector('#quantity_product')

    addCartButton.addEventListener('click', () => {
        myCart.addItem(productId, parseInt(quantityProduct.value, 10))
    })
})
