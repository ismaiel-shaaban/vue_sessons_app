<template>
    <div class="hotel-search">
        <!-- <div class="container"> -->
        <div class="search-box p-4">
            <div v-if="forward === '1'" class="content rounded-1 bg-white">
                <div class="inner p-4">
                    <form class="d-flex gap-4 flex-column">
                        <div class="top d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.country') }}:</span>
                                <select name="arrival in"
                                    :class="`p-2 w-100 rounded-1 px-3 ${validation.country.$error ? 'error' : ''}`"
                                    v-model="searchInfo.country" @change="getCitites($event)">
                                    <option value="" disabled selected>--Choose--</option>
                                    <option class="text-capitalize" :value="item.id" v-for="(item, index) in countries"
                                        :key="index">
                                        {{ $i18n.locale === 'en' ? item.name_en : item.name }}
                                    </option>
                                </select>
                                <span v-if="validation.country.$error" class="text-danger mt-1 d-block fst-italic">
                                    {{ validation.country.required.$message }}
                                </span>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.city') }}:</span>
                                <select name="arrival in"
                                    :class="`p-2 w-100 rounded-1 px-3 ${validation.city.$error ? 'error' : ''}`"
                                    v-model="searchInfo.city">
                                    <option value="" disabled selected>--Choose--</option>
                                    <option class="text-capitalize" :value="item.id" v-for="(item, index) in cities"
                                        :key="index">
                                        {{ $i18n.locale === 'en' ? item.name_en : item.name }}
                                    </option>
                                </select>
                                <span v-if="validation.city.$error" class="text-danger mt-1 d-block fst-italic">
                                    {{ validation.city.required.$message }}
                                </span>
                            </label>
                        </div>
                        <div class="middle d-flex gap-3">
                            <label class="w-50">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('carBook.details.fDate') }}:
                                </span>
                                <VueDatePicker v-model="searchInfo.start_date"
                                    :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                    auto-apply />
                            </label>
                            <label class="w-50">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('carBook.details.tDate') }}:
                                </span>
                                <VueDatePicker v-model="searchInfo.end_date"
                                    :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                    auto-apply />
                            </label>
                        </div>
                        <span v-if="validation.start_date.$error" class="text-danger fst-italic d-block mt-2">
                            {{ validation.start_date.dateValitdation.$message }}
                        </span>
                        <div class="bottom d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.adults') }}: </span>
                                <input class="rounded-1 p-2 px-3 w-100" type="number" min="1"
                                    v-model="searchInfo.no_adults">
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.children') }}: </span>
                                <input class="rounded-1 p-2 px-3 w-100" type="number" min="0"
                                    v-model="searchInfo.no_children">
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.infants') }}:</span>
                                <input class="rounded-1 p-2 px-3 w-100" type="number" min="0"
                                    v-model="searchInfo.no_infants">
                            </label>
                        </div>
                        <span v-if="numValidation" class="error text-danger w-100 d-block fst-italic">
                            Number Of Persons Can't Be More Than 10
                        </span>
                        <div class="select-room">
                            <span class="d-block mb-2" style="font-size: 12px;">
                                You Can Customize Your Room(S) By Click Here
                            </span>
                            <button class="p-2 px-3 rounded-1 border-0 bg-warning fw-semibold w-25 me-auto"
                                @click.prevent="selectRoom">{{ $t('buttons.selectRoom') }}</button>
                        </div>
                        <div class="table-cont overflow-auto">
                            <table class="mt-4">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>{{ $t('programs.search.roomType') }}</td>
                                        <td>{{ $t('programs.search.childReserv') }}</td>
                                        <td>{{ $t('programs.search.childCount') }}</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="rooms"
                                        :data-room="item.roomType === 'single room' ? '1' : item.roomType === 'double room' ? '2' : '3'"
                                        v-for="(item, index) in searchInfo.rooms" :key="index">
                                        <td class="text-center">
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            <select class="rounded-1 p-2 px-3 w-100" name="room type"
                                                v-model="item.roomType">
                                                <option value="1">{{ $t('programs.search.single') }}</option>
                                                <option value="2">{{ $t('programs.search.double') }}</option>
                                                <option value="3">{{ $t('programs.search.triple') }}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select class="rounded-1 p-2 px-3 w-100" name="room type"
                                                v-model="item.childReservation">
                                                <option value="none">{{ $t('programs.search.none') }}</option>
                                                <option value="child without bed">
                                                    {{ $t('programs.search.childWithoutBed') }}</option>
                                                <option value="child with bed">{{ $t('programs.search.childWithBed') }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <input class="rounded-1 p-2 px-3 w-100" min="0" type="number"
                                                v-model="item.childCount">
                                        </td>
                                        <td class="text-center">
                                            <button class="del-butn border-0 rounded-1 p-2 px-3 bg-secondary" title="Delete"
                                                @click.prevent="deleteRoom(item)">
                                                <i class="fa-solid fa-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <span v-if="validation.rooms.$error" class="fst-italic text-danger mt-1 d-block"
                            v-for="(item, index) in validation.rooms.$errors" :key="index">
                            {{ item.$message }}
                        </span>
                        <button class="butn p-2 px-3 rounded-1 mt-3" @click.prevent="search">
                            {{ $t('buttons.search') }}
                        </button>
                    </form>
                </div>
            </div>
            <HotelTableComp v-else-if="forward === '2'" :searchResults="searchResults" :searchInfo="searchInfo"
                @back-ward="() => { forward = '1', searchResults = [] }" @getIdAndForward="getIdAndForward">
            </HotelTableComp>
            <HotelBookComp v-else-if="forward === '3'" @back-ward="forward = '2'" :searchInfo="searchInfo"
                :searchResults="searchResults" :hotelId="hotelId" :cities="cities" :countries="countries">
            </HotelBookComp>
            <Loader v-if="loading"></Loader>
        </div>
        <!-- </div> -->
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import Loader from '../../components/Loader.vue';
import HotelTableComp from './HotelTableComp.vue';
import HotelBookComp from './HotelBookComp.vue';



const loading = ref(false)
const allHotels = ref([])
const hotelId = ref('')
const cities = ref([])
const countries = ref([])
const searchResults = ref([])
const forward = ref('1')
const roomCounts = ref(0)
const childCounts = ref(0)
const searchInfo = ref({
    country: '',
    city: '',
    start_date: new Date(),
    end_date: new Date(),
    no_adults: 1,
    no_children: 0,
    no_infants: 0,
    rooms: []
})


const getCitites = async (e) => {
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            cities.value = data.data.filter(el => el.country_id == e.target.value && !el.name.includes("&") && !el.name_en.includes("&"))
        })
}


watch(searchInfo.value, newVal => {
    roomCounts.value = 0
    childCounts.value = 0
    newVal.rooms.forEach(el => {
        roomCounts.value += +el.roomType
        childCounts.value += +el.childCount
    })
})

const roomValidation = () => {
    if (roomCounts.value === searchInfo.value.no_adults) {
        return true
    } else {
        return false
    }
}
const childsValidation = () => {
    if (childCounts.value === searchInfo.value.no_children) {
        return true
    } else {
        return false
    }
}
const dateValitdation = () => {
    if (searchInfo.value.start_date > searchInfo.value.end_date) {
        return false
    } else return true
}

const rules = {
    country: { required: helpers.withMessage("Required Field", required) },
    city: { required: helpers.withMessage("Required Field", required) },
    start_date: { dateValitdation: helpers.withMessage("From Date Can't Be Bigger Than To Date", dateValitdation) },
    rooms: {
        required: helpers.withMessage("You must select at least one room", required),
        roomValidation: helpers.withMessage("person number doesn't match the number of beds in each room", roomValidation),
        childsValidation: helpers.withMessage("childs number doesn't match the number of childs count in each room", childsValidation)
    }
}
const validation = useVuelidate(rules, searchInfo)

const numValidation = computed(() => {
    if ((searchInfo.value.no_infants + searchInfo.value.no_children + searchInfo.value.no_adults) > 10) {
        return true
    } else return false
})



const getIdAndForward = (id) => {
    forward.value = '3'
    hotelId.value = id
}
const selectRoom = () => {
    searchInfo.value.rooms.push({
        roomType: '1',
        childReservation: 'none',
        childCount: 0,
    })
}
const deleteRoom = (room) => {
    searchInfo.value.rooms = searchInfo.value.rooms.filter(el => el !== room)
}



const search = () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        loading.value = true
        allHotels.value.forEach(el => {
            if (el.city == searchInfo.value.city &&
                el.status == '0') {
                    console.log(el,'tttttttttttttttttt');
                searchResults.value.push(el)
                loading.value = false
                forward.value = '2'
            } else {
                loading.value = false
                forward.value = '2'
            }
        })
    }
}

const imagData = ref([]);
onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/country-view")
        .then(data => {
            loading.value = false
            countries.value = data.data.filter(el => !el.name_en.includes("&") && !el.name.includes("&"))
        })
        await axios.get("https://seasonreal.seasonsge.com/appv1real/all-hotel")
        .then(data => {
            if (data.data.success) {
                allHotels.value = data.data.data
                
            }
            console.log('iam all data');
            console.log(data.data.data)
            localStorage.setItem('allHotelImages' , JSON.stringify(data.data.data))
        })

})

</script>
<style lang="scss" scoped>
.hotel-search {
    .search-box {

        input,
        select {
            outline: none;
            border: 1px solid darkgray;

            &.error {
                border-color: #dc3545;
            }
        }

        .content {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

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

            table {
                td {
                    padding: 15px;
                    border: 1px solid darkgray;
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

            .table-cont {
                table {
                    width: 100%;
                }
            }
        }

        @media (max-width: 767px) {
            padding: 10px !important;

            .content {
                .tabs {
                    span {
                        font-size: 12px;
                    }
                }

                .inner {
                    padding: 20px 15px !important;
                }

                .select-room {
                    button {
                        width: fit-content !important;
                    }
                }
            }
        }
    }
}
</style>