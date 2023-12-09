<template>
    <header class="py-3 position-relative">
        <div
            :class="`container d-flex align-items-center justify-content-between gap-4 ${router.currentRoute.value.path !== `/${$i18n.locale}` ? 'not-home' : ''}`">
            <div class="logo">
                <router-link class="text-decoration-none" :to="`/${$i18n.locale}`">
                    <img :src="`https://seasonreal.seasonsge.com/${info.logo}`" alt="">
                </router-link>
            </div>
            <ul :class="`links d-flex align-items-center justify-content-between gap-5 w-100 ${openMenu ? 'open' : ''}`">
                <ul class="d-flex align-items-center gap-5 flex-lg-row flex-column">
                    <li v-for="(item, index) in $tm('headerLinks')" :key="index">
                        <a v-if="router.currentRoute.value.path === `/${$i18n.locale}` && (item === 'about' || item === 'عنا')"
                            class="text-decoration-none fw-bold text-muted text-capitalize fs-5"
                            :href="`#${item === 'about' || 'عنا' ? 'about' : ''}`">
                            {{ item }}
                        </a>
                        <router-link v-else class="text-decoration-none fw-bold text-muted text-capitalize fs-5"
                            :to="`${item === 'programmes' || item === 'برامجنا' ? `/${$i18n.locale}/programmes`
                                : item === 'contact' || item === 'تواصل معنا' ? `/${$i18n.locale}/contact` : `/${$i18n.locale}`}`">
                            {{ item }}
                        </router-link>
                    </li>
                </ul>
                <div class="d-flex align-items-center gap-3 flex-lg-row flex-column">
                    <router-link v-if="Object.keys(userInfo).length === 0"
                        class="agent-button text-uppercase text-decoration-none butn p-2 px-3 rounded-1 text-nowrap"
                        :to="`/${$i18n.locale}/client-login`">
                        {{ $t('buttons.login') }}
                    </router-link>
                    <span class="lang fw-bold d-flex align-items-center gap-2" @click="changeLang">
                        <i class="fa-solid fa-globe fs-4"></i>
                        {{ $i18n.locale === 'en' ? 'AR' : 'EN' }}
                    </span>
                </div>
            </ul>
            <div v-if="Object.keys(userInfo).length > 0" type="button" @click="openAccountBox = !openAccountBox"
                class="account position-relative text-black fw-bold d-flex align-items-center gap-2 ms-auto text-decoration-none">
                <img width="50" height="50" style="object-fit: cover;" class="rounded-circle"
                    :src="`https://seasonreal.seasonsge.com/images/Agents/${userInfo.img}`" alt="">
                <i class="fa-solid fa-chevron-down"></i>

                <div v-if="openAccountBox" class="box rounded-2 d-flex flex-column bg-white">
                    <router-link class="d-flex align-items-center text-decoration-none text-black gap-3 p-2 px-4"
                        :to="{ name: 'Client Account', params: { lang: $i18n.locale } }">
                        <i class="fa-solid fa-user"></i>
                        Account
                    </router-link>
                    <button @click="logOut"
                        class="bg-transparent border-0 d-flex align-items-center fw-bold text-decoration-none text-danger gap-3 p-2 px-4"
                        to="/">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                </div>

            </div>
            <i :class="`fa-solid fa-bars fs-2 menu ${openMenu ? 'open' : ''}`" @click="openMenu = true"></i>
            <i :class="`fa-solid fa-xmark fs-2 close ${openMenu ? 'open' : ''}`" @click="openMenu = false"></i>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
import i18n from '../i18n'

const router = useRouter()
const openMenu = ref(false)
const info = ref([])
const userInfo = ref({})
const openAccountBox = ref(false)

const changeLang = async () => {
    if (i18n.global.locale.value === 'en') {
        i18n.global.locale.value = 'ar'
        document.body.dir = 'rtl'
        localStorage.setItem('lang', i18n.global.locale.value)
        try {
            await router.replace({ params: { lang: i18n.global.locale.value } })
        } catch (error) {
            router.push('/')
        }
    } else {
        i18n.global.locale.value = 'en'
        document.body.dir = 'ltr'
        localStorage.setItem('lang', i18n.global.locale.value)
        // this is very important code for changing the fuckin value in the URL 
        try {
            await router.replace({ params: { lang: i18n.global.locale.value } })
        } catch (error) {
            router.push('/')
        }
    }
}

const logOut = () => {
    localStorage.clear()
    // router.push({
    //     name: "Home",
    //     params: { lang: i18n.global.locale.value }
    // })
    location.reload()
}

onMounted(async () => {
    await axios.get('https://seasonreal.seasonsge.com/appv1real/info')
        .then(data => {
            info.value = data.data[0]
        })
    if (localStorage.getItem("clientLogin")) {
        const login = JSON.parse(localStorage.getItem("clientLogin"))
        if (login.success) {
            axios.get("https://seasonreal.seasonsge.com/appv1real/usersview")
                .then(data => {
                    userInfo.value = data.data.filter(el => el.id == login.id)[0]
                })
        }
    }
})

</script>
<style lang="scss" scoped>
.menu {
    display: none;
}

.close {
    display: none;
}

header {
    .container.not-home {
        border-bottom: 1px solid #e4e4e4;
        padding-bottom: 20px;
    }

    .logo {
        img {
            width: 100px !important;
        }
    }

    .links {
        li {
            a {
                position: relative;
                transition: 0.2s;

                &::before {
                    content: "";
                    position: absolute;
                    transition: 0.2s;
                    width: 0;
                    height: 3px;
                    background-color: var(--blue-color);
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 50px;
                }

                &:hover {
                    color: var(--blue-color) !important;
                }

                &:hover::before {
                    width: 100%;
                }

                &.router-link-active {
                    color: var(--blue-color) !important;

                    &::before {
                        width: 100%;
                    }
                }
            }
        }

        .lang {
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: var(--blue-color);
            }
        }
    }

    .account {
        .box {
            position: absolute;
            top: 120%;
            right: 0;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.377);
        }
    }

    @media (max-width: 991px) {
        .container {
            padding-bottom: 0 !important;
            border: none !important;
        }

        .menu {
            display: block;
            cursor: pointer;

            &.open {
                display: none;
            }
        }

        .close {
            cursor: pointer;

            &.open {
                display: block;
            }
        }

        .links {
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.158);
            position: absolute;
            flex-direction: column;
            background-color: white;
            border-radius: 5px;
            top: -580%;
            width: 90%;
            padding: 20px;
            z-index: 55555;
            gap: 30px !important;
            transition: 0.2s;
            left: 50%;
            transform: translateX(-50%);
            width: 90% !important;

            &.open {
                top: 100%;
            }
        }
    }
}
</style>