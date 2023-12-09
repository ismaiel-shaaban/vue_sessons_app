<template>
    <div class="flights-history rounded-2 p-4 d-flex flex-column align-items-md-start align-items-center gap-5">
        <div class="responsive-table">
            <table>
                <thead>
                    <tr>
                        <td>Created At</td>
                        <td>Reservation Code</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Departure From</td>
                        <td>Arrival To</td>
                        <td>Departure Date</td>
                        <td>Arrival Date</td>
                        <td>Return From</td>
                        <td>Return To</td>
                        <td>Return Departure Date</td>
                        <td>Return Arrival Date</td>
                        <td>Tools</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="flightsHistory.length > 0" v-for="(item, index) in flightsHistory" :key="index">
                        <td class="text-center">{{ item.registration_date }}</td>
                        <td>{{ item.booking_id }}</td>
                        <td>{{ item.first_name}}</td>
                        <td>{{ item.last_name}}</td>
                        <td class="text-center" v-if="item.flight && item.flight.from">
                            {{ item.flight.from.english_name }}
                        </td>
                        <td class="text-center" v-if="item.flight && item.flight.to">{{ item.flight.to.english_name }}</td>
                        <td class="text-center" v-if="item.flight">{{ item.flight.departureDate }}</td>
                        <td class="text-center" v-if="item.flight">{{ item.flight.arrivDate22 }}</td>
                        <td class="text-center" v-if="item.flight && item.flight.to">
                            {{ item.flight.to.english_name || '-----' }}
                        </td>
                        <td class="text-center" v-if="item.flight && item.flight.from">
                            {{ item.flight.from.english_name || '-----' }}
                        </td>
                        <td class="text-center" v-if="item.flight">
                            {{ item.flight.returnStartDate || '-----'}}
                        </td>
                        <td class="text-center" v-if="item.flight">
                            {{ item.flight.returnEndDate || '-----' }}
                        </td>
                        <td>
                            <router-link class="d-block text-center text-decoration-none text-nowrap px-3"
                                :to="{ name: 'Flights Checkout', params: { lang: $i18n.locale, id: item.id } }">
                                Export As PDF
                                <i class="fa-solid fa-share ms-1"></i>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 v-if="flightsHistory.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Loader from '../Loader.vue';



const flightsHistory = ref([])
const loading = ref(false)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})


onMounted(async () => {
    loading.value = true
    if (localStorage.getItem("clientLogin")) {
        const userId = JSON.parse(localStorage.getItem("clientLogin"))
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
            .then(data => {
                if (typeof data.data !== 'string') {
                    flightsHistory.value = data.data
                    flightsHistory.value.forEach(el => {
                        axios.get(`https://seasonreal.seasonsge.com/appv1real/flights?flight_id=${el.flight_number}`)
                            .then(data => {
                                el.flight = data.data
                                const from = new FormData()
                                const to = new FormData()
                                from.append("id", el.flight.fromAirport)
                                axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", from)
                                    .then(data => {
                                        data.data.data ?el.flight.from = data.data.data:''
                                    })
                                to.append("id", el.flight.toAirport)
                                axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", to)
                                    .then(data => {
                                        data.data.data? el.flight.to = data.data.data:''
                                    })
                                loading.value = false
                            })
                    })
                } else loading.value = false
            })
    }
})


</script>
<style lang="scss" scoped>
.flights-history {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.438);

    .responsive-table {
        overflow: auto !important;
        width: 100%;

        table {
            min-width: 2000px;
            max-width: 100%;

            td {
                padding: 10px 15px;
                border: 1px solid darkgray;

                a {
                    background-color: #ce0000;
                    color: white;
                    border: none;
                    padding: 8px;
                    width: 100%;
                    font-weight: 500;
                    border-radius: 50px;
                    transition: 0.2s;

                    &:hover {
                        background-color: #dd1515;
                    }
                }
            }

            thead {
                td {
                    background-color: darkgray;
                    color: white;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>