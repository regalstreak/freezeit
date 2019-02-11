import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import { firebaseAction } from 'vuexfire'
import firebaseInstance from "./firebase/config/firebaseExports.js";
import "firebase/firestore";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    cartProducts: state.cartProducts,
  }),
  filter: (mutation) => mutation.type == 'addCartProducts' || mutation.type == 'removeCartProducts'
})

const store = new Vuex.Store({
  state: {
    storeAllProducts: null,
    cartProducts: {},
    cartKey: 0
  },
  mutations: {
    ...firebaseMutations,
    addCartProducts(state, payload) {
      if (payload.productPayload.productID in state.cartProducts) {
        if (payload.quantity < 0 && state.cartProducts[payload.productPayload.productID].productQuantity <= 1) {
          delete state.cartProducts[payload.productPayload.productID];
        } else {
          state.cartProducts[payload.productPayload.productID].productQuantity
            =
            state.cartProducts[payload.productPayload.productID].productQuantity + payload.quantity;
        }
      } else {
        state.cartProducts[payload.productPayload.productID] = payload.productPayload;
        state.cartProducts[payload.productPayload.productID].productQuantity = 1;
      }
    },
    changeCartKey(state) {
      state.cartKey++;
    }
  },
  actions: {
    setProductCats: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('productCategories', ref)
    }),
    setProducts: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('storeAllProducts', ref)
    }),
  },
  plugins: [vuexLocal.plugin]
});

store.dispatch(
  "setProducts",
  firebaseInstance.firestore().collection("allProducts")
);

export default store;