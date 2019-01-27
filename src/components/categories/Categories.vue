<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <router-link to="/search">
          <v-text-field
            readonly
            label="Search"
            solo
            append-icon="search"
          ></v-text-field>
        </router-link>
      </v-flex>

      <v-flex xs12 lg5 mb-3>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(item, i) in 5" :key="i">
            <div slot="header">Vegetables</div>
            <v-card>
              <v-card-text>Leafy</v-card-text>
            </v-card>
            <v-card>
              <v-card-text>Lorem ipsum</v-card-text>
            </v-card>
            <v-card>
              <v-card-text>Fruits</v-card-text>
            </v-card>
            <v-card>
              <v-card-text>ipsum</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
