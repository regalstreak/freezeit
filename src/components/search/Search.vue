<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-text-field
          label="Search"
          solo
          append-icon="search"
          autofocus
          clearable
        ></v-text-field>
      </v-flex>

      <products-view />
    </v-layout>
  </v-container>
</template>

<script>
import ProductsView from "../products/ProductsView";
export default {
  data() {
    return {};
  },
  components: {
    ProductsView
  }
};
</script>
