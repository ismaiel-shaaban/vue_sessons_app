<template>
    <div class="flights-history p-2 py-4">
        <div class="content p-1 bg-white rounded-2">
         
            <div class="responsive-table">
                <div v-for="(item, index) in flightsHistory" :key="index">

                    <div class="card w-100 text-center my-2">
                        <div class="card-header d-flex justify-content-between">
                          <span>{{ item.first_name }} </span> <span v-if="item.user">{{ item.user.email }}</span>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">{{ item.booking_id }}</h5>
                          <p class="card-text">Net Total : {{ USDollar.format(item.net_total) }}</p>
                          <a href="#" class="btn btn-primary">
                            <router-link class="d-block text-center text-decoration-none text-white"
                            :to="{ name: 'Agents Flights Checkout', params: { lang: $i18n.locale, id: item.id, with: 3 } }"
                            @click="handleRouterLinkClick(item)"
                            >
                            Export As PDF  
                            <i class="fa-solid fa-share ms-1"></i>
                        </router-link>
                          </a>
                        </div>
                        <div class="card-footer text-muted">
                            {{ item.created_at }}
                        </div>
                      </div>
                </div>
                <!-- <table>
                    <thead>
                        <tr>
                            <td>Created At</td>
                            <td>Reservation Code</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Nationality</td>
                            <td>Passport Number</td>
                            <td>Departure From</td>
                            <td>Arrival To</td>
                            <td>Departure Date</td>
                            <td>Arrival Date</td>
                            <td>Return From</td>
                            <td>Return To</td>
                            <td>Return Departure Date</td>
                            <td>Return Arrival Date</td>
                            <td>Total</td>
                            <td>Tax</td>
                            <td>Agent Discount</td>
                            <td>Net Total</td>
                            <td>Tools</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="flightsHistory.length > 0" v-for="(item, index) in flightsHistory" :key="index">
                            <td class="text-center">{{ item.registration_date }}</td>
                            <td>{{ item.booking_id }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone_number }}</td>
                            <td>{{ item.nationality }}</td>
                            <td>{{ item.passport_number }}</td>
                            <td class="text-center" v-if="item.flight && item.flight.from">
                                {{ item.flight.from.english_name }}
                            </td>
                            <td class="text-center" v-if="item.flight && item.flight.to">{{ item.flight.to.english_name }}
                            </td>
                            <td class="text-center" v-if="item.flight">{{ item.flight.departureDate }}</td>
                            <td class="text-center" v-if="item.flight">{{ item.flight.arrivDate22 }}</td>
                            <td class="text-center" v-if="item.flight && item.flight.to">
                                {{ item.flight.to.english_name || '-----' }}
                            </td>
                            <td class="text-center" v-if="item.flight && item.flight.from">
                                {{ item.flight.from.english_name || '-----' }}
                            </td>
                            <td class="text-center" v-if="item.flight">
                                {{ item.flight.returnStartDate || '-----' }}
                            </td>
                            <td class="text-center" v-if="item.flight">
                                {{ item.flight.returnEndDate || '-----' }}
                            </td>
                            <td>{{ USDollar.format(item.total) }}</td>
                            <td v-if="item.flight">{{ item.flight.tax }}%</td>
                            <td v-if="item.user">{{ item.user.discount }}%</td>
                            <td>{{ USDollar.format(item.net_total) }}</td>
                            <td class="d-flex align-items-center flex-column gap-2">
                                <router-link class="d-block text-center text-decoration-none text-nowrap px-3"
                                    :to="{ name: 'Agents Flights Checkout', params: { lang: $i18n.locale, id: item.id, with: 1 } }"
                                    @click="handleRouterLinkClick(item)">
                                    Export As PDF With Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                                <router-link class="d-block text-center text-decoration-none text-nowrap px-3"
                                    :to="{ name: 'Agents Flights Checkout', params: { lang: $i18n.locale, id: item.id, with: 2 } }"
                                    @click="handleRouterLinkClick(item)">
                                    Export As PDF Without Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <h3 v-if="flightsHistory.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Loader from '../Loader.vue';
import JsonExcel from "vue-json-excel3";



const flightsHistory = ref([])
const loading = ref(false)
const fullTotal = ref(0)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})

const json_fields = ref({
    "Created At": "registration_date",
    "Reservation Code": "booking_id",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Email Address": "user.email",
    "Phone Number": "phone_number",
    "Nationality": "nationality",
    "Passport Number": "passport_number",
    "Departure From": "flight.from.english_name",
    "Arrival To": "flight.to.english_name",
    "Departure Date": "flight.departureDate",
    "Arrival Date": "flight.arrivDate22",
    "Return From": "flight.to.english_name",
    "Return To": "flight.from.english_name",
    "Return Departure Date": "flight.returnStartDate",
    "Return Arrival Date": "flight.returnEndDate",
    "Total": "total",
    "Tax": "flight.tax",
    "Agent Discount": "user.discount",
    "Net Total": "net_total",
})


const getTotal = () => {
    fullTotal.value = 0
    flightsHistory.value.forEach(el => fullTotal.value += +el.net_total)
    // if (searchInput.value !== '') {
    //     filteration.value.forEach(el => fullTotal.value += +el.net_amount)
    // } else if (filterList.value.length > 0) {
    //     filterList.value.forEach(el => fullTotal.value += +el.net_amount)
    // } else carsHistory.value.forEach(el => fullTotal.value += +el.net_amount)
}
const handleRouterLinkClick = (item) => {


sessionStorage.setItem('Tax' , item.tax)
sessionStorage.setItem('myNetTotal', item.net_amount);
sessionStorage.setItem('Total', item.total);
sessionStorage.setItem('agentDicount', item.user.discount );


}

onMounted(async () => {
    loading.value = true
    if (localStorage.getItem("login")) {
        const userId = JSON.parse(localStorage.getItem("login"))
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
            .then(data => {
                if (typeof data.data !== 'string') {
                    flightsHistory.value = data.data
                    console.log('1111111' , flightsHistory.value);
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
                        axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
                            el.user = data.data.filter((el) => el.id == userId.id)[0];
                        });
                    })
                } else loading.value = false
            })
    }
})


</script>
<style lang="scss" scoped>
.flights-history {
    .content {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    }

    .responsive-table {
        width: 100%;
        overflow: auto;

        table {
            min-width: 2000px;
            max-width: 100%;

            td {
                padding: 10px 15px;
                border: 1px solid darkgray;
                white-space: nowrap;

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