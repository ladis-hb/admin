<template>
  <div class="background">
    <main class="main">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container min"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm2.account"
            autocomplete="on"
            placeholder="账号"
            autofocus
            required
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            placeholder="密码"
            clearable
            required
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-button type="text" @click="handleReset2" style="float:right">重置密码</el-button>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSubmit2"
            :loading="logining"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import { requestLogin, resetpasswd } from "../api/api";

export default {
  data() {
    return {
      checked: false,
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  mounted() {
    var bool = localStorage.getItem("check_login");
    if (bool) {
      console.log(bool)
      this.checked = bool;
      var user = JSON.parse(localStorage.getItem("USER"))
      var passwordarr = window.atob(user.password).split("")
      for (var i=1;i<10;i++) passwordarr.pop()           
      this.ruleForm2.account = user.username;
      this.ruleForm2.checkPass = passwordarr.join('');
    }
    this.$nextTick().then(() => {});
  },
  methods: {
    handleReset2() {
      // this.$refs.ruleForm2.resetFields();
      console.log("reset");
      this.$router.push({ path: "reset" });
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();
          var loginParams = {
            username: this.ruleForm2.account,
            password: window.btoa(this.ruleForm2.checkPass + "34.85@354") //password 用base64编码
          };
          //console.log(loginParams);
          requestLogin(loginParams).then(data => {
            this.logining = false;
            //NProgress.done();
            let { msg, code, user } = data;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              localStorage.removeItem('USER')
              if (this.checked) {
                localStorage.setItem("check_login", this.checked);
                localStorage.setItem("USER", JSON.stringify(loginParams));
              }
              //
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ path: "/main" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-height: 500px) {
  .min {
    margin: 80px auto;
  }
}
@media screen and (min-height: 500px) {
  .min {
    margin: 280px auto;
  }
}
.background {
  background-image: url("../assets/background.png");
  display: flex;
  height: 100%;
  .main {
    width: 100%;
    height: auto;
  }
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin: 280px auto; */
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 10px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>