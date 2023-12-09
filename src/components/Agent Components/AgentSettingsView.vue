<template>
    <div class="settings-page">
        <div class="content p-4 px-3">
            <div
                class="settings d-flex flex-md-row flex-column align-items-md-start align-items-center gap-5 p-4 bg-white rounded-1">
                <div class="img-cont">
                    <input id="img-input" class="img-input d-none" type="file" name="avatar" accept="image/jpeg, image/png"
                        @change="previewAvatar($event)" />
                    <label for="img-input">
                        <img class="main-avatar rounded-circle" width="250" height="250"
                            :src="`https://seasonreal.seasonsge.com/images/Agents/${updateUserInfo.img}`" alt="" />
                    </label>
                </div>
                <div class="user-info flex-fill">
                    <form>
                        <label class="w-100 mt-2">
                            <span class="d-block fw-semibold mb-1">{{ $t('dashAside.profile.name') }}: </span>
                            <input :class="`rounded-1 p-2 px-3 w-100 ${validation.name.$error ? 'error' : ''
                                }`" type="text" v-model="updateUserInfo.name" />
                            <span v-if="validation.name.$error" class="text-danger fst-italic w-100 d-block mt-1">
                                {{
                                    validation.name.$errors[0].$validator === "reuqired"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                        <label class="w-100 mt-2">
                            <span class="d-block fw-semibold mb-1">{{ $t('dashAside.profile.email') }}: </span>
                            <input :class="`rounded-1 p-2 px-3 w-100 ${validation.email.$error ? 'error' : ''
                                }`" type="text" v-model="updateUserInfo.email" />
                            <span v-if="validation.email.$error" class="text-danger fst-italic w-100 d-block mt-1">
                                {{
                                    validation.email.$errors[0].$validator === "reuqired"
                                    ? "Field Required"
                                    : "Invalid Email Address"
                                }}
                            </span>
                        </label>
                        <label class="w-100 mt-2">
                            <span class="d-block fw-semibold mb-1">{{ $t('dashAside.profile.password') }}: </span>
                            <input :class="`rounded-1 p-2 px-3 w-100 ${validation.password.$error ? 'error' : ''
                                }`" type="text" v-model="updateUserInfo.password" />
                            <span v-if="validation.password.$error" class="text-danger fst-italic w-100 d-block mt-1">
                                {{
                                    validation.password.$errors[0].$validator === "reuqired"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                        <label class="w-100 mt-2">
                            <span class="d-block fw-semibold mb-1">{{ $t('dashAside.agent.discount') }}: </span>
                            <input disabled :class="`rounded-1 p-2 px-3 w-100 ${validation.password.$error ? 'error' : ''
                                }`" type="text" v-model="userData.discount" />
                            <span v-if="validation.password.$error" class="text-danger fst-italic w-100 d-block mt-1">
                                {{
                                    validation.password.$errors[0].$validator === "reuqired"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                        <div class="text-end">
                            <button class="butn rounded-1 mt-5 p-2 px-3 text-uppercase" @click.prevent="submitUpdate">
                                {{ $t('buttons.updateProfile') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="alert alert-success text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-check fs-5"></i>
                    {{ $t('dashAside.profile.message') }}
                </div>
            </div>
        </div>
        <Loader v-if="loader"></Loader>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRoute } from "vue-router";
import storage from '../../firebase'
import { ref as storageRef, uploadBytes } from "firebase/storage";
import axios from "axios";
import Loader from '../Loader.vue'


const route = useRoute()
const props = defineProps(["userData"]);
const loader = ref(false)

const updateUserInfo = ref({})


const rules = {
    name: { required },
    email: { required, email },
    password: { required },
};

const validation = useVuelidate(rules, updateUserInfo);

const previewAvatar = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    document.querySelector(".main-avatar").src = url;
};



const submitUpdate = () => {
    validation.value.$validate();
    if (!validation.value.$error) {
        const formData = new FormData()
        const inputFile = document.querySelector(".img-input").files[0]
        if (inputFile) {
            formData.append("img", inputFile)
        } else {
            formData.append("img", updateUserInfo.value.img)
        }

        formData.append("name", updateUserInfo.value.name)
        formData.append("email", updateUserInfo.value.email)
        formData.append("password", updateUserInfo.value.password)
        formData.append("type", updateUserInfo.value.type)
        formData.append("id", updateUserInfo.value.id)
        formData.append("discount", updateUserInfo.value.discount)
        formData.append("balance", updateUserInfo.value.balance)

        loader.value = true
        axios.post("https://seasonreal.seasonsge.com/appv1real/user-edit", formData).then((response) => {
            if (response.data.success) {
                uploadBytes(storageRef(storage, `avatar/${updateUserInfo.value.id}`), inputFile).then((snapshot) => {
                    console.log(snapshot);
                    console.log(`Uploaded ${updateUserInfo.value.id}`);
                });
                loader.value = false
                document.querySelector(".alert").classList.add("active")
                setTimeout(() => {
                    location.reload()
                }, 1500)
            } else console.log(response.data);
        });
    }
};

onMounted(async () => {
    loader.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then(data => {
        data.data.forEach(el => {
            if (el.id == route.params.userId) {
                updateUserInfo.value = {
                    img: el.img,
                    name: el.name,
                    email: el.email,
                    password: el.password,
                    type: el.type,
                    id: el.id,
                    type: el.type,
                    discount: el.discount,
                    balance: el.balance,
                }
                loader.value = false
            }
        })
    })
})


</script>
<style lang="scss" scoped>
.settings-page {
    .content {
        .settings {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.09);

            .img-cont {
                label {
                    cursor: pointer;
                }

                img {
                    border: 2px solid var(--orange-color);
                    box-shadow: 0 5px 15px #0000002a;
                    object-fit: cover;
                }
            }

            .user-info {
                input {
                    outline: none;
                    border: 1px solid darkgray;

                    &.error {
                        border: 1px solid #dc3545;
                    }
                }
            }
        }

        .alert {
            top: -15%;
            left: 50%;
            transform: translateX(-50%);
            transition: 0.2s;

            &.active {
                top: 5%;
            }
        }
    }

    @media (max-width: 767px) {
        .content {
            padding: 10px !important;

            .settings {
                img {
                    width: 150px !important;
                    height: 150px !important;
                }
            }
        }
    }
}
</style>
