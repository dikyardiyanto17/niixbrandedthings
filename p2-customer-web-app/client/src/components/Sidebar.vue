<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import OptionCategories from './OptionCategories.vue'
export default {
    components: {
        OptionCategories
    },
    computed: {
        ...mapState(useCounterStore, ['categories']),
        ...mapWritableState(useCounterStore, ['currentSearch', 'currentFilter']),
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchProducts'])
    }
}
</script>

<template>
    <div class="col-3">
        <div class="border border-slate-800 bg-slate-900/70 mt-3 p-5">
            <div class="flex justify-between">
                <h2 class="font-bold text-3xl mb-3">Search</h2>
            </div>
            <form @submit.prevent="fetchProducts(1)">
                <div class="mb-5 row" style="justify-content: center; margin-top: 30px;">
                    <div>
                        <input type="text" class="form-control" placeholder="Search by product name" v-model="currentSearch">
                    </div>
                </div>
                <div class="mb-5 row">
                    <label for="form-select" class="col-sm-3 col-form-label">Category</label>
                    <select v-model="currentFilter" class="form-select" style="flex-wrap: nowrap;" aria-label="Default select example">
                        <option disabled selected value="">Open this select menu</option>
                        <OptionCategories v-for="(category, index) in categories" :key=category.id :category="category"
                            :index="index" />
                    </select>
                </div>
                <input class="btn btn-primary" type="submit" value="Search">
            </form>
        </div>
    </div>
</template>