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
        <div class="py-2 d-flex" v-for="(news, index) in categorySlotProps.newsList" :key="index">
          <span class="px-1 spLabel">{{news.categoryName}}</span>
          <span class="flex-grow-1">{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
    
  </div>
</template>



<script>
  export default {
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
        newsCategories: [
          {
            name: "热门",
            newsList: new Array(5).fill(1).map(() => ({
              categoryName: "热门",
              title: "《目标》·新英雄澜CG",
              date: "12/08"
            }))
          },
          {
            name: "新闻",
            newsList: new Array(5).fill(1).map(() => ({
              categoryName: "新闻",
              title: "《目标》·新英雄澜CG",
              date: "12/08"
            }))
          },
          {
            name: "公告",
            newsList: new Array(5).fill(1).map(() => ({
              categoryName: "公告",
              title: "12月12日体验服停机更新公告",
              date: "12/12"
            }))
          },
          {
            name: "活动",
            newsList: new Array(5).fill(1).map(() => ({
              categoryName: "活动",
              title: "新英雄澜登场，冬日聚峡谷对战赢好礼",
              date: "12/07"
            }))
          },
          {
            name: "赛事",
            newsList: new Array(5).fill(1).map(() => ({
              categoryName: "赛事",
              title: "《目标》·新英雄澜CG",
              date: "12/08"
            }))
          }
        ]
      }
    }
  }
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