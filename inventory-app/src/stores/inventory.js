import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  getters: {
    totalValue: state => state.products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    productCount: state => state.products.length
  },
  actions: {
    fetchProducts() {
      this.loading = true
      setTimeout(() => {
        const stored = localStorage.getItem('products')
        this.products = stored ? JSON.parse(stored) : []
        this.loading = false
      }, 500)
    },
    addProduct(product) {
      this.products.push({ ...product, id: Date.now() })
      this.saveProducts()
    },
    updateProduct(id, product) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products[index] = { ...product, id }
        this.saveProducts()
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
      this.saveProducts()
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products))
    }
  }
})