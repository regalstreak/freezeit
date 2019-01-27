<template>
  <v-layout column>
    <div>
      <swiper
        :options="swiperOptionTop"
        class="gallery-top pt-3"
        ref="swiperTop"
      >
        <swiper-slide
          v-for="image in product.images"
          :key="image.index"
          class="slide-img"
        >
          <v-img height="200" contain :src="image.link" alt />
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>

      <swiper
        :options="swiperOptionThumbs"
        class="gallery-thumbs py-4"
        ref="swiperThumbs"
      >
        <swiper-slide
          v-for="image in product.images"
          :key="image.index"
          class="slide-img"
        >
          <v-img height="55" contain :src="image.link" alt />
        </swiper-slide>
      </swiper>
    </div>

    <v-container>
      <v-card>
        <v-card-title>
          <div>
            <span class="headline font-weight-bold">{{ product.name }}</span>

            <div>
              MRP:
              <strike>Rs 37</strike>&nbsp;
              <span class="headline font-weight-bold">Rs 29</span> &nbsp;
              <font color="red">22% OFF</font>
              <br />
              <div>Inclusive of all taxes</div>
            </div>
          </div>

          <v-spacer />
          <v-btn round>Add</v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-layout align-center>
            <v-flex xs4>
              <h4>Check Delivery?</h4>
            </v-flex>

            <v-flex xs4 class="pl-2">
              <span>
                <v-text-field
                  single-line
                  label="Pincode"
                  mask="######"
                ></v-text-field>
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
              <v-tab-item>{{ product.information.about }}</v-tab-item>
              <v-tab-item>{{ product.information.ingredients }}</v-tab-item>
              <v-tab-item>{{ product.information.nutrifact }}</v-tab-item>
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
                <v-img height="150" contain :src="product.images[2].link" alt />
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
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },

  data: () => ({
    tabs: null,
    product: {
      name: "Spinach",
      images: [
        {
          index: 0,
          link:
            "https://d2ebzu6go672f3.cloudfront.net/media/content/images/p7_LeafyGreens_H1809_gi114333724.jpg"
        },
        {
          index: 1,
          link:
            "https://www.martindalesnutrition.com/wp-content/uploads/2018/07/spinach.jpg"
        },
        {
          index: 2,
          link:
            "https://img.etimg.com/thumb/msid-67161908,width-643,imgsize-733681,resizemode-4/green-leafy-vegetables.jpg"
        },
        {
          index: 3,
          link:
            "https://dingo.care2.com/pictures/greenliving/uploads/2012/11/kale2.jpg"
        }
      ],
      information: {
        about:
          "About product: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed quam et velit placerat rhoncus. Mauris non turpis posuere, suscipit elit sed, gravida velit. Fusce ornare dapibus risus, id condimentum velit feugiat ac. Integer commodo eros neque, vel pulvinar sapien ornare in. Maecenas odio ante, posuere sit amet condimentum vitae, maximus ac enim. Fusce in tincidunt metus. Cras vel blandit lorem. Curabitur rhoncus cursus auctor. Donec ullamcorper turpis et diam dapibus euismod. Pellentesque at purus enim. Cras maximus sollicitudin lorem, non varius justo euismod nec. Phasellus ex ipsum, efficitur eget lacinia hendrerit, ultrices vitae dolor. Donec at justo pulvinar dui tincidunt bibendum eget quis magna. ",
        ingredients:
          "Ingredients product: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam faucibus, quam ut dignissim scelerisque, leo nisi venenatis neque, sit amet imperdiet libero magna a massa. Nullam ac sodales magna. Maecenas blandit metus dolor, vitae accumsan ex laoreet et. Cras convallis quam risus, et semper nisl mattis vitae. Vivamus arcu nisl, ultricies tempor urna nec, scelerisque fermentum ipsum. Curabitur porttitor turpis ac eros consequat efficitur. Pellentesque et augue et tortor commodo feugiat. Ut arcu arcu, mattis vel massa eu, interdum congue diam. Donec a justo nulla. Donec eleifend nisi velit, at faucibus ligula ultricies vitae. Morbi hendrerit scelerisque velit sit amet facilisis. Morbi sit amet neque nisl. Curabitur sed massa metus. Suspendisse hendrerit diam sed porttitor tristique. ",
        nutrifact:
          "Nutri Fact product  Vivamus tincidunt sapien nisi, ut congue massa tincidunt quis. Morbi venenatis non tellus vel vehicula. Donec id dolor eu diam malesuada porta. Nulla tristique, lorem sed auctor condimentum, urna nulla blandit justo, eget sagittis turpis lacus at erat. Nullam hendrerit sagittis mi, sit amet condimentum odio tincidunt in. Aliquam erat volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam sed justo sit amet est viverra posuere in quis libero. Vestibulum arcu lectus, suscipit vel libero ac, porttitor elementum eros. Nullam malesuada diam augue, vel sodales mauris condimentum at. Nulla rhoncus mi mi, nec consequat nibh rutrum sed. "
      }
    },

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
  }),
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
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
