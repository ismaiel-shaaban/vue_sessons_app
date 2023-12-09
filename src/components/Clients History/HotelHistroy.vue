<template>
    <div class="hotel-history rounded-2 p-4 d-flex flex-column align-items-md-start align-items-center gap-5">
        <div class="responsive-table">
            <table>
                <thead>
                    <tr>
                        <td>Created At</td>
                        <td>Reservation Code</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Hotel Name</td>
                        <td>Persons Count</td>
                        <td>Start Date</td>
                        <td>End date</td>
                        <td>Total</td>
                        <td>Tax</td>
                        <td>Net Total</td>
                        <td>Tools</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="hotelHistory.length > 0" v-for="(item, index) in hotelHistory" :key="index">
                        <td>{{ item.date_order }}</td>
                        <td>{{item.code}}</td>
                        <td>{{ item.first_name}}</td>
                        <td>{{ item.last_name}}</td>
                        <td>{{item.hotel_name}}</td>
                        <td>{{item.room_type}}</td>
                        <td>{{item.start_date}}</td>
                        <td>{{item.end_date}}</td>
                        <td>{{USDollar.format(item.total)}}</td>
                        <td>%{{item.tax}}</td>
                        <td>{{USDollar.format(item.net_total)}}</td>
                        <td>
                            <router-link class="d-block text-center text-decoration-none" :to="{name: 'Hotels Checkout', params: {lang: $i18n.locale, id: item.id}}">
                                Export As PDF
                                <i class="fa-solid fa-share ms-1"></i>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 v-if="hotelHistory.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Loader from '../Loader.vue';



const hotelHistory = ref([])
const loading = ref(false)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})


onMounted(async () => {
    loading.value = true
    if (localStorage.getItem("clientLogin")) {
        const userId = JSON.parse(localStorage.getItem("clientLogin"))
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/hotel--rr?id=${userId.id}`)
            .then(data => {
                if (typeof data.data !== 'string') {
                    hotelHistory.value = data.data
                    loading.value = false
                } else loading.value = false
            })
    }
})


</script>
<style lang="scss" scoped>
.hotel-history {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.438);
    .responsive-table {
        overflow: auto !important;
        width: 100%;
        table {
            min-width: 1500px;
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
                    white-space: nowrap;
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
}</style>