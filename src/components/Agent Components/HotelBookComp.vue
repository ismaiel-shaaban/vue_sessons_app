<template>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content mt-5">
      <img class="w-100" :src="`https://seasonreal.seasonsge.com/images/${image}`" alt="" />
    </div>
  </div>
</div>
    <div class="hotel-details bg-white p-2 rounded-1">
        <div style="max-width: 100vw; overflow-x: hidden;">
            <span
                class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; cursor: pointer" @click="$emit('back-ward')" title="Back">
                <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
            </span>
            <h1 class="heading mb-5 position-relative">{{ $t('hotelBook.heading') }}</h1>
            
            <div class="inner py-5 d-flex gap-4 align-items-center flex-column">
                <!--الصور-->
                
                <div class="row justify-content-center">
                     <div v-if="imageLoop2.length > 0" class="col-xl-6 col-lg-4 col-md-12 col-sm-12">
                    <carousel :autoplay="3000" :wrap-around="true" :items-to-show="1" class="pt-5 pb-5">
                    <slide v-for="img in imageLoop2" :key="img.id">
                    <img @click="uploadImageTomodal(img)" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal" class="w-100" :src="`https://seasonreal.seasonsge.com/images/${img}`" alt="" />

                     </slide>

    <template #addons>
      <navigation />
      <Pagination class="position-absolute" />
    </template>
  </carousel>
             
                <!--نهاية ريسبونزف الصور-->
                </div>
                    <div class="col-xl-6 col-lg-8 col-md-12 px-5 col-sm-12 col-12 mt-5" style="max-width: 100vw;">
                    <div class="group-1 d-flex gap-2 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('hotelBook.details.name') }}:</span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ hotelBooking.hotel_name || 'Unknown' }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('hotelBook.details.details') }}:</span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ $i18n.locale === 'en' ? hotelDetails.details_en : hotelDetails.details }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('hotelBook.details.address') }}:</span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ $i18n.locale === 'en' ? hotelDetails.address_en : hotelDetails.address }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('hotelBook.details.rate') }}:</span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ hotelBooking.rating || 0 }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('hotelBook.details.type') }}:</span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ hotelBooking.hotel_type || 'Unknown' }}
                            </span>
                        </label>
                    </div>
                    <!--نهاية رسبونزف البيانات الفندق-->
                    <div class="group-4 mt-3 d-flex gap-3 flex-column flex-md-row">
                        <label class="w-50 d-flex gap-2">
                            <div class="w-100 p-1" v-if="hotelBooking.type === 'MR' || hotelBooking.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} :
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="hotelBooking.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                            </div>
                   
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('hotelBook.details.fName') }}:</span>
                            <input :class="`rounded-1 w-100 p-2 px-3 ${validation.first_name.$error ? 'error' : ''
                                }`" type="text" placeholder="First Name" v-model="hotelBooking.first_name" />
                            <span v-if="validation.first_name.$error" class="text-danger fst-italic d-block">
                                {{
                                    validation.first_name.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('hotelBook.details.lName') }}:</span>
                            <input :class="`rounded-1 w-100 p-2 px-3 ${validation.last_name.$error ? 'error' : ''
                                }`" type="text" placeholder="Last Name" v-model="hotelBooking.last_name" />
                            <span v-if="validation.last_name.$error" class="text-danger fst-italic d-block">
                                {{
                                    validation.last_name.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                    </div>
                    <div class="group-5 mt-3 d-flex gap-3">
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('hotelBook.details.phone') }}:</span>
                            <input :class="`rounded-1 w-100 p-2 px-3 ${validation.phone.$error ? 'error' : ''
                                }`" type="text" placeholder="Phone Number" v-model="hotelBooking.phone" />
                            <span v-if="validation.phone.$error" class="text-danger fst-italic d-block">
                                {{
                                    validation.phone.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : "Invalid Phone Number"
                                }}
                            </span>
                        </label>
                    </div>
                  <!--نهاية ريسبونزف بيانات الفندق-->  
                   
                    <div class="box d-flex gap-3 mt-3 flex-md-row flex-column" v-if="hotelBooking.personsForm.length > 0"
                        v-for="(item, index) in hotelBooking.personsForm" :key="index">
                        <label class="w-100 d-flex sm-flex-nowrap flex-wrap row gap-2">
                            <div class="col-12 col-sm-3" v-if="item.type === 'MR' || item.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} {{ `(${index + 2})` }}:
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="item.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-3" v-if="item.type !== 'MR' && item.type !== 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t("flightReservation.flightBook.type") }} {{ `(${index + 2})` }}:
                                </span>
                                <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].type.$error
                                    ? 'error'
                                    : ''
                                    }`" type="text" placeholder="Type" v-model="item.type" disabled />
                           
                            </div>
                            <div class="d-flex col-12 col-sm-8 gap-2">

                                <div class="w-100 ">
                                    <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.firstName") }}
                                        {{ `(${index + 2})` }}:
                                    </span>
                                    <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].firstName.$error
                                        ? 'error'
                                        : ''
                                        }`" type="text" placeholder="First Name" v-model="item.firstName" />
                                    <span v-if="validation.personsForm.$each.$response.$data[index].firstName.$error
                                        " class="error text-danger fst-italic d-block">
                                        {{
                                            validation.personsForm.$each.$response.$errors[index].firstName[0]
                                                .$validator === "required"
                                            ? "Field Required"
                                            : ""
                                        }}
                                    </span>
                                </div>
                                <div class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.lastName") }}
                                        {{ `(${index + 2})` }}:
                                    </span>
                                    <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].lastName.$error
                                        ? 'error'
                                        : ''
                                        }`" type="text" placeholder="Last Name" v-model="item.lastName" />
                                    <span v-if="validation.personsForm.$each.$response.$data[index].lastName.$error
                                        " class="error text-danger fst-italic d-block">
                                        {{
                                            validation.personsForm.$each.$response.$errors[index].lastName[0]
                                                .$validator === "required"
                                            ? "Field Required"
                                            : ""
                                        }}
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="box my-5 d-flex gap-3 flex-column" v-if="searchInfo.rooms.length > 0">
                        <h3 class="text-center">Rooms</h3>
                        <div class="responsive-table d-flex justify-content-center">
                            <table>
                                <thead>
                                    <tr>
                                        <td  class="text-center">#</td>
                                        <td >Room Type</td>
                                        <td >Child Reservation</td>
                                        <td >Child Count In Room</td>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in searchInfo.rooms" :key="index">
                                        <td class="text-center">
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            {{ item.roomType === '1' ? 'Single Room'
                                                : item.roomType === '2' ?
                                                    'Double Room' : 'Triple Room' }}
                                        </td>
                                        <td>
                                            {{ item.childReservation }}
                                        </td>
                                        <td>
                                            {{ item.childCount }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--نهاية ريسبونسف بيانات الفندق-->
                    <div class="box d-flex gap-2 mt-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.adults") }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.adults" disabled />
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.children") }}:
                            
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.children" disabled />
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.infants") }}:
                            
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.infants" disabled />
                        </label>
                    </div>
                    <!--check in and out-->
                    <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ CheckIn }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="text"
                                 :value="hotelBooking.start_date" disabled />
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ Checkout }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="text" 
                                :value="hotelBooking.end_date" disabled />
                        </label>
                        
                    </div>
                    <!--end check in and out-->
                    <div class="box d-flex gap-3 mt-4 flex-md-row flex-column">
                        <label class="w-100" v-if="prices.has('1')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("hotelBook.details.singlePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.single_price) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('2')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("hotelBook.details.doublePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.double_price) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('3')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("hotelBook.details.triplePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.triple_price) }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 mt-4 flex-md-row flex-column">
                        <label class="w-100" v-if="prices.has('5')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.childWithBedPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.child_with_bed_price) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('4')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.childWithoutBedPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.child_no_bed_price) }}
                            </span>
                        </label>
                        <!-- <label class="w-100" v-if="prices.has('6')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.infantPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(hotelDetails.price_per_infant) }}
                            </span>
                        </label> -->
                    </div>
                    <div class="group-7 mt-3 d-flex gap-3">
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('hotelBook.details.days') }}:</span>
                            <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ hotelBooking.number_of_days }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('hotelBook.details.total') }}:</span>
                            <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ USDollar.format(hotelBooking.total || 0) }}
                            </span>
                        </label>
                    </div>
                    <label class="w-100 mt-3">
                        <span class="d-block mb-1">{{ $t('hotelBook.details.tax') }}:</span>
                        <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                            {{ (hotelBooking.tax || 0) }}%
                        </span>
                    </label>
                    <label class="w-100 mt-3">
                        <span class="d-block mb-1">{{ $t('carBook.details.agentDiscount') }}:</span>
                        <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                            {{ (hotelBooking.agent_discount ) }}%
                        </span>
                    </label>
                    <label class="w-100 mt-3">
                        <span class="d-block mb-1">{{ $t('hotelBook.details.net') }}:</span>
                        <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                            {{ USDollar.format(hotelBooking.net_total || 0) }}
                        </span>
                    </label>
                    <button v-if="visibleButton" class="butn mt-4 w-100 p-2 px-3 rounded-1 text-uppercase" @click.prevent="submission">{{
                        $t('buttons.confirm') }}</button>
                </div>
                </div>
               
  
                <!--بداية ريسبونزف بيانات الفندق-->
               
                <div :class="`alert alert-success alert-dismissible text-${$i18n.locale === 'en' ? 'start' : 'end'} position-fixed`"
                    role="alert">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-circle-check fs-5"></i>
                        {{ $t('hotelBook.bookMessage') }}
                    </div>
                    <span class="d-block mt-1">{{ `${$t('hotelBook.bookingCode')}: ${randomCode}` }}</span>
                    <span class="d-block mt-1">
                        {{ `${$t('carBook.yourBalance')}: ${USDollar.format(updatedBalance)}` }}
                    </span>
                    <button @click="removeAlert('success')" type="button" class="btn-close"></button>
                </div>
                <div class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-circle-xmark fs-5"></i>
                        {{ $t('carBook.noBalance') }}
                    </div>
                    <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
                </div>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUpdated } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import Loader from "../../components/Loader.vue";
import router from "../../router";
import i18n from "../../i18n";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

let image = ref(null);
const uploadImageTomodal = (img)=>{
image.value = img;
// console.log(image.value);
}
const Checkout = ref('')
const CheckIn = ref('')
const setCheckIn = (e)=>{
country.value = e.target.options[e.target.selectedIndex].text;
}
const setCheckOut = (e)=>{
country.value = e.target.options[e.target.selectedIndex].text;
}
const prices = ref(new Set())
const props = defineProps(['searchResults', 'searchInfo', 'hotelId', 'cities', 'countries'])
const social = ref({})
const loading = ref(false)
const route = useRoute();
const userInfo = ref({});
const hotelDetails = ref({});
const updatedBalance = ref('')
const randomCode = ref('')
const persons = ref({
    infants: props.searchInfo.no_infants,
    children: props.searchInfo.no_children,
    adults: props.searchInfo.no_adults,
});
// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})


const hotelBooking = ref({
    hotel_name: computed(() =>
        route.params.lang === "en" ? hotelDetails.value.name_en : hotelDetails.value.name
    ),
    hotel_id: computed(() => hotelDetails.value.id),
    rating: computed(() => hotelDetails.value.rating),
    hotel_type: computed(() => hotelDetails.value.hotel_type),
    room_type: "single room",
    child_room_type: "none",
    first_name: '',
    last_name: '',
    email: null,
    type:"MR",
    phone: "",
    start_date: props.searchInfo.start_date.toLocaleDateString("en-CA"),
    end_date: props.searchInfo.end_date.toLocaleDateString("en-CA"),
    number_of_days: computed(() => {
        if (hotelBooking.value.end_date === hotelBooking.value.start_date) {
            return 1;
        } else
            return (new Date(hotelBooking.value.end_date).getTime() - new Date(hotelBooking.value.start_date).getTime()) / (1000 * 60 * 60 * 24)
    }),
    personsForm: [],
    adults_count: computed(() => persons.value.infants + persons.value.children + persons.value.adults),
    total: 0,
    agent_discount: computed(() => ( userInfo.value.discount) ),
    tax: computed(() => parseFloat(hotelDetails.value.tax).toFixed(2)),
    net_total: computed(() => {
        return (hotelBooking.value.total + ((hotelBooking.value.tax / 100) * hotelBooking.value.total)) - ((hotelBooking.value.agent_discount/ 100) * (hotelBooking.value.total + ((hotelBooking.value.tax / 100) * hotelBooking.value.total)))
    }),
    account_name: "",
});



const rules = {
    first_name: { required },
    last_name: { required },
    // email: { required, email },
    phone: { required, numeric },
    personsForm: {
        $each: helpers.forEach({
            firstName: { required },
            lastName: { required },
            type: { required }
        })
    }
};

const validation = useVuelidate(rules, hotelBooking);

watch(i18n.global.locale, newVal => {
    if (hotelBooking.value.adults_count > 1) {
        hotelBooking.value.personsForm.forEach((el, i) => {
            el.type = persons.value.adults > i + 1 ?
                'MR' :
                persons.value.adults + persons.value.children > i + 1 ?
                    'Children' :
                    'Infant'
        })
    }
})
const visibleButton = ref(true)

const submission = () => {
    validation.value.$validate();
    if (!validation.value.$error) {
        const userId = JSON.parse(localStorage.getItem("login"))
        hotelBooking.value.account_name = userId.id

        loading.value = true
        const formData = new FormData()
        formData.append("hotel_name", hotelBooking.value.hotel_name)
        formData.append("hotel_type", hotelBooking.value.hotel_type)
        formData.append("rating", hotelBooking.value.rating)
        formData.append("hotel_id", hotelBooking.value.hotel_id)
        formData.append("room_type", hotelBooking.value.adults_count)
        formData.append("child_room_type", [...prices.value].join(','))
        formData.append("first_name",` ${hotelBooking.value.type} ${hotelBooking.value.first_name}` )
        formData.append("last_name", hotelBooking.value.last_name)
        formData.append("email", hotelBooking.value.email)
        formData.append("phone", hotelBooking.value.phone)
        formData.append("start_date", hotelBooking.value.start_date)
        formData.append("end_date", hotelBooking.value.end_date)
        formData.append("number_of_days", hotelBooking.value.number_of_days)
        formData.append("total", hotelBooking.value.total)
        formData.append("tax", hotelBooking.value.tax)
        formData.append("net_total", hotelBooking.value.net_total)
        formData.append("account_name", hotelBooking.value.account_name)
visibleButton.value = false;
        if (hotelBooking.value.personsForm.length > 0) {
            for (let i = 0; i < hotelBooking.value.personsForm.length; i++) {
                formData.append(`person${2 + i}`, `${hotelBooking.value.personsForm[i].firstName},${hotelBooking.value.personsForm[i].lastName}-${hotelBooking.value.personsForm[i].type}`)
            }
        }

        if (userInfo.value.balance > hotelBooking.value.net_total) {
            axios.post("https://seasonreal.seasonsge.com/appv1real/new-hotel-booking", formData)
                .then(response => {
                    if (response.data.success) {
                        updatedBalance.value = parseFloat(userInfo.value.balance) - parseFloat(hotelBooking.value.net_total)
                        const balance = new FormData()
                        balance.append("name", userInfo.value.name)
                        balance.append("email", userInfo.value.email)
                        balance.append("password", userInfo.value.password)
                        balance.append("type", userInfo.value.type)
                        balance.append("id", userInfo.value.id)
                        balance.append("discount", userInfo.value.discount)
                        balance.append("balance", updatedBalance.value)

                        axios.post("https://seasonreal.seasonsge.com/appv1real/user-edit", balance)
                            .then(userResponse => {
                                if (userResponse.data.success) {
                                    document.querySelector(".alert-success").classList.add("active")
                                    randomCode.value = response.data.code
                                    loading.value = false

                                    const allRooms = new FormData()
                                    props.searchInfo.rooms.forEach(el => {
                                        allRooms.append("id_hotel", randomCode.value)
                                        allRooms.append("room_type", el.roomType)
                                        allRooms.append("chile_room", `${el.childReservation},${el.childCount}`)
                                        axios.post("https://seasonreal.seasonsge.com/appv1real/add_hotel_room", allRooms)
                                            .then(data => {
                                                console.log(data);
                                            })
                                    })
                                    axios.get(`https://seasonreal.seasonsge.com/appv1real/hotel--rr?id=${userId.id}`)
                                        .then(data => {
                                            const bookId = data.data.pop()
                                            setTimeout(() => {
                                                router.push({
                                                    name: "Agents Hotels Checkout",
                                                    params: { lang: i18n.global.locale.value, id: bookId.id, with: 3 }
                                                })
                                            }, 2000)
                                        })
                                }
                            })
                    }
                })
        } else {
            document.querySelector(".alert-danger").classList.add("active")
            setTimeout(() => {
                document.querySelector(".alert-danger").classList.remove("active")
            }, 3000)
            loading.value = false
        }
    }
};


const checkIn = ref('');
const checkOut = ref('');
onUpdated(()=>{
    CheckIn.value = localStorage.getItem('lang') == 'ar' ? "تاريخ الدخول" : 'checkIn';
    Checkout.value = localStorage.getItem('lang') == 'ar' ? "تاريخ الخروج" : 'checkOut';
})

const removeAlert = () => {
    document.querySelector(".alert").classList.remove("active")
}
const responsive = ref(window.matchMedia("(max-width: 767px)"));
let imageData = ref([]);
let imageLoop = ref([]);
let imageLoop2 = ref([]);
onMounted(async () => {
    CheckIn.value = localStorage.getItem('lang') == 'ar' ? "تاريخ الدخول" : 'checkIn';
    Checkout.value = localStorage.getItem('lang') == 'ar' ? "تاريخ الخروج" : 'checkOut';
    await axios.get("https://seasonreal.seasonsge.com/appv1real/all-hotel")
        .then(data => {
            console.log('iam all data');
            imageData.value = data.data.data;
           /* for(let i =0 ; i<data.data.data.length ;i++){
                imageLoop.value.push(data.data.data[i].additional_image);
            }
            for(let i =0 ; i<data.data.data.length ;i++){
                imageLoop2.value.push(...imageLoop.value[i].split(','));
            }*/
            let filterHotel = imageData.value.filter((hotel)=>{
                return hotel.id == props.hotelId
            })
           let filterHotelImages= filterHotel[0].additional_image.split(',')
             for(let i =0 ; i < filterHotelImages.length ; i++){
                imageLoop2.value.push(filterHotelImages[i])
             }



            console.log(imageLoop2.value);
            console.log('iam all data');
        })


console.log(".".repeat(50));
console.log(imageData.value)
    loading.value = true
    props.searchResults.filter((el) => {
        if (el.id === props.hotelId) {
            console.log(props.searchResults ,'kkkkkkkkkkkkkkkkkk');
            console.log(props.hotelId ,'props.hotelId');
            hotelDetails.value = el;
            loading.value = false
        }
    });
    props.searchInfo.rooms.forEach((el) => {
        if (el.roomType === "1") {
            hotelBooking.value.total += (+hotelDetails.value.single_price);
            prices.value.add("1")
        } else if (el.roomType === "2") {
            hotelBooking.value.total += (+hotelDetails.value.double_price);
            prices.value.add("2")
        } else if (el.roomType === "3") {
            hotelBooking.value.total += (+hotelDetails.value.triple_price);
            prices.value.add("3")
        }
        if (el.childReservation === "child without bed") {
            prices.value.add("4")
            hotelBooking.value.total += (+hotelDetails.value.child_no_bed_price * el.childCount);
        } else if (el.childReservation === "child with bed") {
            hotelBooking.value.total += (+hotelDetails.value.child_with_bed_price * el.childCount);
            prices.value.add("5")
        }
    });
    hotelBooking.value.total *= hotelBooking.value.number_of_days
    // if (props.searchInfo.no_infants > 0) {
    //     prices.value.add("6")
    // }
    // hotelBooking.value.total += +hotelDetails.value.price_per_infant * props.searchInfo.no_infants;
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
        userInfo.value = data.data.filter((el) => el.id == route.params.userId)[0];
        loading.value = false
    });
    if (hotelBooking.value.adults_count > 1) {
        for (let i = 0; i < hotelBooking.value.adults_count - 1; i++) {
            hotelBooking.value.personsForm.push({
                firstName: '',
                lastName: '',
                type: persons.value.adults > i + 1 ?
                    'MR' :
                    persons.value.adults + persons.value.children > i + 1 ?
                        'Children' :
                        'Infant'
            })
        }
    }
    // hotelBooking.value.agent_discount = (hotelBooking.value.total * userInfo.value.discount) / 100
    // hotelBooking.value.net_amount = 
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
        })
});

</script>

<style lang="scss" scoped>
input,
select {
    outline: none;
    border: 1px solid darkgray;
}

input.error {
    border: 1px solid #dc3545;
}

.hotel-details {
    max-width: 100%;
    .img-cont {
        img {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);
        }
    }

    table {
width: 100%;
        td {
            padding: 10px;
            border: 1px solid darkgray;
            text-align: center;
        }

        thead {
            td {
                background-color: darkgray;
                color: white;
                font-weight: 500;
            }
        }

        tbody {
            tr {
                transition: 0.3s;

                td {
                    text-transform: capitalize;
                }

                &:hover {
                    background-color: #f3f3f3;
                }
            }

            .del-butn {
                transition: 0.3s;

                &:hover {
                    background-color: rgb(194, 194, 194) !important;
                }
            }
        }
    }

    .heading {
        color: var(--blue-color);

        &::before {
            content: "";
            position: absolute;
            height: 3px;
            width: 10%;
            background-color: var(--blue-color);
            bottom: -10px;
            border-radius: 50px;
        }
    }

    .alert {
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s;
        width: fit-content;
        z-index: 555555555;

        &.active {
            top: 5%;
        }

        button {
            box-shadow: none;
            outline: none;
        }
    }
   

    @media (max-width: 767px) {
        .alert {
            width: 90%;
            text-align: start !important;
            font-size: 12px;

            i {
                font-size: 16px !important;
            }
        }
    }
    

}

</style>
