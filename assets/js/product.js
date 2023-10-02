import { Table } from './modules/Table.js'

const ProductsTable = new Table('http://localhost:3000', 'products')

ProductsTable.findAll().then((data) => {
    const productsContainer = document.querySelector('.products-container')
    data.forEach((product) => {
        productsContainer.innerHTML += `
        <div class="product">
            <img src="./assets/img/${product.img}" alt="product image" />
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
        </div>
        `
    })
})
