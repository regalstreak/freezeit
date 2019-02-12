<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <router-link to="/search">
          <v-text-field readonly label="Search" solo append-icon="search"></v-text-field>
        </router-link>
      </v-flex>

      <v-flex xs12 lg5 mb-3 :key="expKey">
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(category, key , index) in productCatsAndSubs"
            :key="index"
          >
            <div slot="header">{{ key }}</div>
            <v-card v-for="(subcategory, subcatkey ,subcatindex) in category" :key="subcatindex">
              <v-divider></v-divider>
              <v-card-text @click="goToSubCategory(key, subcategory)">{{ subcategory }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebaseInstance from "../../firebase/config/firebaseExports.js";
import "firebase/firestore";
import { loadingCategoryProducts } from "../../mixins.js";

export default {
  mixins: [loadingCategoryProducts],
  data() {
    return {
      firebaseProductCategories: [],
      firebaseProductSubCategories: [],
      productCatsAndSubs: {},
      expKey: 0
    };
  },
  methods: {
    forceRenderCat() {
      this.expKey += 1;
    },
    goToSubCategory(category, subcategory) {
      console.log(category + "   " + subcategory);

      let subcatproducts = [];
      this.loading = true;

      firebaseInstance
        .firestore()
        .collection(
          "categories/" +
            category +
            "/subCategories/" +
            subcategory +
            "/products"
        )
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
          this.loading = false;
        });
      this.$router.push({
        name: "CategoryProducts",
        params: { subcategory: subcategory, products: subcatproducts }
      });
    }
  },
  created() {
    const vm = this;
    vm.firebaseProductCategories = [];
    vm.firebaseProductSubCategories = [];

    // get categories
    firebaseInstance
      .firestore()
      .collection("categories")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          vm.productCatsAndSubs[doc.id] = doc.data().subCategories;
        });
      })
      // get sub categories
      .then(() => {
        vm.firebaseProductCategories.forEach(someCategory => {
          firebaseInstance
            .firestore()
            .collection("categories/" + someCategory + "/subCategories")
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                  vm.firebaseProductSubCategories.indexOf(doc.id) === -1
                    ? vm.firebaseProductSubCategories.push(doc.id)
                    : console.log(doc.id + " already exists");
                } else {
                  console.log("sub catag dont exist mate");
                }
              });
            });
        });
      })
      .then(() => {
        this.forceRenderCat();
      })
      .catch(error => {
        console.log("Error in getting cats/sub" + error);
      });
  }
};
</script>