<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <v-bottom-nav absolute app value="true" color="transparent">
      <v-btn to="/" color="teal" flat value="Home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn to="/categories" color="teal" flat value="Categories">
        <span>Categories</span>
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-btn to="/search" color="teal" flat value="Search">
        <span>Search</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn to="/cart" color="teal" flat value="Cart">
        <span>Cart</span>
        <v-icon>shopping_cart</v-icon>
      </v-btn>

      <v-btn to="/account" color="teal" flat value="Account">
        <span>Account</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

<style scoped>
</style>
