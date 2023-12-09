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
                    <span class="ms-2">{{ new Date(bookInfo.registration_date).toLocaleString() }}</span>
                </span>
            </div>
        </div>
        <h1>Seasonsge</h1>
        <!-- <img src="/images/flights.jpeg" style="display: block" alt=""  width="768"> -->
        <div class="logo-cont text-start mt-4 d-flex align-items-center justify-content-between">
            <!-- <img class="logo" src="/images/logo.png" width="200" alt=""> -->
            <img class="logo" :src="agentAvatar" width="200" alt="">
            <img class="fly-jordan-logo" src="/images/FJR_FlyJordan_Logo.png" width="200" alt="">
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
                <td>{{ new Date(bookInfo.registration_date).toLocaleString() }}</td>
                <td>{{ userInfo.id }}</td>
                <td>DUE UPON RECEIPT</td>
            </tr>
        </table>

        <h3 v-if="passengers.length > 0">Passengers Information</h3>

        <table v-if="passengers.length > 0">
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

        <h3>Go Trip</h3>

        <table>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Allowed Weight (KG)</th>
                    <th>Departure From</th>
                    <th>Arrival To</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.flightNumber }}</td>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.allowedWeight }} KG</td>
                    <td v-if="bookInfo.flight && bookInfo.flight.from">{{ bookInfo.flight.from.english_name }}</td>
                    <td v-if="bookInfo.flight && bookInfo.flight.to">{{ bookInfo.flight.to.english_name }}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Departure Date And Time</th>
                    <th>Arrival Date And Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.departureDate }} <br> {{ bookInfo.flight.departureTime }}
                    </td>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.arrivDate22 }} <br> {{ bookInfo.flight.arrivalTime }}</td>
                </tr>
            </tbody>
        </table>

        <h3 v-if="bookInfo.flight && bookInfo.flight.allowReturn == 1">Return Trip</h3>

        <table v-if="bookInfo.flight && bookInfo.flight.allowReturn == 1">
            <thead>
                <tr>
                    <th>Return Flight Number</th>
                    <th>Return Allowed Weight (KG)</th>
                    <th>Return From</th>
                    <th>Return To</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ bookInfo.flight.returnFlightNumber }}</td>
                    <td>{{ bookInfo.flight.allowedWeightReturn }} KG</td>
                    <td v-if="bookInfo.flight && bookInfo.flight.to">{{ bookInfo.flight.to.english_name }}</td>
                    <td v-if="bookInfo.flight && bookInfo.flight.from">{{ bookInfo.flight.from.english_name }}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="bookInfo.flight && bookInfo.flight.allowReturn == 1">
            <thead>
                <tr>
                    <th>Departure Date And Time</th>
                    <th>Arrival Date And Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.returnStartDate }} <br> {{ bookInfo.flight.returnEndDate1
                    }}</td>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.returnEndDate }} <br> {{ bookInfo.flight.returnEndDate2 }}
                    </td>
                </tr>
            </tbody>
        </table>

        <h3>Other Information</h3>
        <table>
            <thead>
                <tr>
                    <th>Stop Number</th>
                    <th>Transit/Direct</th>
                    <th>Stop And Transit Places</th>
                    <th># Of Persons</th>
                    <th v-if="stopsNums > 0">Stopping Deprature Time</th>
                    <th v-if="stopsNums > 0 && stopHoursReturn != ''">Stopping Return Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.numStops }}</td>
                    <td>{{ stopsNums  == 0 ? "Direct" : 'transit'  }}</td>
                    <td>{{ stopsNums == 0 ? 'Direct/without stop places'  : stopplaces }}</td>
                    <td>{{ +bookInfo.number_of_adults + +bookInfo.number_of_children + +bookInfo.number_of_infants }}</td>
                    <td v-if="stopsNums > 0">{{ stopsNums > 0 ? stopHoursDepreature :'' }}</td>
                    <td v-if="stopsNums > 0 && stopHoursReturn != ''">{{ stopsNums > 0 ?  stopHoursReturn : '' }}</td>
                    
                </tr>
            </tbody>
        </table>


        <h3 class="hide" v-if="$route.params.with != 2">Checkout</h3>

        <table class="hide" v-if="$route.params.with != 2">
            <thead>
                <tr>
                    <th>Total</th>
                    <th>Tax</th>
                    <th>Agent Discount</th>
                    <th>Net Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ USDollar.format(bookInfo.total) }}</td>
                    <td v-if="bookInfo.flight">{{ bookInfo.flight.tax }}%</td>
                    <td>{{ userInfo.discount }}%</td>
                    <td>{{ USDollar.format(bookInfo.net_total) }}</td>
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
        <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`"
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import router from '../../../router';
import i18n from '../../../i18n';
import html2pdf from "html2pdf.js";
import storage from '../../../firebase'
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";

const stopsNums = localStorage.getItem('item-numStops');
const stopplaces = localStorage.getItem('itemStopPlaces');
const stopHoursReturn = localStorage.getItem('stopHoursReturn');
const stopHoursDepreature = localStorage.getItem('stopHoursDepreature');
const url = ref('')
const agentAvatar = ref('')
const route = useRoute()
const userInfo = ref({})
const social = ref({})
const bookInfo = ref({})
const passengers = ref([])
const withAdnWithout = ref(false)
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})

// const queryString = window.location.hash.split('&')[1];
// const urlParams = new URLSearchParams(queryString);
// const login = JSON.parse(urlParams.get('login')); // {"success":true,"id":"2351"}

const fragment = window.location.hash.split('#')[1];

// Split the fragment into an array of parameter strings
const parameterStrings = fragment.split('&');

// Create an object to store the parameters
const parameters = {};

// Parse each parameter string and add it to the parameters object
parameterStrings.forEach(paramString => {
  const [key, value] = paramString.split('=');
  parameters[key] = decodeURIComponent(value);
});


const login = parameters.login; // '0'

console.log(parameterStrings ,'parameterStrings');
if(login!=null){

    const stopHoursDepreature = parameters.stopHoursDepreature; // '0'
    const stopplaces = parameters.stopplaces; // '0 | 0'
    const stopHoursReturn = parameters.stopHoursReturn; // '0'
   const  stopsNums = parameters.stopsNums
    console.log("stopHoursDepreature" , stopHoursDepreature);
    localStorage.setItem('stopHoursDepreature' ,stopHoursDepreature)
    localStorage.setItem('stopHoursReturn' ,stopHoursReturn)
    localStorage.setItem('stopplaces' ,stopplaces)
    localStorage.setItem('login' ,login)
    localStorage.setItem('item-numStops' ,stopsNums)
}

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


onMounted(async () => {
    console.log('onmounted');
 
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
        console.log('bookInfo.value.booking_id' ,bookInfo.value.booking_id);
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/fli-rr?id=${userId.id}`)
            .then(data => {
                console.log(data);
                bookInfo.value = data.data.filter(el => el.id == route.params.id)[0]

                for (let i = 2; i <= 8; i++) {
                    if (bookInfo.value[`person${i}`] === '') {
                        continue
                    }
                    passengers.value.push({
                        firstName: bookInfo.value[`person${i}`].split('-')[0].split(',')[0],
                        lastName: bookInfo.value[`person${i}`].split('-')[0].split(',')[1],
                        type: bookInfo.value[`person${i}`].split('-')[1],
                    })
                }
                axios.get(`https://seasonreal.seasonsge.com/appv1real/flights?flight_id=${bookInfo.value.flight_number}`)
                    .then(data => {
                        console.log(data);
                        bookInfo.value.flight = data.data
                        const from = new FormData()
                        const to = new FormData()
                        from.append("id", bookInfo.value.flight.fromAirport)
                        axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", from)
                            .then(data => {
                                bookInfo.value.flight.from = data.data.data
                            })
                        to.append("id", bookInfo.value.flight.toAirport)
                        axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", to)
                            .then(data => {
                                bookInfo.value.flight.to = data.data.data
                            })
                    })
            })
        if (route.params.with === '1') {
            document.querySelectorAll(".hide").forEach(el => el.removeAttribute('data-html2canvas-ignore'))
        } else if (route.params.with === '2') {
            document.querySelectorAll(".hide").forEach(el => el.setAttribute("data-html2canvas-ignore", true))
        } else {
            withAdnWithout.value = true
        }
        console.log('bookInfo.value.booking_id' ,bookInfo.value.booking_id);
        url.value = window.location.href
        
        url.value = url.value.replace(/\/\d+\//ig, `/${bookInfo.value.booking_id}/`)
        url.value+=`&login=${JSON.stringify(login) }&stopHoursDepreature=${stopHoursDepreature}&stopplaces=${stopplaces}&stopHoursReturn=${stopHoursReturn}&stopsNums=${stopsNums}`
    } else {
        console.log('bookInfo.value.booking_id' ,bookInfo.value.booking_id);
        url.value = window.location.href
        url.value+=`&login=${JSON.stringify(login) }`
        await axios.get(`https://seasonreal.seasonsge.com/appv1real/boking-search?booking_code=${route.params.id}`)
            .then(data => {
                bookInfo.value = data.data.bookingss[0]
                for (let i = 2; i <= 8; i++) {
                    if (bookInfo.value[`person${i}`] === '') {
                        continue
                    }
                    passengers.value.push({
                        firstName: bookInfo.value[`person${i}`].split('-')[0].split(',')[0],
                        lastName: bookInfo.value[`person${i}`].split('-')[0].split(',')[1],
                        type: bookInfo.value[`person${i}`].split('-')[1],
                    })
                }
                axios.get(`https://seasonreal.seasonsge.com/appv1real/flights?flight_id=${bookInfo.value.flight_number}`)
                    .then(data => {
                        console.log(data);
                        bookInfo.value.flight = data.data
                        const from = new FormData()
                        const to = new FormData()
                        from.append("id", bookInfo.value.flight.fromAirport)
                        axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", from)
                            .then(data => {
                                bookInfo.value.flight.from = data.data.data
                            })
                        to.append("id", bookInfo.value.flight.toAirport)
                        axios.post("https://seasonreal.seasonsge.com/appv1real/viewAirportById", to)
                            .then(data => {
                                bookInfo.value.flight.to = data.data.data
                            })
                    })
                axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${bookInfo.value.email}`)
                    .then(data => {
                        userInfo.value = data.data
                    })
            })
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
}
</style>