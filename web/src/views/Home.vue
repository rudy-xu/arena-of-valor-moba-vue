<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiperSlide1.jpeg" slt=""/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiperSlide2.jpeg" slt=""/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiperSlide3.jpeg" slt=""/>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper-->
    
    <div class="nav-icons text-center bg-white mt-3 pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in spriteItems" :key="item._id">
          <!-- <i :class="'sprite sprite-' + item.name"></i> -->
          <i class="sprite" :class="`sprite-${item.name}`"></i>
          <div class="py-2">{{item.text}}</div>
        </div>
      </div>
      <div class="bg-light fs-sm py-2 jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCategories">
      <template #items="{categorySlotProps}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`" 
        class="py-2 d-flex fs-lg" 
        v-for="(news, index) in categorySlotProps.newsList" :key="index">
          <span class="pr-1 mr-2 spLabel text-primary">{{news.categoryName}}</span>
          <span class="pr-2 flex-grow-1 text-dark text-ellipsis">{{news.title}}</span>
          <span class="text-grey-dark fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCategories">
      <template #items="{categorySlotProps}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center" style="width: 20%;" v-for="(hero, index) in categorySlotProps.heroList" :key="index">
            <img :src="hero.avatar" alt="" class="w-100"/>
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>



<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      spriteItems: [{
        name: "news",
        text: "爆料站"
      },{
        name: "story",
        text: "故事站"
      },{
        name: "store",
        text: "周边商场"
      },{
        name: "experience",
        text: "体验服"
      },{
        name: "newer",
        text: "新人专区"
      },{
        name: "glory",
        text: "荣耀·传承"
      },{
        name: "king",
        text: "王者营地"
      },{
        name: "commonNum",
        text: "公告号"
      },{
        name: "version",
        text: "版本介绍"
      },{
        name: "battle",
        text: "对局环境"
      }],
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      newsCategories: [],
      heroCategories: []
    }
  },
  methods:{
    async fetchNewsCategories() {
      const res = await this.$http.get("news/list");
      this.newsCategories = res.data;
    },
    async fetchHeroCategories() {
      const res = await this.$http.get("heroes/list");
      this.heroCategories = res.data;
    }
  },
  created() {
    this.fetchNewsCategories();
    this.fetchHeroCategories();
  }

};
</script>



<style lang="scss">
@import "../assets/scss/variables";
 
.pagination-home {
  .swiper-pagination-bullet {
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'slideIcon');
    }
  }
}

.nav-icons {
  // border-top: 1px solid $border-color;
  // border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.spLabel {
  border: 1px solid map-get($colors, "primary");
  border-radius: .230769rem
}
</style>