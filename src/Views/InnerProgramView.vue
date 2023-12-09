<template>
    <div class="inner-page">
        <HeaderComp></HeaderComp>
        <div class="inner-program py-5 min-vh-100">
            <div class="container">
                <div class="details d-flex align-items-start gap-5">
                    <img v-if="programDetails.main_image !== ''"
                        :src="`https://seasonreal.seasonsge.com/upload/${programDetails.main_image}`" alt="">
                    <img v-else class="img-fluid rounded-1" src="https://placehold.co/500x500?text=?"
                        style="object-fit: cover;" alt="">
                    <div class="left-side flex-fill">
                        <div class="program-info">
                            <h2 class="mb-3 text-capitalize" v-if="programDetails.destination">
                                {{ $i18n.locale === 'en' ? programDetails.destination.name_en : programDetails.destination.name  }}
                            </h2>
                            <p class="text-muted fw-bold mb-2">
                                {{ $i18n.locale === 'en' ? programDetails.program_title_english :
                                    programDetails.program_title_arabic }}
                            </p>
                            <span class="text-white fw-bold d-block rounded-1 p-2 px-3">
                                {{ programDetails.num_of_days }} {{ $t('programs.cardInfo.days') }} &
                                {{ programDetails.num_of_nights }} {{ $t('programs.cardInfo.nights') }}
                            </span>
                        </div>
                        <div class="flight-details mt-5" v-if="programDetails.includes_flight == '1'">
                            <h2 class="text-center">
                                {{ $t('programs.cardInfo.details') }}
                            </h2>
                            <div class="go-trip">
                                <h3 class="mb-3">
                                    {{ $t('programs.cardInfo.trip.go') }}
                                </h3>
                                <div class="info">
                                    <div class="detail-label">
                                        <label class="position-relative mb-1">
                                            {{ $t('programs.cardInfo.trip.flightLine') }}
                                        </label>
                                        <span
                                            class="p-2 px-3 rounded-1 bg-secondary text-center fw-bold text-capitalize bg-opacity-25 text-muted d-block"
                                            v-if="flightTrip.flightAirLine">
                                            {{ $i18n.locale === 'en' ? flightTrip.flightAirLine.name_en :
                                                flightTrip.flightAirLine.name_ar }}
                                        </span>
                                    </div>
                                    <div class="more-info d-flex align-items-start mt-3 gap-4">
                                        <div class="flex-fill">
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">
                                                    {{ $t('programs.cardInfo.trip.from') }}
                                                </label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                                    v-if="flightTrip.from">
                                                    {{ $i18n.locale === 'en' ? flightTrip.from.english_name :
                                                        flightTrip.from.arabic_name }}
                                                </span>
                                            </div>
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">Departure Time</label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                    {{ flightTrip.departureTime }}
                                                </span>
                                            </div>
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">
                                                    {{ $t('programs.cardInfo.trip.allowedWeight') }}
                                                </label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                    {{ +flightTrip.allowedWeight }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex-fill">
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">
                                                    {{ $t('programs.cardInfo.trip.to') }}
                                                </label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                                    v-if="flightTrip.to">
                                                    {{ $i18n.locale === 'en' ? flightTrip.to.english_name :
                                                        flightTrip.to.arabic_name }}
                                                </span>
                                            </div>
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">Arrival Time</label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                    {{ flightTrip.arrivalTime }}
                                                </span>
                                            </div>
                                            <div class="detail-label my-2">
                                                <label class="position-relative mb-1">
                                                    {{ $t('programs.cardInfo.trip.flightNum') }}
                                                </label>
                                                <span
                                                    class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                    {{ flightTrip.flightNumber }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="more-details mt-5">
                            <div class="d-flex justify-content-between flex-column gap-5">
                                <div class="return-trip flex-fill" v-if="programDetails.includes_flight == '1'">
                                    <h3 class="mb-3">
                                        {{ $t('programs.cardInfo.trip.return') }}
                                    </h3>
                                    <div class="info">
                                        <div class="detail-label">
                                            <label class="position-relative mb-1">
                                                {{ $t('programs.cardInfo.trip.flightLine') }}
                                            </label>
                                            <span
                                                class="p-2 px-3 rounded-1 bg-secondary text-center fw-bold text-capitalize bg-opacity-25 text-muted d-block"
                                                v-if="flightTrip.flightAirLine">
                                                {{ $i18n.locale === 'en' ? flightTrip.flightAirLine.name_en :
                                                    flightTrip.flightAirLine.name_ar }}
                                            </span>
                                        </div>
                                        <div class="more-info d-flex align-items-start mt-3 gap-4">
                                            <div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">Going From</label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                                        v-if="flightTrip.returnFrom">
                                                        {{ $i18n.locale === 'en' ? flightTrip.returnFrom.english_name :
                                                            flightTrip.returnFrom.arabic_name }}
                                                    </span>
                                                </div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">Departure Time</label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                        09:40 AM
                                                    </span>
                                                </div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">
                                                        {{ $t('programs.cardInfo.trip.allowedWeight') }}
                                                    </label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                        {{ +flightTrip.allowedWeightReturn }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">
                                                        {{ $t('programs.cardInfo.trip.to') }}
                                                    </label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                                        v-if="flightTrip.returnTo">
                                                        {{ $i18n.locale === 'en' ? flightTrip.returnTo.english_name :
                                                            flightTrip.returnTo.arabic_name }}
                                                    </span>
                                                </div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">Arrival Time</label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                        11:10 AM
                                                    </span>
                                                </div>
                                                <div class="detail-label my-2">
                                                    <label class="position-relative mb-1">
                                                        {{ $t('programs.cardInfo.trip.flightNum') }}
                                                    </label>
                                                    <span
                                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                                        {{ flightTrip.returnFlightNumber }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="programme-details">
                                    <h2 class="mb-3">
                                        {{ $t("programs.cardInfo.programDetails") }}
                                    </h2>
                                    <ul class="d-flex flex-column gap-2">
                                        <li v-if="typeof programDetails.program_details_english === 'object' && typeof programDetails.program_details_arabic === 'object'"
                                            v-for="(item, index) in $i18n.locale === 'en' ?  programDetails.program_details_english :  programDetails.program_details_arabic " :key="index"
                                            class="text-capitalize">
                                            <i :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'}`"></i>
                                            {{ item }}
                                        </li>
                                        <li v-else class="text-capitalize">
                                            <i
                                                :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'}`"></i>
                                            {{ $i18n.locale === 'en' ? programDetails.program_details_english : programDetails.program_details_arabic  }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>
<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';
import i18n from '../i18n';

const route = useRoute()
const programDetails = ref({})
const flightTrip = ref({})


onMounted(async () => {
    await axios.get("https://seasonreal.seasonsge.com/appv1real/all-program")
        .then(data => {
            programDetails.value = data.data.filter(el => el.id == route.params.programId)[0]
            if (programDetails.value.includes_flight == '1') {
                axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all").then(data => {
                    console.log(data.data);
                    flightTrip.value = data.data.filter(ele => {
                        if (ele.flightNumber === programDetails.value.flight_number &&
                            ele.departureDate >= new Date().toLocaleDateString("en-CA")) {
                            return ele
                        }
                    })[0]
                    axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view")
                        .then(data => {
                            if (data.data.success) {
                                flightTrip.value['flightAirLine'] = data.data.airlines.filter(airLine => airLine.id == flightTrip.value.flightLine)[0]
                            }
                        })
                    axios.get("https://seasonreal.seasonsge.com/appv1real/viewAirports")
                        .then(data => {
                            if (data.data.success) {
                                flightTrip.value['from'] = data.data.data.filter(element => element.id == flightTrip.value.fromAirport)[0]
                                flightTrip.value['to'] = data.data.data.filter(element => element.id == flightTrip.value.toAirport)[0]
                                flightTrip.value['returnFrom'] = data.data.data.filter(element => element.id == flightTrip.value.departureToReturn)[0]
                                flightTrip.value['returnTo'] = data.data.data.filter(element => element.id == flightTrip.value.arrivalFromReturn)[0]
                            }
                        })
                })
            }
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            programDetails.value.destination = data.data.filter(el => el.id == programDetails.value.return_airline)[0]
        })
    if (programDetails.value.program_details_arabic.includes('\r\n\r\n') || programDetails.value.program_details_english.includes('\r\n\r\n')) {
        programDetails.value.program_details_arabic = programDetails.value.program_details_arabic.split('\r\n\r\n')
        programDetails.value.program_details_english = programDetails.value.program_details_english.split('\r\n\r\n')
    }
})

</script>
<style lang="scss" scoped>
.inner-program {
    .details {
        img {
            width: 40%;
        }

        .program-info {
            h2 {
                color: var(--blue-color);
            }

            span {
                background-color: var(--orange-color);
                width: fit-content;
            }
        }

        .flight-details {
            h2 {
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    width: 15%;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 3px;
                    bottom: -10px;
                    border-radius: 50px;
                    background-color: var(--blue-color);
                }
            }

            .go-trip {
                .more-info>div {
                    flex-basis: 50%;
                }
            }
        }
    }

    .more-details {
        .return-trip {
            flex-basis: 50%;

            .more-info>div {
                flex-basis: 50%;
            }
        }

        .programme-details {

            h2 {
                color: var(--orange-color);
            }

            ul {

                li {
                    display: flex;
                    gap: 10px;
                    font-weight: 500;

                    i {
                        color: var(--blue-color);
                        position: relative;
                        top: 5px;
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        .details {
            flex-direction: column;
            justify-content: center;
            gap: 20px !important;

            img {
                width: 100%;
            }

            .more-info {
                flex-direction: column;
                align-items: stretch !important;
            }
        }

        .more-details {
            &>div {
                flex-direction: column;
            }

            .more-info {
                flex-direction: column;
                align-items: stretch !important;
            }
        }
    }
}
</style>