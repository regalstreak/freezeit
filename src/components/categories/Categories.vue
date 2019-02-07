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
            <div slot="header">{{ key }} {{index}}</div>
            <v-card v-for="(subcategory, subcatkey ,subcatindex) in category" :key="subcatindex">
              <v-divider></v-divider>
              <v-card-text>{{ subcategory }}</v-card-text>
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
export default {
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
          console.log(doc.id);
          console.log(doc.data());

          vm.productCatsAndSubs[doc.id] = doc.data().subCategories;

          // vm.firebaseProductCategories.indexOf(doc.id) === -1
          //   ? vm.firebaseProductCategories.push(doc.id)
          //   : console.log(doc.id + " already exists");
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

{
  "catag": {
    subCats: 
  }
  "catag": [""]
  "catag": [""]

}