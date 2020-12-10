<template>
  <div class="HeroEdit">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="model.profession" multiple>  <!-- Notes: For Server, profession was defined as array, so needing "multiple" here -->
              <el-option v-for="item in profession" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate style="margin-top: 0.7rem" :max="10" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.7rem" :max="10" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.7rem" :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.7rem" :max="10" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.itemGood" multiple>  <!-- Notes: For Server, profession was defined as array, so needing "multiple" here -->
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.itemBad" multiple>  <!-- Notes: For Server, profession was defined as array, so needing "multiple" here -->
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团队思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL +'/upload'"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="skills" label="技能">
          <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus" />添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL +'/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    //Indicate form data
    return {
      profession: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        skills: [],
        scores: {
          difficult: 0
        }
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async save() {
      console.log("save");
      //let res;
      if (this.id) 
      {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } 
      else 
      {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //solve the data covered
      //this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchProfession() {
        const res = await this.$http.get("rest/categories");
        this.profession = res.data;
    },
    async fetchItems() {
    const res = await this.$http.get("rest/items");
    this.items = res.data;
    }
  },
  created() {
    this.fetchProfession();
    this.fetchItems();
    this.id && this.fetch();
  },
};
</script>
