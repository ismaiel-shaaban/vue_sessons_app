<template>
    <div class="programmes">
        <HeaderComp></HeaderComp>
        <div class="programmes-page py-5 min-vh-100">
            <div class="container">
                <div class="filteration d-flex align-items-center flex-wrap gap-4">
                    <div class="d-flex gap-3 align-items-center">
                        <i class="fa-solid fa-filter"></i>
                        <select name="filter" class="p-2 px-3 rounded-1 fw-semibold w-100" v-model="filter">
                            <option value="all" class="fw-semibold">
                                {{ $t('programs.filterTool.filter[0]') }}
                            </option>
                            <option value="include flight" class="fw-semibold">
                                {{ $t('programs.filterTool.filter[1]') }}
                            </option>
                            <option value="not include flight" class="fw-semibold">
                                {{ $t('programs.filterTool.filter[2]') }}
                            </option>
                        </select>
                    </div>
                    <span :class="`d-block text-muted ${$i18n.locale === 'en' ? 'ms-auto' : 'me-auto'}`">
                        {{ $t('programs.filterTool.results') }}: {{ filteration.length }}
                    </span>
                </div>
                <div class="program-boxes mt-5">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-4" v-for="(item, index) in filteration" :key="index">
                            <div class="box rounded-1 d-flex flex-column h-100">
                                <router-link class="img-cont"
                                    :to="{ name: 'Program Details', params: { programId: item.id } }">
                                    <img class="img-fluid rounded-1" v-if="item.main_image !== ''"
                                        :src="`https://seasonreal.seasonsge.com/upload/${item.main_image}`" alt="">
                                    <img v-else class="img-fluid rounded-1" src="https://placehold.co/500x300?text=?" style="object-fit: cover;" alt="">
                                </router-link>
                                <div class="inner-box flex-fill p-3 d-flex flex-column justify-content-between">
                                    <div class="box-txt">
                                        <h3 class="mb-3 text-capitalize" v-if="item.destination">
                                            {{ $i18n.locale === 'en' ? item.destination.name_en : item.destination.name }}
                                        </h3>
                                        <p class="text-muted fw-bold mb-1">
                                            {{ $i18n.locale === 'en' ? item.program_title_english :
                                                item.program_title_arabic }}
                                        </p>
                                        <span class="text-black-50 fw-bold d-block">
                                            {{ item.num_of_days }} {{ $t('programs.cardInfo.days') }} &
                                            {{ item.num_of_nights }} {{ $t('programs.cardInfo.nights') }}
                                        </span>
                                    </div>
                                    <router-link class="fw-semibold mt-4"
                                        :to="{ name: 'Program Details', params: { programId: item.id } }">
                                        {{ $t('buttons.readMore') }}
                                        {{ $i18n.locale === 'en' ? '&rightarrow;' : '&leftarrow;' }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterComp></FooterComp>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import Loader from '../components/Loader.vue'

const loading = ref(false)
const allPrograms = ref([])
const filter = ref('all')

const filteration = computed(() => {
    if (filter.value === 'all') {
        return allPrograms.value
    } else if (filter.value === 'include flight') {
        return allPrograms.value.filter(el => el.includes_flight == '1')
    } else {
        return allPrograms.value.filter(el => el.includes_flight == '0')
    }
})

onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/all-program")
        .then(data => {
            data.data.filter(el => {
                if (el.includes_flight == '0' || (el.includes_flight == '1' && el.from_date >= new Date().toLocaleDateString('en-CA'))) {
                    allPrograms.value.push(el)
                }
            })
            loading.value = false
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            allPrograms.value.forEach(el => {
                el.destination = data.data.filter(ele => ele.id === el.return_airline)[0]
            })
        })
})

</script>
<style lang="scss" scoped>
header {
    .container {
        border: 1px solid red;
    }
}

.programmes-page {
    select {
        border: 1px solid gray;
        outline: none;
    }

    .program-boxes {
        .box {
            box-shadow: 0 0 10px #00000031;
            transition: 0.2s;

            &:hover {
                transform: scale(1.05);
            }

            .img-cont {
                height: 300px;
                overflow: hidden;
            }

            img {
                border-bottom-left-radius: 0px !important;
                border-bottom-right-radius: 0px !important;
                height: 100%;
                width: 100%;
            }

            .inner-box {
                .box-txt {
                    h3 {
                        color: var(--blue-color);
                    }
                }

                a {
                    transition: 0.2s;
                    color: var(--orange-color);

                    &:hover {
                        color: #fdb89a;
                    }
                }
            }
        }
    }
}
</style>