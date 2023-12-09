<template>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog w-75" role="document">
    <div class="modal-content mt-5">
      <img class="w-100 modalImage" :src="`https://seasonsge.com/seasonreal/upload/${image}`" alt="" />
    </div>
  </div>
</div>
    <div class="program-book">
        <div class="inner-box bg-white rounded-1">
            <span
                class="p-2 d-block bg-secondary mb-4 bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; cursor: pointer" @click="$emit('back-ward')" title="Back">
                <i :class="`fa-solid fa-chevron-${$i18n.locale === 'en' ? 'left' : 'right'}`"></i>
            </span>  
            <div class="program-info text-center">
                <h2 class="mb-3 text-capitalize" v-if="programDetails.destination">
                    {{
                        $i18n.locale === "en"
                        ? programDetails.destination.name_en
                        : programDetails.destination.name
                    }}
                </h2>
                <p class="text-muted fw-bold mb-3">
                    {{
                        $i18n.locale === "en"
                        ? programDetails.program_title_english
                        : programDetails.program_title_arabic
                    }}
                </p>
                <span class="text-white fw-bold d-block rounded-1 p-2 px-3 mx-auto">
                    {{ programDetails.num_of_days }} {{ $t("programs.cardInfo.days") }} &
                    {{ programDetails.num_of_nights }} {{ $t("programs.cardInfo.nights") }}
                </span>
            </div>
            <div class="flight-trip mt-5 carousel row justify-content-between px-5 mt-5" v-if="programDetails.includes_flight == '1'">
                <!--الصور-->
            <div style="margin-top: 150px;" v-if="programmsImages.length > 0" class="justify-content-center col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <carousel :autoplay="3000" :wrap-around="true" :items-to-show="1" class=" pb-5 w-100" style="border: none;">
    <slide v-for="img in Array.from(new Set(programmsImages))" :key="img">
        <img v-if="img !=''" @click="uploadImageTomodal(img)" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal" class="w-100" :src="`https://seasonsge.com/seasonreal/upload/${img}`" alt="" />
    </slide>
    <template #addons>
      <navigation />
      <Pagination class="position-absolute" />

    </template>
  </carousel>
             
</div>

<div :class="programmsImages.length == 0 ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5 slider' : 'col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5 slider'">


    <h2 class="head text-center mb-5">
                    {{ $t("programs.cardInfo.details") }}
                </h2>
                <div class="go-trip">
                    <h3 class="mb-3">
                        {{ $t("programs.cardInfo.trip.go") }}
                    </h3>
                    <div class="info">
                        <div class="detail-label">
                            <label class="position-relative mb-1">
                                {{ $t("programs.cardInfo.trip.flightLine") }}
                            </label>
                            <span
                                class="p-2 px-3 rounded-1 bg-secondary text-center fw-bold text-capitalize bg-opacity-25 text-muted d-block"
                                v-if="flightTrip.flightAirLine">
                                {{
                                    $i18n.locale === "en"
                                    ? flightTrip.flightAirLine.name_en
                                    : flightTrip.flightAirLine.name_ar
                                }}
                            </span>
                        </div>
                        <div class="more-info d-flex align-items-start mt-3 gap-4 flex-lg-row flex-column">
                            <div class="flex-fill w-100">
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.from") }}
                                    </label>
                                    <span
                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                        v-if="flightTrip.from">
                                        {{
                                            $i18n.locale === "en"
                                            ? flightTrip.from.english_name
                                            : flightTrip.from.arabic_name
                                        }}
                                    </span>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t('programs.cardInfo.trip.deptDateTime') }}
                                    </label>
                                
                                    <div class="d-flex gap-2 w-100">
                                        <span
                                            class="p-2 px-3 w-100 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.departureDate }}
                                        </span>
                                        <span
                                            class="p-2 px-3 w-100 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.departureTime }}
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.allowedWeight") }}
                                    </label>
                                    <span class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                        {{ flightTrip.allowedWeight  }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex-fill w-100">
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.to") }}
                                    </label>
                                    <span
                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                        v-if="flightTrip.to">
                                        {{
                                            $i18n.locale === "en"
                                            ? flightTrip.to.english_name
                                            : flightTrip.to.arabic_name
                                        }}
                                    </span>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t('programs.cardInfo.trip.arrivalDateTime') }}
                                    </label>
                                    <div class="d-flex gap-2 w-100">
                                        <span
                                            class="p-2 px-3 w-100 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.arrivDate22 }}
                                        </span>
                                        <span
                                            class="p-2 px-3 w-100 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.arrivalTime }}
                                        </span>
                                    </div>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.flightNum") }}
                                    </label>
                                    <span class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                        {{ flightTrip.flightNumber }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

</div>


                <div class="return-trip mt-5 flex-fill">
                    <h3 class="mb-3">
                        {{ $t("programs.cardInfo.trip.return") }}
                    </h3>
                    <div class="info">
                        <div class="detail-label">
                            <label class="position-relative mb-1">
                                {{ $t("programs.cardInfo.trip.flightLine") }}
                            </label>
                            <span
                                class="p-2 px-3 rounded-1 bg-secondary text-center fw-bold text-capitalize bg-opacity-25 text-muted d-block"
                                v-if="flightTrip.flightAirLine">
                                {{
                                    $i18n.locale === "en"
                                    ? flightTrip.flightAirLine.name_en
                                    : flightTrip.flightAirLine.name_ar
                                }}
                            </span>
                        </div>
                        <div class="more-info d-flex align-items-start mt-3 gap-4 flex-lg-row flex-column">
                            <div class="flex-fill w-100">
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t('programs.cardInfo.trip.from') }}
                                    </label>
                                    <span
                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                        v-if="flightTrip.returnFrom">
                                        {{
                                            $i18n.locale === "en"
                                            ? flightTrip.returnFrom.english_name
                                            : flightTrip.returnFrom.arabic_name
                                        }}
                                    </span>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t('programs.cardInfo.trip.deptDateTime') }}

                                    </label>
                                    <div class="d-flex gap-2 w-100">
                                        <span
                                            class="p-2 px-3 rounded-1 w-100 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.returnStartDate }}
                                        </span>
                                        <span
                                            class="p-2 px-3 rounded-1 w-100 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.returnEndDate1 }}
                                        </span>
                                    </div>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.allowedWeight") }}
                                    </label>
                                    <span class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                        {{ +flightTrip.allowedWeightReturn }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex-fill w-100">
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.to") }}
                                    </label>
                                    <span
                                        class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block text-capitalize"
                                        v-if="flightTrip.returnTo">
                                        {{
                                            $i18n.locale === "en"
                                            ? flightTrip.returnTo.english_name
                                            : flightTrip.returnTo.arabic_name
                                        }}
                                    </span>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        <!--وقت وتاريخ الوصول-->
                                        {{ $t('programs.cardInfo.trip.arrivalDateTime') }}

                                    </label>
                                    <div class="d-flex gap-2 w-100">
                                        <span
                                            class="p-2 px-3 rounded-1 w-100 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.returnEndDate }}
                                        </span>
                                        <span
                                            class="p-2 px-3 rounded-1 w-100 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                            {{ flightTrip.returnEndDate2 }}
                                        </span>
                                    </div>
                                </div>
                                <div class="detail-label my-2">
                                    <label class="position-relative mb-1">
                                        {{ $t("programs.cardInfo.trip.flightNum") }}
                                    </label>
                                    <span class="p-2 px-3 rounded-1 bg-secondary fw-bold bg-opacity-25 text-muted d-block">
                                        {{ returnFlightNum }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="programme-details mt-5">
                <h2 class="mb-3">
                    {{ $t("programs.cardInfo.programDetails") }}
                </h2>
                <ul class="d-flex flex-column gap-2">
                    <li v-if="typeof programDetails.program_details_english === 'object' &&
                        typeof programDetails.program_details_arabic === 'object'
                        " v-for="(item, index) in $i18n.locale === 'en'
        ? programDetails.program_details_english
        : programDetails.program_details_arabic" :key="index" class="text-capitalize">
                        <i :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'}`"></i>
                        {{ item }}
                    </li>
                    <li v-else class="text-capitalize">
                        <i :class="`fa-solid fa-angles-${$route.params.lang === 'en' ? 'right' : 'left'
                            }`"></i>
                        {{
                            $i18n.locale === "en"
                            ? programDetails.program_details_english
                            : programDetails.program_details_arabic
                        }}
                    </li>
                </ul>
            </div>
           
            <form>
        <!--سلايدر لايشمل الطيران-->
<!--بداية ريسبونزف السلايدر-->
                  <!--الصور-->
                  <!--
:class="programmsImages.length == 0 ? 'd-none' : 'justify-content-center col-xl-6 col-lg-6 col-md-12 col-sm-12'"
                  -->
                  <div class="row mt-5">
                    <!--start slider-->

                    <div  style="border: none;" :class="programmsImages.length == 0 ? 'd-none' : 'justify-content-center col-xl-6 col-lg-6 col-md-12 col-sm-12'" v-if="$props.searchInfo.includeFlight != 1">
    <carousel :autoplay="3000" :wrap-around="true" :items-to-show="1" class=" pb-5 w-100" style="border: none;">
    <slide v-for="img in Array.from(new Set(programmsImages))" :key="img">
        <img v-if="img !=''" @click="uploadImageTomodal(img)" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal" class="w-100" :src="`https://seasonsge.com/seasonreal/upload/${img}`" alt="" />
    </slide>
    <template #addons>
      <navigation />
      <Pagination class="position-absolute" />

    </template>
  </carousel>
             
</div>
<!--end slider-->
<div :class="programmsImages.length > 0  && $props.searchInfo.includeFlight == 1 
? 'col-xl-12 col-lg-12 col-md-12 col-sm-12  slider' 
: programmsImages.length == 0  && $props.searchInfo.includeFlight == 1
? 'col-xl-12 col-lg-12 col-md-12 col-sm-12  slider' 
: programmsImages.length == 0  && $props.searchInfo.includeFlight == 0
? 'col-xl-12 col-lg-12 col-md-12 col-sm-12  slider'
: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 slider'">
            <!--بداية جزء ملىء البيانات-->
            
            <div class="booking-box rounded-1 mt-1 p-3 w-100" style="border: none;">
                <h3 class="text-center mb-2 position-relative">
                        {{ $t("buttons.bookNow") }}
                    </h3>
                    <h4 class="text-center mb-4 fw-bold">
                        ({{ $t("programs.search.leader") }})
                    </h4>
                    <div class="box d-flex flex-column flex-md-row gap-3 mt-3">
                        <label class="w-50 d-flex gap-2">
                            <div class="w-100 p-1" v-if="bookingInfo.type === 'MR' || bookingInfo.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} :
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="bookingInfo.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                            </div>
                   
                        </label>
                        <div class="w-100 position-relative">
                            <span class="d-block mb-2 fw-semibold">{{ $t('carBook.details.fName') }}: </span>
                            <input :class="`p-2 px-3 w-100 rounded-1 ${validation.first_name.$error ? 'error' : ''}`"
                                type="text" v-model="bookingInfo.first_name" placeholder="First Name" />
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
                            <input :class="`p-2 px-3 w-100 rounded-1 ${validation.last_name.$error ? 'error' : ''}`"
                                type="text" v-model="bookingInfo.last_name" placeholder="Last Name" />
                            <span v-if="validation.last_name.$error" class="error d-block text-danger fst-italic mx-2">
                                {{
                                    validation.last_name.$errors[0].$validator === "required"
                                    ? "Field Reuqired"
                                    : ""
                                }}
                            </span>
                        </div>
                    </div>
                    <div class="box d-flex gap-3 mt-3 flex-lg-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.phone")
                            }}:</span>
                            <input :class="`p-2 px-3 rounded-1 w-100 ${validation.phone.$error ? 'error' : ''
                                }`" type="phone" placeholder="Phone Number" v-model="bookingInfo.phone" />
                            <span v-if="validation.phone.$error" class="error text-danger fst-italic d-block">
                                {{
                                    validation.phone.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : "Invalid Phone Number"
                                }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 mt-3 flex-lg-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.nation")
                            }}:</span>
                            <input :class="`p-2 px-3 rounded-1 w-100 ${validation.nationality.$error ? 'error' : ''
                                }`" type="text" placeholder="Nationality" v-model="bookingInfo.nationality" />
                            <span v-if="validation.nationality.$error" class="error text-danger fst-italic d-block">
                                {{
                                    validation.nationality.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : ""
                                }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.passportNum")
                            }}:</span>
                            <input :class="`p-2 px-3 rounded-1 w-100 ${validation.passport_number.$error ? 'error' : ''
                                }`" type="text" placeholder="Passport Number" v-model="bookingInfo.passport_number" />
                            <span v-if="validation.passport_number.$error" class="error text-danger fst-italic d-block">
                                {{
                                    validation.passport_number.$errors[0].$validator === "required"
                                    ? "Field Required"
                                    : 'Passport can"t containe special characters'
                                }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 mt-3 flex-lg-row flex-column" v-if="bookingInfo.personsForm.length > 0"
                        v-for="(item, index) in bookingInfo.personsForm" :key="index">
                        <label class="w-100 d-flex sm-flex-nowrap flex-wrap row gap-2">
                            <div class="col-12 col-sm-3" v-if="item.type === 'MR' || item.type === 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t('flightReservation.flightBook.type') }} {{ `(${index + 2})` }}:
                                </span>
                                <select class="w-100 p-2 px-3 rounded-1" v-model="item.type">
                                    <option value="MR">MR</option>
                                    <option value="MRS">MRS</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-3" v-if="item.type !== 'MR' && item.type !== 'MRS'">
                                <span class="d-block mb-1 fw-semibold">
                                    {{ $t("flightReservation.flightBook.type") }} {{ `(${index + 2})` }}:
                                </span>
                                <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].type.$error
                                    ? 'error'
                                    : ''
                                    }`" type="text" placeholder="Type" v-model="item.type" disabled />
                           
                            </div>
                            <div class="d-flex col-12 col-sm-8 gap-2">

                                <div class="w-100 ">
                                    <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.firstName") }}
                                        {{ `(${index + 2})` }}:
                                    </span>
                                    <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].firstName.$error
                                        ? 'error'
                                        : ''
                                        }`" type="text" placeholder="First Name" v-model="item.firstName" />
                                    <span v-if="validation.personsForm.$each.$response.$data[index].firstName.$error
                                        " class="error text-danger fst-italic d-block">
                                        {{
                                            validation.personsForm.$each.$response.$errors[index].firstName[0]
                                                .$validator === "required"
                                            ? "Field Required"
                                            : ""
                                        }}
                                    </span>
                                </div>
                                <div class="w-100">
                                    <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.lastName") }}
                                        {{ `(${index + 2})` }}:
                                    </span>
                                    <input :class="`p-2 px-3 rounded-1 w-100 ${validation.personsForm.$each.$response.$data[index].lastName.$error
                                        ? 'error'
                                        : ''
                                        }`" type="text" placeholder="Last Name" v-model="item.lastName" />
                                    <span v-if="validation.personsForm.$each.$response.$data[index].lastName.$error
                                        " class="error text-danger fst-italic d-block">
                                        {{
                                            validation.personsForm.$each.$response.$errors[index].lastName[0]
                                                .$validator === "required"
                                            ? "Field Required"
                                            : ""
                                        }}
                                    </span>
                                </div>
                            </div>
                        </label>
                  
                    </div>
                    <div class="box my-5 d-flex gap-3 flex-column" v-if="searchInfo.rooms.length > 0">
                        <h3 class="text-center">Rooms</h3>
                        <div :class="x.matches ? 'overflow-auto responsive-table  d-flex justify-content-center':'responsive-table  d-flex justify-content-center'">
                            <table class="w-100">
                                <thead>
                                    <tr>
                                        <td class="text-center">#</td>
                                        <td>Room Type</td>
                                        <td>Child Reservation</td>
                                        <td>Child Count In Room</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in searchInfo.rooms" :key="index">
                                        <td class="text-center">
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            {{ item.roomType === '1' ? 'Single Room'
                                                : item.roomType === '2' ?
                                                    'Double Room' : 'Triple Room' }}
                                        </td>
                                        <td>
                                            {{ item.childReservation }}
                                        </td>
                                        <td>
                                            {{ item.childCount }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="box my-5 d-flex gap-3 flex-column" v-if="allCities.length > 0">
                        <h3 class="text-center">Cities In Program</h3>
                        <div :class="x.matches ? 'overflow-auto responsive-table  d-flex justify-content-center':'responsive-table  d-flex justify-content-center'">
                            <table class="w-100">
                                <thead>
                                    <tr>
                                        <td class="text-center">#</td>
                                        <td>City</td>
                                        <td>Hotel Name</td>
                                        <td>Check In</td>
                                        <td>Check Out</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in allCities" :key="index">
                                        <td class="text-center">
                                            {{ index + 1 }}
                                        </td>
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
                        </div>
                    </div>
                    <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.meal') }}:</span>
                            <!--نوع الوجبات والمواصلات-->
                            <span class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25 d-block w-100">{{ mealType }}</span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t('flightReservation.flightBook.transport')
                            }}:</span>
                            <span class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25 d-block w-100">
                                {{ carsHistory[0]?
                                 $i18n.locale === 'en' ? carsHistory[0].name_en : carsHistory[0].name 
                                
                                :'' 
                                
                                }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 mt-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.adults") }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.adults" disabled />
                        </label>
                        <label class="w-100" v-if="persons.children > 0">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.children") }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.children" disabled />
                        </label>
                        <label class="w-100" v-if="persons.infants > 0">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("flightReservation.flightBook.infants") }}:
                            </span>
                            <input class="p-2 px-3 rounded-1 w-100 bg-secondary bg-opacity-25" type="number" min="0"
                                v-model="persons.infants" disabled />
                        </label>
                
                    </div>
                    <div class="box d-flex gap-3 mt-4 flex-md-row flex-column">
                        <label class="w-100" v-if="prices.has('1')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.singlePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_adult_individual) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('2')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.doublePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_adult_double) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('3')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.triplePrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_adult_triple) }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 mt-4 flex-md-row flex-column">
                        <label class="w-100" v-if="prices.has('4')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.childWithoutBedPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_child_no_bed) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('5')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.childWithBedPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_child_with_bed) }}
                            </span>
                        </label>
                        <label class="w-100" v-if="prices.has('6')">
                            <span class="d-block mb-1 fw-semibold">
                                {{ $t("programs.search.infantPrice") }}:
                            </span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(programDetails.price_per_infant) }}
                            </span>
                        </label>
                    </div>
                    <div class="box d-flex gap-3 flex-column mt-3">
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.total")
                            }}:</span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(bookingInfo.total) }}
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.tax") }}:</span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ isNaN(+bookingInfo.tax) ? 0 : bookingInfo.tax  }}%
                            </span>
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 fw-semibold">{{ $t("flightReservation.flightBook.net") }}:</span>
                            <span class="mb-1 bg-secondary bg-opacity-25 w-100 d-block rounded-1 p-2 px-3">
                                {{ USDollar.format(bookingInfo.net_total) }}
                            </span>
                        </label>
                        <!--رفع صورة-->
                        
                    <label class="w-100" v-if="$props.searchInfo.includeFlight != 1">
                        <span class="d-block mb-1 fw-semibold">{{ $t('programs.search.flight_ticket') }}:</span>
                        <input id="img" class="rounded-1 p-2 px-3 w-100" type="file" accept="image/*" @change="handleImageUpload">
                        <span v-if="validation.picture.$error" class="error text-danger fst-italic d-block">
                            {{ validation.picture.$errors[0].$validator === 'required' ? 'image tecket required' : '' }}
                        </span>
                    </label>
                        <button class="butn rounded-1 p-2 px-3 text-uppercase mt-3" @click.prevent="submission"
                            v-if="buttonVisible">
                            {{ $t("buttons.confirm") }}
                        </button>
                    </div>
                </div>
        </div>

                  </div>
                  

          
              <!--نهاية جزء ملىء البيانات-->

                
            </form>

            <div class="alert alert-success alert-dismissible text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-check fs-5"></i>
                    {{ $t('flightReservation.bookMessage') }}
                </div>
                <span class="d-block mt-1">{{ `${$t('flightReservation.bookingCode')}: ${randomCode}` }}</span>
                <button @click="removeAlert()" type="button" class="btn-close"></button>
            </div>
            <div id="alert-2" class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-xmark fs-5"></i>
                    There Is No Tickets Enough
                </div>
                <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, watch , onBeforeMount , onUpdated } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric, alphaNum, helpers } from "@vuelidate/validators";
import Loader from '../components/Loader.vue';
import i18n from '../i18n';
import router from "../router";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { addDays, format ,parse } from 'date-fns';

let image = ref(null);
const uploadImageTomodal = (img)=>{
image.value = img;
// console.log(image.value);
}


const x = ref(window.matchMedia("(max-width:412px)"))
const prices = ref(new Set())
const social = ref([])
const loading = ref(false)
const props = defineProps(["programId", "searchResults", "searchInfo", "cities", 'countries']);
const programDetails = ref({});
const allCities = ref([]);
let allCitiesIds = ref([]);
let carsHistory = ref('')
const randomCode = ref('')
const persons = ref({
    infants: props.searchInfo.no_infants,
    children: props.searchInfo.no_children,
    adults: props.searchInfo.no_adults,
});
const flightTrip = ref({});
const bookingInfo = ref({
    first_name: '',
    last_name: '',
    email: "",
    phone: "",
    type:"MR",
    nationality: "",
    passport_number: "",
    picture:'', 
    personsForm: [],
    adults_count: computed(() => persons.value.infants + persons.value.children + persons.value.adults),
    tax: computed(() => programDetails.value.tax),
    total: 0,
    net_total: computed(() => bookingInfo.value.total + (bookingInfo.value.tax / 100) * bookingInfo.value.total),
});


const rules = {
    first_name: { required },
    last_name: { required },
    // email: { required, email },
    phone: { required, numeric },
    nationality: { required },
    passport_number: { required, alphaNum },
    picture:{required},
    personsForm: {
        $each: helpers.forEach({
            firstName: { required },
            lastName: { required },
            type: { required },
        }),
    },
};
const validation = useVuelidate(rules, bookingInfo);
const selectedImage = ref(null)
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target.result;
            bookingInfo.value.picture = file;
        };
        reader.readAsDataURL(file);
    }
}
// Formating Balanc
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
});


watch(i18n.global.locale, newVal => {
    if (bookingInfo.value.adults_count > 1) {
        bookingInfo.value.personsForm.forEach((el, i) => {
            el.type = persons.value.adults > i + 1 ?
                'MR' :
                persons.value.adults + persons.value.children > i + 1 ?
                    'Children' :
                    'Infant'
        })
    }
})

const buttonVisible = ref(true)

const submission = async () => {
    localStorage.setItem('depTime' , flightTrip.value.departureTime);
    localStorage.setItem('arrive' , flightTrip.value.arrivalTime);
  //  localStorage.setItem('flightLine' , JSON.stringify(flightTrip.value.flightAirLine));
    localStorage.setItem('flightNum' , programDetails.value.flight_number)
   /* let getImage;
    let postImage;
    let getData =  await axios.get('https://seasonreal.seasonsge.com/program-booking');
    if(getData.status == 200){
        getImage = getData.data;
       // console.log(getImage);
    }
    console.log('iam fetch');
   await axios.post('https://seasonreal.seasonsge.com/appv1real/program-booking' , {
        image_name: selectedImage.value ,
    
   }).then((data)=>{
    let myData = data.data;
    console.log(myData);
   })*/
    
    validation.value.$validate();
    if (!validation.value.$error) {
        if (localStorage.getItem("clientLogin")) {
            const userId = JSON.parse(localStorage.getItem("clientLogin"))
            bookingInfo.value.email = userId.id

            loading.value = true
            const formData = new FormData()
            formData.append("destination", [...prices.value].join(','))
            formData.append("brogram_id", props.programId)
            formData.append("country", props.searchInfo.country.toString())
            formData.append("city", props.searchInfo.city.toString())
            formData.append("include_flight", props.searchInfo.includeFlight)
            formData.append("flightNumber", flightNumber.value)
            formData.append("firstName",`${bookingInfo.value.type} ${bookingInfo.value.first_name}` )
            formData.append("lastName", bookingInfo.value.last_name)
            formData.append("email", bookingInfo.value.email)
            formData.append("phoneNumber", bookingInfo.value.phone)
            formData.append("nationality", bookingInfo.value.nationality)
            formData.append("passportNumber", bookingInfo.value.passport_number)
            formData.append("numberOfChildren", persons.value.children)
            formData.append("numberOfInfants", persons.value.infants)
            formData.append("numberOfAdults", persons.value.adults)
            formData.append("total", bookingInfo.value.total)
            formData.append("tax", bookingInfo.value.tax)
            formData.append("net", bookingInfo.value.net_total)
            formData.append("image" , bookingInfo.value.picture)

            buttonVisible.value = false;

            if (bookingInfo.value.personsForm.length > 0) {
                for (let i = 0; i < bookingInfo.value.personsForm.length; i++) {
                    formData.append(`person${2 + i}`, `${bookingInfo.value.personsForm[i].firstName},${bookingInfo.value.personsForm[i].lastName}-${bookingInfo.value.personsForm[i].type}`)
                }
            }
            if (props.searchInfo.includeFlight == '1') {
                if (flightTrip.value.allowReturn != 1 && flightTrip.value.numTickets > bookingInfo.value.adults_count) {
                    const tickets = new FormData()
                    tickets.append("ticket_id", flightTrip.value.id)
                    tickets.append("new_number_of_tickets", flightTrip.value.numTickets - bookingInfo.value.adults_count)
                    axios.post("https://seasonreal.seasonsge.com/appv1real/ticket-out", tickets)
                        .then(data => {
                            console.log(data);
                        })
                    await axios.post("https://seasonreal.seasonsge.com/appv1real/program-booking", formData ,{
                        headers: {
                            "Content-Type": "multipart/form-data",
    }
                    })
                        .then(response => {
                            // console.log(response);
                            randomCode.value = response.data.booking_id
                            document.querySelector(".alert").classList.add("active")
                            loading.value = false
                            console.log('iam booking data');
                          console.log(response.data);
                          console.log('iam booking data');
                            const allRooms = new FormData()
                            props.searchInfo.rooms.forEach(el => {
                                allRooms.append("id_hotel", randomCode.value)
                                allRooms.append("room_type", el.roomType)
                                allRooms.append("child_room", `${el.childReservation},${el.childCount}`)
                                axios.post("https://seasonreal.seasonsge.com/appv1real/program-room", allRooms)
                                    .then(data => {
                                        console.log(data);
                                    })
                            })

                            axios.get(`https://seasonreal.seasonsge.com/appv1real/br-rr?id=${userId.id}`)
                                .then(data => {
                                    const bookId = data.data.pop()
                                    setTimeout(() => {
                                        router.push({
                                            name: "Programs Checkout",
                                            params: { lang: i18n.global.locale.value, id: bookId.id }
                                        })
                                    }, 1500)
                                })
                        })
                } else if (flightTrip.value.allowReturn == 1 && flightTrip.value.numTickets > bookingInfo.value.adults_count && flightTrip.value.numReturnTickets > bookingInfo.value.adults_count) {
                    const tickets = new FormData()
                    tickets.append("ticket_id", flightTrip.value.id)
                    tickets.append("new_number_of_tickets", flightTrip.value.numTickets - bookingInfo.value.adults_count)
                    await axios.post("https://seasonreal.seasonsge.com/appv1real/ticket-out", tickets)
                        .then(data => {
                            
                            console.log(data);
                        })
                    const returnTickets = new FormData()
                    returnTickets.append("ticket_id", flightTrip.value.id)
                    returnTickets.append("new_number_of_tickets", flightTrip.value.numReturnTickets - bookingInfo.value.adults_count)
                    await axios.post("https://seasonreal.seasonsge.com/appv1real/return_ticket", returnTickets)
                        .then(data => {
                            console.log(data);
                        })
                    await axios.post("https://seasonreal.seasonsge.com/appv1real/program-booking", formData,{
                        headers: {
                            "Content-Type": "multipart/form-data",
    }
                    }
                    )
                        .then(response => {
                            // console.log(response);
                            randomCode.value = response.data.booking_id
                            console.log(response.data);
                            document.querySelector(".alert").classList.add("active")
                            loading.value = false
                            const allRooms = new FormData()
                            props.searchInfo.rooms.forEach(el => {
                                allRooms.append("id_hotel", randomCode.value)
                                allRooms.append("room_type", el.roomType)
                                allRooms.append("child_room", `${el.childReservation},${el.childCount}`)
                                axios.post("https://seasonreal.seasonsge.com/appv1real/program-room", allRooms)
                                    .then(data => {
                                        console.log(data);
                                    })
                            })
                            axios.get(`https://seasonreal.seasonsge.com/appv1real/br-rr?id=${userId.id}`)
                                .then(data => {
                                    const bookId = data.data.pop()
                                    setTimeout(() => {
                                        router.push({
                                            name: "Programs Checkout",
                                            params: { lang: i18n.global.locale.value, id: bookId.id }
                                        })
                                    }, 1500)
                                })
                        })
                } else {
                    console.log("There Is No Tickets Enough");
                    document.querySelector("#alert-2").classList.add("active")
                    loading.value = false
                }
            } else {
                await axios.post("https://seasonreal.seasonsge.com/appv1real/program-booking", formData ,{
                    headers: {
                        "Content-Type": "multipart/form-data",
    }
                })
                    .then(response => {
                        console.log(response.data);
                        randomCode.value = response.data.booking_id
                        document.querySelector(".alert").classList.add("active")
                        loading.value = false

                        const allRooms = new FormData()
                        props.searchInfo.rooms.forEach(el => {
                            allRooms.append("id_hotel", randomCode.value)
                            allRooms.append("room_type", el.roomType)
                            allRooms.append("child_room", `${el.childReservation},${el.childCount}`)
                            axios.post("https://seasonreal.seasonsge.com/appv1real/program-room", allRooms)
                                .then(data => {
                                    console.log(data);
                                })
                        })

                        axios.get(`https://seasonreal.seasonsge.com/appv1real/br-rr?id=${userId.id}`)
                            .then(data => {
                                const bookId = data.data.pop()
                                setTimeout(() => {
                                    router.push({
                                        name: "Programs Checkout",
                                        params: { lang: i18n.global.locale.value, id: bookId.id }
                                    })
                                }, 1500)
                            })
                    })
            }
        } else {
            router.push({
                name: "Clients Login",
                params: { lang: i18n.global.locale.value }
            })
        }
    }
};

const removeAlert = () => {
    document.querySelector(`.alert`).classList.remove("active")
}
let programmsImages = ref([]);
let allprogramData = ref([]);
const mealType = ref('');
const returnFlightNum = ref('')
const hotel_name_arabic = ref('')
const hotel_name_english = ref('')
const city = ref('')
const checkIn = ref('')
const checkOut = ref('')
const allowedWeight = ref('') 
const airLine = ref(''); 

onBeforeMount(async() => {
    city.value = localStorage.getItem('programmCity');
    let arr =  localStorage.getItem('allprogramms'); 
    let id = localStorage.getItem('programmId');
    programmsImages.value = JSON.parse(arr);
    let filterImages = programmsImages.value.filter((img)=>{
        return img.id == id
    })
      programmsImages.value = [];
      if(filterImages[0].image_1 != '' && filterImages[0].image_1 != null){
        programmsImages.value.push(filterImages[0].image_1);

    }
    if(filterImages[0].image_2 != '' && filterImages[0].image_2 != null){
        programmsImages.value.push(filterImages[0].image_2);

    }
    if(filterImages[0].image_3 != '' && filterImages[0].image_3 != null){
        programmsImages.value.push(filterImages[0].image_3);

    }
    if(filterImages[0].image_4 != '' && filterImages[0].image_4 != null){
        programmsImages.value.push(filterImages[0].image_4);

    }
    if(filterImages[0].image_5 != '' && filterImages[0].image_5 != null){
        programmsImages.value.push(filterImages[0].image_5);

    }   

flightNumber.value = filterImages[0].flight_number;
console.log(flightNumber.value);
console.log('iam flight num'); 
mealType.value = filterImages[0].meal_type;
hotel_name_arabic.value = filterImages[0].program_title_arabic;
hotel_name_english.value = filterImages[0].program_title_english;
checkIn.value = filterImages[0].from_date 
checkOut.value = filterImages[0].to_date 
localStorage.setItem('data1' , JSON.stringify(filterImages[0]));

let flightLine;

if(props.searchInfo.includeFlight == 1){

await axios.get(`https://seasonreal.seasonsge.com/appv1real/airline_id?id=${filterImages[0].flight_number}`)
.then((flightData)=>{
    console.log('iam flightData');
    console.log(flightData.data[0]); 
    console.log('iam flightData hoss'); 
    allowedWeight.value = flightData.data[0].allowedWeight;
    flightLine = flightData.data[0].flightLine;
    if(flightData.data.length > 1){
        returnFlightNum.value = flightData.data[1].returnFlightNumber
        localStorage.setItem('data2' , JSON.stringify(flightData.data[0])) 
        localStorage.setItem('data3' , JSON.stringify(flightData.data[1]))
    console.log('test data');
    console.log(flightData.data[0]);
    console.log(flightData.data[1]);
    }else{
        returnFlightNum.value = flightData.data[0].returnFlightNumber
        localStorage.setItem('data2' , JSON.stringify(flightData.data[0]))
    console.log('test data');
        console.log(flightData.data[0]);

    }
   
});
// get airl line 
 await axios.get('https://seasonreal.seasonsge.com/appv1real/airlines-view')
 .then((lineOfFlight)=>{
       let line = [];
       line.push(...lineOfFlight.data.airlines);
       let filterLine = line.filter((line)=>{ return line.id == flightLine });
        airLine.value = filterLine[0].name_en
        localStorage.setItem('airLine' , airLine.value)
        localStorage.setItem('airLineData' ,JSON.stringify(filterLine[0]));
    console.log('iam line');
    console.log(filterLine);
    console.log('iam line');

 })



    /*
     programmsImages.value.push(filterImages[0].image_2);
     programmsImages.value.push(filterImages[0].image_3);
     programmsImages.value.push(filterImages[0].image_4);
     programmsImages.value.push(filterImages[0].image_5);
      */ 
   console.log('iamges');
   console.log(filterImages[0] );  
   console.log('iamges'); 
   console.log('iamges');
   console.log(filterImages[0]);   
   console.log('iamges'); 

}
});
const flightNumber = ref('');

const newcheckIn = ref()
const newcheckOut = ref()
onMounted(async () => {
    newcheckIn.value = sessionStorage.getItem('programm-CheckIn') 
    newcheckOut.value = sessionStorage.getItem('programm-CheckOut')
    bookingInfo.value.picture = props.searchInfo.includeFlight == 1 ? new FileReader() : '';
    props.searchResults.filter((el) => {
        if (el.id == props.programId) {
            programDetails.value = el;
        }
    });
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view").then((data) => {
        programDetails.value.destination = data.data.filter(
            (ele) => ele.id == programDetails.value.return_airline
        )[0];
    });

    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view")
        .then(data => {
            carsHistory = data.data.filter(el => el.id == props.searchResults[0].car_type)
            console.log(carsHistory,'carsHistory');
            
        })
    if (programDetails.value.includes_flight == "1") {
        axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all").then((data) => {
            console.log(flightTrip ,"flightTrip flightTrip flightTrip");
            console.log(programDetails.value ,"programDetails.value");
            flightTrip.value = data.data.filter((ele) => {
                if (
                    ele.flightNumber == programDetails.value.flight_number &&
                    ele.departureDate >= new Date().toLocaleDateString("en-CA")
                ) {
                    console.log(ele,"ismaaaaaaaaaaaaa");
                    return ele;
                }
            })[0];
            // console.log(data)
            axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view").then((data) => {
                if (data.data.success) {
                    flightTrip.value["flightAirLine"] = data.data.airlines.filter(
                        (airLine) => airLine.id == flightTrip.value.flightLine
                    )[0];
                }
            });
            console.log('iam-air-lines');
            allprogramData.value.push( ...data.data)
            returnFlightNum.value = allprogramData.value[1].returnFlightNumber
        //    console.log(data.data) ///////////////
        
            console.log(allprogramData.value[1].returnFlightNumber); 
            console.log(allprogramData.value); 
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
            // console.log(data)
        });
    }
    if (bookingInfo.value.adults_count > 1) {
        for (let i = 0; i < bookingInfo.value.adults_count - 1; i++) {
            bookingInfo.value.personsForm.push({
                firstName: "",
                lastName: "",
                type: persons.value.adults > i + 1 ?
                    'MR' :
                    persons.value.adults + persons.value.children > i + 1 ?
                        'Children' :
                        'Infant'
            });
        }
    }
    await axios
        .get(`https://seasonreal.seasonsge.com/appv1real/pr-data?id=${props.programId}`)
        .then((data) => {
            // console.log(data);
            if (typeof data.data === "object") {
                // allCities.value = data.data
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

                // if (props.searchInfo.includeFlight == '0') {
                //     allCities.value.map(el => {
                //         const diff = new Date(el.departure_date).getDate() - new Date(el.registration_date).getDate()
                //         console.log(diff);
                //         el.registration_date = props.searchInfo.departureDate.toLocaleDateString("en-CA")
                //         el.departure_date = new Date(props.searchInfo.departureDate).setDate(props.searchInfo.departureDate.getDate() + diff)
                //         el.departure_date = new Date(el.departure_date).toLocaleDateString("en-CA")
                //         console.log(new Date(el.departure_date).toLocaleDateString("en-CA"));
                //     })
                // }
            }
        });
    props.searchInfo.rooms.forEach((el) => {
        if (el.roomType == "1") {
            prices.value.add("1")
            bookingInfo.value.total += (+programDetails.value.price_per_adult_individual);
        } else if (el.roomType == "2") {
            prices.value.add("2")
            bookingInfo.value.total += (+programDetails.value.price_per_adult_double * 2);
        } else if (el.roomType == "3") {
            prices.value.add("3")
            bookingInfo.value.total += (+programDetails.value.price_per_adult_triple * 3);
        }
        if (el.childReservation === "child without bed") {
            prices.value.add("4")
            bookingInfo.value.total += (+programDetails.value.price_per_child_no_bed * el.childCount);
        } else if (el.childReservation === "child with bed") {
            prices.value.add("5")
            bookingInfo.value.total += (+programDetails.value.price_per_child_with_bed * el.childCount);
        }
    });
    if (props.searchInfo.no_infants > 0) {
        prices.value.add("6")
    }
    bookingInfo.value.total += +programDetails.value.price_per_infant * props.searchInfo.no_infants;
    await axios.get("https://seasonreal.seasonsge.com/appv1real/info")
        .then(data => {
            social.value = data.data[0]
            // console.log(data)
        })
});
onUpdated(() => {
    
});
</script>

<style lang="scss" scoped>
.program-book {
    .inner-box {

        input,
        select {
            outline: none;
            border: 1px solid darkgray;

            &.error {
                border: 1px solid #dc3545;
            }
        }

        .program-info {
            h2 {
                color: var(--blue-color);
            }

            span {
                background-color: var(--orange-color);
                width: fit-content;
            }
        }

        .flight-trip {
            .head {
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    width: 15%;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 3px;
                    bottom: -10px;
                    border-radius: 50px;
                    background-color: var(--blue-color);
                }
            }
        }

        .programme-details {
            h2 {
                color: var(--orange-color);
            }

            ul {
                li {
                    display: flex;
                    gap: 10px;
                    font-weight: 500;

                    i {
                        color: var(--blue-color);
                        position: relative;
                        top: 5px;
                    }
                }
            }
        }

        .booking-box {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.09);
            border: 1px solid var(--orange-color);

            h3 {
                &::before {
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8%;
                }
            }
        }

        .responsive-table {
            table {
                width: 100%;

                td {
                    padding: 15px;
                    border: 1px solid darkgray;
                }

                thead {
                    td {
                        background-color: darkgray;
                        color: white;
                        font-weight: 500;
                    }
                }

                tbody {
                    tr {
                        transition: 0.3s;

                        &:hover {
                            background-color: #f3f3f3;
                        }
                    }

                    .create {
                        transition: 0.2s;

                        &:hover {
                            opacity: 0.7;

                            i {
                                transform: rotate(90deg);
                            }
                        }

                        i {
                            width: 25px;
                            height: 25px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: 0.2s;
                        }
                    }
                }
            }
        }
    }

    .alert {
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s;
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
            font-size: 12px;
        }
    }
}
@media (max-width:1389px) {
    .slider{
margin-top: 2px !important;
    }
    
}
@media (max-width:1266px) {
    .slider{
margin-top: -5px !important;
    }
    
}
@media (max-width:1266px) {
    .slider{
margin-top: -5px !important;
    }
    
}
@media (max-width:1223px) {
    .carousel{
        margin-top: 0px !important;
    }
    
}
@media (max-width:576px) {

    .modalImage{
         width: 100vw !important;
         padding-left: 18px;
    }
    
}
</style>
