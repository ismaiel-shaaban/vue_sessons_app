<template>
    <div class="carbook-page min-vh-100 position-relative">
        <div class="container">
            <span
                class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward'), allResults = []"
                title="Back">
                <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
            </span>
            <h2 class="my-4">{{ $t('carRental') }}</h2>
            <div class="car-boxes py-5">
                <div class="row">
                    <div class="col-lg-4 col-md-6 mb-4" v-for="(item, index) in viewCars" :key="index">
                        <div class="box rounded-1 overflow-hidden d-flex flex-column h-100">
                            <div class="img-cont">
                                <img class="img-fluid" :src="`https://seasonreal.seasonsge.com/images/Agents/${carType[index].img}`" alt="">
                            </div>
                            <div class="info p-3 flex-fill d-flex flex-column justify-content-between">
                                <h2 class="text-capitalize">{{ $i18n.locale === 'en' ? item.type_english_name : item.type_arabic_name }}</h2>

                                <button class="bg-transparent border-0 fw-bold" @click="$emit('getIdAndForward', item.type_id),
                                uploadCarId(item)
                                
                                ">
                                    {{ $t('buttons.bookNow') }}
                                    {{ $i18n.locale === "en" ? "&rightarrow;" : "&leftarrow;" }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Loader from './Loader.vue';

const loading = ref(false)
const carInfo = ref([])
const carType = ref([])
const props = defineProps(['searchInfo']);
const uploadCarId = (item)=>{
localStorage.setItem('carId' , item.id)
}
let viewCars = ref([]);
onMounted(async () => {
    loading.value = true ;
   
    
    await axios.get('https://seasonreal.seasonsge.com/appv1real/carview').then((data)=>{
    viewCars.value = data.data;
    console.log('cars data are');
    console.log(viewCars.value);
    localStorage.setItem('carsData' , JSON.stringify(viewCars.value))
    })
    

    await axios.get('https://seasonreal.seasonsge.com/appv1real/cars-type-view')
        .then(data => {
            // debugger
            // console.log(data.data)
            carType.value = data.data
            loading.value = false
        })
        //hhhh
    await axios.get('https://seasonreal.seasonsge.com/appv1real/cars-view')
        .then(data => {
            // debugger
            carInfo.value = data.data
            console.log('llllllllllllllllllllll');
            console.log(data.data)
            loading.value = false
        })
})
</script>

<style lang="scss" scoped>
.carbook-page {
    .car-boxes {
        .box {
            box-shadow: 0 0 10px #00000038;
            transition: 0.2s;

            &:hover {
                transform: scale(1.05);
            }

            .img-cont {
                height: 250px;
                overflow: hidden;

                img {
                    object-fit: cover;
                }
            }

            h2 {
                color: var(--blue-color);
            }

            button {
                color: var(--orange-color);
                width: fit-content;
            }
        }
    }
}
</style>