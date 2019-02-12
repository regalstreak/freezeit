<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 v-for="(product, index, key) in ourProducts" :key="key" class="py-2">
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
import firebaseInstance from "../../firebase/config/firebaseExports.js";
import "firebase/firestore";
import Add from "../products/views/Add";
import { loadingCategoryProducts } from "../../mixins.js";

export default {
  mixins: [loadingCategoryProducts],
  components: {
    Add
  },
  data() {
    return {
      ourProducts: this.products
    };
  },
  watch: {
    products: () => {
      this.ourProducts = this.products;
    }
  },
  props: {
    products: Array
  },
  methods: {
    addProduct() {
      console.log("Add");
    },
    navigateProduct(product) {
      this.$router.push("/products/" + product.productID);
    }
  },
  created() {
    if (!this.products) {
      const vm = this;

      let subcatproducts = [];

      firebaseInstance
        .firestore()
        .collection("allProducts/")
        .where("productSubCategory", "==", vm.$route.params.subcategory)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (subcatproducts.indexOf(doc.data()) === -1) {
              subcatproducts.push(doc.data());
            } else {
              console.log(doc.id + "Already exists in subcatproducts");
            }
          });
        })
        .then(() => {
          console.log(subcatproducts);
          this.ourProducts = subcatproducts;
        });
    }
  }
};
</script>

<style></style>
