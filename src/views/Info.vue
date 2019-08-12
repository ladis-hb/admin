<template>
  <el-container class="container .min-container">
    
    <el-main>
      <el-page-header class="page-head" @back="goBack" content="日志 Messege Info" text-color="#fff"></el-page-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="错误信息" name="errorInfo">
          <h3>错误信息</h3>
          <el-table :data="errorInfo" style="width: 100%" :loading="loading">
            <el-table-column prop="generateTime" label="生成时间" sortable></el-table-column>
            <el-table-column prop="status" label="状态" sortable></el-table-column>
            <el-table-column prop="user" label="用户" sortable></el-table-column>
            <el-table-column prop="msg" label="消息"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日志信息" name="runInfo">
          <h3>日志信息</h3>
          <el-table :data="runInfo" style="width: 100%">
            <el-table-column prop="generateTime" label="生成时间" sortable></el-table-column>
            <el-table-column prop="status" label="状态" sortable></el-table-column>
            <el-table-column prop="user" label="用户" sortable></el-table-column>
            <el-table-column prop="msg" label="消息"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="用户信息" name="userInfo" v-if="Sysname == 'admin'">
          <h3>用户变更信息</h3>
          <el-table :data="infoStream">
            <el-table-column prop="generateTime" label="生成时间" sortable></el-table-column>
            <el-table-column prop="infoType" label="消息类型" sortable></el-table-column>
            <el-table-column prop="line" label="消息状态" sortable></el-table-column>
            <el-table-column prop="msg" label="消息"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="设备" name="devInfo" v-if="Sysname == 'admin'">
          <h3>设备信息</h3>
          <el-table :data="devInfo">
            <el-table-column prop="generateTime" label="生成时间" sortable></el-table-column>
            <el-table-column prop="status" label="消息类型" sortable></el-table-column>
            <el-table-column prop="user" label="用户" sortable></el-table-column>
            <el-table-column prop="msg" label="消息"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="Socket" name="socketInfo" v-if="Sysname == 'admin'">
          <h3>Socket信息</h3>
          <el-table :data="socketInfo">
            <el-table-column prop="generateTime" label="生成时间" sortable></el-table-column>
            <el-table-column prop="infoType" label="消息类型" sortable></el-table-column>
            <el-table-column prop="line" label="消息状态" sortable></el-table-column>
            <el-table-column prop="msg" label="消息"></el-table-column>
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
      activeName: "userInfo",
      userInfo: [],
      errorInfo: [],
      runInfo: [],
      devInfo: [],
      socketInfo: []
    };
  },
  computed: {
    Sysname() {
      return this.$store.state.user.name;
    },
    Token() {
      return this.$store.state.token;
    },
    infoStream() {
      console.log(this.$store.state.infoStream);
      
      return this.$store.state.infoStream.info;
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    //解构tab实例
    handleClick({ name }) {
      if (name == "userInfo") return;
      this.loading = true;
      Get_user_info({
        user: this.Sysname,
        token: this.Token,
        type: name
      }).then(res => {
        this.loading = false;
        let { data } = res.data;
        this[name] = res.data.data;
        /* if(name == 'userInfo') this.userInfo = data
        if(name == 'errorInfo') this.errorInfo = data
        if(name == 'logInfo') this.logInfo = data */
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
.page-head{
  padding: 1rem;
  font-size: 20px;
  border-bottom: groove;
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
