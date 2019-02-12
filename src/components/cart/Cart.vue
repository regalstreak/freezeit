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
      <v-btn
        round
        fixed
        bottom
        class="mb-5 checkout-btn"
        color="teal"
        ref="rzp-button1"
        @click.prevent="checkout()"
        dark
      >Checkout</v-btn>
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
    },
    checkout(event) {
      var options = {
        key: "rzp_test_d8HlXcydkKLoFA",
        amount: "2000", // 2000 paise = INR 20
        name: "Merchant Name",
        description: "Purchase Description",
        image: "/your_logo.png",
        handler: function(response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "test@test.com"
        },
        notes: {
          address: "Hello World"
        },
        theme: {
          color: "#F37254"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
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
  },
  mounted() {
    let razorpayScript = document.createElement("script");
    razorpayScript.setAttribute(
      "src",
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    document.head.appendChild(razorpayScript);
  }
};
</script>

<style scoped>
.checkout-btn {
  left: calc(50% - 20vh);
  width: 40vh;
  opacity: 0.8;
}
</style>
