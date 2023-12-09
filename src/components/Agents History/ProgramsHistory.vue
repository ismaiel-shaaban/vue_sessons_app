<template>
    <div class="programs-history p-2 py-4">
        <div class="content p-1 bg-white rounded-2">
         
            <div class="responsive-table">
                <div v-for="(item, index) in programsHistory" :key="index">

                    <div class="card w-100 text-center my-2">
                        <div class="card-header d-flex justify-content-between">
                          <span>{{ item.first_name }} </span> <span v-if="item.user">{{ item.user.email }}</span>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">{{ item.booking_id }}</h5>
                          <p class="card-text">Net Total : {{ USDollar.format(item.net) }}</p>
                          <a href="#" class="btn btn-primary">
                            <router-link class="d-block text-center text-decoration-none text-white"
                            :to="{ name: 'Agents Programs Checkout', params: { lang: $i18n.locale, id: item.id, with: 3 } }"
                            @click="handleRouterLinkClick(item)"
                            >
                            Export As PDF  
                            <i class="fa-solid fa-share ms-1"></i>
                        </router-link>
                          </a>
                        </div>
                        <div class="card-footer text-muted">
                            {{ item.registration_date }}
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
                            <td>Country</td>
                            <td>City</td>
                            <td>Include Flights</td>
                            <td>Persons Count</td>
                            <td>Total</td>
                            <td>Tax</td>
                            <td>Agent Discount</td>
                            <td>Net Total</td>
                            <td>Tools</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="programsHistory.length > 0" v-for="(item, index) in programsHistory" :key="index">
                            <td>{{ item.registration_date }}</td>
                            <td>{{ item.booking_id }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone_number }}</td>
                            <td>{{ item.nationality }}</td>
                            <td>{{ item.passport_number }}</td>
                            <td>{{ item.countryName }}</td>
                            <td v-if="item.city">{{ item.city.name_en }}</td>
                            <td>{{ item.Include_flight == '1' ? 'Include Flight' : 'Not Include Flight' }}</td>
                            <td>{{ item.persons_count }}</td>
                            <td>{{ USDollar.format(item.total) }}</td>
                            <td>{{ item.tax }}%</td>
                            <td v-if="item.user">{{ item.user.discount }}%</td>
                            <td>{{ USDollar.format(item.net) }}</td>
                            <td class="d-flex align-items-center flex-column gap-2">
                                <router-link class="d-block text-center text-decoration-none"
                                    :to="{ name: 'Agents Programs Checkout', params: { lang: $i18n.locale, id: item.id, with: 1 } }"
                                    @click="handleRouterLinkClick(item)">
                                    Export As PDF With Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                                <router-link class="d-block text-center text-decoration-none"
                                    :to="{ name: 'Agents Programs Checkout', params: { lang: $i18n.locale, id: item.id, with: 2 } }"
                                    @click="handleRouterLinkClick(item)">
                                    Export As PDF Without Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <h3 v-if="programsHistory.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
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

const programsHistory = ref([])
const loading = ref(false)
const fullTotal = ref(0)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})
const previewPDF = ref(false)

const json_fields = ref({
    "Created At": "registration_date",
    "Reservation Code": "booking_id",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Email Address": "user.email",
    "Phone Number": "phone_number",
    "Nationality": "nationality",
    "Passport Number": "passport_number",
    "Country": "countryName",
    "City": "city.name_en",
    "Persons Count": "persons_count",
    "Include Flights": {
        field: "Include_flight",

        callback: (value) => {
            if (value == '1') {
                return "Include Flights"
            } else return "Not Include Flights"
        }
    },

    // "Departure From": "flight.from.english_name",
    // "Arrival To": "flight.to.english_name",
    // "Departure Date": "flight.departureDate",
    // "Arrival Date": "flight.arrivDate22",
    // "Return From": "flight.to.english_name",
    // "Return To": "flight.from.english_name",
    // "Return Departure Date": "flight.returnStartDate",
    // "Return Arrival Date": "flight.returnEndDate",
    "Total": "total",
    "Tax": "tax",
    "Agent Discount": "user.discount",
    "Net Total": "net",
})

const getTotal = () => {
    fullTotal.value = 0
    programsHistory.value.forEach(el => fullTotal.value += +el.net)
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
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/br-rr?id=${userId.id}`)
            .then(data => {
                if (typeof data.data !== 'string') {
                    programsHistory.value = data.data
                    programsHistory.value.forEach(el => {
                        axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                            .then(data => {
                                el.city = data.data.filter((ele) => ele.id == el.City)[0];
                            })
                        el.persons_count = +el.number_of_adults + +el.number_of_children + +el.number_of_infants
                        const country = new FormData()
                        country.append("country_id", el.country)
                        axios.post(`https://seasonreal.seasonsge.com/appv1real/country-by-id`, country)
                            .then(data => {
                                el.countryName = data.data.country.name_en
                            })
                        axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
                            el.user = data.data.filter((el) => el.id == userId.id)[0];
                        });
                    })
                    loading.value = false
                } else loading.value = false
            })

    }
})
</script>

<style lang="scss" scoped>
.programs-history {
    .content {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    }

    .responsive-table {
        width: 100%;
        overflow: auto;

        table {
            min-width: 1500px;
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