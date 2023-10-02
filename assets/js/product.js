import { Table } from './modules/Table.js'
import { Cart } from './modules/Cart.js'

const ProductsTable = new Table('http://localhost:3000', 'products')
const myCart = new Cart()

var urlParams = new URLSearchParams(window.location.search)
var productId = urlParams.get('id')

ProductsTable.findOneBy('id', productId).then((data) => {
    const productsContainer = document.querySelector('#product-container')
    const product = data[0]
    productsContainer.innerHTML += `
        <img src="./assets/img/${product.img}" alt="product image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <input type="number" id='quantity_product'/>
        <button id='add_to_cart'>Add to cart</button>
        `

    const addCartButton = document.querySelector('#add_to_cart')
    const quantityProduct = document.querySelector('#quantity_product')

    addCartButton.addEventListener('click', () => {
        myCart.ajouterProduit(productId, parseInt(quantityProduct.value, 10))
        console.log(myCart.getContenuPanier())
    })
})

// monPanier.ajouterProduit(produit2, 3)

// // Modifier la quantité d'un produit dans le panier
// monPanier.modifierQuantite(produit1.id, 5)

// // Supprimer un produit du panier
// monPanier.supprimerProduit(produit2.id)

// // Obtenir le contenu du panier
// const contenuPanier = monPanier.getContenuPanier()

// // Calculer le total du panier
// const totalPanier = monPanier.calculerTotalPanier()
