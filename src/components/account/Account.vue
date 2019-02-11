<template>
  <v-container fill-height>
    <v-layout align-end justify-center class="pb-5" v-if="showSignup">
      <v-flex>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
    </v-layout>

    <v-layout v-else column>
      <v-flex class="text-xs-center">
        <v-avatar size="250">
          <img :src="photo" alt="User Avatar">
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-card class="mt-3">
          <v-card-title primary-title>
            <v-text-field full-width disabled v-model="name" name="Name" label="Name"></v-text-field>
            <v-text-field full-width disabled v-model="email" name="Email" label="Email"></v-text-field>
            <v-text-field
              full-width
              disabled
              v-model="phone"
              name="Phone Number"
              label="Phone Number"
            ></v-text-field>
            <v-text-field full-width disabled v-model="address" name="Address" label="Address"></v-text-field>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card @click="goToOrders()">
          <v-card-title primary-title>
            <span class="headline grey--text text--darken-2">Orders</span>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex>
        <v-btn @click="logOut" color="error" block>Log out</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
require("../../../node_modules/firebaseui/dist/firebaseui.css");

import firebaseInstance from "../../firebase/config/firebaseExports.js";
import firebaseui from "firebaseui";
import "firebase/auth";
import firebase from "firebase/app";

export default {
  data() {
    return {
      photo: "",
      userId: "",
      name: "",
      email: "",
      user: {},
      phone: "",
      address: "",
      showSignup: false
    };
  },

  methods: {
    logOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
    goToOrders() {
      this.$router.push("orders");
    }
  },

  mounted() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "/"
    };

    if (this.showSignup != false) {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebaseInstance.auth());
      }
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  },

  created() {
    this.user = firebaseInstance.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.userId = this.user.uid;
      this.showSignup = false;
    } else {
      this.showSignup = true;
    }
  }
};
</script>

<style scoped>
</style>

