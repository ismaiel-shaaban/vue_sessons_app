<template>
    <div class="car-reservation">
        <div class="content rounded-1 bg-white p-4">
            <span
                class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward')" title="Back">
                <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
            </span>
            <h3 class="position-relative mb-5">{{ $t('carBook.heading') }}</h3>
            <div class="inner d-flex flex-wrap py-5 gap-4">
                <div class="img-cont w-100">
                    <img class="img-fluid" :src="`https://seasonreal.seasonsge.com/images/Agents/${carInfo.car_image}`" alt="" />
                </div>
                <div class="car-info w-100 flex-fill">


                    <div class="w-100">
                                
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.type') }}: </span>
                                <span class="text-capitalize p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ $route.params.lang === 'en' ? viewCarId[0].type_english_name || 'Unknown' : viewCarId[0].type_arabic_name
                                        || 'غير معروف' }}
                                </span>
                    </div>
                    <label class="w-100">
                            <div class="w-100">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.price') }}: </span>
                                <span class="price p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{
                                        bookInfo.with_driver == "1"
                                        ? USDollar.format(viewCarId[0].price_with_driver)
                                        : USDollar.format(viewCarId[0].price_per_day)
                                    }}
                                </span>
                            </div>
                    </label>
                    <div class="top d-flex gap-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.driver.head') }}:</span>
                            <select @change="price()" class="p-2 px-3 w-100 rounded-1" name="driver" v-model="bookInfo.with_driver">
                                <option value="1" v-if="viewCarId[0].price_with_driver > 0">{{ $t('carBook.details.driver.with') }}
                                </option>
                                <option value="0" v-if="viewCarId[0].price_per_day > 0">{{ $t('carBook.details.driver.without') }}
                                </option>
                            </select>
                            <!--مع سائق او بدون سائق-->
                            <span v-if="validation.with_driver.$error" class="error d-block text-danger fst-italic mx-2">
                                {{
                                    validation.with_driver.$errors[0].$validator === "required"
                                    ? "Field Reuqired"
                                    : ""
                                }}
                            </span>
                        </label>
                    </div>
                    <form class="d-flex flex-column gap-3">
                        
                        <div class="first d-flex flex-column flex-md-row gap-3 mt-3">
                            <label class="w-50 d-flex gap-2">
                                    <div class="w-100 p-1" v-if="bookInfo.type === 'MR' || bookInfo.type === 'MRS'">
                                        <span class="d-block mb-1 fw-semibold">
                                            {{ $t('flightReservation.flightBook.type') }} :
                                        </span>
                                        <select class="w-100 p-2 px-3 rounded-1" v-model="bookInfo.type">
                                            <option value="MR">MR</option>
                                            <option value="MRS">MRS</option>
                                        </select>
                                        </div>
                            
                                </label>
                            <div class="w-100 position-relative">
                                <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.fName') }}: </span>
                                <input :class="`p-2 px-3 w-100 rounded-1 ${validation.first_name.$error ? 'error' : ''}`"
                                    type="text" v-model="bookInfo.first_name" placeholder="First Name" />
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
                                <input :class="`p-2 px-3 w-100 rounded-1 ${validation.last_name.$error ? 'error' : ''}`" type="text"
                                    v-model="bookInfo.last_name" placeholder="Last Name" />
                                <span v-if="validation.last_name.$error" class="error d-block text-danger fst-italic mx-2">
                                    {{
                                        validation.last_name.$errors[0].$validator === "required"
                                        ? "Field Reuqired"
                                        : ""
                                    }}
                                </span>
                            </div>
                        </div>
                        <div class="bottom-middle d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.phone') }}:</span>
                                <input :class="`rounded-1 w-100 p-2 px-3 ${validation.phone_number.$error ? 'error' : ''
                                    }`" type="Phone" placeholder="Phone Number" v-model="bookInfo.phone_number" />
                                <span v-if="validation.phone_number.$error" class="fst-italic text-danger d-block mt-2">
                                    {{
                                        validation.phone_number.$errors[0].$validator === "required"
                                        ? "Field Required"
                                        : "Invalid Phone Number"
                                    }}
                                </span>
                            </label>
                        </div>
                        <div class="bottom d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.fDate') }}:</span>
                                <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ bookInfo.start_date }}
                                </span>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.tDate') }}:</span>
                                <span class="p-2 fw-semibold d-block px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ bookInfo.end_date }}
                                </span>
                            </label>
                        </div>
                        <div class="group-1 d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.days') }}:</span>
                                <span class="d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ bookInfo.total_days }}
                                </span>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.total') }}:</span>
                                <span class="netTotal d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                  <!--total-->
                                    {{ USDollar.format(myPrice * bookInfo.total_days )}}
                                
                                </span>
                                
                            </label>
                        </div>
                        <div class="group-2 d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.tax') }}:</span>
                                <span class="myTax d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{ (viewCarId[0].tax || 0) }}%
                                </span>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.agentDiscount') }}:</span>
                                <span class="d-block dicount p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                    {{bookInfo.agent_discount 
                                      }}% 
                                </span>
                            </label>
                        </div>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('carBook.details.net') }}:</span>
                            <span class="myTotal d-block p-2 px-3 rounded-1 bg-secondary bg-opacity-25">
                                <!-- {{ (bookInfo.net_amount || 0).toFixed(2) }}$ -->
                                
                                {{ 
                                      
                                    
        
                                     USDollar.format(((myPrice * bookInfo.total_days) - (viewCarId[0].tax/100 * (myPrice * bookInfo.total_days)))  - ( (bookInfo.agent_discount/100) * ((myPrice * bookInfo.total_days) )))  
                                    
                                    
                                       
        
                                }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">{{ $t('carBook.details.notes') }}:</span>
                            <textarea :class="`w-100 rounded-1 p-2 px-3 ${validation.notes.$error ? 'error' : ''}`" name="notes"
                                :placeholder="$i18n.locale === 'en' ?
                                    'Please write down the place the car will wait for you' :
                                    'برجاء تحديد المكان الذي يتم استلام السياره منه'" v-model="bookInfo.notes"></textarea>
                            <span v-if="validation.notes.$error" class="text-danger mt-1 d-block fst-italic">
                                {{ validation.notes.required.$message }}
                            </span>
                        </label>
                        <button v-if="visibleButton" class="butn rounded-1 p-2 px-3 text-uppercase fw-semibold" @click.prevent="submission">
                            {{ $t('buttons.confirm') }}
                        </button>
                    </form>
                </div>


            </div>
        </div>
        <div :class="`alert alert-success alert-dismissible text-${$i18n.locale === 'en' ? 'start' : 'end'} position-fixed`"
            role="alert">
            <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-circle-check fs-5"></i>
                {{ $t('carBook.bookMessage') }}
            </div>
            <span class="d-block mt-1">{{ `${$t('carBook.bookingCode')}: ${randomCode}` }}</span>
            <span class="d-block mt-1">{{ `${$t('carBook.yourBalance')}: ${USDollar.format(updatedBalance)}` }}</span>
            <button @click="removeAlert('success')" type="button" class="btn-close"></button>
        </div>
        <div class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
            <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-circle-xmark fs-5"></i>
                {{ $t('carBook.noBalance') }}
            </div>
            <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch , onBeforeMount, onUpdated } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric, helpers } from "@vuelidate/validators";
import Loader from '../../components/Loader.vue';
import router from "../../router";
import i18n from "../../i18n";

let myTotal = ref('')
let myNetTotal = ref('')
let myTax = ref('')
const setTotal = (e)=>{
myTotal.value = document.querySelector('.myTotal').textContent;
sessionStorage.setItem('Total' ,myTotal.value )

}
const setDiscount = ()=>{
    sessionStorage.setItem('agentDicount', document.querySelector('.dicount').textContent);
}
const setNetTotal = ()=>{
    myNetTotal.value = document.querySelector('.netTotal').textContent;
    sessionStorage.setItem('myNetTotal', myNetTotal.value);
}
const setTax = (e)=>{
myTax.value = document.querySelector('.myTax').textContent;
sessionStorage.setItem('Tax' , myTax.value)

}
const social = ref({})
const loading = ref(false)
const route = useRoute();
const userInfo = ref({});
const carInfo = ref({});
const randomCode = ref("");
const updatedBalance = ref('')
const props = defineProps(['searchInfo', 'carId' , 'country' , 'city'])
let myPrice = ref();
let tax = ref();
let total = ref();
let price = ()=>{
myPrice.value = +(document.querySelector(".price").textContent.slice(1));
tax.value =+(`0.${viewCarId.value[0].tax}`.slice(0,-3));
total.value = +(myPrice.value) * tax.value;
console.log(total.value);
}

let filterCarId = ref({});
let viewCarId = ref([]);
onBeforeMount(async()=>{
    let id = localStorage.getItem('carId');
let carsData  = JSON.parse(localStorage.getItem('carsData'));
     filterCarId = carsData.filter((car)=>{
        return car.id == id;
    })
    viewCarId.value = [...filterCarId];
   console.log('iam from details');
   console.log(viewCarId.value);
})
onMounted(async () => {
    localStorage.setItem('country' , props.country);
    localStorage.setItem('city' , props.city);
    price();
    bookInfo.total_days = USDollar.format(parseInt(bookInfo.total_days) * parseInt(myPrice))
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-view").then((data) => {
        console.log('kkkkkkk',props.carId);
        data.data.filter(el => {
            if (el.type_id == props.carId) {
                carInfo.value = el
                console.log('ssssssssss' ,carInfo);
                loading.value = false
            }
        })
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view").then((data) => {
        data.data.filter(el => {
            console.log('llllllllllll', data.data ,props.carId);
            if (el.id == props.carId) {
                carInfo.value['car_name_en'] = el.name_en
                carInfo.value['car_name'] = el.name
                carInfo.value['car_image'] = el.img
                console.log('carInfo.value' ,carInfo.value);
            }
        })
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then((data) => {
        userInfo.value = data.data.filter((el) => el.id == route.params.userId)[0];
        console.log('userInfo' ,userInfo);
        loading.value = false
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
        })
});

// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})

const bookInfo = ref({
    type_id:'',
    width_driver: computed(() => carInfo.value.price_with_driver > 0 ? '1' : '0'),
    first_name: '',
    last_name: '',
    type:"MR",
    email: props.searchInfo.country,
    phone_number: "",
    start_date: props.searchInfo.fromDate.toLocaleDateString('en-CA'),
    end_date: props.searchInfo.toDate.toLocaleDateString('en-CA'),
    total_days: computed(() => {
        if (bookInfo.value.end_date === bookInfo.value.start_date) {
            return 1;
        } else return (new Date(bookInfo.value.end_date).getTime() - new Date(bookInfo.value.start_date).getTime()) / (1000 * 60 * 60 * 24).toString()
    }),
    total_amount: computed(() => myNetTotal.value.replace(/\$/g, '')),
    tax: computed(() => parseFloat(carInfo.value.tax) || 0),
    agent_discount: computed(() => {
        return ( userInfo.value.discount) 
    }),
    net_amount: computed(() => ((myPrice.value * bookInfo.value.total_days) - (viewCarId.value[0].tax/100 * (myPrice.value * bookInfo.value.total_days)))  - ( (bookInfo.value.agent_discount/100) * ((myPrice.value * bookInfo.value.total_days) )) || 0),
    notes: "",
    account_owner: computed(() => userInfo.value.id),
});

const rules = {
    // type_id: { required },
    first_name: { required },
    last_name: { required },
    with_driver:{required},
    // email: { required, email },
    phone_number: { required, numeric },
    notes: { required: helpers.withMessage('Field Required', required) },
};
const validation = useVuelidate(rules, bookInfo);

const visibleButton =ref(true)
const submission = async () => {
    setDiscount()
    setNetTotal();
    setTax();
    setTotal();
    bookInfo.value.type_id =filterCarId[0].type_id
    validation.value.$validate();
    if (!validation.value.$error) {
        loading.value = true
        if (userInfo.value.balance > bookInfo.value.net_amount) {
            bookInfo.value.first_name = `${ bookInfo.value.type}  ${ bookInfo.value.first_name}`
            await axios.post("https://seasonreal.seasonsge.com/appv1real/car-order", bookInfo.value)
                .then((response) => {
                    if (response.data.status) {
                        updatedBalance.value = parseFloat(userInfo.value.balance) - parseFloat(bookInfo.value.net_amount)
                        const balance = new FormData()
                        
                        balance.append("name", userInfo.value.name)
                        balance.append("email", userInfo.value.email)
                        balance.append("password", userInfo.value.password)
                        balance.append("type", userInfo.value.type)
                        balance.append("id", userInfo.value.id)
                        balance.append("discount", userInfo.value.discount)
                        balance.append("balance", updatedBalance.value)
                        visibleButton.value = false;
                        axios.post("https://seasonreal.seasonsge.com/appv1real/user-edit", balance)
                            .then(userResponse => {
                                if (userResponse.data.success) {
                                    randomCode.value = response.data.random_code
                                    document.querySelector(".alert-success").classList.add("active")
                                    loading.value = false

                                    axios.get(`https://seasonreal.seasonsge.com/appv1real/car-rr?id=${userInfo.value.id}`)
                                        .then(data => {
                                            const bookId = data.data.pop()
                                            setTimeout(() => {
                                                router.push({
                                                    name: "Agents Cars Checkout",
                                                    params: { lang: i18n.global.locale.value, id: bookId.id, with: 3 }
                                                })
                                            }, 1500)
                                        })
                                }
                            })
                    }
                });
        } else {
            document.querySelector(".alert-danger").classList.add("active")
            setTimeout(() => {
                document.querySelector(".alert-danger").classList.remove("active")
            }, 3000)
            loading.value = false
        }
    }
};

const removeAlert = (type) => {
    document.querySelector(`.alert-${type}`).classList.remove("active")
}


</script>
<style lang="scss" scoped>
.car-reservation {

    input,
    select,
    textarea {
        &.error {
            border: 1px solid #dc3545;
        }
    }

    input,
    select,
    textarea {
        outline: none;
        border: 1px solid darkgray;
    }

    textarea {
        height: 150px;
        resize: none;
    }

    .content {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.09);

        h3 {
            color: var(--blue-color);

            &::before {
                content: "";
                position: absolute;
                width: 10%;
                height: 3px;
                border-radius: 50px;
                background-color: var(--blue-color);
                bottom: -10px;
            }
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

        padding: 10px !important;

        .content {
            padding: 20px 15px !important;
        }
    }
}
</style>
