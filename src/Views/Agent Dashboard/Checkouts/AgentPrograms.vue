<template>
    <div class="pt-5" dir="ltr"></div>
    <div ref="checkout" class="orderSummary" dir="ltr">
        <h4 class="mb-4">Mail From SeasonsGe</h4>
        <div class="border-top border-bottom py-2">
            <div class="d-flex flex-column gap-2">
                <span>
                    From:
                    <span class="ms-2">operations@seasonsge.com</span>
                </span>
                <span>
                    To:
                    <span class="ms-2">{{ userInfo.email }}</span>
                </span>
                <span>
                    Date:
                    <span class="ms-2">{{ bookInfo.registration_date }}</span>
                </span>
            </div>
        </div>
        <h1>Seasonsge Order Summary</h1>
        <!-- <img src="/images/program.jpeg" style="display: block" alt="" height="300" width="768"> -->
        <div class="logo-cont text-start mt-4 d-flex align-items-center justify-content-between">
            <img class="logo" src="/images/logo.png" width="200" alt="">
            <img v-if="bookInfo.Include_flight == '1'" class="fly-jordan-logo" src="/images/FJR_FlyJordan_Logo.png"
                width="200" alt="">

        </div>
        <h3>Customer Information</h3>
        <div class="info pb-3">
            <ul class="list-group">
                <li class="item-list">
                    <span>
                        <strong>Supplier:</strong> {{ userInfo.name }}</span>
                </li>
                <li class="item-list"><span><strong>Phone:</strong> {{ bookInfo.phone_number }}</span></li>
                <li class="item-list"><span><strong>Email:</strong> {{ userInfo.email }}</span></li>
            </ul>
        </div>
        <h3>Invoice</h3>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Nationality</th>
                <th>Passport Number</th>
            </tr>
            <tr>
                <td>{{ bookInfo.first_name }}</td>
                <td>{{ bookInfo.last_name }}</td>
                <td>{{ bookInfo.nationality }}</td>
                <td>{{ bookInfo.passport_number }}</td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Confirmation Code</th>
                <th>Date #</th>
                <th>Customer ID</th>
                <th>TERMS</th>
            </tr>
            <tr>
                <td>{{ bookInfo.booking_id }}</td>
                <td>{{ bookInfo.registration_date }}</td>
                <td>{{ userInfo.id }}</td>
                <td>DUE UPON RECEIPT</td>
            </tr>
        </table>

        <h3>Program Information</h3>

        <table>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>City</th>
                    <!-- <th>To Date</th> -->
                    <th>Car</th>
                    <th>Number of Days & Nights</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ country }}</td>
                    <td>{{ city }}</td>
                    <!-- <td>--------</td> -->
                    <td>{{ $i18n.locale === 'en' ? carInfo?.name_en : carInfo?.name}}</td>
                    <td> {{ bookInfo.details?.num_of_days }} & {{bookInfo.details?.num_of_nights  }} </td>
                </tr>
            </tbody>
        </table>

        <h3>Cities In The Program</h3>

        <table>
            <thead>
                <tr>
                    <th>City Name</th>
                    <th>Hotel Name</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                </tr>
               
            </thead>
            <tbody>
                <tr v-for="(item, index) in allCities" :key="index">
                                  
                                        <td >
                                            {{
                                                $i18n.locale === "en"
                                                ? item.city?.name_en
                                                : item.city?.name
                                            }}
                                        </td>
                                        <td>
                                            {{
                                                $i18n.locale === "en"
                                                ? item.hotel_name_english
                                                : item.hotel_name_arabic
                                            }}
                                        </td>
                                        <td>
                                            {{item.startDate }}
                                        </td>
                                        <td>
                                            {{ item.endDate }}
                                        </td>
                </tr>
            </tbody>
        </table>

        <h3 class="mt-4" v-if="passengers.length > 0">Passengers Information</h3>

        <table class="mt-5" v-if="passengers.length > 0">
            <tr>
                <th>Type</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            <tr v-for="(item, index) in passengers" :key="index">
                <td>{{ item.type }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
            </tr>
        </table>

        <h3>Rooms Inforamtion</h3>

        <table class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr v-if="bookInfo.details">
                    <th v-if="bookInfo.destination.has('1')"> Single Room Price</th>
                    <th v-if="bookInfo.destination.has('2')">Double Room Price</th>
                    <th v-if="bookInfo.destination.has('3')">Triple Room Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="bookInfo.details">
                    <td v-if="bookInfo.destination.has('1')">{{ USDollar.format(bookInfo.details.price_per_adult_individual)
                    }}</td>
                    <td v-if="bookInfo.destination.has('2')">{{ USDollar.format(bookInfo.details.price_per_adult_double) }}
                    </td>
                    <td v-if="bookInfo.destination.has('3')">{{ USDollar.format(bookInfo.details.price_per_adult_triple) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <table  class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr v-if="bookInfo.details">
                    <th v-if="bookInfo.destination.has('4')">Child Without Bed Price</th>
                    <th v-if="bookInfo.destination.has('5')">Child With Bed Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="bookInfo.details">
                    <td v-if="bookInfo.destination.has('4')">{{ USDollar.format(bookInfo.details.price_per_child_no_bed) }}
                    </td>
                    <td v-if="bookInfo.destination.has('5')">{{ USDollar.format(bookInfo.details.price_per_child_with_bed)
                    }}</td>
                </tr>
            </tbody>
        </table>
        <table  class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr v-if="bookInfo.details">
                    <th v-if="bookInfo.destination.has('6')">  Infant Price</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-if="bookInfo.details">
                    <td v-if="bookInfo.destination.has('6')">{{ USDollar.format(bookInfo.details.price_per_infant) }}
                    </td>
                  
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Room Type</th>
                    <th>Child Reservation</th>
                    <th>Child Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in rooms" :key="index">
                    <td>
                        {{
                            item.room_type == '1' ?
                            'Single Room' :
                            item.room_type == '2' ?
                                'Double Room' :
                                'Triple Room'
                        }}
                    </td>
                    <td>{{ item.child_room }}</td>
                    <td>{{ item.child_count }}</td>
                </tr>
            </tbody>
        </table>

        <h3 v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">Flight Information</h3>

        <h4 v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">Go Trip</h4>
        <table v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">
            <thead>
                <tr>
                    <th>Flight Line</th>
                    <th>Going From</th>
                    <th>Arrival In</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="flightTrip.flightAirLine">{{ flightTrip.flightAirLine.name_en }}</td>
                    <td v-if="flightTrip.from">{{ flightTrip.from.english_name }}</td>
                    <td v-if="flightTrip.to">{{ flightTrip.to.english_name }}</td>
                </tr>
            </tbody>
        </table>
        <table v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">
            <thead>
                <tr>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Allowed Weight (KG)</th>
                    <th>Flight Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ departureTime }} <br> {{  }}</td>
                    <td> {{ flightTrip.arrivalTime }}</td>
                    <td>{{ allowedWeight }} KG</td>
                    <td>{{ flightNumber }}</td>
                </tr>
            </tbody>
        </table>

        <h4 v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined && flightTrip.allowReturn == '1'">Return Trip
        </h4>
        <table v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">
            <thead>
                <tr>
                    <th>Flight Line</th>
                    <th>Going From</th>
                    <th>Arrival In</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="flightTrip.flightAirLine">{{ flightTrip.flightAirLine.name_en }}</td>
                    <td v-if="flightTrip.to">{{ flightTrip.to.english_name }}</td>
                    <td v-if="flightTrip.from">{{ flightTrip.from.english_name }}</td>
                </tr>
            </tbody>
        </table>
        <table v-if="bookInfo.Include_flight == '1' && flightTrip !== undefined">
            <thead>
                <tr >
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Allowed Weight (KG)</th>
                    <th>Flight Number</th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td> {{ flightTrip.returnEndDate1 }}</td>
                    <td> {{ flightTrip.returnEndDate2 }}</td>
                    <td>{{ allowedWeight }} KG</td>
                    <td>{{ flightTrip.returnFlightNumber }}</td>
                </tr>
            </tbody>
        </table>

        <h3 class="hide w-100" v-if="$route.params.with != 2">Checkout</h3>
        <table class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr>
                    <th>Total</th>
                    <th>Tax</th>
                    <th>Net Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ USDollar.format(bookInfo.total) }}</td>
                    <td>{{ bookInfo.tax }}%</td>
                    <td>{{ USDollar.format(bookInfo.net) }} </td>
                </tr>
            </tbody>
        </table>
        <table class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr>
                    <th>Total</th>
                    <th>Tax</th>
                    <th>Net Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ USDollar.format(bookInfo.total) }}</td>
                    <td>{{ bookInfo.tax }}%</td>
                    <td>{{ USDollar.format(bookInfo.net) }} </td>
                </tr>
            </tbody>
        </table>

        <table class="mb-3 mt-5">
            <tbody>
                <tr>
                    <td>BATUMI BUS</td>
                    <td>OFFICE TIMINGS: MONDAY TO FRIDAY 1000 - 1800</td>
                    <td>+995 597011106</td>
                </tr>
                <tr>
                    <td>AMMAN AMM</td>
                    <td>OFFICE TIMINGS: SATURDAY TO THURSDAY 0900 - 1800</td>
                    <td>+995 597011106</td>
                </tr>
            </tbody>
        </table>

        <!-- <img id="m_2683479659778605604m_2053751925184754895barcode"
            src="https://ci4.googleusercontent.com/proxy/3nyBbG6GlI0QOhiDqPBwjAPv_D6a_9UdWFZGWZqc_F774ZtgLhcOyAZ_FkufbVP5wfZlWJogtg-Y4GbVPgQipHy0uGeQcejnBWXoKKmVXbMUhybO534z3JyFaVZTV3wPjuQzfQ51QhYNpBjenZ2VWjmMc_Y1UONT9UNIJOdw3Wp4YuWwTY0J=s0-d-e1-ft#https://api.qrserver.com/v1/create-qr-code/?data=https://seasonsge.com/showbookInfoing/tjpuuvlst3kck0so8cw4&amp;size=100x100"
            alt="" title="hello" style="width:100px;height:auto;float:right;margin:30px" class="CToWUd" data-bit="iit"
            width="100" height="100"> -->
            <img  :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`"
            style="width:100px;height:auto;float:right;margin:30px" width="100" height="100" alt="">
            
        <span>Regards,</span>
        <br>
        <a href="https://seasonsge.com/" target="_blank">https://seasonsge.com/</a>
        <footer>
            <p>Thanks Again For The Purchase!. I'm Sure You happy Now :)</p>
            <div class="d-flex align-items-start gap-2 flex-column mt-4">
                <div class="d-flex align-items-center gap-2">
                    <a :href="social.facebookInfo">
                        <i class="fa-brands fa-square-facebook fs-4"></i>
                    </a> |
                    <a :href="social.instagram">
                        <i class="fa-brands fa-instagram fs-4"></i>
                    </a> |
                    <a :href="social.whatsapp">
                        <i class="fa-brands fa-whatsapp fs-4"></i>
                    </a> |
                    <a :href="social.telegram">
                        <i class="fa-brands fa-telegram fs-4"></i>
                    </a> |
                    <a :href="social.twitter">
                        <i class="fa-brands fa-twitter fs-4"></i>
                    </a> |
                    <a href="https://google.com">
                        <i class="fa-brands fa-google fs-4"></i>
                    </a> |
                    <a href="https://linkedin.com">
                        <i class="fa-brands fa-linkedin fs-4"></i>
                    </a>
                </div>
                <span class="d-block">Seasons Tour مواسم السياحة</span>
            </div>
        </footer>
    </div>
    <div v-if="!withAdnWithout" class="download mx-auto py-5" dir="ltr">
        <button class="rounded-pill btn btn-success px-4 d-flex align-items-center gap-2" @click="exportToPDF">
            Download PDF
            <i class="fa-solid fa-download"></i>
        </button>
    </div>
    <div v-else class="download mx-auto py-5" dir="ltr">
        <div class="d-flex gap-3 align-items-center">
            <button class="rounded-pill btn btn-success px-4 d-flex align-items-center gap-2" @click="exportToPDFWith">
                Download PDF With Price
                <i class="fa-solid fa-download"></i>
            </button>
            <button class="rounded-pill btn btn-success px-4 d-flex align-items-center gap-2" @click="exportToPDFWithout">
                Download PDF Without Price
                <i class="fa-solid fa-download"></i>
            </button>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref , onBeforeMount} from 'vue'
import { useRoute } from 'vue-router';
import router from '../../../router';
import i18n from '../../../i18n';
import html2pdf from "html2pdf.js";
import storage from '../../../firebase'
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { addDays, format ,parse } from 'date-fns';

const agentAvatar = ref('')
const withAdnWithout = ref(false)
const city = ref();
const country = ref();
const url = ref('')
const allowedWeight = ref('')
const flightNumber = ref('')
const airLine = ref('')
let carInfo = ref('')
const route = useRoute()
const userInfo = ref({})
const social = ref({})
const bookInfo = ref({})
const passengers = ref([])
const flightTrip = ref({})
const rooms = ref([])
const allCities = ref([])
const newUrl = ref('')
const hotelName = ref('')
const checkIn = ref('')
const checkOut = ref('')
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})


const exportToPDF = () => {
    html2pdf(document.querySelector(".orderSummary"), {

        margin: [15, 3],
        filename: "SeasonsGE.pdf",
        enableLinks: false,
        pagebreak: { mode: 'avoid-all', before: '#page2el' },
        html2canvas: {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            dpi: 192,
            letterRendering: true,
        },

        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
        }
    });
}

const exportToPDFWith = () => {
    document.querySelectorAll(".hide").forEach(el => {
        if (el.hasAttribute("data-html2canvas-ignore")) {
            el.removeAttribute("data-html2canvas-ignore")
        }
    })
    html2pdf(document.querySelector(".orderSummary"), {
        margin: [15, 3],
        filename: "SeasonsGE.pdf",
        enableLinks: false,
        pagebreak: { mode: 'avoid-all', after: '#page2el' },
        html2canvas: {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            dpi: 192,
            letterRendering: true,
        },

        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
        }
    });
}

const exportToPDFWithout = () => {
    document.querySelectorAll(".hide").forEach(el => el.setAttribute("data-html2canvas-ignore", true))
    html2pdf(document.querySelector(".orderSummary"), {

        margin: [15, 3],
        filename: "SeasonsGE.pdf",
        enableLinks: false,
        pagebreak: { mode: 'avoid-all', after: '#page2el' },
        html2canvas: {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            dpi: 192,
            letterRendering: true,
        },

        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
        }
    });
}

const departureTime = ref();
const departureTimeReturn = ref();
const arrivalTime = ref();
let allCitiesIds = ref([]);
const arrivalTimeReturn = ref();
const allowedWeightReturn = ref();
const flightNumbeReturn = ref();
const mydata3 = ref();
let newcheckIn = ref()
let newcheckOut = ref()
onBeforeMount(() => {
   city.value = localStorage.getItem('programmCity');
   country.value = localStorage.getItem('programmCountry') 
    let data1 = JSON.parse(localStorage.getItem('data1')); 
    flightNumber.value = data1.flight_number;
    hotelName.value = data1.program_title_english;
    if(data1.flight_number){
        let data2 = JSON.parse(localStorage.getItem('data2'))  
       let data3 = localStorage.getItem('data3') ? JSON.parse(localStorage.getItem('data3')) : ''  
       mydata3.value = data3; 
       departureTime.value = data2.departureTime;
       arrivalTime.value = data2.arrivalTime ;    
       allowedWeight.value =data2.allowedWeight ;
       allowedWeightReturn.value = data3 ?  data3.allowedWeight : '' ;
       departureTimeReturn.value =data3 ?  data3.departureTime : '' ;
       arrivalTimeReturn.value =data3 ? data3.arrivalTime : ''  ;
       flightNumbeReturn.value = data3 ? data3.flightNumber : '' ;
}
    
    
checkIn.value = data1.from_date;
    checkOut.value = data1.to_date;
    newcheckIn.value = sessionStorage.getItem('programm-CheckIn') 
    newcheckOut.value = sessionStorage.getItem('programm-CheckOut')
    airLine.value = localStorage.getItem('airLine') ;
    
    
});

onMounted(async () => {
   
newUrl.value = url.id;
    if ((+route.params.id).toString() !== 'NaN') {
        const login = JSON.parse(localStorage.getItem("login"))
     
        await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview")
            .then(data => {
                userInfo.value = data.data.filter(el => el.id == login.id)[0]
            })
       
            try {
          await listAll(storageRef(storage, `avatar/`))
              .then(res => {
                const url = res.items.filter(el => el.name == login.id)[0]
                getDownloadURL(url).then(data => {
                  agentAvatar.value = data
                })
              })
        }catch (e) {

        }
        await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
            .then(data => {
                social.value = data.data[0]
            })
        const userId = JSON.parse(localStorage.getItem("login"))
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/br-rr?id=${userId.id}`)
            .then(data => {
                bookInfo.value = data.data.filter(el => el.id == route.params.id)[0]
                bookInfo.value.destination = new Set(bookInfo.value.destination.split(","))
                axios.get("https://seasonreal.seasonsge.com/appv1real/all-program")
                    .then(data => {
                        console.log(';;lllllllllllllllllll', data.data);
                        bookInfo.value.details = data.data.filter(el => el.id == bookInfo.value.brogram_id)[0]
                        console.log(';;lllllllllllllllllll', bookInfo.value.details);
                    })
                for (let i = 2; i <= 8; i++) {
                    if (bookInfo.value[`person${i}`] == null) {
                        continue
                    }
                    passengers.value.push({
                        firstName: bookInfo.value[`person${i}`].split('-')[0].split(',')[0],
                        lastName: bookInfo.value[`person${i}`].split('-')[0].split(',')[1],
                        type: bookInfo.value[`person${i}`].split('-')[1],
                    })
                }
                const country = new FormData()
                country.append("country_id", bookInfo.value.country)
                axios.post(`https://seasonreal.seasonsge.com/appv1real/country-by-id`, country)
                    .then(data => {
                        bookInfo.value.countryName = data.data.country.name_en
                    })
                axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                    .then(data => {
                        bookInfo.value.cityName = data.data.filter(el => el.id == bookInfo.value.City)[0].name_en
                    })
                if (bookInfo.value.Include_flight == "1") {
                    axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all").then((data) => {
                        flightTrip.value = data.data.filter((ele) => {
                        console.log('flightTrip.value',flightTrip.value);

                            if (
                                ele.flightNumber == bookInfo.value.flight_number &&
                                ele.departureDate >= new Date().toLocaleDateString("en-CA")
                                ) {
                                    return ele;
                                }
                            })[0];
                            console.log('hhhhhh',flightTrip.value);
                        if (flightTrip.value !== undefined) {
                            axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view").then((data) => {
                                if (data.data.success) {
                                    console.log('flightTrip.value.flightLine',flightTrip.value.flightLine);
                                    flightTrip.value["flightAirLine"] = data.data.airlines.filter(
                                        (airLine) => airLine.id == flightTrip.value.flightLine
                                    )[0];
                                }
                            });
                            axios.get("https://seasonreal.seasonsge.com/appv1real/viewAirports").then((data) => {
                                if (data.data.success) {
                                    flightTrip.value["from"] = data.data.data.filter(
                                        (element) => element.id == flightTrip.value.fromAirport
                                    )[0];
                                    flightTrip.value["to"] = data.data.data.filter(
                                        (element) => element.id == flightTrip.value.toAirport
                                    )[0];
                                    flightTrip.value["returnFrom"] = data.data.data.filter(
                                        (element) => element.id == flightTrip.value.departureToReturn
                                    )[0];
                                    flightTrip.value["returnTo"] = data.data.data.filter(
                                        (element) => element.id == flightTrip.value.arrivalFromReturn
                                    )[0];
                                }
                            });
                        }
                    });
                }
                axios.get(`https://seasonreal.seasonsge.com/appv1real/pr-data?id=${bookInfo.value.brogram_id}`)
                    .then((data) => {
                        if (typeof data.data === "object") {
                            data.data.forEach((el,i)=>{
                            allCities.value.push(el)

                        })
                    
                            allCitiesIds = allCities.value.map((ele)=>{
                                return ele.city_name
                            }); 

                            axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                                .then(data => {
                                    let startDateObject1 =newcheckIn.value 
                                    let endDateObject ;
                                    allCities.value.forEach((el) => {
                                        el.city = data.data.filter((ele) => ele.id == el.city_name)[0];
                                        const startDateObject = parse(startDateObject1, 'MM/dd/yyyy', new Date());
                                        endDateObject = addDays(startDateObject, el.num_of_nights);
                                        el.startDate =startDateObject1
                                        el.endDate = ref(format(endDateObject, 'MM/dd/yyyy')).value;
                                        startDateObject1 = ref(format(addDays(parse(el.endDate, 'MM/dd/yyyy', new Date()) , 0), 'MM/dd/yyyy')).value  
                                        endDateObject =''
                                    });
                                })
                        }
                        console.log('allCities.value' ,allCities.value);

                    });
            })
            
        await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view").then((data) => {
            console.log('bookInfo' ,bookInfo.value);
            console.log(' data.data' , data.data);
                data.data.filter(el => {
                    if (el.id == bookInfo.value.details.car_type) {
                        carInfo.value = el
                    
                    }
                })

                console.log('carInfo' ,carInfo);
            });
            
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/get-room?id_hotel=${bookInfo.value.booking_id}`)
            .then(data => {
                console.log(data, "وطمممممممممممممممممممممم");
                rooms.value = data.data
                rooms.value.map(el => {
                    el.child_count = el.child_room.split(',')[1]
                    el.child_room = el.child_room.split(',')[0]
                })
            })
            if (route.params.with === '1') {
            document.querySelectorAll(".hide").forEach(el => el.removeAttribute('data-html2canvas-ignore'))
        } else if (route.params.with === '2') {
            document.querySelectorAll(".hide").forEach(el => el.setAttribute("data-html2canvas-ignore", true))
        } else {
            withAdnWithout.value = true
        }
        url.value = window.location.href
        url.value = url.value.replace(/\/\d+\//ig, `/${bookInfo.value.booking_id}/`)
        console.log('uuuuuuu', bookInfo.value);
    } else {
        url.value = window.location.href
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/boking-search?booking_code=${route.params.id}`)
            .then(data => {
                bookInfo.value = data.data.reservations[0]
                bookInfo.value.destination = new Set(bookInfo.value.destination.split(","))

                axios.get("https://seasonreal.seasonsge.com/appv1real/all-program")
                    .then(data => {
                        console.log(data.data);
                        bookInfo.value.details = data.data.filter(el => el.id == bookInfo.value.brogram_id)[0]
                    })

                for (let i = 2; i <= 8; i++) {
                    if (bookInfo.value[`person${i}`] == null) {
                        continue
                    }
                    passengers.value.push({
                        firstName: bookInfo.value[`person${i}`].split('-')[0].split(',')[0],
                        lastName: bookInfo.value[`person${i}`].split('-')[0].split(',')[1],
                        type: bookInfo.value[`person${i}`].split('-')[1],
                    })
                }
                const country = new FormData()
                country.append("country_id", bookInfo.value.country)
                axios.post(`https://seasonreal.seasonsge.com/appv1real/country-by-id`, country)
                    .then(data => {
                        bookInfo.value.countryName = data.data.country.name_en
                    })
                axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                    .then(data => {
                        bookInfo.value.cityName = data.data.filter(el => el.id == bookInfo.value.City)[0].name_en
                    })
                if (bookInfo.value.Include_flight == "1") {
                    axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all").then((data) => {
                        console.log('flightTrip.value',flightTrip.value);
                        flightTrip.value = data.data.filter((ele) => {
                            if (
                                ele.id == bookInfo.value.flight_number &&
                                ele.departureDate >= new Date().toLocaleDateString("en-CA")
                            ) {
                                return ele;
                            }
                        })[0];
                        axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view").then((data) => {
                            if (data.data.success) {
                                console.log('flightTrip.value.flightLine',flightTrip.value.flightLine);
                                flightTrip.value["flightAirLine"] = data.data.airlines.filter(
                                    (airLine) => airLine.id == flightTrip.value.flightLine
                                )[0];
                            }
                        });
                        axios.get("https://seasonreal.seasonsge.com/appv1real/viewAirports").then((data) => {
                            if (data.data.success) {
                                flightTrip.value["from"] = data.data.data.filter(
                                    (element) => element.id == flightTrip.value.fromAirport
                                )[0];
                                flightTrip.value["to"] = data.data.data.filter(
                                    (element) => element.id == flightTrip.value.toAirport
                                )[0];
                                flightTrip.value["returnFrom"] = data.data.data.filter(
                                    (element) => element.id == flightTrip.value.departureToReturn
                                )[0];
                                flightTrip.value["returnTo"] = data.data.data.filter(
                                    (element) => element.id == flightTrip.value.arrivalFromReturn
                                )[0];
                            }
                        });
                    });
                }
                axios.get(`https://seasonreal.seasonsge.com/appv1real/pr-data?id=${bookInfo.value.brogram_id}`)
                    .then((data) => {
                        if (typeof data.data === "object") {
                            data.data.forEach((el,i)=>{
                                allCities.value.push(el)

                            })
                           
                            allCitiesIds = allCities.value.map((ele)=>{
                                return ele.city_name
                            }); 

                            axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                                .then(data => {
                                    let startDateObject1 =bookInfo.value.details.from_date
                                    let endDateObject ;
                                    allCities.value.forEach((el) => {
                                        el.city = data.data.filter((ele) => ele.id == el.city_name)[0];
                                        const startDateObject = parse(startDateObject1, 'yyyy-MM-dd', new Date());
                                        endDateObject = addDays(startDateObject, el.num_of_nights);
                                        el.startDate =startDateObject1
                                        el.endDate = ref(format(endDateObject, 'yyyy-MM-dd')).value;
                                        startDateObject1 = ref(format(addDays(parse(el.endDate, 'yyyy-MM-dd', new Date()) , 0), 'yyyy-MM-dd')).value  
                                        endDateObject =''
                                    });
                                })
                        }
                        console.log('allCities.value' ,allCities.value);

                    });

                axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view").then((data) => {
                console.log('bookInfo' ,bookInfo.value.details);
                console.log(' data.data' , data.data);
                    data.data.filter(el => {
                        if (el.id == bookInfo.value.details.car_type) {
                            carInfo.value = el
                        
                        }
                    })

                    console.log('carInfo' ,carInfo);
                });
            
                axios.get(`https://seasonreal.seasonsge.com/appv1real/get-room?id_hotel=${bookInfo.value.booking_id}`)
                    .then(data => {
                        rooms.value = data.data
                        rooms.value.map(el => {
                            el.child_count = el.child_room.split(',')[1]
                            el.child_room = el.child_room.split(',')[0]
                        })
                    })
                axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${bookInfo.value.email}`)
                    .then(data => {
                        userInfo.value = data.data
                    })
            })
    }
    await listAll(storageRef(storage, `avatar/`))
            .then(res => {
                const url = res.items.filter(el => el.name == bookInfo.value.email)[0]
                getDownloadURL(url).then(data => {
                    agentAvatar.value = data
                })
            })
        if (route.params.with === '1') {
            document.querySelectorAll(".hide").forEach(el => el.removeAttribute('data-html2canvas-ignore'))
        } else if (route.params.with === '2') {
            document.querySelectorAll(".hide").forEach(el => el.setAttribute("data-html2canvas-ignore", true))
        } else {
            withAdnWithout.value = true
        }
    
})



</script>


<style lang="css" scoped>
.outer {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden scroll;
    z-index: 55555;
}

/*
    Start Order Form
*/
.orderform {
    max-width: 500px;
    margin: 50px auto;
}

.orderform h2 {
    color: white;
    padding: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #0088A1;
}

.orderform .form-group {
    position: relative;
}

.orderform input,
.orderform textarea {
    margin-bottom: 10px;
}

.orderform input {
    padding-left: 35px;
}

.orderform input:not([type="submit"])+i {
    height: 0;
    float: left;
    position: relative;
    top: -36px;
    left: 10px;
    color: #999;
}

.orderform .fa-asterisk {
    height: 0;
    font-size: 8px;
    color: brown;
    position: absolute;
    right: 10px;
    top: 14px;
}

.orderform .send-icon {
    display: block;
    position: relative;
    top: -36px;
    left: 7px;
    color: white;
}

/*
    End Order Form
*/
.orderSummary,
.download {
    width: 768px;
    margin: 0 auto;
    font-size: 16px;
    color: #555555;
}

.orderSummary h1 {
    color: white;
    background-color: #0088A1;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 0;
}

.orderSummary h2 {
    padding: 20px 0;
}

.orderSummary p {
    padding: 10px 20px;
    line-height: 26px;
}

.orderSummary h3 {
    padding: 20px 0;
}

.orderSummary table {
    text-align: center;
    padding: 20px;
    width: 100%;
}

.orderSummary table th {
    text-align: center;
    padding: 10px;
    font-size: 18px;
}

.orderSummary table td {
    border: thin solid #d4d4d4;
    padding: 10px;
    text-transform: capitalize;
}

.orderSummary .info {
    padding-bottom: 50px;
    /* padding-left: 20px; */
}

.orderSummary .info .item-list {
    list-style: none;
    margin-top: 5px;
}

.orderSummary footer a {
    text-decoration: none;
    color: #155197;
}

.orderSummary footer p {
    padding-left: 0;
}</style>