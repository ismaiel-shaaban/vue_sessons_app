<template>
    <div class="hotel-table p-4 rounded-1 bg-white">
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
        <div class="row mt-5">
            <div class="col-lg-4 col-md-6 mb-4" v-for="(item, index) in allResults" :key="index">
                <div class="box rounded-2 d-flex flex-column overflow-hidden" @click="$emit('getIdAndForward', item.id)">
                    <div class="image">
                        <img class="img-fluid" :src="`https://seasonreal.seasonsge.com/images/${item.main_image}`" alt="">
                    </div>
                    <div class="info p-3">
                        <h5 class="text-muted">{{ item.name }}</h5>
                        <span>{{ item.rating }}</span>
                        <p class="text-black-50">{{ $i18n.locale === 'en' ? item.details_en : item.details }}</p>
                        <h4 v-if="item.cityObj" class="fw-bold">{{ $i18n.locale === 'en' ? item.cityObj.name_en :
                            item.cityObj.name }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import i18n from '../i18n';

const props = defineProps(['searchResults', 'searchInfo'])
const allResults = ref([])

onMounted(async () => {
    allResults.value = [...props.searchResults]
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            allResults.value.forEach(el => {
                el.cityObj = data.data.filter(ele => ele.id == el.city)[0]
            })
        })
})
</script>

<style lang="scss" scoped>
.hotel-table {
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
        box-shadow: 0 0 10px #00000038;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
        }

        h4 {
            color: var(--blue-color);
        }
    }

}
</style>