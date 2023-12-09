<template>
    <div class="flight-book-page w-100">
        <HeaderComp></HeaderComp>
        <div class="container min-vh-100">
            <h2 class="my-4 mb-5">
                {{ $t('flightReservation.heading') }}
            </h2>
            <div class="flight-reservation pb-5">
                <div v-if="forward === '1'" class="content rounded-1 bg-white w-100">
                    <div class="tabs d-flex text-center fw-semibold align-items-center">
                        <!--round way-->
                        <span :class="`p-3 d-block w-50 ${searchInfo.allow_return === '1' ? 'active' : ''}`"
                            @click="searchInfo.allow_return = '1' ,
                            roundWay();
                            
                            ">
                            {{ $t('flightReservation.searchBar.trip[0]') }}
                        </span>
                        <!--one way-->
                        <span :class="`p-3 d-block w-50 ${searchInfo.allow_return === '0' ? 'active' : ''}`"
                            @click="searchInfo.allow_return = '0',
                            oneWay();
                            
                            ">
                            {{ $t('flightReservation.searchBar.trip[1]') }}
                        </span>
                    </div>
                    <div class="inner p-4">
                        <form class="d-flex gap-4 flex-column">
                            <div class="top d-flex gap-3 flex-md-row flex-column">
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.from') }}:
                                    </span>
                                    <select name="going from"
                                        :class="`p-2 w-100 rounded-1 px-3 ${validation.departure_from.$error ? 'error' : ''}`"
                                        v-model="searchInfo.departure_from">
                                        <option value="" disabled selected>--Choose--</option>
                                        <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                            {{
                                                $i18n.locale === 'en' ? item.english_name : item.arabic_name
                                            }}
                                        </option>
                                    </select>
                                    <span v-if="validation.departure_from.$error"
                                        class="text-danger mt-1 fst-italic d-block w-100">
                                        {{
                                            validation.departure_from.$errors[0].$validator === 'required' ? 'Field Required' :
                                            ''
                                        }}
                                    </span>
                                </label>

                                <i class="fa-solid fa-arrow-right-arrow-left arrow" @click="exchangeSelectValues"></i>

                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.searchBar.to')
                                    }}:</span>
                                    <select name="arrival in"
                                        :class="`p-2 w-100 rounded-1 px-3 ${validation.arrival_to.$error ? 'error' : ''}`"
                                        v-model="searchInfo.arrival_to">
                                        <option value="" disabled selected>--Choose--</option>
                                        <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                            {{
                                                $i18n.locale === 'en' ? item.english_name : item.arabic_name
                                            }}
                                        </option>
                                    </select>
                                    <span v-if="validation.arrival_to.$error"
                                        class="text-danger mt-1 fst-italic d-block w-100">
                                        {{
                                            validation.arrival_to.$errors[0].$validator === 'required' ? 'Field Required' : ''
                                        }}
                                    </span>
                                </label>
                            </div>
                            <div class="middle d-flex gap-3">
                                <label class="w-50">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.fDate') }}:
                                    </span>
                                    <VueDatePicker v-model="searchInfo.start_date"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        auto-apply :day-class="departureDates" />
                                </label>
                                <label class="w-50">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.tDate') }}:
                                        <i v-if="searchInfo.allow_return === '0'"
                                            class="fa-solid fa-xmark text-danger ms-1"></i>
                                    </span>
                                    <VueDatePicker v-model="searchInfo.end_date" :disabled="searchInfo.allow_return === '0'"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        auto-apply :day-class="returnDates" />
                                </label>
                            </div>
                            <div class="bottom position-relative d-flex gap-3">
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.adults') }}:
                                    </span>
                                    <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                        v-model="searchInfo.no_adults" min="1">
                                </label>
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.children') }}:
                                    </span>
                                    <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                        v-model="searchInfo.no_children" min="0">
                                </label>
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">
                                        {{ $t('flightReservation.searchBar.infants') }}:
                                    </span>
                                    <input :class="`p-2 rounded-1 px-3 w-100 ${numValidation ? 'error' : ''}`" type="number"
                                        v-model="searchInfo.no_infants" min="0">
                                </label>
                            </div>
                            <span v-if="numValidation" class="error text-danger w-100 d-block fst-italic">
                                Number Of Persons Can't Be More Than 10
                            </span>
                            <button class="butn p-2 px-3 rounded-1" @click.prevent="searching">{{ $t('buttons.search')
                            }}</button>
                        </form>
                    </div>
                </div>
                <FlightTable v-else-if="forward === '2'" :searchResults="searchResults" :suggestions="suggestions"
                    :searchInfo="searchInfo" @back-ward="() => { forward = '1', searchResults = [], suggestions = [] }"
                    @getIdAndForward="getIdAndForward" :flightData="allFlights">
                </FlightTable>
                <FlightDetails v-else-if="forward === '3'" @back-ward="forward = '2'" :flightId="flightId"
                    :searchInfo="searchInfo" :searchResults="searchResults.length > 0 ? searchResults : suggestions">
                </FlightDetails>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
        <FooterComp></FooterComp>
    </div>
</template>

<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import FlightTable from '../components/FlightTable.vue';
import FlightDetails from '../components/FlightDetails.vue';
import { ref, onMounted, computed , onUnmounted } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from 'axios'
import Loader from '../components/Loader.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';

onUnmounted(() => {
   localStorage.removeItem('return');
   sessionStorage.removeItem('return');
});

const loading = ref(false)
const allFlights = ref([])
const flightDates = ref({
    departureDates: [],
    returnDates: [],
});
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
        if (searchInfo.value.allow_return === '1') {
            returnDate.value = searchInfo.value.end_date.toLocaleDateString("en-CA")
        } else {
            returnDate.value = '0'
        }

        allFlights.value.forEach(el => {
            // if (el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children) &&
            //     el.departureDate >= new Date().toLocaleDateString("en-CA") &&
            //     el.returnStartDate >= new Date().toLocaleDateString("en-CA")) {
            //     suggestions.value.push(el);
            // }
            // if (el.departureDate == searchInfo.value.start_date.toLocaleDateString("en-CA") &&
            //     el.returnStartDate == returnDate.value &&
            //     el.fromAirport == searchInfo.value.departure_from &&
            //     el.toAirport == searchInfo.value.arrival_to &&
            //     el.allowReturn == searchInfo.value.allow_return &&
            //     el.numTickets >= (searchInfo.value.no_adults + searchInfo.value.no_children)) {
            //     searchResults.value.push(el)
            //     forward.value = '2'
            //     loading.value = false
            // } else {
            //     forward.value = '2'
            //     loading.value = false
            // }
            if(el.numTickets > 0){

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
                         el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                        el.returnStartDate == returnDate.value &&
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
                        el.airLine = data.data.airlines.filter(ele => el.flightLine === ele.id)[0]
                    })
                    suggestions.value.forEach(el => {
                        el.airLine = data.data.airlines.filter(ele => el.flightLine === ele.id)[0]
                    })
                    loading.value = false
                }
                // console.log(data)
            })
        await axios.get('https://seasonreal.seasonsge.com/appv1real/viewAirports').then(data => {
            if (data.data.success) {
                searchResults.value.forEach(el => {
                    el.from = data.data.data.filter(ele => el.fromAirport === ele.id)[0]
                    el.to = data.data.data.filter(ele => el.toAirport === ele.id)[0]
                })
                suggestions.value.forEach(el => {
                    el.from = data.data.data.filter(ele => el.fromAirport === ele.id)[0]
                    el.to = data.data.data.filter(ele => el.toAirport === ele.id)[0]
                })
                loading.value = false
            }
        })
        // console.log(data.data)
    }
}


onMounted(async () => {

    loading.value = true
    await axios.get('https://seasonreal.seasonsge.com/appv1real/viewAirports').then(data => {
        if (data.data.success) {
            airPorts.value = data.data.data
            loading.value = false
        }
    })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all")
        .then(data => {
            // console.log(data)
            allFlights.value = data.data
            data.data.forEach(el => {
                if (el.departureDate >= new Date().toLocaleDateString('en-CA') &&
                    el.returnStartDate >= new Date().toLocaleDateString('en-CA')) {
                    flightDates.value.departureDates.push(new Date(el.departureDate).toLocaleDateString())
                    flightDates.value.returnDates.push(new Date(el.returnStartDate).toLocaleDateString())
                }
            })
        })
    console.log(allFlights)
})

const exchangeSelectValues = () => {
    const tempValue = searchInfo.value.departure_from;
    searchInfo.value.departure_from = searchInfo.value.arrival_to;
    searchInfo.value.arrival_to = tempValue;
};
const oneWay = ()=>{
    sessionStorage.setItem('return' , 0);
    localStorage.setItem('return' , 0);
}
const roundWay = ()=>{
    sessionStorage.setItem('return' , 1);
    localStorage.setItem('return' , 1);
}
</script>

<style lang="scss" scoped>
.flight-book-page {
    .container {
        max-width: 100%;
    }

    .flight-boxes {

        .box {
            box-shadow: 0 0 10px #00000038;
            transition: 0.2s;

            &:hover {
                transform: scale(1.05);
            }

            .img-cont {
                img {
                    object-fit: cover;
                }
            }

            .text {
                h2 {
                    color: var(--blue-color);
                }
            }

            a {
                color: var(--orange-color);
            }
        }
    }

    .flight-reservation {
        .content {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.164);
            width: 850px;
            margin: auto;
            max-width: 100%;

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
    }


    @media (max-width: 767px) {
        .content {
            .middle {
                flex-direction: column;

                label {
                    width: 100% !important;
                }
            }

            .bottom {
                flex-direction: column;
            }
        }

    }

    .arrow {
        margin-top: 40px;
        cursor: pointer;
    }
}
</style>