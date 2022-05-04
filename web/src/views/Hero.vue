<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/images/logo.jpg" alt="" height="30"/>
      <div class="py-1 px-3 flex-grow-1">
        <span class="mr-2">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="top-image" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-xs">{{model.title}}</div>
        <strong class="fs-xxl py-1">{{model.name}}</strong>
        <div class="fs-xs">{{model.profession.map(v => v.name).join("/")}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-lightdark">{{model.scores.survive}}</span>                              
          </div>
          <router-link tag="span" to="" class="text-grey-light">皮肤 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    id: { required: true}
  },
  data() {
    return {
      model: null
    }
  },
  methods: {
    async fetchHeroes() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created(){
    this.fetchHeroes();
  }
}
</script>


<style lang="scss">
@import "../assets/scss/variables";

.page-hero {
  .top-image {
    height: 50vw;
    background: map-get($colors, "white") no-repeat top center;
    background-size: auto 100%;
  }

  .info {
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
  }

  .scores {
    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 0.9rem;
      text-align: center;
      border-radius: 50%;
      font-size: 0.6rem;
      border: 1px solid rgba(255,255,255,0.2);
    }
  }
}
</style>