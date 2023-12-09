<template>
    <div class="flight-tabel p-4 rounded-1 bg-white">
        <span
            class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward')" title="Back">
            <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
        </span>
        <h2 class="position-relative">{{ $t('flightReservation.flightTable.head') }}</h2>
        <div class="responsive-table overflow-auto mt-5" dir="ltr">
            <!-- <table>
                <thead>
                    <tr>
                        <td>{{ $t('flightReservation.flightTable.flightLine') }}</td>
                        <td v-if="searchInfo.no_adults > 0">{{ $t('flightReservation.flightTable.adultPrice') }}</td>
                        <td v-if="searchInfo.no_children > 0">{{ $t('flightReservation.flightTable.childrenPrice') }}</td>
                        <td v-if="searchInfo.no_infants > 0">{{ $t('flightReservation.flightTable.infantPrice') }}</td>
                        <td>{{ $t('flightReservation.flightTable.flightNumber') }}</td>
                        <td v-if="searchInfo.allow_return == '1'">{{ $t('flightReservation.flightTable.returnEndDateTime') }}</td>
                        <td v-if="searchInfo.allow_return == '1'">{{ $t('flightReservation.flightTable.returnStartDateTime') }}</td>
                        <td>{{ $t('flightReservation.flightTable.arrivalDateTime') }}</td>
                        <td>{{ $t('flightReservation.flightTable.deptDateTime') }}</td>
                        <td>{{ $t('flightReservation.flightTable.arrivalTo') }}</td>
                        <td>{{ $t('flightReservation.flightTable.deptFrom') }}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody class="position-relative">
                    <tr v-if="searchResults.length > 0 || suggestions.length > 0"
                        v-for="(item, index) in  searchResults.length > 0 ? searchResults : suggestions" :key="index">
                        <td v-if="item.airLine">
                            <img width="100" :src="`https://seasonreal.seasonsge.com/images/${item.airLine.image}`" alt="">
                        </td>
                        <td v-if="searchInfo.no_adults > 0">{{ USDollar.format(item.adultPrice) }}</td>
                        <td v-if="searchInfo.no_children > 0">{{ USDollar.format(item.childPrice) }}</td>
                        <td v-if="searchInfo.no_infants > 0">{{ USDollar.format(item.infantPrice) }}</td>
                        <td>{{ item.flightNumber }}</td>
                        <td class="text-center" v-if="searchInfo.allow_return == '1'">{{ item.returnEndDate }} <br> {{ item.returnEndDate2 }}</td>
                        <td class="text-center" v-if="searchInfo.allow_return == '1'">{{ item.returnStartDate }} <br> {{ item.returnEndDate1 }}</td>
                        <td class="text-center">{{ item.arrivDate22 }} <br> {{ item.arrivalTime }}</td>
                        <td class="text-center">{{ item.departureDate }} <br> {{ item.departureTime }}</td>
                        <td v-if="item.to">
                            {{ $i18n.locale === 'en' ? item.to.english_name : item.to.arabic_name }}
                        </td>
                        <td v-if="item.from">
                            {{ $i18n.locale === 'en' ? item.from.english_name : item.from.arabic_name }}
                        </td>
                        <td class="text-center" @click="$emit('getIdAndForward', item.id)">
                            <button class="details-butn bg-none border-0 p-2 px-4 rounded-2 text-light fw-semibold">
                                {{ $t('buttons.details') }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <table class="table">
                <thead>
                    <div class="d-flex justify-content-between border-bottom pb-2">
                        
                        <div  style="font-size:large; font-weight: 500;">Flight Information</div>
                    </div>
                </thead>
            </table>

            <div class="d-flex main-cont" :class="returnTravelValue == 0 ? 'border-bottom' : ''" v-if="searchResults.length > 0 || suggestions.length > 0"
                v-for="(item, index) in  searchResults.length > 0 ? searchResults : suggestions" :key="index">
                <div class="detials d-flex flex-column flex-fill">
                    <div class="go d-flex flex-fill">
                        <div v-if="item.airLine">
                                <span @click="setDay(item)" class="bannar d-flex align-items-center gap-3 position-relative p-2 px-3">
                                    <i class="fa-solid fa-plane"></i>
                                    Departure
                                </span>
                            <img width="100" :src="`https://seasonreal.seasonsge.com/images/${item.airLine.image}`" alt="">
                            <span class="airline d-block fw-bold text-capitalize">
                                {{ $i18n.locale === 'en' ? item.airLine.name_en : item.airLine.name_ar }}
                            </span>
                            <span class="text-capitalize">{{ item.flightNumber }}</span>
                        </div>
                        <div class="text-end" v-if="item.from">
                            <span class="d-block">{{ item.departureTime }}</span>
                            <span class="d-block">
                                {{ $i18n.locale === 'en' ? item.from.english_name : item.from.arabic_name }}
                            </span>
                            <span class="d-block mt-2 text-black-50">{{ item.departureDate }}</span>
                        </div>
                        <div class="text-center">
                            <!--التوقفات فى الذهاب-->
                            <span class="d-block">{{ item.numStops == 0 ? 'Direct' : item.numStops }} {{ item.numStops > 0 ? 'Stop' : '' }}</span>
                             <!--اماكن التوقف فى الذهاب-->
                             <span v-if="item.numStops > 0" class="d-block"><span v-if="item.numStops > 0 ">Layover : </span>{{ item.locStops  }}</span>
                             <!--عدد ساعات التوقف فى الذهاب -->
                             <span v-if="item.numStops > 0" class="d-block"><span v-if="item.numStops > 0 "> Stop Time : </span>{{ item.hours_arriv  }} hours</span>
                             <span class="duration d-block mt-2 pt-2 text-muted position-relative">
                                <!--عدد ساعات الذهاب-->
                                Trip Duration: {{ item.durationHours }} hours
                            </span>

                            <div v-if="item.allowedWeight < '10'">
                                <span>  {{ item.allowedWeight }} <i class="fa-solid fa-briefcase ms-2"></i></span>
                            </div>
                            <div v-else>
                                <span>{{ item.allowedWeight }}<i class="fa-solid fa-suitcase-rolling ms-2"></i></span>
                            </div>
                        </div>
                        <div class="text-start" v-if="item.to">
                            <span class="d-block">{{ item.arrivalTime }}</span>
                            <span class="d-block">
                                {{ $i18n.locale === 'en' ? item.to.english_name : item.to.arabic_name }}
                            </span>
                            <span class="d-block mt-2 text-black-50">{{ item.arrivDate22 }}</span>
                        </div>
                    </div>
                        <!--travel back-->
                    <div v-if="returnTravelValue == 1" class="return d-flex flex-fill border-bottom pb-5 pt-3 mt-3">
                        <div v-if="item.airLine">
                            <span class="bannar d-flex align-items-center gap-3 position-relative p-2 px-3">
                                <i class="fa-solid fa-plane" style="transform: rotate(180deg);"></i>
                                Return
                            </span>
                            <img width="100" :src="`https://seasonreal.seasonsge.com/images/${item.airLine.image}`" alt="">
                            <span class="airline d-block fw-bold text-capitalize">
                                {{ $i18n.locale === 'en' ? item.airLine.name_en : item.airLine.name_ar }}
                            </span>
                            <span class="text-capitalize">{{ item.returnFlightNumber }}</span>
                        </div>
                        <div class="text-end" v-if="item.to">
                            <span class="d-block">{{ item.returnEndDate1 }}</span>
                            <span class="d-block">
                                {{ $i18n.locale === 'en' ? item.to.english_name : item.to.arabic_name }}
                            </span>
                            <span class="d-block mt-2 text-black-50">{{ item.returnStartDate }}</span>
                        </div>
                        <div class="text-center">
                            <!--عدد التوقفات فى الرجوع-->
                            <span class="d-block">{{ item.num_stops_return == 0 ? 'Direct' : item.num_stops_return }} {{ item.num_stops_return > 0 ? 'Stop' : '' }}</span>
                            <!--اماكن التوقفات فى الرجوع-->
                            <span v-if="item.num_stops_return > 0" class="d-block">Layover:{{ item.loc_stops_return  }}</span>
                            <!--عدد ساعات التوقف فى الرجوع-->
                            <span v-if="item.num_stops_return > 0" class="d-block">Return Stop Time:{{ item.hours_stops_return  }} hours</span>
                            <span class="duration d-block mt-2 pt-2 text-muted position-relative">
                                Trip Duration: {{ item.durationHours }} {{ item.durationHours >= 1.00  ? "hours" : 'Minutes' }}
                            </span>
                            <!--وزن الحمولة-->
                            <div v-if="item.allowedWeight < '10'">
                                <span>07.00<i class="fa-solid fa-briefcase ms-2"></i></span>
                            </div>
                            <div v-else>
                                <span>{{ item.allowedWeight }}<i class="fa-solid fa-suitcase-rolling ms-2"></i></span>
                            </div>
                        </div>
                        <div class="text-start" v-if="item.from">
                            <span class="d-block">{{ item.returnEndDate2 }}</span>
                            <span class="d-block">
                                {{ $i18n.locale === 'en' ? item.from.english_name : item.from.arabic_name }}
                            </span>
                            <span class="d-block mt-2 text-black-50">{{ item.returnEndDate }}</span>
                        </div>
                    </div>
                    <!--end travel back-->
                </div>
                <div style="position: relative;"
                    class="text-center price d-flex flex-column gap-2 align-items-center justify-content-center p-4 border-start">
                    <div v-if="index == 0" style="font-size:large; font-weight: 500; position: absolute; top: -50px;">Non-Refundable</div>

                    <h3 class="mb-0">{{ (parseFloat(item.adultPrice) * parseFloat(props.searchInfo.no_adults)) +
                        (parseFloat(item.childPrice) * parseFloat(props.searchInfo.no_children)) +
                        (parseFloat(item.infantPrice) * parseFloat(props.searchInfo.no_infants)) }}</h3>
                    <span class="d-block text-muted">USD</span>
                    <button class="details-butn bg-none border-0 p-2 px-4 rounded-2 text-light fw-semibold"
                        @click="$emit('getIdAndForward', item.id),
                        disappearStops(item)
                        ">
                        {{ $t('buttons.bookNow') }}
                    
                    </button>
                </div>
            </div>
            <h4 v-if="searchResults.length === 0 && suggestions.length === 0"
                class="no-results p-3 py-5 text-muted w-100 text-center">
                {{ $t('flightReservation.flightTable.result') }}
            </h4>
        </div>
        <div class="alert alert-warning alert-dismissible text-start position-fixed" role="alert">
            <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{ $t('flightReservation.flightTable.suggestMessage') }}
            </div>
            <button @click="removeAlert" type="button" class="btn-close"></button>
        </div>
    </div>
</template>

<script setup>
import {ref , onMounted , onUpdated} from "vue"
const props = defineProps(['searchResults', 'searchInfo', 'suggestions', 'flightData'])
defineEmits(['back-ward', 'getIdAndForward'])
const setDay = (item)=>{
    console.log( new Date(item.departureDate) > new Date());
}
//
const disappearStops = (item)=>{
localStorage.setItem('item-numStops' , item.numStops)
localStorage.setItem('itemStopPlaces' , `${item.locStops} | ${item.loc_stops_return}`);
localStorage.setItem('stopHoursReturn' , item.hours_stops_return )
localStorage.setItem('stopHoursDepreature' , item.hours_arriv )
}

// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})

if (props.searchResults.length === 0 && props.suggestions.length > 0) {
    setTimeout(() => {
        document.querySelector(`.alert`).classList.add("active")
    }, 100)
}

const removeAlert = () => {
    document.querySelector(`.alert`).classList.remove("active")
}

let noResults = ref(); 
let returnTravelValue = ref()
let x  = ref(window.matchMedia("(max-width:1320px)"))


onUpdated(() => {
noResults.value = localStorage.getItem('lang') == 'ar' ? "لا يوجد نتائج" : 'no results' ;

});
onMounted(() => {
  returnTravelValue.value = sessionStorage.getItem('return') ? sessionStorage.getItem('return') : 1;
  console.log(returnTravelValue.value);
  
});


</script>

<style lang="scss" scoped>
.flight-tabel {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

    h2 {
        color: var(--blue-color);

        &::before {
            content: "";
            position: absolute;
            background-color: var(--blue-color);
            height: 3px;
            border-radius: 50px;
            bottom: -7px;
            width: 25%;
        }
    }

    table {
        min-width: 100%;
        width: 1250px;

        td {
            padding: 10px;
            // border: 1px solid darkgray;
        }

        thead {
            td {
                background-color: #f6f6f6;
                color: black;
                font-weight: 500;
            }
        }



        // tbody {
        //     tr {
        //         transition: 0.3s;

        //         td {
        //             background-color: #e0e0e0;
        //         }
        //     }

        //     .details-butn {
        //         background-color: teal;
        //     }
        // }
    }

    .main-cont {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        width: 1250px;

        .go,
        .return {
            gap: 25px;
            align-items: center;

            &>div {
                flex: 1;
            }
        }

        .bannar {
            background-color: var(--blue-color);
            color: white;

            &::before {
                content: '';
                position: absolute;
                width: 125px;
                height: 100%;
                background-color: white;
                top: 0;
                right: -30px;
                transform: skew(-30deg);
            }
        }

        .airline {
            color: var(--orange-color);
        }

        .duration {
            border-top: 2px dashed var(--orange-color);

            &::before,
            &::after {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                top: -6px;
                background-color: var(--orange-color);
            }

            &::before {
                left: 0;
            }

            &::after {
                right: 0;
            }
        }

        .price {
            button {
                background-color: var(--blue-color);
                color: white;
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

    @media (max-width: 767px) {
        padding: 15px !important;

        .alert {
            width: 90%;
            font-size: 12px;
        }
    }

    .refundable {
        margin-left: -107px !important;
    }
}
</style>