export class Cart {
    constructor() {
        // Initialiser le panier avec un tableau vide
        this.articles = JSON.parse(localStorage.getItem('cart')) || []
    }

    sauvegarderPanier() {
        localStorage.setItem('cart', JSON.stringify(this.articles))
    }

    // Ajouter un produit au panier
    ajouterProduit(produit, quantite) {
        // Vérifier si le produit est déjà dans le panier
        const articleExistant = this.articles.find(
            (article) => article.produit.id === produit.id
        )

        if (articleExistant) {
            // Si le produit existe déjà, mettre à jour la quantité
            articleExistant.quantite += quantite
        } else {
            // Si le produit n'existe pas, l'ajouter au panier
            this.articles.push({ produit, quantite })
        }
        this.sauvegarderPanier()
    }

    // Supprimer un produit du panier
    supprimerProduit(produitId) {
        this.articles = this.articles.filter(
            (article) => article.produit.id !== produitId
        )
        this.sauvegarderPanier()
    }

    // Modifier la quantité d'un produit dans le panier
    modifierQuantite(produitId, nouvelleQuantite) {
        const article = this.articles.find(
            (article) => article.produit.id === produitId
        )

        if (article) {
            article.quantite = nouvelleQuantite
        }
        this.sauvegarderPanier()
    }

    // Obtenir le contenu complet du panier
    getContenuPanier() {
        return this.articles
    }

    // Calculer le total du panier
    calculerTotalPanier() {
        let total = 0

        this.articles.forEach((article) => {
            total += article.produit.prix * article.quantite
        })

        return total
    }
}
