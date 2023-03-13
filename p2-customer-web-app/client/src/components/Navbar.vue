<script>
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import RegLogButton from './RegLogButton.vue'

export default {
    components: {
        RegLogButton,
    },
    computed: {
        ...mapWritableState(useCounterStore, ['currentFilter', 'currentSearch', 'currentSort'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchProducts']),
        clickHome() {
            this.currentFilter = ''
            this.currentSearch = ''
            this.currentSort = ''
            this.fetchProducts(1)
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg" style="color: black; background-color: white;">
        <div class="container-fluid">
            <img @click="clickHome"
                src="https://png.pngtree.com/png-clipart/20210314/original/pngtree-letter-x-logo-png-png-image_6100848.jpg"
                style="width: 30px; cursor: pointer;">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a @click="clickHome" class="nav-link" style="cursor: pointer;">Niix-Brand</a>
                    <a @click="clickHome" class="nav-link" style="cursor: pointer;">Home</a>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <RegLogButton />
            </div>
        </div>
    </nav>
</template>