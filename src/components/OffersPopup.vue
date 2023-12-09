<template>
    <div :class="`overlay position-fixed w-100 h-100 ${openPopup ? 'open' : ''}`">
        <div :class="`offer-popup position-fixed rounded-1 bg-white ${openPopup ? 'open' : ''}`">
            <i :class="`fa-solid fa-xmark fa-2x close ${$i18n.locale === 'en' ? '' : 'ar'}`"
                @click="$emit('close-offersPopup')"></i>
            <div class="inner p-5 text-center overflow-auto">
                <h1>Offers</h1>
                <div class="">
                    <div class="row mt-4">
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <img class="rounded-2" src="https://placehold.co/200X200?text=?" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps(['openPopup'])
defineEmits(['close-offersPopup'])

</script>
<style lang="scss" scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.623);
    left: 0;
    top: 100%;
    z-index: 55555;
    transition: 0.2s;

    &.open {
        top: 0;
    }

    .inner {
        height: 100%;
    }

    .offer-popup {
        top: -50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 750px;
        height: 90%;
        transition: 0.2s;

        &.open {
            top: 50%;
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

    }
}
</style>