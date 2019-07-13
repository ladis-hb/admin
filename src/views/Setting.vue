<template>
  <el-container class="container .min-container">
    <el-header class="head">
      <h4 class="title">设置</h4>
    </el-header>
    <el-main>
      <el-form class="main-i" @submit.native.prevent label-position="right" label-width="120px">
        <h3>设置</h3>
        <el-form-item label="数据更新间隔">
          <el-input v-model="data_update_time"></el-input>
        </el-form-item>

        <el-form-item label="获取Store数据池数据">
          <el-input type="textarea" :rows="10" v-model="Store"></el-input>
        </el-form-item>
      </el-form>

      <div class="main-instructions">
        <p>instructions:</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { UserRegister } from "../api/api";
export default {
  data() {
    return {};
  },
  computed: {
    data_update_time: {
      get() {
        return this.$store.state.interval_time / 1000;
      },
      set(val) {
        this.$store.commit("SETinterval", val);
      }
    },
    Store:{
        get(){
            return JSON.stringify(this.$store.state)
        },
        set(){
            
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 400px) {
  .min-container {
    width: 100%;
    margin: 0% 0%;
  }
}
.container {
  width: 80%;
  position: fixed;
  margin: 0% 10%;
  .head {
    font-size: 2rem;
    .title {
      font-family: unset;
      font-style: italic;
      font-size: x-large;
      border-bottom: groove;
      color: #1989fa;
    }
  }
  .main-i {
    padding: 2rem 0rem;
    width: 40%;
  }
  .main-submit {
    margin: 1rem 120px;
    width: 100px;
  }
}
</style>
