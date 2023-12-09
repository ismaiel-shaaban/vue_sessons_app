<template>
    <div class="flight-book p-4 bg-white rounded-1">
       
        <span
            class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward')" title="Back">
            <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
        </span>
        <form class="mt-4">
            <h2 class="position-relative mb-5">{{ $t('flightReservation.flightBook.head') }}</h2>
            <div class="group-1 d-flex gap-3 mt-3 flex-md-row flex-column">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.flightNum') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ bookingInfo.flight_number }}
                    </span>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.allowWeight') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ flightDetails.allowedWeight }}
                    </span>
                </label>
            </div>
            <div class="group-2 d-flex gap-3 mt-3 flex-md-row flex-column">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.deptFrom') }}:</span>
                    <span v-if="flightDetails.from"
                        class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ $i18n.locale === 'en' ? flightDetails.from.english_name : flightDetails.from.arabic_name }}
                    </span>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.arrivalTo') }}:</span>
                    <span v-if="flightDetails.to" class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ $i18n.locale === 'en' ? flightDetails.to.english_name : flightDetails.to.arabic_name }}
                    </span>
                </label>
            </div>
            <div class="group-3 d-flex gap-3 mt-3 flex-md-row flex-column">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.deptDate') }}:</span>
                    <div class="d-flex w-75 justify-content-center mx-auto gap-3 flex-md-row flex-column">
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.departureDate }}
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.departureTime }}
                        </span>
                    </div>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.arrivalDate') }}:</span>
                    <div class="d-flex w-75 justify-content-center mx-auto gap-3 flex-md-row flex-column">
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.arrivDate22 }}
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.arrivalTime }}
                        </span>
                    </div>
                </label>
            </div>
            <div class="group-7 d-flex gap-3 mt-3 flex-md-row flex-column">
                <div class="d-flex align-items-center gap-3 w-100">
                    <label v-if="stopsNums > 0" class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopNum') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.numStops }}
                            
                        </span>
                    </label>
                    <label v-if="stopsNums == 0"  class="w-100">
                        <span class="d-block mb-1 fw-semibold">
                            {{ $t('flightReservation.flightBook.transitDirect') }}:
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            Direct
                        </span>
                    </label>
                </div>
                <!--hossam-->
                <label  v-if="stopsNums > 0"  class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopHour') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ flightDetails.hours_arriv }}
                    </span>
                </label>
                <label  v-if="stopsNums > 0"  class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopPlaces') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ flightDetails.locStops }}
                    </span>
                </label>
            </div>
            <div class="group-6 d-flex gap-3 mt-5 flex-md-row flex-column" v-if="searchInfo.allow_return == '1'">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">Return {{ $t('flightReservation.flightBook.flightNum') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ bookingInfo.return_flight_number }}
                    </span>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.allowWeight') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ bookingInfo.return_weight_allowed }}
                    </span>
                </label>
            </div>
            <div class="group-4 d-flex gap-3 mt-3 flex-md-row flex-column" v-if="searchInfo.allow_return == '1'">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.returnFrom') }}:</span>
                    <span v-if="flightDetails.to" class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ $i18n.locale === 'en' ? flightDetails.to.english_name : flightDetails.to.arabic_name }}
                    </span>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.arrivalTo') }}:</span>
                    <span v-if="flightDetails.from"
                        class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ $i18n.locale === 'en' ? flightDetails.from.english_name : flightDetails.from.arabic_name }}
                    </span>
                </label>
            </div>
            <div class="group-5 d-flex gap-3 mt-3 flex-md-row flex-column" v-if="searchInfo.allow_return == '1'">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.deptDate') }}:</span>
                    <div class="d-flex w-75 justify-content-center mx-auto gap-3 flex-md-row flex-column">
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.returnStartDate }}
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.returnEndDate1 }}
                        </span>
                    </div>
                </label>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.arrivalDate') }}:</span>
                    <div class="d-flex w-75 justify-content-center mx-auto gap-3 flex-md-row flex-column">
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.returnEndDate }}
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.returnEndDate2 }}
                        </span>
                    </div>
                </label>
            </div>
         
            <div class="group-7 d-flex gap-3 mt-3 flex-md-row flex-column">
                <div class="d-flex align-items-center gap-3 w-100">
                    <label v-if="stopsNums > 0" class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopNumReturn') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ flightDetails.num_stops_return }}
                            
                        </span>
                    </label>
                    <label v-if="stopsNums == 0"  class="w-100">
                        <span class="d-block mb-1 fw-semibold">
                            {{ $t('flightReservation.flightBook.transitDirect') }}:
                        </span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            Direct
                        </span>
                    </label>
                </div>
                <!--hossam-->
                <label  v-if="stopsNums > 0"  class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopHourReturn') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ flightDetails.hours_stops_return }}
                    </span>
                </label>
                <label  v-if="stopsNums > 0"  class="w-100">
                    <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.stopPlacesReturn') }}:</span>
                    <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                        {{ flightDetails.loc_stops_return }}
                    </span>
                </label>
            </div>
            <!-- Booking Form -->
            <div class="booking-box rounded-1 p-3 mt-5">
                <h3 class="text-center mb-4 position-relative">
                    {{ $t('buttons.bookNow') }}
                </h3>
                <div class="box d-flex gap-3 flex-md-row flex-column">
                    <label class="w-50 d-flex gap-2">
                            <div class="w-100 p-1" v-if="bookingInfo.type === 'MR' || bookingInfo.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} :
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="bookingInfo.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                            </div>
                   
                        </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.fName') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.first_name.$error ? 'error' : ''}`"
                            type="text" placeholder="First Name" v-model="bookingInfo.first_name">
                        <span v-if="validation.first_name.$error" class="error text-danger fst-italic d-block">
                            {{ validation.first_name.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.lName') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.last_name.$error ? 'error' : ''}`" type="text"
                            placeholder="Last Name" v-model="bookingInfo.last_name">
                        <span v-if="validation.last_name.$error" class="error text-danger fst-italic d-block">
                            {{ validation.last_name.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                        </span>
                    </label>
                </div>
                <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                    <!-- <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.email') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.email.$error ? 'error' : ''}`" type="text"
                            placeholder="Email Address" v-model="bookingInfo.email">
                        <span v-if="validation.email.$error" class="error text-danger fst-italic d-block">
                            {{ validation.email.$errors[0].$validator === 'required' ? 'Field Required' : 'Invalid Email' }}
                        </span>
                    </label> -->
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.phone') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.phone.$error ? 'error' : ''}`" type="phone"
                            placeholder="Phone Number" v-model="bookingInfo.phone">
                        <span v-if="validation.phone.$error" class="error text-danger fst-italic d-block">
                            {{ validation.phone.$errors[0].$validator === 'required' ?
                                'Field Required' :
                                'Invalid Phone Number' }}
                        </span>
                    </label>
                </div>
                <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.nation') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.nationality.$error ? 'error' : ''}`"
                            type="text" placeholder="Nationality" v-model="bookingInfo.nationality">
                        <span v-if="validation.nationality.$error" class="error text-danger fst-italic d-block">
                            {{ validation.nationality.$errors[0].$validator === 'required' ? 'Field Required' : '' }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.passportNum') }}:</span>
                        <input :class="`p-2 px-3 rounded-1 w-100 ${validation.passport_number.$error ? 'error' : ''}`"
                            type="text" placeholder="Passport Number" v-model="bookingInfo.passport_number">
                        <span v-if="validation.passport_number.$error" class="error text-danger fst-italic d-block">
                            {{ validation.passport_number.$errors[0].$validator === 'required' ? 'Field Required' :
                                'Passport can"t containe special characters' }}
                        </span>
                    </label>
                </div>
                <div class="box d-flex gap-3 mt-3 flex-md-row flex-column" v-if="bookingInfo.personsForm.length > 0"
                    v-for="(item, index) in bookingInfo.personsForm" :key="index">
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
                <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.adults') }}:</span>
                        <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                            v-model="persons.adults" disabled>
                    </label>
                    <label class="w-100" v-if="persons.children > 0">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.children') }}:</span>
                        <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                            v-model="persons.children" disabled>
                    </label>
                    <label class="w-100" v-if="persons.infants > 0">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.infants') }}:</span>
                        <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                            v-model="persons.infants" disabled>
                    </label>
                </div>
                <div class="box d-flex gap-3 mt-4 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.adultsPrice') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(flightDetails.adultPrice) }}
                        </span>
                    </label>
                    <label class="w-100" v-if="persons.children > 0">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.childrenPrice')
                        }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(flightDetails.childPrice) }}
                        </span>
                    </label>
                    <label class="w-100" v-if="persons.infants > 0">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.infantsPrice') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(flightDetails.infantPrice) }}
                        </span>
                    </label>
                </div>
                <div class="box d-flex gap-3 flex-column mt-3">
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.total') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(bookingInfo.total) }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.tax') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ +bookingInfo.tax }}%
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.agentDiscount')
                        }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(bookingInfo.agentDiscount) }}
                            
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.net') }}:</span>
                        <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                            {{ USDollar.format(bookingInfo.net_total) }}
                            
                        </span>
                    </label>
                    <button v-if="buttonVisible" class="butn rounded-1 p-2 px-3 text-uppercase mt-3" @click.prevent="submission">
                        {{ $t('buttons.confirm') }}
                    </button>
                </div>
            </div>
            <div :class="`alert alert-success alert-dismissible text-${$i18n.locale === 'en' ? 'start' : 'end'} position-fixed`"
                role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-check fs-5"></i>
                    {{ $t('flightReservation.bookMessage') }}
                </div>
                <span class="d-block mt-1">
                    {{ `${$t('flightReservation.bookingCode')}: ${randomCode}` }}
                </span>
                <span class="d-block mt-1">
                    {{ `${$t('flightReservation.yourBalance')}: ${USDollar.format(updatedBalance)}` }}
                </span>
                <button @click="removeAlert('success')" type="button" class="btn-close"></button>
            </div>
            <div class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-xmark fs-5"></i>
                    {{ $t('flightReservation.noBalance') }}
                </div>
                <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
            </div>
            <div id="alert-2" class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-xmark fs-5"></i>
                    There Is No Tickets Enough
                </div>
                <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
            </div>
        </form>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch , onUpdated} from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric, alphaNum, helpers } from "@vuelidate/validators";
import { useRoute } from 'vue-router';
import Loader from '../Loader.vue';
import i18n from '../../i18n';
import router from '../../router';

const buttonVisible = ref(true)

let stopPlaces = ref(localStorage.getItem('lang') == 'en' ? localStorage.getItem('itemStopPlaces')  : 'مطار تابلسى الدولى' );
const stopsNums = parseInt(localStorage.getItem('item-numStops')); 
const props = defineProps(['flightId', 'searchInfo', 'searchResults'])
const social = ref({})
const loading = ref(false)
const route = useRoute()
const userInfo = ref({})
const flightDetails = ref({})
const randomCode = ref('')
const updatedBalance = ref('')
const persons = ref({
    infants: props.searchInfo.no_infants,
    children: props.searchInfo.no_children,
    adults: props.searchInfo.no_adults
})
//change lan
onUpdated(() => {
    stopPlaces.value = localStorage.getItem('lang') == 'en' ? localStorage.getItem('itemStopPlaces')  : 'مطار تابلسى الدولى' ;
});


// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})


const bookingInfo = ref({
    flight_number: computed(() => flightDetails.value.flightNumber),
    weight_allowed: computed(() => flightDetails.value.allowedWeight),
    departure_from: computed(() => i18n.global.locale.value === 'en' ? flightDetails.value.from.english_name : flightDetails.value.from.arabic_name),
    arrival_to: computed(() => i18n.global.locale.value === 'en' ? flightDetails.value.to.english_name : flightDetails.value.to.arabic_name),
    departure_date: computed(() => flightDetails.value.departureDate),
    arrival_date: computed(() => flightDetails.value.arrivalTime),
    return_from: computed(() => i18n.global.locale.value === 'en' ? flightDetails.value.to.english_name : flightDetails.value.to.arabic_name),
    return_to: computed(() => i18n.global.locale.value === 'en' ? flightDetails.value.from.english_name : flightDetails.value.from.arabic_name),
    return_flight_number: computed(() => flightDetails.value.returnFlightNumber),
    return_weight_allowed: computed(() => flightDetails.value.allowedWeightReturn),
    return_departure_date: computed(() => flightDetails.value.returnStartDate),
    return_arrival_date: computed(() => flightDetails.value.returnEndDate),
    first_name: null,
    last_name: null,
    email: '',
    phone: '',
    type:"MR",
    nationality: '',
    passport_number: '',
    personsForm: [],
    adults_count: computed(() => persons.value.infants + persons.value.children + persons.value.adults),
    tax: computed(() => flightDetails.value.tax),
    total: computed(() => {
        return ((persons.value.infants * parseFloat(flightDetails.value.infantPrice)) + (persons.value.children * parseFloat(flightDetails.value.childPrice)) + (persons.value.adults * parseFloat(flightDetails.value.adultPrice)))
    }),
    agentDiscount: computed(() => (userInfo.value.discount) ),
    net_total: computed(() => (    (parseFloat(bookingInfo.value.total) + ((bookingInfo.value.tax / 100) * parseFloat(bookingInfo.value.total))) -( (bookingInfo.value.agentDiscount/ 100)* (parseFloat(bookingInfo.value.total) + ((bookingInfo.value.tax / 100) * parseFloat(bookingInfo.value.total)))  )       )),
})


const rules = {
    first_name: { required },
    last_name: { required },
    // email: { required, email },
    phone: { required, numeric },
    nationality: { required },
    passport_number: { required, alphaNum },
    personsForm: {
        $each: helpers.forEach({
            firstName: { required },
            lastName: { required },
            type: { required }
        })
    }
}
const validation = useVuelidate(rules, bookingInfo)


watch(i18n.global.locale, newVal => {
    if (bookingInfo.value.adults_count > 1) {
        bookingInfo.value.personsForm.forEach((el, i) => {
            el.type = persons.value.adults > i + 1 ?
                'MR' :
                persons.value.adults + persons.value.children > i + 1 ?
                    'Children' :
                    'Infant'
        })
    }
})

const submission = async () => {
    validation.value.$validate()

    if (!validation.value.$error) {
        const userId = JSON.parse(localStorage.getItem("login"))
        bookingInfo.value.email = userId.id

        loading.value = true
        const formData = new FormData()
        formData.append("flight_number", props.flightId.toString())
        formData.append("firstName",`${bookingInfo.value.type} ${bookingInfo.value.first_name}` )
        formData.append("lastName", bookingInfo.value.last_name)
        formData.append("email", bookingInfo.value.email)
        formData.append("phoneNumber", bookingInfo.value.phone)
        formData.append("nationality", bookingInfo.value.nationality)
        formData.append("passportNumber", bookingInfo.value.passport_number)
        formData.append("numberOfChildren", persons.value.children)
        formData.append("numberOfInfants", persons.value.infants)
        formData.append("numberOfAdults", persons.value.adults)
        formData.append("total", bookingInfo.value.total)
        formData.append("net_total", bookingInfo.value.net_total)
        buttonVisible.value = false;
        if (bookingInfo.value.personsForm.length > 0) {
            for (let i = 0; i < bookingInfo.value.personsForm.length; i++) {
                formData.append(`person${2 + i}`, `${bookingInfo.value.personsForm[i].firstName},${bookingInfo.value.personsForm[i].lastName}-${bookingInfo.value.personsForm[i].type}`)
            }
        }

        if (userInfo.value.balance > bookingInfo.value.net_total) {

            if (flightDetails.value.allowReturn != 1 && flightDetails.value.numTickets > bookingInfo.value.adults_count) {
                const tickets = new FormData()
                tickets.append("ticket_id", flightDetails.value.id)
                tickets.append("new_number_of_tickets", flightDetails.value.numTickets - bookingInfo.value.adults_count)
                axios.post("https://seasonreal.seasonsge.com/appv1real/ticket-out", tickets)
                    .then(data => {
                        console.log(data);
                    })

                await axios.post('https://seasonreal.seasonsge.com/appv1real/flight-booking', formData).then(data => {
                    updatedBalance.value = parseFloat(userInfo.value.balance) - parseFloat(bookingInfo.value.net_total)
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
                                randomCode.value = data.data.bookingId
                                document.querySelector(".alert-success").classList.add("active")

                                axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
                                    .then(data => {
                                        const bookId = data.data.pop()
                                        setTimeout(() => {
                                            router.push({
                                                name: "Agents Flights Checkout",
                                                params: { lang: i18n.global.locale.value, id: bookId.id, with: 3 }
                                            })
                                        }, 1500)
                                    })

                                loading.value = false
                            }
                        })
                })
            } else if (flightDetails.value.allowReturn == 1 && flightDetails.value.numReturnTickets > bookingInfo.value.adults_count && flightDetails.value.numTickets > bookingInfo.value.adults_count) {
                const tickets = new FormData()
                tickets.append("ticket_id", flightDetails.value.id)
                tickets.append("new_number_of_tickets", flightDetails.value.numTickets - bookingInfo.value.adults_count)
                axios.post("https://seasonreal.seasonsge.com/appv1real/ticket-out", tickets)
                    .then(data => {
                        console.log(data);
                    })
                const returnTickets = new FormData()
                returnTickets.append("ticket_id", flightDetails.value.id)
                returnTickets.append("new_number_of_tickets", flightDetails.value.numReturnTickets - bookingInfo.value.adults_count)
                axios.post("https://seasonreal.seasonsge.com/appv1real/return_ticket", returnTickets)
                    .then(data => {
                        console.log(data);
                    })
                await axios.post('https://seasonreal.seasonsge.com/appv1real/flight-booking', formData).then(data => {
                    updatedBalance.value = parseFloat(userInfo.value.balance) - parseFloat(bookingInfo.value.net_total)
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
                                randomCode.value = data.data.bookingId
                                document.querySelector(".alert-success").classList.add("active")

                                axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
                                    .then(data => {
                                        const bookId = data.data.pop()
                                        setTimeout(() => {
                                            router.push({
                                                name: "Agents Flights Checkout",
                                                params: { lang: i18n.global.locale.value, id: bookId.id, with: 3 }
                                            })
                                        }, 1500)
                                    })

                                loading.value = false
                            }
                        })
                })
            } else {
                console.log("There Is No Tickets Enough");
               // document.querySelector("#alert-2").classList.add("active")
                loading.value = false
            }

            await axios.post('https://seasonreal.seasonsge.com/appv1real/flight-booking', formData).then(data => {
                updatedBalance.value = parseFloat(userInfo.value.balance) - parseFloat(bookingInfo.value.net_total)
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
                            randomCode.value = data.data.bookingId
                            document.querySelector(".alert-success").classList.add("active")

                            axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
                                .then(data => {
                                    const bookId = data.data.pop()
                                    setTimeout(() => {
                                        router.push({
                                            name: "Agents Flights Checkout",
                                            params: { lang: i18n.global.locale.value, id: bookId.id, with: 3 }
                                        })
                                    }, 1500)
                                })

                            loading.value = false
                        }
                    })
            })
        } else {
            document.querySelector(".alert-danger").classList.add("active")
            setTimeout(() => {
                document.querySelector(".alert-danger").classList.remove("active")
            }, 3000)
            loading.value = false
        }
    }
}

const removeAlert = (type) => {
    document.querySelector(`.alert-${type}`).classList.remove("active")
}

onMounted(async () => {
    props.searchResults.filter(el => {
        if (el.id === props.flightId) {
            flightDetails.value = el
        }
    })

    console.log("flightDetails" ,flightDetails);
    console.log("bookingInfo" ,bookingInfo);
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
        userInfo.value = data.data.filter((el) => el.id == route.params.userId)[0];
    });
    if (bookingInfo.value.adults_count > 1) {
        for (let i = 0; i < bookingInfo.value.adults_count - 1; i++) {
            bookingInfo.value.personsForm.push({
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
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
        })
})

</script>
<style lang="scss" scoped>
input,
select {
    outline: none;
    border: 1px solid darkgray;

    &.error {
        border: 1px solid #dc3545;
    }
}

.flight-book {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

    form {

        h2,
        h3 {
            color: var(--blue-color);

            &::before {
                content: "";
                position: absolute;
                width: 15%;
                height: 3px;
                bottom: -8px;
                background-color: var(--blue-color);
                border-radius: 50px;
            }
        }

        .booking-box {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);
            border: 1px solid var(--orange-color);

            h3 {
                &::before {
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8%;
                }
            }
        }

        .alert {
            top: -25%;
            left: 50%;
            transform: translateX(-50%);
            transition: 0.3s;
            z-index: 555555555;

            &.active {
                top: 5%;
            }

            button {
                box-shadow: none;
                outline: none;
            }
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

        padding: 20px 15px !important;

        .booking-box {
            padding: 20px 10px !important;
        }
    }
}
</style>