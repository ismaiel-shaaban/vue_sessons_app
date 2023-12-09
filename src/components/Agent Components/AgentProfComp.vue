<template>
    <div class="container bg-white  agent-tab-one" dir="ltr">
        <div class="content p-2 py-4">
            <div class="welcome h-100 p-2 py-4 rounded-1">
                <h4>{{$t('dashAside.agent.welcome')}} {{ userData.name }}</h4>
             
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Loader from '../Loader.vue';

const loading = ref(false)
const route = useRoute()
const userData = ref({})


// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})


onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then(data => {
        userData.value = data.data.filter(el => el.id == route.params.userId)[0]
        loading.value = false
    })

})
</script>
<style lang="scss" scoped>
.agent-tab-one {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .content {
        

        .box {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);
            border: 1px solid var(--orange-color);
        }
    }
    @media (max-width: 767px) {
        .content {
            padding: 5px !important;
            margin: auto;
            .welcome {
                padding: 20px 10px !important;
                margin: auto;
            }
            .box {
                padding: 5px !important;
            }
        }
    }
}
</style>