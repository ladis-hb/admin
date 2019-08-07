<template>
  <div class="pages2">
    <el-container class="container .min-container">
      <el-header class="head">
        <h4 class="title">设置</h4>
      </el-header>
      <el-main>
        <div class="block">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <h3>添加设备ID</h3>
            <el-form-item label="添加设备ID">
              <el-input v-model="formInline.devid" placeholder="添加设备ID"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select v-model="formInline.devType">
                <el-option v-for="(val,key) in devType" :key="key" :label="lang[val]" :value="val"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="devid_Submit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <h3>获取所有设备列表</h3>
            <el-form-item>
              <el-button type="info" @click="Get_devid_list">获取列表</el-button>
            </el-form-item>
            <el-form-item>
              <el-table :data="david_list">
                <el-table-column prop="type" label="设备类型" width="180" sortable></el-table-column>
                <el-table-column prop="devid" label="设备ID" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="delete_Devid(scope.row.devid, david_list)"
                      type="text"
                      size="small"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form class="main-i" @submit.native.prevent label-position="right" label-width="260px">
            <h3>设置数据更新间隔</h3>
            <el-form-item label="数据更新间隔:以秒为单位，最低20秒：">
              <el-input v-model="data_update_time"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <el-form>
            <el-form-item label="获取Store数据池数据">
              <el-input type="textarea" :rows="10" v-model="Store"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="block">
          <div class="main-instructions">
            <p>instructions:</p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { addDevid, Get_devid_list, delete_Devid } from "../api/api";
export default {
  data() {
    return {
      devType: ["ups", "ac", "power", "io", "th"],
      formInline: {
        devid: "",
        devType: ""
      },
      david_list: []
    };
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
    Store: {
      get() {
        return JSON.stringify(this.$store.state);
      },
      set() {}
    },
    lang() {
      return this.$store.state.lang;
    },
    Sysname() {
      return (
        this.$store.state.user.name ||
        JSON.parse(sessionStorage.getItem("user"))
      );
    },
    Token() {
      return this.$store.state.token || sessionStorage.getItem("token");
    }
  },
  methods: {
    delete_Devid(index) {
      delete_Devid(
        Object.assign(
          { devid: index },
          {
            user: this.Sysname,
            token: this.Token
          }
        )
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.Get_devid_list();
        }
      });
    },
    devid_Submit() {
      if (this.formInline.devType == "" || this.formInline.devid == "") return;
      addDevid(
        Object.assign(this.formInline, {
          user: this.Sysname,
          token: this.Token
        })
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.Get_devid_list();
        }
      });
    },
    Get_devid_list() {
      Get_devid_list({
        user: this.Sysname,
        token: this.Token
      }).then(res => {
        this.david_list = res.data.data.dev;
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
  overflow: auto;
  width: 80%;
  //position: fixed;
  margin: 0% 10%;
  .block {
    padding: 1rem;
  }
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
