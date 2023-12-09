<template>
    <div class="tourism-table p-4 rounded-1 bg-white">
        <span
            class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px; cursor: pointer;" @click="$emit('back-ward'), allResults = []" title="Back">
            <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
        </span>
        <div class="d-flex align-items-center justify-content-between">
            <h2 class="position-relative">Search Results</h2>
            <span class="d-block text-muted">
                {{ $t('programs.filterTool.results') }}: {{ allResults.length }}
            </span>
        </div>
        <div class="row mt-5" v-if="allResults.length > 0">
            <div class="col-lg-4 col-md-6" v-for="(item, index) in allResults" :key="index">
                <div class="box rounded-2 d-flex flex-column overflow-hidden" @click="$emit('getIdAndForward', item.id),
                storeIdOfProgramm(item)
                ">
                    <div>
                        <img class="img-fluid" :src="`https://seasonreal.seasonsge.com/upload/${item.main_image}`" alt="">
                    </div>
                    <div class="info p-3 bg-white">
                        <h4 class="text-capitalize fw-bold mb-0" v-if="item.destination">
                            {{ $i18n.locale === 'en' ? item.destination.name_en : item.destination.name }}
                        </h4>
                        <p class="d-block mt-2 fw-bold mb-0 text-muted">
                            {{ $i18n.locale === 'en' ? item.program_title_english : item.program_title_arabic }}
                        </p>
                        <span class="text-black-50 mt-3 d-block fw-bold">
                            {{ item.num_of_days }} {{ $t('programs.cardInfo.days') }} &
                            {{ item.num_of_nights }} {{ $t('programs.cardInfo.nights') }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <h3 v-else class="text-center py-5 text-muted my-5">No Results</h3>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

const props = defineProps(['searchResults', 'searchInfo'])
const allResults = ref([])

const storeIdOfProgramm = (item)=>{
    localStorage.setItem('programmId' , item.id)
}

onMounted(async () => {
    allResults.value = [...props.searchResults]
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            allResults.value.forEach(el => {
                el.destination = data.data.filter(ele => ele.id === el.return_airline)[0]
            })
        })
})

</script>
<style lang="scss" scoped>
.tourism-table {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);

    h2 {
        color: var(--blue-color);

        &::before {
            content: "";
            position: absolute;
            background-color: var(--blue-color);
            height: 3px;
            border-radius: 50px;
            bottom: -7px;
            width: 25%;
        }
    }

    .box {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.178);
        transition: 0.2s;
        cursor: pointer;

        &:hover {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.349);
            transform: scale(1.01);
        }

        h4 {
            color: var(--blue-color);
        }
    }

}
</style>