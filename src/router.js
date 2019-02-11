import Vue from "vue";
import Router from "vue-router";
import Home from "./components/home/Home.vue";
import Categories from "./components/categories/Categories.vue";
import Search from "./components/search/Search.vue";
import Cart from "./components/cart/Cart.vue";

import Account from "./components/account/Account.vue";
import Orders from "./components/account/Orders.vue";

import Product from "./components/products/Product.vue";
import ProductInterstitial from "./components/products/ProductInterstitial.vue";
import ProductsView from "./components/products/ProductsView.vue";

import firebaseInstance from "./firebase/config/firebaseExports";
import "firebase/auth";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    },
    {
      path: "/account",
      name: "Account",
      component: ProductInterstitial,
      beforeEnter: (to, from, next) => {
        firebaseInstance.auth().onAuthStateChanged(() => {
          console.log("On auth state change called");
          next();
        })
      },
      children: [
        {
          path: "",
          component: Account,
        },
        {
          path: "orders",
          component: Orders
        }
      ]
    },
    {
      path: "/products",
      component: ProductInterstitial,
      children: [
        {
          path: "",
          component: ProductInterstitial,
          children: [
            {
              path: "",
              component: Search,
            },
            {
              path: ":productID",
              component: Product,
              name: "product-details"
            }
          ]
        }

      ]
    },
    {
      path: "/products-view",
      name: "ProductsView",
      component: ProductsView
    },
  ]
});
