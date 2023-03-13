import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
const baseUrl = "http://localhost:3000"
// const baseUrl = "https://niix-brandedthings-production.up.railway.app"
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    isLogged: false,
    products: [],
    theProduct: {},
    mybookmarks: [],
    categories: [],
    currentSearch: '',
    page: 1,
    currentFilter: '',
    currentSort: '',
    totalProduct: 1
  }),
  getters: {
  },
  actions: {
    formatedDate(date) {
      return new Date(date).toLocaleString("en-ZA", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "-")
    },
    callback(response) {
      axios({
        method: "post",
        url: baseUrl + '/pub/google-sign-in',
        headers: {
          access_token_google: response.credential
        }
      })
        .then(result => {
          this.isLogged = true
          this.fetchProducts()
          this.fetchCategories()
          this.router.push('/')
          localStorage.setItem("access_token", result.data.access_token)
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: "I'm sorry, please use another google account because we cant create your username that already exist in our database. We will fix this issues ASAP.",
            text: `${err}`,
          })
          console.log(err)
        }
        )
    },
    async login(dataUser) {
      try {
        const data = await axios({
          method: 'post',
          url: `${baseUrl}/pub/login`,
          data: {
            email: dataUser.email,
            password: dataUser.password
          }
        })
        this.isLogged = true
        this.fetchProducts()
        this.fetchCategories()
        localStorage.setItem("access_token", data.data.access_token)
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
        })
        this.router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message
        })
        console.log(error)
      }
    },
    async register(newUser) {
      try {
        await axios({
          method: 'post',
          url: baseUrl + "/pub/register",
          data: {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            phoneNumber: newUser.phoneNumber,
            address: newUser.address,
            role: "Customer"
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Register successful',
        })
        this.router.push('/login')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`
        })
        console.log(error)
      }
    },
    async fetchProducts(number) {
      try {
        const products = await axios({
          method: "get",
          url: baseUrl + "/pub/products",
          headers: {
            access_token: localStorage.access_token
          },
          params: {
            filter: this.currentFilter,
            sort: this.currentSort,
            page: number,
            search: this.currentSearch
          }
        })
        this.products = products.data.products.rows
        this.totalProduct = products.data.products.count
      } catch (error) { console.log(error) }
    },
    async fetchCategories() {
      try {
        const categories = await axios({
          method: "get",
          url: baseUrl + "/pub/categories",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.categories = categories.data.categories
      } catch (error) { console.log(error) }
    },
    async findProduct(id) {
      try {
        const theProduct = await axios({
          method: "get",
          url: baseUrl + '/pub/products/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.theProduct = theProduct.data
      } catch (error) { console.log(error) }
    },
    async fetchMyBookmark() {
      try {
        const mybookmarks = await axios({
          method: "get",
          url: baseUrl + "/pub/mybookmark",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.mybookmarks = mybookmarks.data.bookmark
      } catch (error) { console.log(error) }
    },
    async bookmark(id) {
      try {
        const bookmarking = await axios({
          method: "post",
          url: baseUrl + `/pub/bookmark/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        if (bookmarking.status == 200) {
          Swal.fire({
            title: `${bookmarking.data.message}`,
            icon: 'info',
          })
        } else {
          Swal.fire({
            title: `${bookmarking.data.message}`,
            icon: 'success',
          })
        }
      } catch (error) {
        console.log(error) 
        Swal.fire({
          title: "Please Login First",
          icon: 'error'
        })
      }
    },
    async unBookmark(id) {
      try {
        const unbookmarking = await axios({
          method: "delete",
          url: baseUrl + `/pub/bookmark/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchMyBookmark()
        Swal.fire({
          title: "Successfully delete bookmark",
          icon: 'success',
        })
      } catch (error) { console.log(error) }
    },
    async logout() {
      localStorage.removeItem('access_token')
      this.isLogged = false
      this.router.push('/login')
      Swal.fire({
        icon: 'success',
        title: 'Logout successful',
      })
    }
  },
})
