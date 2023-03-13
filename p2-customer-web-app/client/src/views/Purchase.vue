<script>
import Card from "../components/Card.vue"
import { mapActions, mapState, mapWritableState } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
    components: {
        Card
    },
    computed: {
        ...mapState(useCounterStore, ['theProduct']),
        ...mapWritableState(useCounterStore, ['theProduct'])
    },
    methods: {
        ...mapActions(useCounterStore, ['findProduct', 'formatedDate'])
    },
    created(){
        this.findProduct(this.$route.params.id)
    },
    beforeUnmount(){
        this.theProduct = {}
    }
}
</script>
<template>
    <div v-if="theProduct" class="d-flex col">
        <div class="col-3">
            <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5">
                <div class="flex justify-between">
                    <h2 class="font-bold text-3xl mb-3">{{theProduct.product?.name}}</h2>
                    <img :src=theProduct?.product?.imgUrl alt="" srcset="" style="width: 220px;">
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5 ">
                <div class="flex justify-between">
                    <h2 class="font-bold text-3xl mb-3">Detail</h2>
                </div>
                <p class="text-white text-justify">Name                 : {{theProduct.product?.name}}</p>
                <p class="text-white text-justify">Description          : {{theProduct.product?.description}}</p>
                <p class="text-white text-justify">Price                : {{theProduct.product?.price}}</p>
                <p class="text-white text-justify">Stock                : {{theProduct.product?.stock}}</p>
                <p class="text-white text-justify">Category             : {{theProduct.product?.Category?.name}}</p>
                <p class="text-white text-justify">Seller               : {{theProduct.product?.User?.username}}</p>
                <p class="text-white text-justify">Created At           : {{formatedDate(theProduct.product?.createdAt)}}</p>
                <p class="text-white text-justify">Updated At           : {{formatedDate(theProduct.product?.updatedAt)}}</p>
            </div>
        </div>
        <div class="col-3">
            <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5">
                <div class="flex justify-between">
                    <h2 class="font-bold text-3xl mb-3">Barcode</h2>
                </div>
                <img :src=theProduct.qrCode alt="" srcset="" style="width: 200px">
            </div>
        </div>
    </div>
</template>