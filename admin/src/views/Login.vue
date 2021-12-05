<template>
  <div class="login-container">
    <el-card header="请登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods:{
    async login() {
      console.log(this.model)
      const res = await this.$http.post("/login", this.model);

      //save token
      // sessionStorage.token = res.data.token;   //It will be destoried when browser is closed
      localStorage.token = res.data.token;   //constantly save when you open same url
      console.log(res.data);

      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  }
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 15rem auto;
}
</style>



<!--
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
-->