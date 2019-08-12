<template>
  <div>
    <el-card header="所有在线用户">
      <el-table :data="infoStream.user" stripe style="width: 100%">
      <el-table-column prop="user" label="用户"></el-table-column>
      <el-table-column prop="socketId" label="socketId" ></el-table-column>
    </el-table>
    </el-card>
    <el-card header="所有在线设备">
      <el-table :data="infoStream.devs" stripe style="width: 100%">
      <el-table-column prop="devType" label="设备类型"></el-table-column>
      <el-table-column prop="devid" label="设备Id" ></el-table-column>
      <el-table-column prop="user" label="设备所属用户" ></el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
const io = require("socket.io-client");
const config = require('../../../server/config')
let ad = config.development?'http://127.0.0.1:3000':''
const socket = io(ad);

export default {
  computed: {
    //用户名
    Sysname() {
      return (
        this.$store.state.user.name ||
        JSON.parse(sessionStorage.getItem("user"))
      );
    },
    Token() {
      return this.$store.state.token || sessionStorage.getItem("token");
    },
    infoStream() {
      console.log(this.$store.state.infoStream.onlinelist);

      return this.$store.state.infoStream.onlinelist;
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  mounted() {
    console.log("onlinelist mounted");
    //注册socket
    socket.emit("register", { user: this.Sysname, token: this.Token });
    //监听掉线，重连后重新注册
    socket.on("reconnect", () => {
      console.log(`Socket reconnect`);
      socket.emit("register", { user: this.Sysname, token: this.Token });
    });
    //监听设备信息
    socket.on("newDevs", data => {
      this.$store.commit("SetDev_socket", data);
    });
    //监听用户信息流
    socket.on("infoStream", data => {
      var devs = data.onlinelist;
      this.$store.commit("infoStream", data);
    });
  }
};
</script>

<style lang='scss' scoped >
</style>
