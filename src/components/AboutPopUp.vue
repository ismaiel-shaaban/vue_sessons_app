<template>
    <div :class="`overlay position-fixed w-100 h-100 ${openPopup ? 'open' : ''}`">
        <div :class="`about-popup position-fixed rounded-1 bg-white ${openPopup ? 'open' : ''}`">
            <i :class="`fa-solid fa-xmark fa-2x close ${$route.params.lang === 'en' ? '' : 'ar'}`"
                @click="$emit('close-aboutPopup')"></i>
            <div class="inner px-5" v-if="!forward">
                <div class="heading-text">
                    <h1 class="fs-2">
                        {{ $route.params.lang === 'en' ? aboutTxt.title1_en : aboutTxt.title1_ar }}
                    </h1>
                    <div class="text-muted"
                        v-html="$route.params.lang === 'en' ? aboutTxt.details1_en : aboutTxt.details1_ar">

                    </div>
                </div>
                <div class="heading-text mt-5">
                    <h1 class="fs-2">{{ $route.params.lang === 'en' ? aboutTxt.title_section_en : aboutTxt.title_section_ar
                    }}</h1>
                    <div class="links row mt-5">
                        <div class="col-md-4" v-if="sectionLinks" v-for="(item, index) in sectionLinks" :key="index">
                            <span class="p-4 border rounded-1"
                                :to="`/${$route.params.lang}/${$route.params.lang === 'en' ? item.link_en : item.link_ar}`"
                                @click=showConent(item)>
                                {{ $route.params.lang === 'en' ? item.name_en : item.name_ar }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="heading-text mt-5">
                    <h1 class="fs-2">{{ $route.params.lang === 'en' ? aboutTxt.title2_en : aboutTxt.title2_ar }}</h1>
                    <div class="text-muted"
                        v-html="$route.params.lang === 'en' ? aboutTxt.details2_en : aboutTxt.details2_ar">

                    </div>
                </div>
                <div class="heading-text mt-5">
                    <h1 class="fs-2">{{ $route.params.lang === 'en' ? aboutTxt.title3_en : aboutTxt.title3_ar }}</h1>
                    <ul class="text-start d-flex gap-3 flex-column mt-5">
                        <li class="d-flex gap-2 text-start" v-if="$route.params.lang === 'en' && aboutTxt.details3_en"
                            v-for="(item, index) in preFormat(aboutTxt.details3_en)" :key="index">
                            <i :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'}`"></i>
                            <span class="text-muted">{{ item }}</span>
                        </li>
                        <li class="d-flex gap-2 text-end" v-if="$route.params.lang === 'ar' && aboutTxt.details3_ar"
                            v-for="(item, index) in preFormat(aboutTxt.details3_ar)" :key="index">
                            <i :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'}`"></i>
                            <span class="text-muted">{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content p-5 h-100" v-else>
                <span class="d-block mb-4 fw-semibold" @click="forward = false">
                    {{ $route.params.lang === 'en' ? '&leftarrow; Back' : "&rightarrow; رجوع" }}
                </span>
                <div class="heading-text mt-5">
                    <h1 class="fs-2">
                        {{ $route.params.lang === 'en' ? servicesConent.name_en : servicesConent.name_ar }}
                    </h1>
                    <p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nam eum blanditiis
                        nobis vitae laudantium.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

defineProps(['openPopup'])
defineEmits(['close-aboutPopup'])

const aboutTxt = ref([])
const sectionLinks = ref([])
const servicesConent = ref([])
const forward = ref(false)

const preFormat = (detail) => {
    return detail.split("\r\n")
}
const showConent = (item) => {
    servicesConent.value = item
    forward.value = true
}
onMounted(async () => {
    await axios.get('https://seasonreal.seasonsge.com/appv1real/about')
        .then(data => {
            aboutTxt.value = data.data[0]
        })
    await axios.get('https://seasonreal.seasonsge.com/appv1real/about-section')
        .then(data => {
            sectionLinks.value = data.data
        })
})



</script>
<style lang="scss" scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.623);
    left: 0;
    top: 100%;
    z-index: 55555;
    transition: 0.2s;

    &.open {
        top: 0;
    }

    .about-popup {
        top: -50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 750px;
        height: 90%;
        transition: 0.2s;

        &.open {
            top: 50%;
        }

        .inner {
            height: 100%;
            overflow: auto;
            padding-top: 50px;
            padding-bottom: 50px;

            .links {
                span {
                    display: block;
                    cursor: pointer;
                    margin-bottom: 25px;
                    text-decoration: none;
                    color: black;
                    transition: 0.2s;
                    font-weight: 500;

                    &:hover {
                        color: var(--blue-color);
                        border: 1px solid var(--blue-color) !important;
                    }
                }
            }

            ul {
                i {
                    color: var(--blue-color);
                    position: relative;
                    top: 5px;
                }
            }
        }

        .content {
            span {
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    color: var(--blue-color);
                }
            }
        }

        .close {
            position: fixed;
            right: 30px;
            top: 15px;
            cursor: pointer;
            transition: 0.2s;

            &.ar {
                right: initial;
                left: 30px;
            }

            &:hover {
                color: #919191;
            }
        }

    }

    @media(max-width: 767px) {
        .about-popup {
            width: 90%;

            .inner {
                padding: 50px 25px !important;
            }
        }
    }
}</style>