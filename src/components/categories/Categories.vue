<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <router-link to="/search">
          <v-text-field readonly label="Search" solo append-icon="search"></v-text-field>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
