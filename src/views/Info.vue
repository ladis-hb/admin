<template>
  <el-container class="container .min-container">
    <el-header class="head">
      <h4 class="title">信息</h4>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户信息" name="first">
          <h3>userinfo</h3>
          <el-table :data="userinfo">
            <el-table-column label></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="错误信息" name="second">
          <h3>错误信息</h3>
          <el-table :data="errorinfo" style="width: 100%">
            <el-table-column prop="id" label="id" width="60px" sortable></el-table-column>
            <el-table-column prop="type" label="type" width="100px" sortable></el-table-column>
            <el-table-column prop="level" label="level" width="100px" sortable></el-table-column>
            <el-table-column prop="info" label="info"></el-table-column>
            <el-table-column prop="date" label="date" width="100px" sortable></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日志信息" name="third">
          <h3>日志信息</h3>
          <el-table :data="loginfo" style="width: 100%">
            <el-table-column prop="id" label="id" width="60px" sortable></el-table-column>
            <el-table-column prop="type" label="type" width="100px" sortable></el-table-column>
            <el-table-column prop="info" label="info"></el-table-column>
            <el-table-column prop="date" label="date" width="100px" sortable></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--  <div class="tab-userinfo">
            
      </div>-->
      <!-- <div class="tab-errorinfo">
        
        </div>
      </div>-->
      <div class="tab-loginfo"></div>
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
    return {
      loading: false,
      activeName: "second"
    };
  },
  computed: {
    loginfo() {
      return this.$store.state.loginfo;
    },
    errorinfo() {
      return this.$store.state.warringinfo;
    },
    userinfo() {
      return this.$store.state.userinfo;
    }
  },
  methods: {
    handleClick() {}
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
  /* position: fixed; */
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
