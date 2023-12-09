import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import i18n from "../i18n";

const websiteInfo = JSON.parse( localStorage.getItem('websiteInfo'))
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: "/:lang",
      name: "Home",
      component: async () => {
        const { default: component } = websiteInfo.status
          ? await import("../Views/TechnicalUpdates.vue")
          : await import("../Views/HomeView.vue");
        return component;
      },
    },
    {
      path: "/:lang/contact",
      name: "Contact",
      component: () => import("../Views/ContactView.vue"),
    },
    {
      path: "/:lang/hotel-search",
      name: "Hotel Search",
      component: () => import("../Views/HotelSearchView.vue"),
    },
    {
      path: "/:lang/car-search",
      name: "Car Search",
      component: () => import("../Views/CarsSearchView.vue"),
    },
    {
      path: "/:lang/flight-book",
      name: "Flight Book ",
      component: () => import("../Views/FlightBookView.vue"),
    },
    {
      path: "/:lang/programmes",
      name: "Programmes",
      component: () => import("../Views/PrgrammesView.vue"),
    },
    {
      path: "/:lang/programmes/program-details/:programId",
      name: "Program Details",
      component: () => import("../Views/InnerProgramView.vue"),
    },
    {
      path: "/:lang/program-search",
      name: "Program Search",
      component: () => import("../Views/ProgramSearchView.vue"),
    },
    {
      path: "/:lang/privacy-policy",
      name: "Pivacy Policy",
      component: () => import("../Views/PrivacyView.vue"),
    },
    {
      path: "/:lang/terms-and-conditions",
      name: "Terms And Conditions",
      component: () => import("../Views/TermsView.vue"),
    },
    {
      path: "/:lang/client-login",
      name: "Clients Login",
      component: () => import("../Views/ClientLogin.vue"),
    },
    {
      path: "/:lang/client-signup",
      name: "Clients Signup",
      component: () => import("../Views/ClientSignup.vue"),
    },
    {
      path: "/:lang/settings",
      name: "Client Account",
      component: () => import("../Views/ClientAccount.vue"),
    },
    {
      path: "/:lang/cars-checkout/:id",
      name: "Cars Checkout",
      component: () => import("../Views/Checkouts/CarsCheckout.vue"),
    },
    {
      path: "/:lang/hotels-checkout/:id",
      name: "Hotels Checkout",
      component: () => import("../Views/Checkouts/HotelsCheckout.vue"),
    },
    {
      path: "/:lang/flights-checkout/:id",
      name: "Flights Checkout",
      component: () => import("../Views/Checkouts/FlightsCheckout.vue"),
    },
    {
      path: "/:lang/programs-checkout/:id",
      name: "Programs Checkout",
      component: () => import("../Views/Checkouts/programsCheckout.vue"),
    },
    // Dashboard Control
    {
      path: "/:lang/agent-dashboard/:userId",
      name: "Agent Dashboard",
      component: () =>
        import("../Views/Agent Dashboard/AgentDashboardView.vue"),
    },
    {
      path: "/:lang/login",
      name: "Login",
      component: () => import("../Views/Agent Dashboard/LoginView.vue"),
    },
    {
      path: "/:lang/agent-cars-checkout/:id/:with",
      name: "Agents Cars Checkout",
      component: () =>
        import("../Views/Agent Dashboard/Checkouts/AgentCars.vue"),
    },
    {
      path: "/:lang/agent-Hotels-checkout/:id/:with",
      name: "Agents Hotels Checkout",
      component: () =>
        import("../Views/Agent Dashboard/Checkouts/AgentHotels.vue"),
    },
    {
      path: "/:lang/agent-flights-checkout/:id/:with",
      name: "Agents Flights Checkout",
      component: () =>
        import("../Views/Agent Dashboard/Checkouts/AgentFlights.vue"),
    },
    {
      path: "/:lang/agent-programs-checkout/:id/:with",
      name: "Agents Programs Checkout",
      component: () =>
        import("../Views/Agent Dashboard/Checkouts/AgentPrograms.vue"),
    },
    // Exception Pages
    {
      path: "/:catchAll(.*)",
      name: "Exception Pages",
      component: () => import("../Views/HomeView.vue"),
    },
  ],

  // routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "instant" };
  },
});

router.beforeEach((to, from, next) => {
  // the default value will be the value in the localStorage of the english language
  let lang = to.params.lang;

  // console.log(lang);
  // console.log(to.params);
  // this is for assigning the locale value to the default (english) or the value in the localStorage
  // without it the value will remain english as a default language in the i18n file remeber that :)
  if (!i18n.global.availableLocales.includes(lang)) {
    if (localStorage.getItem("lang")) {
      return next(localStorage.getItem("lang"));
    }

    const locale =
      window.navigator.language || window.navigator.userLanguage || "en";
    if (i18n.global.availableLocales.includes(locale)) {
      return next(locale);
    }

    return next("en");
  }

  i18n.global.locale.value = lang;
  document.body.dir = lang === "en" ? "ltr" : "rtl";
  localStorage.setItem("lang", lang);

  return next();
});

export default router;
