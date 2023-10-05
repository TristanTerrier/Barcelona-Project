export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || []
        this.cart_icon = document.querySelector('.cart-icon > .number_in_cart')
        console.log(this.items)
    }

    addItem(product, quantity) {
        const item = this.items.find(
            (item) => item.product && item.product.id === product.id
        )
        if (item) {
            item.quantity += quantity
        } else {
            this.items.push({ product, quantity })
        }
        this.saveCart()
    }

    removeItem(product) {
        const item = this.items.find((item, i) => {
            item.product && item.product.id === product.id
            return i
        })
        if (item !== -1) {
            this.items.splice(item, 1)
            this.saveCart()
        }
    }

    getItems() {
        this.saveCart()
        return this.items
    }

    getLenItems() {
        var n = 0
        this.items.forEach((item) => {
            n += item.quantity
        })
        return n
    }

    setNumber() {
        var n = this.getLenItems()
        this.cart_icon.innerHTML = n
        return n
    }

    getTotal() {
        var n = 0
        this.items.forEach((item) => {
            n += item.product.price * item.quantity
        })
        return n
    }

    setCheckout() {
        const numberOfItems = document.querySelector('.number_of_item')
        const totalElt = document.querySelector('.total')
        numberOfItems.innerHTML = 'Number of item : ' + this.getLenItems()
        totalElt.innerHTML = 'Total : ' + this.getTotal()
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items))
        this.setNumber()
    }

    clearCart() {
        this.items = []
        this.saveCart()
    }
}
