<template>
    <div class="flight-tab-two p-4">
        <div v-if="forward === '1'" class="content rounded-1 bg-white">
            <div class="tabs d-flex text-center fw-semibold align-items-center">
                <span :class="`p-2 d-block w-50 ${searchInfo.allow_return === '1' ? 'active' : ''}`"
                    @click="searchInfo.allow_return = '1';
                    storeReturnTravel()
                    ">
                    {{ $t('flightReservation.searchBar.trip[0]') }}
                </span>
                <span :class="`p-2 d-block w-50 ${searchInfo.allow_return === '0' ? 'active' : ''}`"
                    @click="searchInfo.allow_return = '0';
                    storeNoReturnTravel()
                    ">
                    {{ $t('flightReservation.searchBar.trip[1]') }}
                </span>
            </div>
            <div class="inner p-4">
                <form class="d-flex gap-4 flex-column">
                    <div class="top d-flex gap-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.from') }}:</span>
                            <select name="going from"
                                :class="`p-2 w-100 rounded-1 px-3 ${validation.departure_from.$error ? 'error' : ''}`"
                                v-model="searchInfo.departure_from">
                                <option value="" disabled selected>--Choose--</option>
                                <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                    {{ $i18n.locale === 'en' ? item.english_name : item.arabic_name }}
                                </option>
                            </select>
                            <span v-if="validation.departure_from.$error" class="text-danger mt-1 fst-italic d-block w-100">
                                {{ validation.departure_from.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                            </span>
                        </label>

                        <i class="fa-solid fa-arrow-right-arrow-left arrow" @click="exchangeSelectValues"></i>

                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.to') }}:</span>
                            <select name="arrival in"
                                :class="`p-2 w-100 rounded-1 px-3 ${validation.arrival_to.$error ? 'error' : ''}`"
                                v-model="searchInfo.arrival_to">
                                <option value="" disabled selected>--Choose--</option>
                                <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                    {{ $i18n.locale === 'en' ? item.english_name : item.arabic_name }}
                                </option>
                            </select>
                            <span v-if="validation.arrival_to.$error" class="text-danger mt-1 fst-italic d-block w-100">
                                {{ validation.arrival_to.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                            </span>
                        </label>
                    </div>
                    <div class="middle d-flex gap-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.fDate') }}:</span>
                            <VueDatePicker v-model="searchInfo.start_date"
                                :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false" auto-apply
                                :day-class="departureDates" />
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t('flightReservation.searchBar.tDate') }}:
                                <i v-if="searchInfo.allow_return === '0'" class="fa-solid fa-xmark text-danger ms-1"></i>
                            </span>
                            <VueDatePicker v-model="searchInfo.end_date" :disabled="searchInfo.allow_return === '0'"
                                :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false" auto-apply
                                :day-class="returnDates" />
                        </label>
                    </div>
                    <div class="bottom position-relative d-flex gap-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.adults') }}:</span>
                            <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                v-model="searchInfo.no_adults" min="1">
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.children') }}:</span>
                            <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                v-model="searchInfo.no_children" min="0">
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.infants') }}:</span>
                            <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                v-model="searchInfo.no_infants" min="0">
                        </label>
                    </div>
                    <span v-if="numValidation" class="error text-danger w-100 d-block fst-italic">
                        Number Of Persons Can't Be More Than 10
                    </span>
                    <button class="butn p-2 px-3 rounded-1" @click.prevent="searching">
                        {{ $t('buttons.search') }}
                    </button>
                </form>
            </div>
        </div>
        <FlightTableComp v-else-if="forward === '2'" :searchResults="searchResults" :suggestions="suggestions"
            :searchInfo="searchInfo" @back-ward="() => { forward = '1', searchResults = [], suggestions = [] }"
            @getIdAndForward="getIdAndForward"></FlightTableComp>
        <FlightBookComp v-else-if="forward === '3'" @back-ward="forward = '2'" :flightId="flightId" :searchInfo="searchInfo"
            :searchResults="searchResults.length > 0 ? searchResults : suggestions"></FlightBookComp>
        <Loader v-if="loading"></Loader>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted} from 'vue'
import axios from 'axios';
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FlightTableComp from './FlightTableComp.vue'
import FlightBookComp from './FlightBookComp.vue'
import Loader from '../Loader.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';

onUnmounted(() => {
   localStorage.removeItem('return'); 
   sessionStorage.removeItem('return'); 
});

const allFlights = ref([])
const flightDates = ref({
    departureDates: [],
    returnDates: [],
});
const loading = ref(false)
const airPorts = ref([])
const searchInfo = ref({
    departure_from: '',
    arrival_to: '',
    start_date: new Date(),
    end_date: new Date(),
    no_infants: 0,
    no_children: 0,
    no_adults: 1,
    allow_return: '1'
})

const forward = ref('1')
const searchResults = ref([])
const suggestions = ref([])
const flightId = ref('')
const getIdAndForward = (id) => {
    forward.value = '3'
    flightId.value = id
}

const rules = {
    arrival_to: { required },
    departure_from: { required },
}


const validation = useVuelidate(rules, searchInfo)

const numValidation = computed(() => {
    if ((searchInfo.value.no_infants + searchInfo.value.no_children + searchInfo.value.no_adults) > 10) {
        return true
    } else return false
})


// For Date Package ♥ 
const departureDates = (date) => {
    if (flightDates.value.departureDates.includes(date.toLocaleDateString())) {
        return "marked-cell"
    } else return ''
}
const returnDates = (date) => {
    if (flightDates.value.returnDates.includes(date.toLocaleDateString())) {
        return "marked-cell"
    } else return ''
}



const searching = async () => {
    validation.value.$validate()
    if (!validation.value.$error && !numValidation.value) {
        loading.value = true
        const returnDate = ref('')
        if (searchInfo.value.allow_return == '1') {
            returnDate.value = searchInfo.value.end_date.toLocaleDateString("en-CA")
        } else {
            returnDate.value = '0'
        }

        allFlights.value.forEach(el => {
            if(el.numTickets >0){

                if (searchInfo.value.allow_return == '1') {
                    if (el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children) &&
                        el.numReturnTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children) &&
                        el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                        el.returnStartDate >= new Date().toLocaleDateString("en-CA") &&
                        el.fromAirport == searchInfo.value.departure_from &&
                        el.toAirport == searchInfo.value.arrival_to &&
                        el.allowReturn == searchInfo.value.allow_return) {
                        suggestions.value.push(el);
                    }
    
                    if (el.departureDate == searchInfo.value.start_date.toLocaleDateString("en-CA") &&
                        el.returnStartDate == returnDate.value &&
                        el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                        el.fromAirport == searchInfo.value.departure_from &&
                        el.toAirport == searchInfo.value.arrival_to &&
                        el.allowReturn == searchInfo.value.allow_return &&
                        el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children) &&
                        el.numReturnTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children)) {
                        searchResults.value.push(el)
                        forward.value = '2'
                        loading.value = false
                    } else {
                        forward.value = '2'
                        loading.value = false
                    }
                } else {
                    if (el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children) &&
                        el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                        el.fromAirport == searchInfo.value.departure_from &&
                        el.toAirport == searchInfo.value.arrival_to &&
                        el.allowReturn == searchInfo.value.allow_return) {
                        suggestions.value.push(el);
                    }
                    if (el.departureDate == searchInfo.value.start_date.toLocaleDateString("en-CA") &&
                        el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                        el.fromAirport == searchInfo.value.departure_from &&
                        el.toAirport == searchInfo.value.arrival_to &&
                        el.allowReturn == searchInfo.value.allow_return &&
                        el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children)) {
                        searchResults.value.push(el)
                        forward.value = '2'
                        loading.value = false
                    } else {
                        forward.value = '2'
                        loading.value = false
                    }
                }
            }
        })
        await axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view")
            .then(data => {
                if (data.data.success) {
                    searchResults.value.forEach(el => {
                        el.airLine = data.data.airlines.filter(ele => el.flightLine == ele.id)[0]
                    })
                    suggestions.value.forEach(el => {
                        el.airLine = data.data.airlines.filter(ele => el.flightLine == ele.id)[0]
                    })
                    loading.value = false
                }
            })
        await axios.get('https://seasonreal.seasonsge.com/appv1real/viewAirports').then(data => {
            if (data.data.success) {
                searchResults.value.forEach(el => {
                    el.from = data.data.data.filter(ele => el.fromAirport == ele.id)[0]
                    el.to = data.data.data.filter(ele => el.toAirport == ele.id)[0]
                })
                suggestions.value.forEach(el => {
                    el.from = data.data.data.filter(ele => el.fromAirport == ele.id)[0]
                    el.to = data.data.data.filter(ele => el.toAirport == ele.id)[0]
                })
                loading.value = false
            }
        })
    }
}

let storeReturnTravel = ()=>{
    sessionStorage.setItem('return' , 1);
}

let storeNoReturnTravel = () =>{
    sessionStorage.setItem('return' , 0)
}
let returnTravelValue = ref ();
onMounted(async () => {
returnTravelValue.value = sessionStorage.getItem('return') ? sessionStorage.getItem('return') : 1;
console.log(returnTravelValue.value); 
    loading.value = true
    await axios.get('https://seasonreal.seasonsge.com/appv1real/viewAirports').then(data => {
        if (data.data.success) {
            airPorts.value = data.data.data
            loading.value = false
        }
    })

    await axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all")
        .then(data => {
            allFlights.value = data.data
            console.log('iam all flights');
            console.log(allFlights.value);
            data.data.forEach(el => {
                if (el.departureDate >= new Date().toLocaleDateString('en-CA') &&
                    el.returnStartDate >= new Date().toLocaleDateString('en-CA')) {
                    flightDates.value.departureDates.push(new Date(el.departureDate).toLocaleDateString())
                    flightDates.value.returnDates.push(new Date(el.returnStartDate).toLocaleDateString())
                }
            })
        })
})

const exchangeSelectValues = () => {
    const tempValue = searchInfo.value.departure_from;
    searchInfo.value.departure_from = searchInfo.value.arrival_to;
    searchInfo.value.arrival_to = tempValue;
};
</script>

<style lang="scss" scoped>
.flight-tab-two {
    .content {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

        .tabs {
            span {
                cursor: pointer;
                transition: 0.2s;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.090);

                &.active {
                    border-bottom: var(--blue-color) 3px solid;
                    font-weight: bold;
                 
                   
                }
            }
        }

        .inner {
            form {
                select {
                    outline: none;
                    border: 1px solid darkgray;

                    &.error {
                        border: 1px solid #dc3545 !important;
                    }
                }

                input {
                    outline: none;
                    border: 1px solid darkgray;

                    &.error {
                        border: 1px solid #dc3545 !important;
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        padding: 10px !important;

        .inner {
            padding: 20px 15px !important;
        }
    }

    .arrow {
        margin-top: 40px;
        cursor: pointer;
    }
}
</style>