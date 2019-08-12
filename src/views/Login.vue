<template>
  <div class="background">
    <main class="main">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="user">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container min"
        >
          <h3 class="title">
            {{lang.system}}{{lang.login}}
            <div class="registered">
              <a type="text" @click="setLanguage">English</a>
            </div>
          </h3>
          <el-form-item prop="account">
            <el-input
              type="text"
              v-model="ruleForm2.account"
              autocomplete="on"
              :placeholder="lang.account"
              autofocus
              required
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              :placeholder="lang.password"
              clearable
              required
            ></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="remember">{{lang.keep}}{{lang.password}}</el-checkbox>
          <el-button
            type="text"
            @click="handleReset2"
            class="reset-pw"
          >{{lang.reset}}{{lang.password}}</el-button>

          <el-form-item style="width:100%;">
            <el-button
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleSubmit2"
              :loading="logining"
            >{{lang.login}}</el-button>
            <div class="registered">
              <a type="text" @click="handleRegistered">{{lang.registered}}</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script>
import { requestLogin, resetpasswd } from "../api/api";
import { mapGetters } from "vuex";
import {btoa} from '../util/util'

export default {
  data() {
    return {
      checked: false,
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      //效验规则
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  //
  computed: mapGetters({
    lang: "language"
  }),
  //提交登录
  mounted() {
    var bool = localStorage.getItem("check_login");
    if (bool && localStorage.getItem("USER")) {
      this.checked = true;
      var user = JSON.parse(localStorage.getItem("USER"));
      var passwordarr = [...window.atob(user.password)];
      for (var i = 1; i < 10; i++) passwordarr.pop();
      this.ruleForm2.account = user.username;
      this.ruleForm2.checkPass = passwordarr.join("");
    }
    this.$nextTick().then(() => {});
  },
  methods: {
    //
    setLanguage() {
      this.$store.commit("SETlanguage", { data: "en" });
    },
    //重置密码
    handleReset2() {
      //console.log(this.$router)
      this.$router.push({ path: "/Passwdreset" });
    },
    //注册用户
    handleRegistered() {
      //console.log("/Registered");
      this.$router.push({ path: "/Registered" });
    },
    //提交登录
    handleSubmit2(ev) {
      //add
      this.$refs.ruleForm2.validate(valid => {
        
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.ruleForm2.account,
            password: btoa(this.ruleForm2.checkPass)
          };
          requestLogin(loginParams).then(res => {
            this.logining = false;
            let { msg, code, data } = res;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              if (this.checked) {
                localStorage.setItem("check_login", this.checked);
                localStorage.setItem("USER", JSON.stringify(loginParams));
              } else {
                localStorage.removeItem("check_login");
              }
              sessionStorage.setItem("user", JSON.stringify(data.user));
              sessionStorage.setItem('token',data.token)
              this.$store.commit('SETuser',{user:data.user,token:data.token})
              //this.$router.push({ path: data.route });
              this.$router.push('/')
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
.main {
  .registered {
    display: block;

    a:hover {
      color: #18c79c;
    }
  }
}
.background {
  background-image: url("../assets/bg5.png");
  height: 100%;
  overflow: hidden;
  background-size: cover;
  .main {
    width: 100%;
    height: 100%;
    .logo {
      padding: 1rem;
      width: 50%;
      display: flex;
      flex-direction: row;
      img {
        max-width: 25%;
      }
    }
    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: center;
    }
  }
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin: 280px auto; */
  width: 30%;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .reset-pw {
    float: right;
    padding: 0%;
  }
}
</style>