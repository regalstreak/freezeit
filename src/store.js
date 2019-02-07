import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import { firebaseAction } from 'vuexfire'
import firebaseInstance from "./firebase/config/firebaseExports.js";
import "firebase/firestore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bottomNavComponent: "Home",
    storeAllProducts: null,
  },
  mutations: {
    ...firebaseMutations,
  },
  actions: {
    setProductCats: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('productCategories', ref)
    }),
    setProducts: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('storeAllProducts', ref)
    }),
  }
});

store.dispatch(
  "setProducts",
  firebaseInstance.firestore().collection("allProducts")
);

export default store;