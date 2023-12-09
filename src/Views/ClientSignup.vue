<template>
    <div class="login-page min-vh-100 py-5 d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="login-box p-4 rounded-1 bg-white mx-auto">
                <h1 class="position-relative text-center text-uppercase">{{ $t('clientSignup.head') }}</h1>
                <router-link :to="`/${$i18n.locale}`"
                    class="home-butn rounded-pill p-2 border-0 d-flex align-items-center mx-auto mt-4 gap-2 fw-semibold"
                    title="Home">
                    <i class="fa-solid fa-house p-2 rounded-circle text-light"></i>
                </router-link>
                <form class="d-flex flex-column gap-3 mt-4">
                    <img width="250" height="250" style="object-fit: cover;" class="rounded-circle mx-auto mt-5"
                        v-if="imgPreview !== ''" :src="imgPreview" alt="">
                    <label v-if="imgPreview === ''" class="img-placeholer rounded-circle mx-auto mt-5">
                        <input class="d-none" type="file" @change="getImage($event)">
                        <div class="d-flex flex-column align-items-center gap-2 text-muted">
                            <i class="fa-solid fa-cloud-arrow-up fs-1"></i>
                            <span class="fw-bold">Upload Image</span>
                        </div>
                    </label>
                    <span v-if="validation.img.$error" class="error text-danger fst-italic d-block w-100 text-center">
                        {{ validation.img.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                    </span>
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{ $t('clientSignup.name') }}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.name.$error ? 'error' : ''}`" type="text"
                            v-model="user.name">
                        <span v-if="validation.name.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.name.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                        </span>
                    </label>
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{ $t('clientSignup.email') }}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.email.$error ? 'error' : ''}`" type="text"
                            v-model="user.email">
                        <span v-if="validation.email.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.email.$errors[0].$validator === 'required' ? 'Field Required' : 'Invalid Email' }}
                        </span>
                    </label>
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{ $t('clientSignup.password') }}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.password.$error ? 'error' : ''}`"
                            type="password" v-model="user.password">
                        <span v-if="validation.password.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.password.$errors[0].$validator ===
                                'required' ? 'Field Required' : 'Please Confirm Password' }}
                        </span>
                    </label>
                    <label>
                        <span class="fw-semibold d-block mb-1 w-100">{{ $t('clientSignup.confirmPassword') }}: </span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.confirmPassword.$error ? 'error' : ''}`"
                            type="password" v-model="user.confirmPassword">
                        <span v-if="validation.confirmPassword.$error" class="error text-danger fst-italic d-block w-100">
                            {{ validation.confirmPassword.$errors[0].$validator ===
                                'required' ? 'Field Required' : 'Please Confirm Password' }}
                        </span>
                    </label>
                    <button class="butn p-2 px-3 rounded-1 mt-4 text-uppercase" @click.prevent="submission">{{
                        $t('buttons.signup') }}</button>
                </form>
                <router-link class="mt-4 d-block text-center" :to="`/${$i18n.locale}/login`">
                    {{ $t('buttons.agent') }}
                </router-link>
                <span class="d-block mt-4 text-center">
                    {{ $t('clientSignup.already') }}
                    <router-link :to="`/${$i18n.locale}/client-login`">
                        {{ $t('clientSignup.login') }}
                    </router-link>
                </span>
            </div>
            <div class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-xmark fs-5"></i>
                    {{ $t('clientSignup.used') }}
                </div>
                <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
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
import router from '../router/';
import Loader from '../components/Loader.vue';
import i18n from '../i18n'


const loadding = ref(false)
const imgPreview = ref('')
const user = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    img: ''
})

const confirmPassowrd = () => {
    if (user.value.password === user.value.confirmPassword) {
        return true
    } else return false
}

const rules = {
    name: { required },
    email: { required, email },
    password: { required, confirmPassowrd },
    confirmPassword: { required, confirmPassowrd },
    img: { required },
}

const getImage = (e) => {
    imgPreview.value = URL.createObjectURL(e.target.files[0])
    user.value.img = e.target.files[0]
}

const validation = useVuelidate(rules, user)


const submission = async () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        loadding.value = true
        const formData = new FormData()
        formData.append("name", user.value.name)
        formData.append("email", user.value.email)
        formData.append("password", user.value.password)
        formData.append("type", 2)
        formData.append("discount", 0)
        formData.append("balance", 0)
        formData.append("img", user.value.img)
        formData.append("token", 'lll')

        await axios.post("https://seasonreal.seasonsge.com/appv1real/add-user", formData)
            .then(data => {
                console.log(data);
                if (data.data.success) {
                    loadding.value = false
                    localStorage.setItem("clientLogin", JSON.stringify({ success: data.data.success, id: data.data.user.id }))
                    router.push({
                        name: 'Home',
                        params: { lang: i18n.global.locale.value }
                    })
                } else {
                    loadding.value = false
                    document.querySelector(".alert-danger").classList.add("active")
                    setTimeout(() => {
                        document.querySelector(".alert-danger").classList.remove("active")
                    }, 5000)
                }
            })
    }
}


const removeAlert = (type) => {
    document.querySelector(`.alert-${type}`).classList.remove("active")
}


onMounted(async () => {
    loadding.value = true
    if (localStorage.getItem("clientLogin")) {
        const login = JSON.parse(localStorage.getItem("clientLogin"))
        if (login.success) {
            setTimeout(() => {
                loadding.value = false
                router.push({
                    name: "Home",
                    params: { lang: i18n.global.locale.value }
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

        .img-placeholer {
            width: 250px;
            height: 250px;
            border: 2px dashed darkgray;
            display: grid;
            place-items: center;
            cursor: pointer;
        }
    }

    .alert {
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s;
        z-index: 555555555;

        &.active {
            top: 5%;
        }

        button {
            box-shadow: none;
            outline: none;
        }
    }

    @media (max-width: 767px) {
        .alert {
            width: 90%;
            text-align: start !important;
            font-size: 12px;

            i {
                font-size: 16px !important;
            }
        }

        .login-box {
            width: 100%;
        }
    }
}
</style>