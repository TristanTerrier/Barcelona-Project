import { Table } from './modules/Table.js'

const ProductsTable = new Table('http://localhost:3000', 'products')

ProductsTable.findAll().then((data) => {
    const productsContainer = document.querySelector('#products-container')
    data.forEach((product) => {
        productsContainer.innerHTML += `
        <a href="./product.html?id=${product.id}" class="product grid">
            <img src="./assets/img/${product.img}" alt="product image" />
            <div class="product-header">
                <h2>${product.name}</h2>
                <p>${product.price} €</p>
            </div>
            <p>${product.description}</p>
        </a>
        `
    })
})
