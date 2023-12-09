<template>
<div class="cars-details position-relative">
        <span
            class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward')" title="Back">
            <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
        </span>
        <div class="container py-5">
            <h1 class="heading mb-5 position-relative">
                {{ $t('carBook.heading') }}
            </h1>


            <div class="inner d-flex py-5 gap-4">
                <div class="img-cont w-50">
                    <img class="img-fluid" :src="`https://seasonreal.seasonsge.com/images/Agents/${carInfo.car_image}`" alt="" />
                </div>
                <div class="car-info flex-fill">
                    <div class="d-flex gap-3">
                        <div class="w-100">
                            
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.type') }}: </span>
                            <span class="text-capitalize p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ $route.params.lang === 'en' ? viewCarId[0].type_english_name || 'Unknown' : viewCarId[0].type_arabic_name
                                    || 'غير معروف' }}
                            </span>
                        </div>
                        <div class="w-100">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.price') }}: </span>
                            <span class="price p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{
                                    userInfo.with_driver == "1"
                                    ? USDollar.format(viewCarId[0].price_with_driver)
                                    : USDollar.format(viewCarId[0].price_per_day)
                                }}
                            </span>
                        </div>
                        
                    </div>
                    <div class="w-100 my-3">
                        <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.driver.head') }}: </span>
                        <select @change="price()" class="p-2 px-3 w-100 rounded-1" name="driver" v-model="userInfo.with_driver">
                            <option value="1" v-if="viewCarId[0].price_with_driver > 0">{{ $t('carBook.details.driver.with') }}
                            </option>
                            <option value="0" v-if="viewCarId[0].price_per_day > 0">{{ $t('carBook.details.driver.without') }}
                            </option>
                    
                        </select>
                <div>
                    <span v-if="validation.with_driver.$error" class="error d-block text-danger fst-italic mx-2">
                            {{
                                validation.with_driver.$errors[0].$validator === "required"
                                ? "Field Reuqired"
                                : ""
                            }}
                        </span>
                </div>
                    </div>
                    <form>
                        <div class="first d-flex flex-column flex-md-row gap-3 mt-3">
                            <label class="w-50 d-flex gap-2">
                            <div class="w-100 p-1" v-if="userInfo.type === 'MR' || userInfo.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} :
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="userInfo.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                                </div>
                    
                            </label>
                            <div class="w-100 position-relative">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.fName') }}: </span>
                                <input :class="`p-2 px-3 w-100 rounded-1 ${validation.first_name.$error ? 'error' : ''}`"
                                    type="text" v-model="userInfo.first_name" placeholder="First Name" />
                                <span v-if="validation.first_name.$error" class="error d-block text-danger fst-italic mx-2">
                                    {{
                                        validation.first_name.$errors[0].$validator === "required"
                                        ? "Field Reuqired"
                                        : ""
                                    }}
                                </span>
                            </div>
                            <div class="w-100 position-relative">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.lName') }}: </span>
                                <input :class="`p-2 px-3 w-100 rounded-1 ${validation.last_name.$error ? 'error' : ''}`"
                                    type="text" v-model="userInfo.last_name" placeholder="Last Name" />
                                <span v-if="validation.last_name.$error" class="error d-block text-danger fst-italic mx-2">
                                    {{
                                        validation.last_name.$errors[0].$validator === "required"
                                        ? "Field Reuqired"
                                        : ""
                                    }}
                                </span>
                            </div>
                        </div>
                        <div class="second d-flex flex-column gap-3 mt-3">
                            <div class="w-100 position-relative">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.phone') }}: </span>
                                <input :class="`p-2 px-3 w-100 rounded-1 ${validation.phone_number.$error ? 'error' : ''
                                    }`" type="phone" v-model="userInfo.phone_number" placeholder="Phone Number" />
                                <span v-if="validation.phone_number.$error"
                                    class="error d-block text-danger fst-italic mx-2">
                                    {{
                                        validation.phone_number.$errors[0].$validator === "required"
                                        ? "Field Reuqired"
                                        : "Invalid Phone Number"
                                    }}
                                </span>
                            </div>
                        </div>
                        <div class="third mt-3 d-flex gap-3">
                            <div class="w-100">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.fDate') }}: </span>
                                <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ userInfo.start_date }}
                                </span>
                            </div>
                            <div class="w-100">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.tDate') }}: </span>
                                <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ userInfo.end_date }}
                                </span>
                            </div>
                        </div>
                    </form>
                    <div class="fourth mt-3">
                        <div class="w-100 mt-2">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.days') }}: </span>
                            <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ +(userInfo.total_days) }}
                            </span>
                        </div>
                        <div class="w-100 mt-2">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.total') }}: </span>
                            <span class="netTotal total p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ USDollar.format(myPrice * userInfo.total_days )}}
                            </span>
                        </div>
                        <div class="w-100 mt-2">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.tax') }}: </span>
                            <span class="tax myTax p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ +(viewCarId[0].tax) }}%
                            </span>
                        </div>
                        <div class="w-100 mt-2">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.net') }}: </span>
                            <span class="myTotal pure-total p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                {{ USDollar.format((viewCarId[0].tax/100 * (myPrice * userInfo.total_days)) + (myPrice * userInfo.total_days)) }}
                            </span>
                        </div>
                        <div class="w-100 mt-2 position-relative">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.notes') }}: </span>
                            <textarea name="notes"
                                :class="`w-100 rounded-1 p-2 px-3 ${validation.notes.$error ? 'error' : ''}`" :placeholder="$i18n.locale === 'en' ?
                                    'Please write down the place the car will wait for you' :
                                    'برجاء تحديد المكان الذي يتم استلام السياره منه'"
                                v-model="userInfo.notes"></textarea>
                            <span v-if="validation.notes.$error" class="text-danger mt-1 d-block fst-italic">
                                {{ validation.notes.required.$message }}
                            </span>
                        </div>
                        <button class="butn rounded-1 p-2 px-5 w-100 mt-3 text-uppercase" @click.prevent="submission"
                        v-if="buttonVisible"
                        >
                            {{ $t('buttons.confirm') }}
                        </button>
                    </div>
                </div>
                <div class="alert alert-success alert-dismissible text-center position-fixed" role="alert">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-circle-check fs-5"></i>
                        {{ $t('carBook.bookMessage') }}
                    </div>
                    <span class="d-block mt-1">{{ `${$t('carBook.bookingCode')}: ${randomCode}` }}</span>
                    <button @click="removeAlert" type="button" class="btn-close"></button>
                </div>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>

<script setup>
import axios from "axios";
import Checkout from "../Views/Checkouts/CarsCheckout.vue"
import { ref, onMounted, computed, watch , onBeforeMount } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric, helpers } from "@vuelidate/validators";
import Loader from "./Loader.vue";
import router from "../router";
import i18n from "../i18n";
const buttonVisible = ref(true)
const loading = ref(false)
const carInfo = ref([]);
const randomCode = ref('')
const social = ref({})
const props = defineProps(['searchInfo', 'carId' , 'country' , 'city'])
let myPrice = ref();
let tax = ref();
let total = ref();
let price = ()=>{
myPrice.value = +(document.querySelector(".price").textContent.slice(1));
tax.value =+(`0.${viewCarId.value[0].tax}`.slice(0,-3));
total.value = +(myPrice.value) * tax.value;
console.log(tax.value);
}



let myTotal = ref('')
let myNetTotal = ref('')
let myTax = ref('')
const setTotal = (e)=>{
myTotal.value = document.querySelector('.myTotal').textContent;
sessionStorage.setItem('Total' ,myTotal.value )

}
const setNetTotal = ()=>{
    myNetTotal.value = document.querySelector('.netTotal').textContent;
    sessionStorage.setItem('myNetTotal', myNetTotal.value);
}
const setTax = (e)=>{
myTax.value = document.querySelector('.myTax').textContent;
sessionStorage.setItem('Tax' , myTax.value)

}







let viewCarId = ref([]);
let filterCarId = ref({});
onBeforeMount(async()=>{
    console.log('country is');
    console.log(props.country);
    console.log('city is');
    console.log(props.city );
    let id = localStorage.getItem('carId');
    let carsData  = JSON.parse(localStorage.getItem('carsData'));
     filterCarId = carsData.filter((car)=>{
        return car.id == id;
    })
    console.log('filterCarId' ,filterCarId);
    
    viewCarId.value = [...filterCarId];
   console.log('iam from details');
   console.log(viewCarId.value);
})

onMounted(async () => {
    localStorage.setItem('country' , props.country);
    localStorage.setItem('city' , props.city);


    price();
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-view").then((data) => {
        // debugger
        // carInfo.value =data.data.find((el)=>+el.type_id === props.carId)
        data.data.filter(el => {
            if (el.type_id == props.carId) {
                carInfo.value = el
                userInfo.value.with_driver = el.price_with_driver;
            }
            console.log(carInfo.value, 'carInfo')
            loading.value = false
        })
        // console.log(data.data)
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view").then((data) => {
        data.data.filter(el => {
            if (el.id == props.carId) {
                carInfo.value['car_name_en'] = el.name_en
                carInfo.value['car_name'] = el.name
                carInfo.value['car_image'] = el.img
            }
            // console.log(carInfo.value)
        })
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
            // console.log(data)
        })
});


// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})


console.log('props', props);
const userInfo = ref({
    type_id: '',
    // with_driver: computed(() => parseInt(carInfo.value.price_with_driver) > 0 ? carInfo.value.price_with_driver : 0),

    // with_driver: computed(() => {
    //     console.log('carInfo.value.price_with_driver:', carInfo.value.price_with_driver)
    //     if (carInfo.value.price_with_driver !== undefined) {
    //         console.log('carInfo.value.price_with_driver:', carInfo.value.price_with_driver);
    //         return parseInt(carInfo.value.price_with_driver) > 0 ? carInfo.value.price_with_driver : 0;
    //     } else {
    //         return 0;
    //     }
    // }),

    // with_driver: computed(() => {
    //     console.log('carInfo.value.price_with_driver:', carInfo.value.price_with_driver);
    //     return parseInt(carInfo.value.price_with_driver) > 0 ? carInfo.value.price_per_day : 0;
    // }),

    // with_driver: computed(() => carInfo.value.price_with_driver > 0 ? carInfo.value.price_with_driver : 0),
    with_driver: '',
    first_name: '',
    last_name: '',
    type:"MR",
    email: props.searchInfo.country,
    phone_number: "",
    start_date: props.searchInfo.fromDate.toLocaleDateString('en-CA'),
    end_date: props.searchInfo.toDate.toLocaleDateString('en-CA'),
    total_days: computed(() => {
        if (userInfo.value.start_date === userInfo.value.end_date) {
            return "1"
        } else return ((new Date(userInfo.value.end_date).getTime() - new Date(userInfo.value.start_date).getTime()) / (1000 * 60 * 60 * 24)).toString()
    }),
    total_amount: computed(() => myNetTotal.value.replace(/\$/g, '')),
    tax: computed(() => parseFloat(carInfo.value.tax)),
    net_amount: computed(() => (parseFloat(userInfo.value.total_amount) + ((parseFloat(userInfo.value.tax)).toFixed(2) / 100) * parseFloat(userInfo.value.total_amount))),
    notes: "",
    account_owner: ""
});

watch(userInfo.value, (newVal) => {
    if (newVal.start_date < new Date().toLocaleDateString("en-CA")) {
        userInfo.value.start_date = new Date().toLocaleDateString("en-CA")
    }
    if (newVal.end_date < new Date().toLocaleDateString("en-CA")) {
        userInfo.value.end_date = new Date().toLocaleDateString("en-CA")
    }
})


const rules = {
    first_name: { required },
    last_name: { required },
    with_driver:{required},
    // email: { required, email },
    phone_number: { required, numeric },
    notes: { required: helpers.withMessage('Field Required', required) },
};

const validation = useVuelidate(rules, userInfo);

const submission = async () => {
    setNetTotal();
    setTax();
    setTotal();
    console.log('type_id' ,filterCarId);
    userInfo.value.type_id =filterCarId[0].type_id
    console.log("userInfo",userInfo);
    validation.value.$validate();
    if (!validation.value.$error) {
        if (localStorage.getItem("clientLogin")) {
            const userId = JSON.parse(localStorage.getItem("clientLogin"))
            userInfo.value.account_owner = userId.id
            loading.value = true
            userInfo.value.first_name = `${userInfo.value.type}  ${userInfo.value.first_name} `
            await axios.post('https://seasonreal.seasonsge.com/appv1real/car-order', userInfo.value)
                .then(response => {
                    if (response.data.status === 'success') {
                        document.querySelector('.alert').classList.add("active")
                        randomCode.value = response.data.random_code
                        loading.value = false
                        axios.get(`https://seasonreal.seasonsge.com/appv1real/car-rr?id=${userId.id}`)
                            .then(data => {
                                const bookId = data.data.pop()
                                setTimeout(() => {
                                    router.push({
                                        name: "Cars Checkout",
                                        params: { lang: i18n.global.locale.value, id: bookId.id }
                                    })
                                }, 1500)
                            })
                            buttonVisible.value = false;
                    }
                }).catch(error => {
                    console.log(error);
                })
        } else {
            router.push({
                name: "Clients Login",
                params: { lang: i18n.global.locale.value }
            })
        }

    }
};


const removeAlert = () => {
    document.querySelector(".alert").classList.remove("active")
}


</script>

<style lang="scss" scoped>
.cars-details {
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

    .car-info {
        input {
            border: 1px solid darkgray;
            outline: none;

            &.error {
                border: 1px solid #dc3545;
            }
        }

        select {
            border: 1px solid darkgray;
            outline: none;
        }

        textarea {
            outline: none;
            border: 1px solid darkgray;
            resize: none;
            height: 125px;

            &.error {
                border: 1px solid #dc3545;
            }
        }
    }

    .alert {
        top: -15%;
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
        .car-info {
            width: 100%;
        }

        .inner {
            flex-direction: column;
            align-items: center;

            .img-cont {
                width: 100% !important;
            }

            .third {
                flex-direction: column;
            }
        }

        .alert {
            width: 90%;
            font-size: 12px;
        }
    }
}
</style>
