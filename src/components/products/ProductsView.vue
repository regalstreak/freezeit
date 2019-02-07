<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 v-for="(product, index, key) in storeAllProducts" :key="key" class="py-2">
        <v-card>
          <v-layout>
            <v-flex @click="navigateProduct(product)" xs4 class="ma-3">
              <v-img :src="product.productImageUrls[0]" height="130px" contain></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title primary-title>
                <v-layout>
                  <v-flex xs12 @click="navigateProduct(product)">
                    <div class="headline font-weight-bold">{{ product.productName }}</div>
                    <div>MRP:
                      <strike>Rs {{product.productOldPrice }}</strike>
                      <br>
                      <span class="headline font-weight-bold">Rs {{product.productPrice }}</span> &nbsp;
                      <br>
                      <div>Inclusive of all taxes</div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <v-spacer></v-spacer>
                    <v-btn
                      absolute
                      color="teal"
                      @click="addProduct()"
                      round
                      right
                      class="white--text ma-2"
                    >add</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    addProduct() {
      console.log("Add");
    },
    navigateProduct(product) {
      // this.$router.push({
      //   name: "product-details",
      //   params: {
      //     name: product.productName,
      //     productId: product.productName
      //   }
      // });
      this.$router.push("/products/" + product.productID)
    }
  },
  computed: {
    ...mapState({
      storeAllProducts(state) {
        return state.storeAllProducts;
      }
    })
  }
};
</script>

<style></style>
