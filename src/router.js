import Vue from "vue";
import Router from "vue-router";
import Home from "./components/home/Home.vue";
import Categories from "./components/categories/Categories.vue";
import Search from "./components/search/Search.vue";
import Cart from "./components/cart/Cart.vue";
import Account from "./components/account/Account.vue";
import Product from "./components/products/Product.vue";

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
      component: Account
    },

    {
      path: "/product",
      name: "Product",
      component: Product
    }
  ]
});
