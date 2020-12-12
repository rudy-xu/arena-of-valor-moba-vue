<template>
    <m-card :icon="icon" :title="title">
      <div class="nav jc-between">
          <div class="nav-item" :class="{active: active === index}" 
          v-for="(category, index) in categories" :key="index"
          @click="active = index">
              <div class="nav-link">{{category.name}}</div>
          </div>
      </div>
      <div class="pt-3">
          <swiper>
              <swiper-slide v-for="(category, i) in categories" :key="i">
                  <slot name="items" :categorySlotProps="category"></slot>
              </swiper-slide>
          </swiper>
      </div>
    </m-card>
</template> 

<script>
export default {
    props: {
        icon: { type: String, required: true},
        title: { type: String, required: true},
        categories: { type: String, required: true},
    },
    data() {
        return {
            active: 0
        }
    }
};
</script>