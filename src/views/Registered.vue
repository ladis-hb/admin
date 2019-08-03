<template>
  <el-container class="container .min-container">
    <el-header class="head">
      <h4 class="title">注册</h4>
    </el-header>
    <el-main>
      <el-form
        :model="register"
        class="main-i"
        @submit.native.prevent
        :rules="rules2"
        label-position="right"
        label-width="120px"
      >
        <h3>账号注册</h3>
        <el-form-item label="名称" prop="name">
          <el-input v-model="register.name" placeholder></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="register.password" placeholder show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="passwordck">
          <el-input v-model="register.passwordck" placeholder show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="register.mail" placeholder></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="orgin">
          <el-input v-model="register.orgin" placeholder></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="register.tel" placeholder></el-input>
        </el-form-item>
        <el-button type="success" class="main-submit" @click="Register" :loading="loading">提交</el-button>
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
    return {
      loading: false,
      register: {
        name: "",
        password: "",
        passwordck: "",
        mail: "",
        orgin: "",
        tel: ""
      },
      rules2: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordck: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        orgin: [{ required: false, message: "请输入公司", trigger: "blur" }],
        tel: [{ required: false, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    Register() {
      this.loading = true;
      this.register.passwd = window.btoa(`${this.register.password}34.85@354`); //password 用base64编码
      this.register.passwdck = window.btoa(
        `${this.register.passwordck}34.85@354`
      );
      UserRegister(this.register).then(data => {
        if (data.code == 200) {
          this.loading = false;
          this.$confirm(" 用户已注册成功，是否返回登录界面?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          }).then(() => {
            this.$router.push({ path: "/login" });
          });
        } else {
          this.loading = false;
          this.$alert(`注册遇到问题，详情:\\${data.msg}`);
        }
        this.loading = false;
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
