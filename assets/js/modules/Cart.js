export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || []
        this.cart_icon = document.querySelector('.cart-icon > .number_in_cart')
    }

    addItem(productId, quantity) {
        const existingItemIndex = this.items.findIndex(
            (item) => item.id === productId
        )

        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += quantity
        } else {
            this.items.push({ id: productId, quantity })
        }

        this.saveCart()
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex((item) => item.id === productId)
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1)
            this.saveCart()
        }
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(
            (item) => item.product && item.product.id === productId
        )

        if (item) {
            item.quantity = newQuantity
            this.saveCart()
        }
    }

    getItems() {
        this.saveCart()
        return this.items
    }

    getLenCart() {
        var n = 0
        this.items.forEach((item) => {
            n += item.quantity
        })
        return n
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items))
        this.cart_icon.innerHTML = this.getLenCart()
    }

    clearCart() {
        this.items = []
        this.saveCart()
    }
}
