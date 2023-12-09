<template>
    <div class="outer position-fixed py-5">
        <div class="head mx-auto w-75 d-flex align-items-center justify-content-between">
            <span
                class="p-2 d-block bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('close')" title="Back">
                <i :class="`fa-solid fa-chevron-left`"></i>
            </span>
            <button class="p-1 px-3 btn btn-success text-light fw-bold rounded-pill" @click="exportToPDF">
                Download
            </button>
        </div>
        <div ref="checkout" class="orderSummary">
            <h1>Seasonsge Order Summary</h1>
            <img src="https://firebasestorage.googleapis.com/v0/b/seasons-images.appspot.com/o/messages%2Fcars.jpeg?alt=media&token=b293faaa-a193-49cc-bc53-c28f59b01b06"
                style="display: block" alt="" height="300" width="768">
            <h2>Hi {{ userInfo.name }},</h2>
            <h3>Invoice</h3>

            <table>
                <tr>
                    <th>TERMS</th>
                    <th>Date #</th>
                    <th>Confirmation Code</th>
                </tr>
                <tr>
                    <td>DUE UPON RECEIPT</td>
                    <td>{{ new Date().toDateString() }}</td>
                    <td>{{ bookInfo.random_code }}</td>
                </tr>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Car Type</th>
                        <!-- <th>Driver</th>
                        <th>Price Per Day</th>
                        <th>Days Count</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- <td>${carInfo.value.filter(el => el.id === userInfo.type_id)[0].name_en}</td>
                        <td>${userInfo.width_driver}</td>
                        <td>$${bookInfoInfo.width_driver === "with driver" ?
                            carInfo.value.price_with_driver :
                            carInfo.value.price_per_day}</td> -->
                        <td>{{ bookInfo.number_of_days }}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Date Inforamtion</h3>

            <table>
                <thead>
                    <tr>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ bookInfo.start_date }}</td>
                        <td>{{ bookInfo.end_date }}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Chckout</h3>

            <table>
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>Tax</th>
                        <!-- <th>Agent Discount</th> -->
                        <th>Net Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${{ bookInfo.total }}</td>
                        <td>{{ bookInfo.tax }}%</td>
                        <!-- <td>$${userInfo.agent_discount}</td> -->
                        <td>${{ bookInfo.net_amount }}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Customer Information</h3>
            <div class="info">
                <ul class="list-group">
                    <li class="item-list">
                        <span>
                            <strong>Mr:</strong> {{ userInfo.name }}</span>
                    </li>
                    <li class="item-list"><span><strong>Phone:</strong> {{ bookInfo.phone_number }}</span></li>
                    <li class="item-list"><span><strong>Email:</strong> {{ userInfo.email }}</span></li>
                </ul>
            </div>

            <table>
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

            <img id="m_2683479659778605604m_2053751925184754895barcode"
                src="https://ci4.googleusercontent.com/proxy/3nyBbG6GlI0QOhiDqPBwjAPv_D6a_9UdWFZGWZqc_F774ZtgLhcOyAZ_FkufbVP5wfZlWJogtg-Y4GbVPgQipHy0uGeQcejnBWXoKKmVXbMUhybO534z3JyFaVZTV3wPjuQzfQ51QhYNpBjenZ2VWjmMc_Y1UONT9UNIJOdw3Wp4YuWwTY0J=s0-d-e1-ft#https://api.qrserver.com/v1/create-qr-code/?data=https://seasonsge.com/showbookInfoing/tjpuuvlst3kck0so8cw4&amp;size=100x100"
                alt="" title="hello" style="width:100px;height:auto;float:right;margin:30px" class="CToWUd" data-bit="iit"
                width="100" height="100">

            <span>Regards,</span>
            <br>
            <a href="https://seasonsge.com/" target="_blank">https://seasonsge.com/</a>

            <footer>
                <p>Thanks Again For The Purchase!. I'm Sure You happy Now :)</p>
                <a :href="social.facebookInfo">Follow US On FacebookInfo</a> |
                <a :href="social.twitter">Follow US On Twitter</a> |
                <a href="https://google.com">Follow US On Google</a> |
                <a href="https://linkedin.com">Follow US On Linkedin</a>
            </footer>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
// import html2pdf from "html2pdf.js";


const checkout = ref()
const props = defineProps(['bookInfo'])
const userInfo = ref({})
const social = ref({})

const exportToPDF = () => {
    // html2pdf(document.querySelector(".orderSummary"), {

    //     margin: 1,
    //     filename: "Checkout.pdf",
    //     image: {
    //         type: 'jpeg',
    //         quality: 0.98
    //     },
    //     // enableLinks: true,
    //     jsPDF: {
    //         unit: 'in',
    //         format: 'a4',
    //         orientation: 'portrait'
    //     },
    //     html2canvas: {
    //         scale: 1,
    //         useCORS: true
    //     },
    // });
}


onMounted(async () => {
    const login = JSON.parse(sessionStorage.getItem("clientLogin"))
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview")
        .then(data => {
            userInfo.value = data.data.filter(el => el.id === login.id)[0]
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
        })
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
.orderSummary {
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
    padding: 20px;
}

.orderSummary p {
    padding: 10px 20px;
    line-height: 26px;
}

.orderSummary h3 {
    padding: 20px;
}

.orderSummary table {
    text-align: center;
    padding: 20px;
    width: 100%;
}

.orderSummary table th {
    text-align: center;
    padding: 10px;
}

.orderSummary table td {
    border: thin solid #d4d4d4;
    padding: 10px;
}

.orderSummary .info {
    padding-bottom: 50px;
    padding-left: 20px;
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