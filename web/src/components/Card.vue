<template>
    <div class="card bg-white mt-3 p-3">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-grow-1 px-2">{{title}}</div>
        <i class="iconfont icon-dot"></i>
      </div>
      <div class="card-body pt-3">
          <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        props: {
            icon: { type: String, required: true },
            title: { type: String, required: true }
        }
    };
</script>


<style lang="scss">
@import "../assets/scss/variables";
.card {
    border-bottom: 1px solid $border-color;
    .card-header {
        border-bottom: 1px solid $border-color;
    }
}

</style>