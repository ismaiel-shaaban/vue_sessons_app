<template>
    <div class="program-search min-vh-100">
        <HeaderComp></HeaderComp>
        <div class=" py-5">
            <div class="tourism-search p-4">
                <div v-if="forward === '1'" class="content rounded-1 bg-white">
                    <div class="tabs d-flex text-center fw-semibold align-items-center">
                        <span :class="`p-3 px-0 d-block w-50 ${searchInfo.includeFlight === '1' ? 'active' : ''}`"
                            @click="searchInfo.includeFlight = '1'">
                            {{ $t('programs.search.trip[0]') }}
                        </span>
                        <span :class="`p-3 px-0 d-block w-50 ${searchInfo.includeFlight === '0' ? 'active' : ''}`"
                            @click="searchInfo.includeFlight = '0'">
                            {{ $t('programs.search.trip[1]') }}
                        </span>
                    </div>
                    <div class="inner p-4">
                        <form class="d-flex gap-4 flex-column">
                            <div class="top d-flex gap-3 flex-md-row flex-column">
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.country') }}:</span>
                                    <select name="arrival in"
                                        :class="`p-2 w-100 rounded-1 px-3 ${validation.country.$error ? 'error' : ''}`"
                                        v-model="searchInfo.country" @change="getCitites($event) , setCountry($event)">
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
                                    <select @change="setCity($event)" name="arrival in"
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
                            <div class="d-flex gap-3 flex-md-row flex-column">
                                <label class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.deptDate') }}:</span>
                                    <VueDatePicker v-model="searchInfo.departureDate"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        :day-class="searchInfo.includeFlight !='0' ? departureDates : ''"
                                        auto-apply />
                                </label>
                                <label class="w-100" v-if="searchInfo.includeFlight == 0">
                                    <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.toDate') }}:</span>
                                    <VueDatePicker v-model="searchInfo.toDate"
                                        :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                        :day-class="searchInfo.includeFlight !=0 ? returnDates : ''"
                                        auto-apply />
                                </label>
                            </div>
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
                                                <button class="del-butn border-0 rounded-1 p-2 px-3 bg-secondary"
                                                    title="Delete" @click.prevent="deleteRoom(item)">
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
                            <button class="butn p-2 px-3 rounded-1 mt-3" @click.prevent="search">{{ $t('buttons.search')
                            }}</button>
                        </form>
                        <div class="alert alert-success alert-dismissible text-center position-fixed" role="alert">
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-solid fa-circle-check fs-5"></i>
                                لا يوجد برامج حاليا 
                            </div>
                            
                            <button @click="removeAlert()" type="button" class="btn-close"></button>
                        </div>
                    </div>
                </div>
                <ProgramTable v-else-if="forward === '2'" :searchResults="searchResults" :searchInfo="searchInfo"
                    @back-ward="() => { forward = '1', searchResults = [] }" @getIdAndForward="getIdAndForward">
                </ProgramTable>
                <ProgramBook v-else-if="forward === '3'" @back-ward="forward = '2'" :searchInfo="searchInfo"
                    :searchResults="searchResults" :programId="programId" :cities="cities" :countries="countries">
                </ProgramBook>
                <Loader v-if="loading"></Loader>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>

<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import axios, { all } from 'axios';
import { ref, onMounted, computed, watch } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Loader from '../components/Loader.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import ProgramTable from '../components/ProgramTable.vue';
import ProgramBook from '../components/ProgramBook.vue';


const city = ref();
const country = ref();
const setCity = (e)=>{
city.value = e.target.options[e.target.selectedIndex].text
console.log(city.value);
localStorage.setItem('programmCity' , city.value)
}
const setCountry = (e)=>{
country.value = e.target.options[e.target.selectedIndex].text;
console.log(country.value);
localStorage.setItem('programmCountry' , country.value)


}


const allDeptDates = ref([])
const loading = ref(false)
const allPrograms = ref([])
const programId = ref('')
const cities = ref([])
const countries = ref([])
const searchResults = ref([])
const forward = ref('1')
const roomCounts = ref(0)
const childCounts = ref(0)
const searchInfo = ref({
    includeFlight: '1',
    country: '',
    city: '',
    departureDate: new Date(),
    toDate: new Date(),
    no_adults: 1,
    no_children: 0,
    no_infants: 0,
    rooms: []
})


const getCitites = async (e) => {
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            cities.value = data.data.filter(el => el.country_id == e.target.value)
            // console.log(data)
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

const rules = {
    country: { required: helpers.withMessage("Required Field", required) },
    city: { required: helpers.withMessage("Required Field", required) },
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


// For Date Package ♥ 
// const departureDates = (date) => {
//     if (allDeptDates.value.includes(date.toLocaleDateString("en-CA"))) {
//         return "marked-cell"
//     } else {
//         return ''
//     }
// }
const getIdAndForward = (id) => {
    forward.value = '3'
    programId.value = id
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


const search = async () => {
    sessionStorage.setItem('programm-CheckIn' , searchInfo.value.departureDate.toLocaleDateString());
    sessionStorage.setItem('programm-CheckOut' ,searchInfo.value.toDate.toLocaleDateString());
    validation.value.$validate()
    if (!validation.value.$error && !numValidation.value) {
        loading.value = true
        if(allPrograms.value.length == 0) {
            setTimeout(()=>{
                document.querySelector(".alert").classList.add("active")
                loading.value = false

            },2000)
           
        }
        allPrograms.value.forEach(el => {
            if(el.status == 1){

                if (searchInfo.value.includeFlight == '1') {
                    console.log(el,'el');
                    if (el.return_airline == searchInfo.value.city && // <-- program destination
                        el.from_date >= searchInfo.value.departureDate.toLocaleDateString("en-CA") &&
                        el.includes_flight == searchInfo.value.includeFlight
                    ) {
                        searchResults.value.push(el)
                        forward.value = '2'
                        loading.value = false
                    } else {
                        forward.value = '2'
                        loading.value = false
                    }
                } else {
                 
                    const departureDateUTC = new Date(Date.UTC(
                        searchInfo.value.departureDate.getFullYear(),
                        searchInfo.value.departureDate.getMonth(),
                        searchInfo.value.departureDate.getDate()
                    ));

                    const toDateUTC = new Date(Date.UTC(
                        searchInfo.value.toDate.getFullYear(),
                        searchInfo.value.toDate.getMonth(),
                        searchInfo.value.toDate.getDate()
                    ));

                    const timeDifferenceInMilliseconds = toDateUTC - departureDateUTC;
                    const timeDifferenceInDays = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
                    if (el.return_airline == searchInfo.value.city && // <-- program destination
                        el.num_of_days%timeDifferenceInDays == 1 &&
                        el.includes_flight == searchInfo.value.includeFlight
                    ) {
                        searchResults.value.push(el)
                        forward.value = '2'
                        loading.value = false
                    } else {
                        forward.value = '2'
                        loading.value = false
                    }
                }
            }
        })
    }
}

const removeAlert = () => {
    document.querySelector(`.alert`).classList.remove("active")
}

// For Date Package ♥ 
const flightDates = ref({
    departureDates: [],
    returnDates: [],
});
const departureDates = (date) => {
    if (flightDates.value.departureDates.includes(date.toLocaleDateString())) {
        return "marked-cell"
    } else return ''
}
const returnDates = (date) => {
    if (flightDates.value.returnDates.includes(date.toLocaleDateString())) {
        return "marked-cell"
    } else return ''
}


let programmsImages = ref([]);
onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/country-view")
        .then(data => {
            // console.log(data.data)
            loading.value = false
            countries.value = data.data
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/all-program")
        .then(data => {
            allPrograms.value = data.data
            data.data.forEach(el => {
                if (el.from_date >= new Date().toLocaleDateString("en-CA")) {
                   
                    allDeptDates.value.push(el.from_date)
                    if(el.includes_flight == 1){
                    flightDates.value.departureDates.push(new Date(el.from_date).toLocaleDateString())
                    flightDates.value.returnDates.push(new Date(el.to_date).toLocaleDateString())
                }
            }
            })
        })
        for(let i = 0 ; i < allPrograms.value.length ; i++){
        if( allPrograms.value[i].image_1 !='' &&  allPrograms.value[i].image_2 !='' &&  allPrograms.value[i].image_2 !='' && allPrograms.value[i].image_4 !='' &&  allPrograms.value[i].image_5 !='' ){
            programmsImages.value.push(allPrograms.value[i].image_1)
           programmsImages.value.push(allPrograms.value[i].image_2)
           programmsImages.value.push(allPrograms.value[i].image_3)
           programmsImages.value.push(allPrograms.value[i].image_4)
           programmsImages.value.push(allPrograms.value[i].image_5)
        }
        }

console.log(allPrograms.value);
localStorage.setItem('allprogramms' , JSON.stringify(allPrograms.value))

//console.log(flightDates.value.departureDates);
//console.log(flightDates.value.returnDates);
//console.log(allPrograms.value);
console.log(programmsImages.value);
localStorage.setItem('programmsImgs' , JSON.stringify(programmsImages.value))
})
</script>

<style lang="scss" scoped>
    .alert {
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s;
        z-index: 555555555;
        padding: 10PX;
        font-size: 20PX;
        width: 60%;

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
            font-size: 12px;
        }
    }
.program-search {
    .tourism-search {

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