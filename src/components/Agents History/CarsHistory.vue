<template>
    <div class="cars-history p-2 py-4">
        <div class="content p-1 bg-white rounded-2">
           
            <div class="responsive-table">
                <div v-for="(item, index) in carsHistory" :key="index">

                    <div class="card w-100 text-center my-2">
                        <div class="card-header d-flex justify-content-between">
                          <span>{{ item.first_name }} </span> <span v-if="item.user">{{ item.user.email }}</span>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">{{ item.random_code }}</h5>
                          <p class="card-text">Net Total : {{ USDollar.format(item.net_amount) }}</p>
                          <a href="#" class="btn btn-primary">
                            <router-link class="d-block text-center text-decoration-none text-white"
                            :to="{ name: 'Agents Cars Checkout', params: { lang: $i18n.locale, id: item.id, with: 3 } }"
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
                            <td>Car Type</td>
                            <td>Driver</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td>Number Of Days</td>
                            <td>Notes</td>
                            <td>Total</td>
                            <td>Tax</td>
                            <td>Agent Discount</td>
                            <td>Net Total</td>
                            <td>Tools</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="carsHistory.length > 0" v-for="(item, index) in carsHistory" :key="index">
                            <td>{{ item.created_at }}</td>
                            <td>{{ item.random_code }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone_number }}</td>
                            <td v-if="item.carType">
                                {{ $i18n.locale === 'en' ? item.carType.name_en : item.carType.name }}
                            </td>
                            <td v-else>--------</td>
                            <td>
                                {{ item.with_driver === '0' ? 'Without Driver' : 'With Driver' }}
                            </td>
                            <td>{{ item.start_date }}</td>
                            <td>{{ item.end_date }}</td>
                            <td>{{ item.number_of_days }}</td>
                            <td>{{ item.notes }}</td>
                            <td>{{ USDollar.format(item.total) }}</td>
                            <td>{{ item.tax }}%</td>
                            <td v-if="item.user">{{ item.user.discount }}%</td>
                            <td>{{ USDollar.format(item.net_amount) }}</td>
                            <td class="d-flex align-items-center flex-column gap-2">
                                <router-link class="d-block text-center text-decoration-none"
                                    :to="{ name: 'Agents Cars Checkout', params: { lang: $i18n.locale, id: item.id, with: 1 } }"
                                    @click="handleRouterLinkClick(item)"
                                    >
                                    Export As PDF With Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                                <router-link class="d-block text-center text-decoration-none"
                                    :to="{ name: 'Agents Cars Checkout', params: { lang: $i18n.locale, id: item.id, with: 2 } }"
                                    @click="handleRouterLinkClick(item)"
                                    >
                                    Export As PDF Without Price
                                    <i class="fa-solid fa-share ms-1"></i>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
               
               
                <h3 v-if="carsHistory.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
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


const carsHistory = ref([])
const loading = ref(false)
const fullTotal = ref(0)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})
const previewPDF = ref(false)

const json_fields = ref({
    "Created At": "created_at",
    "Reservation Code": "random_code",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Email Address": "user.email",
    "Phone Number": "phone_number",
    "Car Type": "carType.name_en",
    "Driver": {
        field: "with_driver",
        callback: (value) => {
            if (value == '0') {
                return 'Without Driver'
            } else return 'With Driver'
        }
    },
    "Start Date": "start_date",
    "End Date": "end_date",
    "Number Of Days": "number_of_days",
    "Notes": "notes",
    "Total": "total",
    "Tax": "tax",
    "Agent Discount": "user.discount",
    "Net Total": "net_amount",
})

const getTotal = () => {
    fullTotal.value = 0
    carsHistory.value.forEach(el => fullTotal.value += +el.net_amount)
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
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/car-rr?id=${userId.id}`)
            .then(data => {
                if (typeof data.data !== 'string') {
                    carsHistory.value = data.data
                    carsHistory.value.forEach(ele => {
                        axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view")
                            .then(data => {
                                ele.carType = data.data.filter(el => el.id == +ele.type_id)[0]
                                loading.value = false
                            })
                        axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
                            ele.user = data.data.filter((el) => el.id == userId.id)[0];
                        });
                    })
                } else loading.value = false
            })
    }
})


</script>
<style lang="scss" scoped>
.cars-history {
    .content {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
        width: 100%;
    }

    .responsive-table {
        width: 100%;
        overflow: auto;

        table {
           
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