<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data() {
        return {
            name: this.product?.name || this.mybookmark?.Product?.name,
            description: this.product?.description || this.mybookmark?.Product?.description,
            imgUrl: this.product?.imgUrl || this.mybookmark?.Product?.imgUrl,
            id: this.product?.id || this.mybookmark?.Product?.id,
            price: this.product?.price || this.mybookmark?.Product?.price
        }
    },
    props: ["product", "mybookmark"],
    methods: {
        ...mapActions(useCounterStore, ['bookmark', 'unBookmark']),
        getPrice(price) {
            return `Rp. ${price}`
        }
    },
    created() {

    }
}
</script>
<template>
    <div v-if="!mybookmark" class="card col-3" style="margin: 20px; color: black;">
        <img :src=imgUrl class="card-img-top" src="" alt="" style="object-fit: cover; height: 40vh;">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">{{ getPrice(price) }}</p>
        <div class="card-body" style="margin-bottom: 0px; display: flex;">
            <div style="align-self: flex-end;">
                <a @click="$router.push(`/products/${id}`)" class="btn btn-primary" style="margin: 5px;">Detail</a>
                <a @click="bookmark(id)" class="btn btn-primary" style="margin: 5px;">Add-Bookmark</a>
            </div>
        </div>
    </div>
    <div v-else="" class="card col-2" style="margin: 20px; color: black;">
        <img :src=imgUrl class="card-img-top" src="" alt="" style="object-fit: cover; height: 40vh;">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">{{ getPrice(price) }}</p>
        <div class="card-body" style="margin-bottom: 0px; display: flex;">
            <div style="align-self: flex-end;">
                <a @click="$router.push(`/products/${id}`)" class="btn btn-primary" style="margin: 5px;">Detail</a>
                <a @click="unBookmark(id)" class="btn btn-primary" style="margin: 5px;">Delete-Bookmark</a>
            </div>
        </div>
    </div>
</template>