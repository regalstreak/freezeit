<template>
  <div>
    <v-layout v-if="isProductInCart" align-center>
      <v-flex>
        <v-btn small @click="addProduct(-1)" color="teal" class="white--text pa-2 buttonSize" fab>
          <v-icon>remove</v-icon>
        </v-btn>
      </v-flex>
      <v-flex
        :key="quantityKey"
        class="headline"
      >{{ cartProducts[product.productID].productQuantity }}</v-flex>
      <v-flex>
        <v-btn fab small @click="addProduct(1)" color="teal" class="white--text pa-2 buttonSize">
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-btn v-else round @click="addProduct(1)">Add</v-btn>
  </div>
</template>

<script>
import { storeStuffMixin, add } from "../../../mixins.js";
import { mapState } from "vuex";
export default {
  mixins: [storeStuffMixin, add],
  props: {
    product: Object
  },
  computed: {
    ...mapState(["cartProducts"])
  },
  data() {
    return {};
  },
  mounted() {
    this.checkProductInCart();
  },
  methods: {
    checkProductInCart() {
      if (this.product.productID in this.cartProducts) {
        if (this.cartProducts[this.product.productID].productQuantity > 0) {
          this.isProductInCart = true;
          console.log("true");
        } else {
          this.isProductInCart = false;
          console.log("false");
        }
      } else {
        this.isProductInCart = false;
        console.log("fal");
      }
    },
    addProduct(nquantity) {
      let quantity = nquantity;
      let productPayload = this.storeAllProducts[this.findProductIndexAdd];

      let payload = {
        productPayload,
        quantity
      };

      console.log(payload);

      this.$store.commit("addCartProducts", payload);
      this.checkProductInCart();
      this.quantityKey++;
    }
  }
};
</script>

<style scoped>
.buttonSize {
  height: 32px;
  width: 32px;
}
</style>

