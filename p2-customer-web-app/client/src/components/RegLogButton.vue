<script>
import { useCounterStore } from '../stores/counter';
import { mapWritableState, mapActions } from 'pinia';

export default {
    computed: {
        ...mapWritableState(useCounterStore, ['isLogged'])
    },
    methods: {
        ...mapActions(useCounterStore, ['logout'])
    },
    created(){

    }
}
</script>

<template>
    <div class="btn-group btn-group-toggle " data-toggle="buttons" style="text-align: center;">
        <label v-if="isLogged == false" class="btn btn-secondary">
            Register
            <input @click="$router.push('/register')" type="radio" name="options" id="option1" autocomplete="off" style="opacity: 0; width: 20px;">
        </label>
        <label v-if="isLogged == false" class="btn btn-secondary">
            <input @click="$router.push('/login')" type="radio" name="options" id="option2" autocomplete="off" style="opacity: 0; width: 20px;">Login
        </label>
        <label v-if="isLogged == true" class="btn btn-secondary">
            <input @click="$router.push('/favorite')" type="radio" name="options" id="option2" autocomplete="off" style="opacity: 0; width: auto;">
            Favorite
        </label>
        <label v-if="isLogged == true" class="btn btn-secondary">
            <input @click="logout" type="radio" name="options" id="option2" autocomplete="off" style="opacity: 0; width: auto;">
            Log Out
        </label>
    </div>
</template>