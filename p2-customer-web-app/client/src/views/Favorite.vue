<script>
import Card from '../components/Card.vue'
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
    components: {
        Card
    },
    computed: {
        ...mapState(useCounterStore, ['mybookmarks'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchMyBookmark'])
    },
    created(){
        this.fetchMyBookmark()
    }
}
</script>
<template>
    <div class="d-flex col">
        <div class="col-12">
            <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5">
                <div class="flex justify-between">
                    <h1 class="font-bold text-3xl mb-3">Favorite</h1>
                </div>
                <div class="container-fluid d-flex d-flex flex-wrap justify-content-center">
                    <Card v-for="mybookmark in mybookmarks" :key="mybookmark.id" :mybookmark="mybookmark"/>
                </div>
            </div>
        </div>
    </div>
</template>