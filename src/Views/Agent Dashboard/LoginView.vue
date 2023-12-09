<template>
    <div class="login-page min-vh-100 d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="login-box p-4 rounded-1 bg-white mx-auto">
                <h1 class="position-relative text-center text-uppercase">{{$t('agentLogin.head')}}</h1>
                <router-link :to="`/${$i18n.locale}`"
                    class="home-butn rounded-pill p-2 border-0 d-flex align-items-center mx-auto mt-4 gap-2 fw-semibold"
                    title="Home">
                    <i class="fa-solid fa-house p-2 rounded-circle text-light"></i>
                </router-link>
                <form class="d-flex flex-column gap-3 mt-4">
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{$t('agentLogin.email')}}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.email.$error ? 'error' : ''}`" type="text"
                            v-model="user.email">
                        <span v-if="validation.email.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.email.$errors[0].$validator === 'required' ? 'Field Required' : 'Invalid Email' }}
                        </span>
                    </label>
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{$t('agentLogin.password')}}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.password.$error ? 'error' : ''}`"
                            type="password" v-model="user.password">
                        <span v-if="validation.password.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.password.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                        </span>
                    </label>
                    <span class="text-danger d-block text-center fw-semibold" v-if="userNotFound">User Not Found</span>
                    <button class="butn p-2 px-3 rounded-1 mt-4 text-uppercase" @click.prevent="submission">{{$t('buttons.login')}}</button>
                </form>
                <router-link class="mt-4 d-block text-center" :to="`/${$i18n.locale}/client-login`">
                    {{ $t('buttons.clients') }}
                </router-link>
            </div>
        </div>
        <Loader v-if="loadding"></Loader>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios, { formToJSON, toFormData } from 'axios';
import router from '../../router';
import Loader from '../../components/Loader.vue';
import i18n from '../../i18n'

const loadding = ref(false)
const userNotFound = ref(false)
const allUsers = ref([])
const user = ref({
    email: '',
    password: ''
})

const rules = {
    email: { required, email },
    password: { required }
}

const validation = useVuelidate(rules, user)

const submission = () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        const formData = new FormData()
        formData.append("email", user.value.email)
        formData.append("password", user.value.password)
        loadding.value = true
        localStorage.setItem("activeTab", '1')
        axios.post("https://seasonreal.seasonsge.com/appv1real/login", formData).then(response => {
            if (response.data.success && response.data.data.type == 1) {
                localStorage.setItem("login", JSON.stringify({ success: response.data.success, id: response.data.data.id }))
                router.push({
                    name: "Agent Dashboard",
                    params: {lang: i18n.global.locale.value, userId: response.data.data.id}
                })
                loadding.value = false
            } else {
                loadding.value = false
                userNotFound.value = true
            }
        })
    }
}

onMounted(async () => {
    loadding.value = true
    await axios.get('https://seasonreal.seasonsge.com/appv1real/usersview')
        .then(data => {
            allUsers.value = data.data
        })
    if (localStorage.getItem("login")) {
        const login = JSON.parse(localStorage.getItem("login"))
        if (login.success) {
            localStorage.setItem("activeTab", '1')
            setTimeout(() => {
                loadding.value = false
                router.push({
                    name: "Agent Dashboard",
                    params: {lang: i18n.global.locale.value, userId: login.id}
                })
            }, 1500)
        } else loadding.value = false
    } else loadding.value = false
})

</script>
<style lang="scss" scoped>
.login-page {
    background: linear-gradient(to bottom, var(--blue-color), #030320e5);

    .login-box {
        width: 550px;

        h1 {
            color: var(--blue-color);

            &::before {
                content: '';
                position: absolute;
                bottom: -10px;
                height: 5px;
                border-radius: 50px;
                width: 25%;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--blue-color);
            }
        }

        .home-butn {
            background-color: var(--blue-color);
            width: fit-content;
            transition: 0.2s;

            &:hover {
                background-color: #77b0c9;
            }
        }

        form {
            input {
                outline: none;
                border: 1px solid darkgray;

                &.error {
                    border: 1px solid #dc3545;
                }
            }
        }
    }

    @media (max-width: 767px) {
        .login-box {
            width: 100%;
        }
    }
}</style>