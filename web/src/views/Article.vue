<template>
  <div class="page-articel" v-if="model">
    <div class="d-flex jc-between py-3 pl-2 border-bottom">
      <div @click="$router.push('/')">
        <i class="iconfont icon-back text-blue"></i>
        <strong class="flex-grow-1 text-blue">{{model.title}}</strong>
      </div>
      <div class="text-grey fs-xs mr-2">2020-12-13</div>
    </div>

    <div v-html="model.body" class="px-3 fs-lg article-body"></div>
    <div></div>
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
    async fetchArticles() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetchArticles()
  }
}
</script>


<style lang="scss">
.page-articel {
  .article-body {
    img {
      width: 100%;
      height: auto;
    }
    .txp_player_inframe {
      width: 100% !important;
      height: auto;
    }
  }
}
</style>
