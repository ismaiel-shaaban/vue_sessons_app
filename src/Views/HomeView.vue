<template>
    <div class="home-page">
        <NewPopup :info="info" :openPopup="newPopup" @close-newPopup="() => (newPopup = false)"></NewPopup>
        <HeaderComp class="position-absolute w-100" style="z-index: 555"></HeaderComp>
        <div class="landing min-vh-100">
            <Carousel class="min-vh-100 m-0 position-relative" :autoplay="3000" :wrap-around="true"
                :dir="$i18n.locale === 'en' ? 'ltr' : 'rtl'">
                <Slide class="min-vh-100 w-100 m-0" v-for="(item, index) in slider" :key="index">
                    <div class="carousel__item w-100 h-100 m-0">
                        <img :src="`https://seasonreal.seasonsge.com/images/settings/${item.image}`" class="d-block w-100 vh-100"
                            style="object-fit: cover;" alt="..." />
                        <div :class="`container text-${$i18n.locale === 'en' ? 'start' : 'end'}`">
                            {{ item["title-en"] }}
                            <div :class="`text-box p-4 position-absolute rounded-5 ${$i18n.locale === 'ar' ? 'ar' : ''}`"
                                v-html="$i18n.locale === 'en' ? item['title_en'] : item['title']"></div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination class="position-absolute" />
                </template>
            </Carousel>
            <div class="socials d-flex align-items-center gap-3 position-absolute">
                <a target="_blank" :href="info.facebook">
                    <i class="fa-brands fa-facebook text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.messenger">
                    <i class="fa-brands fa-facebook-messenger text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.twitter">
                    <i class="fa-brands fa-twitter text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.telegram">
                    <i class="fa-brands fa-telegram text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.instagram">
                    <i class="fa-brands fa-instagram text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.youtube">
                    <i class="fa-brands fa-youtube text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.tiktok">
                    <i class="fa-brands fa-tiktok text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.whatsapp">
                    <i class="fa-brands fa-whatsapp text-white fs-5"></i>
                </a>
                <a target="_blank" :href="info.snapchat">
                    <i class="fa-brands fa-snapchat text-white fs-5"></i>
                </a>
            </div>
        </div>
        <div class="apps-section py-5">
            <div class="container">
                <div class="heading-text">
                    <h1>{{ $t('tourApps.heading') }}</h1>
                    <p class="text-black-50 w-75 mx-auto fs-5">
                        {{ $t('tourApps.paragraph') }}
                    </p>
                </div>
                <div class="apps d-flex align-items-center justify-content-center gap-5 mt-5">
                    <a target="_blank" :href="info.google_play_link">
                        <img class="img-fluid" src="/images/googleplay.png" alt="" />
                    </a>
                    <a target="_blank" :href="info.app_store_link">
                        <img class="img-fluid" src="/images/appstore.png" alt="" />
                    </a>
                </div>
                <!-- <div class="text-center mt-5">
                    <button class="butn p-2 px-4 rounded-1 text-decoration-none fs-5" @click="aboutPopup = true">
                        {{ $t('buttons.readMore') }}
                    </button>
                </div> -->
                <AboutPopUp :openPopup="aboutPopup" @close-aboutPopup="() => (aboutPopup = false)"></AboutPopUp>
            </div>
        </div>
        <div class="reservation-section py-5">
            <div class="container">
                <div class="heading-text">
                    <h1>{{ $t('reservation.heading') }}</h1>
                    <p class="text-black-50 fs-5">
                        {{ $t('reservation.paragraph') }}
                    </p>
                </div>
                <form class="search-form mt-5 d-flex justify-content-center align-items-md-start gap-2">
                    <div class="input-cont position-relative w-50">
                        <input
                            :class="`search-input w-100 px-3 p-2 rounded-1 ${validation.searchInput.$error ? 'error' : ''}`"
                            type="search" placeholder="e.g. 2alw2m5lfwlc4ockk0kw" v-model="searchForm.searchInput" />
                        <span v-if="validation.searchInput.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.searchInput.required.$message }}
                        </span>
                        <span v-if="searchError !== ''" class="text-danger fst-italic d-block mt-1">
                            {{ searchError }}
                        </span>
                    </div>
                    <button class="butn p-2 px-3 rounded-1 d-flex align-items-center gap-2" type="submit"
                        @click.prevent="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        {{ $t('buttons.search') }}
                    </button>
                </form>
            </div>
        </div>
        <div class="services-section py-5">
            <div class="container">
                <div class="heading-text">
                    <h1>{{ $t('services.heading') }}</h1>
                    <p class="text-black-50 w-75 mx-auto fs-5">
                        {{ $t('services.paragraph') }}
                    </p>
                </div>
                <div class="box-cont mt-5">
                    <div class="row">
                        <div class="col-md-6 mb-4" v-for="(item, index) in $tm('serviciesCards')" :key="index">
                            <div class="box overflow-hidden bg-white rounded-2 d-flex flex-column h-100">
                                <div class="image">
                                    <router-link v-if="!item.link.includes('http')" :to="`/${$i18n.locale}/${item.link}`">
                                        <img class="img-fluid w-100" :src="item.photo" alt="" />
                                    </router-link>
                                    <a v-if="item.link.includes('http')" target="_blank" :href="item.link">
                                        <img class="img-fluid w-100" :src="item.photo" alt="" />
                                    </a>
                                </div>
                                <div class="text flex-fill d-flex flex-column justify-content-between p-4">
                                    <div class="txt">
                                        <h3>{{ item.heading }}</h3>
                                        <p class="text-black-50 mt-3">
                                            {{ item.paragraph }}
                                        </p>
                                    </div>
                                    <router-link v-if="!item.link.includes('http')" class="fw-bold"
                                        :to="`/${$i18n.locale}/${item.link}`">
                                        {{ $t('buttons.bookNow') }}
                                        {{ $i18n.locale === "en" ? "&rightarrow;" : "&leftarrow;" }}
                                    </router-link>
                                    <a v-if="item.link.includes('http')" target="_blank" :href="item.link" class="fw-bold">
                                        {{ $t('buttons.bookNow') }}
                                        {{ $i18n.locale === "en" ? "&rightarrow;" : "&leftarrow;" }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="offers-section position-relative py-5">
            <img class="position-absolute" src="/images/sales.png" alt="" />
            <div class="container">
                <div class="heading-text">
                    <h1>{{ $t('offers.heading') }}</h1>
                    <p class="text-black-50 w-75 mx-auto fs-5 mb-5">
                        {{ $t('offers.paragraph') }}
                    </p>
                    <button class="butn p-2 px-4 rounded-1 text-decoration-none fs-5" @click="offersPopup = true">
                        {{ $t('buttons.readMore') }}
                    </button>
                </div>
                <OffersPopup :openPopup="offersPopup" @close-offersPopup="() => offersPopup = false"></OffersPopup>
            </div>
        </div> -->
        <Loader v-if="loading"></Loader>
        <FooterComp></FooterComp>
    </div>
</template>
<script setup>
import HeaderComp from "../components/HeaderComp.vue";
import FooterComp from "../components/FooterComp.vue";
import AboutPopUp from "../components/AboutPopUp.vue";
import OffersPopup from "../components/OffersPopup.vue";
import NewPopup from "../components/NewPopup.vue";
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import i18n from "../i18n";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import router from "../router";
import Loader from "../components/Loader.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";



const slider = ref([]);
const newPopup = ref(false);
const aboutPopup = ref(false);
const offersPopup = ref(false);
const info = ref([]);
const loading = ref(false)
const searchError = ref('')
const searchForm = ref({
    searchInput: '',
})

const rules = {
    searchInput: { required: helpers.withMessage("Required Field", required) },
}
const validation = useVuelidate(rules, searchForm)

const search = async () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        loading.value = true
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/boking-search?booking_code=${searchForm.value.searchInput}`)
            .then(data => {
                console.log(data);
                if (data.data.bookings.length > 0) {
                    const carsBooking = data.data.bookings[0]
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${carsBooking.account_owner}`)
                        .then(data => {
                            loading.value = false
                            if (data.data.type === 2) {
                                router.push({
                                    name: 'Cars Checkout',
                                    params: { lang: i18n.global.locale.value, id: carsBooking.random_code }
                                })
                            } else if (data.data.type === 1) {
                                router.push({
                                    name: 'Agents Cars Checkout',
                                    params: { lang: i18n.global.locale.value, id: carsBooking.random_code, with: 3 }
                                })
                            }
                        })
                } else if (data.data.bookingss.length > 0) {
                    const flightsBooking = data.data.bookingss[0]
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${flightsBooking.email}`)
                        .then(data => {
                            loading.value = false
                            if (data.data.type === 2) {
                                router.push({
                                    name: 'Flights Checkout',
                                    params: { lang: i18n.global.locale.value, id: flightsBooking.booking_id }
                                })
                            } else if (data.data.type === 1) {
                                router.push({
                                    name: 'Agents Flights Checkout',
                                    params: { lang: i18n.global.locale.value, id: flightsBooking.booking_id, with: 3 }
                                })
                            }
                        })
                } else if (data.data.hotel_reservations.length > 0) {
                    const HotelsBooking = data.data.hotel_reservations[0]
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${HotelsBooking.account_name}`)
                        .then(data => {
                            loading.value = false
                            if (data.data.type === 2) {
                                router.push({
                                    name: 'Hotels Checkout',
                                    params: { lang: i18n.global.locale.value, id: HotelsBooking.code }
                                })
                            } else if (data.data.type === 1) {
                                router.push({
                                    name: 'Agents Hotels Checkout',
                                    params: { lang: i18n.global.locale.value, id: HotelsBooking.code, with: 3 }
                                })
                            }
                        })
                } else if (data.data.reservations.length > 0) {
                    const ProgramsBooking = data.data.reservations[0]
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${ProgramsBooking.email}`)
                        .then(data => {
                            loading.value = false
                            if (data.data.type === 2) {
                                router.push({
                                    name: 'Programs Checkout',
                                    params: { lang: i18n.global.locale.value, id: ProgramsBooking.booking_id }
                                })
                            } else if (data.data.type === 1) {
                                router.push({
                                    name: 'Agents Programs Checkout',
                                    params: { lang: i18n.global.locale.value, id: ProgramsBooking.booking_id, with: 3 }
                                })
                            }
                        })
                } else {
                    loading.value = false
                    searchError.value = 'There Is No Book With This Code'
                }
            })
    }
}


watch(aboutPopup, (newVal) => {
    if (newVal) {
        document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "visible";
});



onMounted(async () => {
    await axios
        .get("https://seasonreal.seasonsge.com/appv1real/slider")
        .then((data) => {
            slider.value = data.data;
        })
    await axios
        .get("https://seasonreal.seasonsge.com/appv1real/info")
        .then((data) => {
            info.value = data.data[0]
            localStorage.setItem('websiteInfo', JSON.stringify( info.value))
            document.getElementById("favicon").href = `https://seasonreal.seasonsge.com/${data.data[0].favicon}`;
        })
    setTimeout(() => {
        newPopup.value = true;
    }, 100);
});


</script>

<style lang="scss" scoped>
.home-page {
    .landing {
        .socials {
            right: 25px;
            bottom: 18px;

            a {
                cursor: pointer;

                i {
                    transition: 0.2s;

                    &:hover {
                        color: var(--orange-color) !important;
                    }
                }
            }
        }

        .text-box {
            &.ar {
                left: initial;
                right: 15%;
            }

            top: 50%;
            left: 15%;
            width: 550px;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.623);
            backdrop-filter: blur(5px);
            border: 2px solid var(--blue-color);

            color: var(--blue-color);

            h1 {
                font-weight: bold !important;
            }

            p {
                line-height: 1.7;
            }
        }
    }

    .about-section {
        background-color: #f5f5f5;
    }

    .reservation-section {
        .search-form {
            .search-input {
                outline: none;
                border: 1px solid gray;

                &.error {
                    border-color: #dc3545;
                }
            }
        }
    }

    .services-section {
        background-color: #f5f5f5;

        .box-cont {
            .box {
                box-shadow: 0 3px 15px rgba(105, 105, 105, 0.226);

                .image {
                    height: 355px;
                    overflow: hidden;

                    img {
                        object-fit: cover;
                        transition: 0.2s;

                        &:hover {
                            scale: 1.1;
                        }
                    }
                }

                .text {
                    h3 {
                        color: var(--blue-color);
                    }

                    p {
                        line-height: 1.7;
                    }

                    a {
                        font-size: 18px;
                        color: var(--orange-color);
                        transition: 0.2s;
                        width: fit-content;

                        &:hover {
                            color: #fdb89a;
                        }
                    }
                }
            }
        }
    }

    .apps-section {
        background-color: #f5f5f5;

        .apps {
            img {
                height: 70px !important;
            }
        }
    }

    .offers-section {
        // background-color: #f5f5f5;
        overflow: hidden;

        &>div {
            position: relative;
            z-index: 555;
        }

        img {
            width: 40%;
            opacity: 0.2;
            top: -50%;
            right: -5%;
            transform: rotate(25deg);
        }
    }



    @media (max-width: 991px) {
        .landing {
            .text-box {
                &.ar {
                    left: initial !important;
                    right: 50% !important;
                    transform: translate(50%, -50%) !important;
                }

                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    @media (max-width: 767px) {
        .landing {
            .text-box {
                width: 90%;

                .boxes {
                    flex-wrap: wrap;
                    margin-top: 5px !important;
                }
            }

            .socials {
                right: 50% !important;
                transform: translateX(50%);
                backdrop-filter: blur(5px);
                bottom: -18px;
                background-color: rgba(0, 0, 0, 0.438);
                padding: 7px 15px 5px;
                border-radius: 5px;
            }

        }

        .reservation-section {
            form {
                flex-direction: column;

                .input-cont {
                    width: 100% !important;
                }

                button {
                    justify-content: center;
                }
            }
        }

        .apps-section {
            .apps {
                gap: 5px !important;

                img {
                    height: 50px !important;
                }
            }
        }

        .offers-section {
            img {
                width: 85%;
                top: -15%;
                right: -15%;
            }
        }
    }
}
</style>
