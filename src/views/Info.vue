<template>
  <el-container class="container .min-container">
    <el-header class="head">
       <h4 class="title">信息</h4>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户信息" name="userInfo">
          <h3>userinfo</h3>
          <el-table :data="userInfo">
            <el-table-column prop="generateTime" label="generateTime" sortable></el-table-column>
            <el-table-column prop="status" label="status"  sortable></el-table-column>
            <el-table-column prop="msg" label="msg"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="错误信息" name="errorInfo">
          <h3>错误信息</h3>
          <el-table :data="errorInfo" style="width: 100%" :loading="loading">
            <el-table-column prop="generateTime" label="generateTime" sortable></el-table-column>
            <el-table-column prop="status" label="status"  sortable></el-table-column>
            <el-table-column prop="msg" label="msg"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日志信息" name="logInfo">
          <h3>日志信息</h3>
          <el-table
            :data="logInfo"
            style="width: 100%"
          >
            <el-table-column prop="generateTime" label="generateTime" sortable></el-table-column>
            <el-table-column prop="status" label="status"  sortable></el-table-column>
            <el-table-column prop="msg" label="msg"></el-table-column>
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
import { Get_user_info } from "../api/api";
export default {
  data() {
    return {
      loading: false,
      activeName: "runInfo",
      userInfo: [],
      errorInfo: [],
      logInfo: []
    };
  },
  computed: {
    Sysname() {
      return this.$store.state.user.name;
    },
    Token() {
      return this.$store.state.token;
    }
  },
  methods: {
    //解构tab实例
    handleClick({ name }) {
      this.loading = true;
      Get_user_info({
        user: this.Sysname,
        token: this.Token,
        type: name
      }).then(res => {
        this.loading = false;
        let {data} = res.data
        if(name == 'userInfo') this.userInfo = data
        if(name == 'errorInfo') this.errorInfo = data
        if(name == 'logInfo') this.logInfo = data
      });
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
