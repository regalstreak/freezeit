<template>
  <v-layout column>
    <div>
      <swiper :options="swiperOptionTop" class="gallery-top pt-3" ref="swiperTop">
        <swiper-slide v-for="image in product.images" :key="image.index" class="slide-img">
          <v-img height="200" contain :src="image.link" alt/>
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>

      <swiper :options="swiperOptionThumbs" class="gallery-thumbs py-4" ref="swiperThumbs">
        <swiper-slide v-for="image in product.images" :key="image.index" class="slide-img">
          <v-img height="55" contain :src="image.link" alt/>
        </swiper-slide>
      </swiper>
    </div>

    <v-card class="mx-2">
      <v-card-title>
        <div>
          <span class="headline font-weight-bold">{{ product.name }}</span>

          <div>
            MRP:
            <strike>Rs 37</strike>&nbsp;
            <span class="headline font-weight-bold">Rs 29</span> &nbsp;
            <font color="red">22% OFF</font>
            <br>
            <div>Inclusive of all taxes</div>
          </div>
        </div>

        <v-spacer/>
        <v-btn>Add</v-btn>
      </v-card-title>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-content>
            <v-list-tile-title>Evan You</v-list-tile-title>
          </v-list-tile-content>

          <v-layout align-center justify-end>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
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
      ]
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
