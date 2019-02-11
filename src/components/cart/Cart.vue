<template>
  <v-container>
    <v-layout column :key="cartKey">
      <v-flex xs12 v-for="(product, index) in cartProducts" :key="index" class="py-2">
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
                      <span class="headline font-weight-bold">Rs {{ product.productPrice }}</span> &nbsp;
                      <br>
                      <div>Inclusive of all taxes</div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <v-spacer></v-spacer>
                    <add :product="product"></add>
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
import Add from "../products/views/Add.vue";
export default {
  components: { Add },
  methods: {
    removeProduct(product) {
      console.log("Remove");
      this.$store.commit("removeCartProducts", product);
      this.cartKey += 1;
    },
    navigateProduct(product) {
      this.$router.push("/products/" + product.productID);
    }
  },
  computed: {
    ...mapState({
      cartProducts(state) {
        return state.cartProducts;
      },
      cartKey(state) {
        return state.cartKey;
      }
    })
  }
};
</script>

<style></style>
