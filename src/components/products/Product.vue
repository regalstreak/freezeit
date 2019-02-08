<template>
  <v-layout column>
    <div>
      <swiper :options="swiperOptionTop" class="gallery-top pt-3" ref="swiperTop">
        <swiper-slide
          v-for="(image, index) in storeAllProducts[findProductIndex].productImageUrls"
          :key="index"
          class="slide-img"
        >
          <v-img height="200" contain :src="image" alt/>
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>

      <swiper :options="swiperOptionThumbs" class="gallery-thumbs py-4" ref="swiperThumbs">
        <swiper-slide
          v-for="(image, index) in storeAllProducts[findProductIndex].productImageUrls"
          :key="index"
          class="slide-img"
        >
          <v-img height="55" contain :src="image" alt/>
        </swiper-slide>
      </swiper>
    </div>

    <v-container>
      <v-card>
        <v-card-title>
          <div>
            <span
              class="headline font-weight-bold"
            >{{ storeAllProducts[findProductIndex].productName }}</span>

            <div>
              MRP:
              <strike>{{storeAllProducts[findProductIndex].productOldPrice }}</strike>&nbsp;
              <span
                class="headline font-weight-bold"
              >Rs {{storeAllProducts[findProductIndex].productPrice }}</span> &nbsp;
              <font color="red">22% OFF</font>
              <br>
              <div>Inclusive of all taxes</div>
            </div>
          </div>

          <v-spacer/>
          <add :product="storeAllProducts[findProductIndex]"></add>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-layout align-center>
            <v-flex xs4>
              <h4>Check Delivery?</h4>
            </v-flex>

            <v-flex xs4 class="pl-2">
              <span>
                <v-text-field single-line label="Pincode" mask="######"></v-text-field>
              </span>
            </v-flex>

            <v-flex xs4></v-flex>
            <v-flex class="text-xs-center">
              <v-btn round>Check</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-flex xs12 class="py-2">
        <v-card>
          <v-card-text>
            <v-tabs fixed-tabs v-model="tabs">
              <v-tab>About</v-tab>
              <v-tab>Ingredients</v-tab>
              <v-tab>Nutritional Facts</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">
              <v-tab-item>{{ storeAllProducts[findProductIndex].productAbout }}</v-tab-item>
              <v-tab-item>{{ storeAllProducts[findProductIndex].productIngredients }}</v-tab-item>
              <v-tab-item>{{ storeAllProducts[findProductIndex].productNutrition }}</v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-card-title>
            <h2>Similar Products</h2>
          </v-card-title>
          <v-card-text>
            <swiper :options="swiperOptionSimilar">
              <swiper-slide v-for="i in 10" :key="i">
                <h4 class="text-xs-center">Similar Product {{ i }}</h4>
                <v-img
                  height="150"
                  contain
                  :src="storeAllProducts[findProductIndex].productImageUrls[0]"
                  alt
                />
              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev-similar" slot="button-prev"></div>
              <div class="swiper-button-next-similar" slot="button-next"></div>
            </swiper>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import "swiper/dist/css/swiper.css";
import Add from "./views/Add.vue";
import { storeStuffMixin } from "../../mixins.js";

export default {
  mixins: [storeStuffMixin],
  components: {
    Add
  },
  data() {
    return {
      tabs: null,
      swiperOptionTop: {
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      },

      swiperOptionSimilar: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next-similar",
          prevEl: ".swiper-button-prev-similar"
        }
      }
    };
  },
  mounted() {
    this.$nextTick()
      .then(() => {
        const swiperTop = this.$refs.swiperTop.swiper;
        const swiperThumbs = this.$refs.swiperThumbs.swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.gallery-thumbs .swiper-slide {
  width: 100px;
  height: 19x;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='#E78127'/></svg>") !important;
}

.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='#E78127'/></svg>") !important;
}
</style>
