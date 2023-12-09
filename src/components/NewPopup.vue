<template>
    <div :class="`overlay d-md-none position-fixed w-100 h-100 ${openPopup ? '' : 'close'}`">
        <div :class="`new-popup position-fixed rounded-1 bg-white ${openPopup ? '' : 'close'}`">
            <i :class="`fa-solid fa-xmark fa-2x close ${$i18n.locale === 'en' ? '' : 'ar'}`"
                @click="$emit('close-newPopup')"></i>
            <div class="inner h-100 px-5 py-5 text-center">
                <img class="w-25 mb-4" :src="`https://seasonreal.seasonsge.com/admin/images/${newPopup.image}`" alt="">
                <h1 class="mb-3 text-uppercase">{{ newPopup.text }}</h1>
                <a v-if="isLoggedin" class="p-2 px-3 butn mt-5 text-decoration-none mx-auto d-flex align-items-center gap-3 px-4 rounded-1 "
                    :href="info.email">
                    <i class="fa-solid fa-envelope text-white fs-5"></i>
                    {{ info.email }}
                </a>
                <div v-else class="butn h-25 text-uppercase text-decoration-none p-2 px-3 rounded-1" >
                    حمل التطبيق للحصول على أداء أفضل            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

defineProps(['openPopup', 'info'])
defineEmits(['close-newPopup'])
const newPopup = ref({})
const isLoggedin = ref(false)

onMounted(async () => {
    if (sessionStorage.getItem("clientLogin") || sessionStorage.getItem("login")) {
        isLoggedin.value = true
    }
    await axios.get("https://seasonreal.seasonsge.com/appv1real/popup").then(data => {
        newPopup.value = data.data[0]
        console.log(newPopup.value.image );
    })
})
</script>
<style lang="scss" scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.623);
    left: 0;
    top: 0;
    z-index: 55555;
    transition: 0.2s;

    &.close {
        top: 100%;
    }

    .new-popup {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 750px;
        transition: 0.2s;

        &.close {
            top: -50%;
        }

        .close {
            position: fixed;
            right: 30px;
            top: 15px;
            cursor: pointer;
            transition: 0.2s;

            &.ar {
                right: initial;
                left: 30px;
            }

            &:hover {
                color: #919191;
            }
        }

        .inner {
            a {
                width: fit-content;
            }
        }
    }

    @media (max-width: 767px) {
        .new-popup {
            width: 90%;

            p {
                font-size: 15px !important;
            }

            a {
                width: 100% !important;
            }
        }
    }
}
</style>