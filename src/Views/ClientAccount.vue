<template>
    <div class="client-account min-vh-100">
        <HeaderComp></HeaderComp>
        <div class="container py-5 d-flex gap-4 flex-lg-row flex-column">
            <aside class="rounded-2 d-flex flex-column gap-2 p-3 bg-white">
                <span
                    :class="`d-flex align-items-center gap-2 fw-bold p-2 px-3 rounded-2 ${activeTab === '1' ? 'active' : ''}`"
                    @click="activeTab = '1'">
                    <i class="fa-solid fa-gear"></i>
                    Settings
                </span>
                <div class="d-flex flex-column">
                    <p class="p-2 mb-0 px-3 fw-bold d-flex align-items-center gap-2">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        Booking History
                    </p>
                    <ul class="ps-3 p-2 d-flex flex-column gap-2">
                        <span
                            :class="`d-flex align-items-center gap-2 fw-bold p-2 px-3 rounded-2 ${activeTab === '2' ? 'active' : ''}`"
                            @click="activeTab = '2'">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            Cars History
                        </span>
                        <span
                            :class="`d-flex align-items-center gap-2 fw-bold p-2 px-3 rounded-2 ${activeTab === '3' ? 'active' : ''}`"
                            @click="activeTab = '3'">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            Hotels History
                        </span>
                        <span
                            :class="`d-flex align-items-center gap-2 fw-bold p-2 px-3 rounded-2 ${activeTab === '4' ? 'active' : ''}`"
                            @click="activeTab = '4'">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            Flights History
                        </span>
                        <span
                            :class="`d-flex align-items-center gap-2 fw-bold p-2 px-3 rounded-2 ${activeTab === '5' ? 'active' : ''}`"
                            @click="activeTab = '5'">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            Programs History
                        </span>
                    </ul>
                </div>
                <span class="d-flex align-items-center gap-2 fw-bold mt-auto p-2 px-3 rounded-2" @click="logout">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    Logout
                </span>
            </aside>
            <div class="content w-75">
                <ClientSettings v-if="activeTab === '1'"></ClientSettings>
                <CarsHistory v-if="activeTab === '2'"></CarsHistory>
                <HotelHistroy v-if="activeTab === '3'"></HotelHistroy>
                <FlightsHistory v-if="activeTab === '4'"></FlightsHistory>
                <ProgramsHistory v-if="activeTab === '5'"></ProgramsHistory>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>
<script setup>
import axios from 'axios';
import FooterComp from '../components/FooterComp.vue';
import HeaderComp from '../components/HeaderComp.vue';
import { ref, onMounted } from 'vue'
import router from '../router';
import i18n from '../i18n';
import ClientSettings from '../components/ClientSettings.vue';
import CarsHistory from '../components/Clients History/CarsHistory.vue';
import HotelHistroy from '../components/Clients History/HotelHistroy.vue';
import FlightsHistory from '../components/Clients History/FlightsHistory.vue';
import ProgramsHistory from '../components/Clients History/ProgramsHistory.vue';



const userData = ref({})
const activeTab = ref('1')

const logout = () => {
    localStorage.clear()
    router.push({
        name: "Home",
        params: { lang: i18n.global.locale.value },
    })
}

onMounted(async () => {
    if (localStorage.getItem("clientLogin")) {
        const login = JSON.parse(localStorage.getItem("clientLogin"))
        await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview")
            .then(data => {
                userData.value = data.data.filter(el => el.id == login.id)[0]
            })
    } else router.push({
        name: "Home",
        params: { lang: i18n.global.locale.value }
    })
})
</script>
<style lang="scss" scoped>
.client-account {
    aside {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.438);
        width: 350px;

        span {
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                background-color: var(--blue-color);
                color: white;
            }

            &.active {
                background-color: var(--blue-color);
                color: white;
            }
        }
    }

    @media (max-width: 991px) {
        aside {
            width: 100%;
        }
        .content {
            width: 100% !important;
        }
    }
}
</style>