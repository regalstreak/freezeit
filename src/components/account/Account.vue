<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <div id="firebaseui-auth-container"></div>
      </v-flex>

      <v-flex>
        <div>
          <v-btn @click="logOut">Log out</v-btn>
          <hr>
          <v-img :src="photo" style="height: 120p"></v-img>
          <br>
          <p>{{name}}</p>
          <p>{{email}}</p>
          <p>{{userId}}</p>
          <hr>
          <pre>{{user}}</pre>
        </div>
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
      user: {}
    };
  },

  methods: {
    logOut() {
      firebase.auth().signOut();
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

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebaseInstance.auth());
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  },

  created() {
    this.user = firebaseInstance.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.userId = this.user.uid;
    }
  }
};
</script>
