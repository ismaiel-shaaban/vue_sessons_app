<template>
    <div class="cars-search">
        <HeaderComp></HeaderComp>
        <div>
            <div class="search-box p-4 my-5">
                <div v-if="forward === '1'" class="content rounded-1 bg-white">
                    <h2 class="p-3">{{ $t('carRental') }}</h2>
                    <div class="inner p-4">
                        <form class="d-flex gap-4 flex-column">
                            <div class="top d-flex gap-3 flex-md-row flex-column">
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.country') }}:</span>
                                    <select name="arrival in"
                                        :class="`p-2 w-100 rounded-1 px-3 ${validation.country.$error ? 'error' : ''}`"
                                        v-model="searchInfo.country" @change="getCitites($event),
                                        setCountry($event)
                                        ">
                                        <option value="" disabled selected>--Choose--</option>
                                        <option class="text-capitalize" :value="item.id" v-for="(item, index) in countries"
                                            :key="index">
                                            {{ $i18n.locale === 'en' ? item.name_en : item.name }}
                                        </option>
                                    </select>
                                    <span v-if="validation.country.$error" class="text-danger mt-1 d-block fst-italic">
                                        {{ validation.country.required.$message }}
                                    </span>
                                </label>
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.city') }}:</span>
                                    <select name="arrival in"
                                        :class="`p-2 w-100 rounded-1 px-3 ${validation.country.$error ? 'error' : ''}`"
                                        @change="setCity($event)"
                                        v-model="searchInfo.city">
                                        <option value="" disabled selected>--Choose--</option>
                                        <option class="text-capitalize" :value="item.id" v-for="(item, index) in cities"
                                            :key="index">
                                            {{ $i18n.locale === 'en' ? item.name_en : item.name }}
                                        </option>
                                    </select>
                                    <span v-if="validation.country.$error" class="text-danger mt-1 d-block fst-italic">
                                        {{ validation.country.required.$message }}
                                    </span>
                                </label>
                            </div>
                            <div class="middle d-flex gap-3">
                                <label class="w-50">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('carBook.details.fDate') }}:
                                    </span>
                                    <VueDatePicker v-model="searchInfo.fromDate"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        auto-apply />
                                </label>
                                <label class="w-50">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('carBook.details.tDate') }}:
                                    </span>
                                    <VueDatePicker v-model="searchInfo.toDate"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        auto-apply />
                                </label>
                            </div>
                            <span v-if="validation.fromDate.$error" class="text-danger fst-italic d-block mt-2">
                                {{ validation.fromDate.dateValitdation.$message }}
                            </span>
                            <button class="butn p-2 px-3 rounded-1 mt-3" @click.prevent="search">
                                {{ $t('buttons.search') }}
                            </button>
                        </form>
                    </div>
                </div>
                <CarsTable v-else-if="forward === '2'" :searchInfo="searchInfo" @back-ward="forward = '1'"
                    @getIdAndForward="getIdAndForward">
                </CarsTable>
                <CarsDetails :city="city" :country="country" v-else-if="forward === '3'" @back-ward="forward = '2'" :searchInfo="searchInfo" :carId="carId">
                </CarsDetails>
                <Loader v-if="loading"></Loader>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>

<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Loader from '../components/Loader.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import CarsTable from '../components/CarsTable.vue';
import CarsDetails from '../components/CarsDetails.vue';

const city = ref();
const country = ref();
const setCity = (e)=>{
city.value = e.target.options[e.target.selectedIndex].text
console.log(city.value);
}
const setCountry = (e)=>{
country.value = e.target.options[e.target.selectedIndex].text;
console.log(country.value);

}
const cities = ref([]);
const getCitites = async (e) => {
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            cities.value = data.data.filter(el => el.country_id == e.target.value && !el.name.includes("&") && !el.name_en.includes("&"))
        })
}
const loading = ref(false)
const carId = ref('')
const countries = ref([])
const forward = ref('1')
const searchInfo = ref({
    country: '',
    city:'',
    fromDate: new Date(),
    toDate: new Date(),
})


const dateValitdation = () => {
    if (searchInfo.value.fromDate > searchInfo.value.toDate) {
        return false
    } else return true
}

const rules = {
    country: { required: helpers.withMessage("Required Field", required) },
    fromDate: { dateValitdation: helpers.withMessage("From Date Can't Be Bigger Than To Date", dateValitdation) },
}
const validation = useVuelidate(rules, searchInfo)

const getIdAndForward = (id) => {
    // debugger
    forward.value = '3'
    carId.value = id
}

const search = () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        forward.value = '2'
    }
}


onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/country-view")
        .then(data => {
            loading.value = false
            countries.value = data.data.filter(el => !el.name_en.includes("&") && !el.name.includes("&"))
        })
})
</script>

<style lang="scss" scoped>
.cars-search {
    .search-box {

        input,
        select {
            outline: none;
            border: 1px solid darkgray;

            &.error {
                border-color: #dc3545;
            }
        }

        .content {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

            .tabs {
                span {
                    cursor: pointer;
                    transition: 0.2s;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.090);

                    &.active {
                        background-color: var(--blue-color);
                        color: white;
                    }
                }
            }
        }

        @media (max-width: 767px) {
            padding: 10px !important;

            .content {
                .tabs {
                    span {
                        font-size: 12px;
                    }
                }

                .inner {
                    padding: 20px 15px !important;
                }
            }
        }
    }
}
</style>