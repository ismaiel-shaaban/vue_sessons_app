<template>
    <div class="privacy-page">
        <div class="position-relative" style="height: 115px;">
            <HeaderComp class="position-absolute w-100"></HeaderComp>
        </div>
        <div class="container">
            <img class="img-fluid" src="/images/contact2.jpg" alt="">
            <div class="privacy-text w-75 mx-auto py-5">
                <div class="box terms">
                    <h2>{{ $t('privacyAndTerms[1]') }}</h2>
                    <div class="text-muted mt-3"
                        v-html="$i18n.locale === 'en' ? termsAndConditions.termsAndConditions_en : termsAndConditions.termsAndConditions_ar">
                    </div>
                </div>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>
<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios';

const termsAndConditions = ref([])

onMounted(async () => {
    await axios.get('https://seasonreal.seasonsge.com/appv1real/termsAndConditions')
        .then(data => {
            termsAndConditions.value = data.data[0]
        })
})

</script>
<style lang="scss" scoped>
.privacy-page {
    .privacy-text {
        h2 {
            color: var(--blue-color);
            position: relative;
            margin-bottom: 20px;

            &::before {
                content: '';
                position: absolute;
                bottom: -8px;
                height: 2px;
                border-radius: 50px;
                width: 20%;
                background-color: var(--blue-color);
            }
        }
    }

    @media (max-width: 767px) {
        .privacy-text {
            width: 100% !important;
        }
    }
}
</style>