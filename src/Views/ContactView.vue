<template>
    <div class="contact-page">
        <HeaderComp></HeaderComp>
        <div class="container">
            <div class="heading-text py-5">
                <h1>{{ $t('contact.heading') }}</h1>
                <p class="text-muted fs-5">{{ $t('contact.paragraph') }}</p>
            </div>
        </div>
        <div id="contact" class="contact-section d-flex">
            <div class="left p-5">
                <h2 class="text-uppercase text-center mb-4 text-white">
                    {{ $t('contact.title') }}
                </h2>
                <img class="img-fluid" src="/images/undraw_contact_us_re_4qqt.svg" alt="" />
            </div>
            <div class="right p-5">
                <form class="d-flex flex-column gap-3 w-75 mx-auto" @submit.prevent="formSubmission">
                    <div class="position-relative">
                        <label class="mb-1 fw-semibold">{{ $t('contact.form[0]') }}</label>
                        <input :class="`p-2 px-4 rounded-1 w-100 ${validation.name.$error ? 'error' : ''}`" type="text"
                            placeholder="Full Name" v-model="contactForm.name" />
                        <span v-if="validation.name.$error" class="error text-danger mt-2 fst-italic d-block ms-2">
                            {{
                                validation.name.$errors[0].$validator === "required"
                                ? "Field Can't Be Empty"
                                : ""
                            }}
                        </span>
                    </div>
                    <div class="position-relative">
                        <label class="mb-1 fw-semibold">{{ $t('contact.form[1]') }}</label>
                        <input :class="`p-2 px-4 rounded-1 w-100 ${validation.email.$error ? 'error' : ''
                            }`" type="text" placeholder="Email Adress" v-model="contactForm.email" />
                        <span v-if="validation.email.$error" class="error text-danger mt-2 fst-italic d-block ms-2">
                            {{
                                validation.email.$errors[0].$validator === "required"
                                ? "Field Can't Be Empty"
                                : "Invalid Email"
                            }}
                        </span>
                    </div>
                    <div class="position-relative">
                        <label class="mb-1 fw-semibold">{{ $t('contact.form[2]') }}</label>
                        <textarea :class="`p-2 px-4 rounded-1 w-100 ${validation.message.$error ? 'error' : ''
                            }`" name="message" placeholder="Wrtie Your Message"
                            v-model="contactForm.message"></textarea>
                        <span v-if="validation.message.$error" class="error text-danger mt-2 fst-italic d-block ms-2">
                            {{
                                validation.message.$errors[0].$validator === "required"
                                ? "Field Can't Be Empty"
                                : ""
                            }}
                        </span>
                    </div>
                    <button class="butn p-3 rounded-1" type="submit">
                        {{ $t('buttons.sendMessage') }}
                    </button>
                </form>
                <div class="alert alert-success d-flex align-items-center gap-2 text-center position-fixed" role="alert">
                    <i class="fa-solid fa-circle-check fs-5"></i>
                    <div>
                        {{ $t('contact.alert') }}
                    </div>
                </div>
            </div>
        </div>
        <FooterComp></FooterComp>
    </div>
</template>
<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import { ref } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";




const contactForm = ref({
    name: "",
    email: "",
    message: "",
});

const rules = {
    name: { required },
    email: { required, email },
    message: { required },
};

const validation = useVuelidate(rules, contactForm);

const formSubmission = () => {
    validation.value.$validate();
    if (!validation.value.$error) {
        validation.value.$reset();
        contactForm.value = {
            name: "",
            email: "",
            message: "",
        };
        document.querySelector(".alert").classList.add("sent");
        setTimeout(() => {
            document.querySelector(".alert").classList.remove("sent");
        }, 2500);
    }
};



</script>
<style lang="scss" scoped>
.contact-page {
    .contact-section {
        .left {
            flex-basis: 50%;
            background-color: #fc9163;
        }

        .right {
            flex-basis: 50%;

            form {
                input {
                    outline: none;
                    border: 1px solid gray;

                    &.error {
                        border-color: #dc3545;
                    }
                }

                textarea {
                    height: 150px;
                    resize: none;
                    outline: none;
                    border: 1px solid gray;

                    &.error {
                        border-color: #dc3545;
                    }
                }
            }

            .alert {
                top: -15%;
                left: 50%;
                transform: translateX(-50%);
                transition: 0.3s;
                width: 275px;
                z-index: 555555555;

                &.sent {
                    top: 5%;
                }
            }
        }

    }

    @media (max-width: 767px) {

        .heading-text {
            p {
                font-size: 15px !important;
            }
        }

        .contact-section {
            flex-direction: column;

            .right {
                form {
                    width: 100% !important;
                }
            }
        }
    }
}
</style>