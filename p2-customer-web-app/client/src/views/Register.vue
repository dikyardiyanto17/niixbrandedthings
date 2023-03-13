<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data(){
        return{
            newUser: {
                email: '',
                password: '',
                username: '',
                phoneNumber: '',
                address: ''
            }
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['register']),
        registerNewUser(){
            this.register(this.newUser)
        }
    }
}
</script>

<template>
    <div class="row" style="margin-top: 30px; margin-bottom: 30px;">
        <div class="col">
            <h2>Register</h2>
            <form @submit.prevent="registerNewUser">
                <div class="mb-5 row" style="justify-content: center; margin-top: 30px;">
                    <label for="register-username" class="col-sm-1 col-form-label">Username</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="register-username" v-model="newUser.username">
                    </div>
                </div>
                <div class="mb-5 row" style="justify-content: center;">
                    <label for="register-email" class="col-sm-1 col-form-label">Email</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="register-email" v-model="newUser.email">
                    </div>
                </div>
                <div class="mb-5 row" style="justify-content: center;">
                    <label for="register-password" class="col-sm-1 col-form-label">Password</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="register-password" v-model="newUser.password">
                    </div>
                </div>
                <div class="mb-5 row" style="justify-content: center;">
                    <label for="register-phone" class="col-sm-1 col-form-label">PhoneNumber</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="register-phone" v-model="newUser.phoneNumber">
                    </div>
                </div>
                <div class="mb-5 row" style="justify-content: center;">
                    <label for="register-address" class="col-sm-1 col-form-label">Address</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="register-address" v-model="newUser.address">
                    </div>
                </div>
                <input class="btn btn-primary" type="submit" value="Register">
            </form>
        </div>
    </div>

</template>