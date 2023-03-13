<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter'

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["login", 'callback']),
        loginUser() {
            this.login(this.user)
        },
        callbackGoogle(response){
            this.callback(response)
        }
    }
}
</script>

<template>
    <div style="max-width: 100vw;">
        <div class="col">
            <h2>Log In</h2>
            <form @submit.prevent="loginUser">
                <div class="mb-5 row" style="justify-content: center; margin-top: 30px;">
                    <label for="login-email" class="col-sm-1 col-form-label">Email</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="login-email" v-model="user.email">
                    </div>
                </div>
                <div class="mb-5 row" style="justify-content: center; margin-top: 30px;">
                    <label for="login-password" class="col-sm-1 col-form-label">Password</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="login-password" v-model="user.password">
                    </div>
                </div>
                <input class="btn btn-primary" type="submit" value="Log In">
            </form>
            <br>
            <h3>Or Sign In With Google Account</h3>
            <GoogleLogin :callback="callbackGoogle" />
        </div>
    </div>
</template>