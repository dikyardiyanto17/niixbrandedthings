<script>
import Sidebar from '../components/Sidebar.vue'
import Card from '../components/Card.vue'
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import VuejsPaginateNext from '../components/Paginate.vue'

export default {
    components: {
        Sidebar, Card, paginate: VuejsPaginateNext
    },
    computed: {
        ...mapState(useCounterStore, ['products', 'isLogged', 'totalProduct']),
        ...mapWritableState(useCounterStore, ['page', 'theProduct']),
        totalPage() {
            return Math.ceil(this.totalProduct / 9)
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchProducts']),
        clickCallback() {
            this.fetchProducts(this.page)
        }
    },
    created (){
        this.fetchProducts(1)
    }
}
</script>
<template>
    <div class="d-flex col">
        <Sidebar />
        <div class="col-9">
            <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5">
                <div class="flex justify-between">
                    <h1 class="font-bold text-3xl mb-3">Products</h1>
                </div>
                <div class="container-fluid d-flex d-flex flex-wrap justify-content-center">
                    <Card v-for="product in products" :key="product.id" :product="product" />
                </div>
                <div style="text-align: center; margin: 100px auto;" v-if="totalProduct == 0">
                    <h1>The Product You're Looking is Not Found</h1>
                </div>
                <paginate v-if="totalProduct != 0" v-model="page" :page-count="totalPage" :margin-pages="2" :page-range="5"
                    :first-last-button="true" :click-handler="clickCallback">
                </paginate>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }
  .page-item {
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }
</style>