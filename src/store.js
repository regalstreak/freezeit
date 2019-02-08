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
    cartProducts: {}
  },
  mutations: {
    ...firebaseMutations,
    addCartProducts(state, payload) {
      if (payload.productPayload.productID in state.cartProducts) {
        state.cartProducts[payload.productPayload.productID].productQuantity
          =
          state.cartProducts[payload.productPayload.productID].productQuantity + payload.quantity;
      } else {
        state.cartProducts[payload.productPayload.productID] = payload.productPayload;
        state.cartProducts[payload.productPayload.productID].productQuantity = 1;
      }
    },
    removeCartProducts(state, cartProductToRemove) {
      delete state.cartProducts[cartProductToRemove.productID];
    }
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