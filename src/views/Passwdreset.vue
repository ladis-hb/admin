<template>
  <el-container class="container .min-container">
    <el-header class="head">
      <h4 class="title">重置密码</h4>
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
        <h3>重置密码</h3>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="register.mail" placeholder="输入邮箱获取验证码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passwd">
          <el-input v-model="register.passwd" placeholder show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="passwdck">
          <el-input v-model="register.passwdck" placeholder show-password></el-input>
        </el-form-item>
        <el-button type="success" class="main-submit" @click="ResetPw" :loading="loading">提交</el-button>
      </el-form>

      <div class="main-instructions">
        <p>instructions:</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { GetMailValidation, Resetpasswd } from "../api/api";
import { btoa } from "../util/util";
export default {
  data() {
    return {
      loading: false,
      register: {
        passwd: "",
        passwdck: "",
        mail: "",
        orgin: "",
        tel: ""
      },
      rules2: {
        passwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        passwdck: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    async ResetPw() {
      this.loading = true;
      //提交用户名和邮箱，发送验证码到邮箱
      var resultValidation = await GetMailValidation({
        name: this.register.name,
        mail: this.register.mail
      });
      //填写收到的邮箱验证码
      var result = false;
      if (resultValidation.code == 200) {
        result = await this.$prompt(resultValidation.msg).then(val => {
          return val.value;
        });

        Resetpasswd({
          Validation: result,
          mail: this.register.mail,
          passwd: btoa(this.register.passwd),
          passwdck: btoa(this.register.passwdck)
        }).then(data => {
          this.loading = false;
          if (data.code == 200) {
            this.$confirm(data.msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info"
            }).then(() => {
              this.$router.push({ path: "/login" });
            });
          } else {
            this.$confirm(data.msg);
          }
        });
      } else {
        this.loading = false;
        this.$confirm(resultValidation.msg);
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

