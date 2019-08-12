<template>
  <el-container class="cont">
    
    <el-header class="admin-head">
       <router-link to="/" class="home-link">ladis</router-link>
      <h2>administrator Manage</h2>
    </el-header>
    <el-container>
      <el-aside width="200px" class="admin-asid">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo list-menu"
          @open="handleOpen"
          @close="handleClose"
          @select="select"
          background-color="#343a40"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="onlineList">
            <i class="el-icon-phone-outline"></i>
            <span slot="title">在线设备</span>
          </el-menu-item>
          <el-submenu index="devsList">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>所有设备</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">devs</template> -->
              <el-menu-item index="ups">
                <i class="iconfont icon-upsdianyuan"></i>
                {{lang['ups']}}
              </el-menu-item>
              <el-menu-item index="ac">
                <i class="iconfont icon-kongdiao"></i>
                {{lang['ac']}}
              </el-menu-item>
              <el-menu-item index="power">
                <i class="iconfont icon-dianliangyi"></i>
                {{lang['power']}}
              </el-menu-item>
              <el-menu-item index="io">
                <i class="iconfont icon-io"></i>
                {{lang['io']}}
              </el-menu-item>
              <el-menu-item index="th">
                <i class="iconfont icon-wenshidu"></i>
                {{lang['th']}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="usersList">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view class="main-view"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { admin_get_info_list } from "../api/api";
export default {
  data() {
    return {};
  },
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
    //语言
    lang() {
      return this.$store.getters.language;
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    async select(index) {
      if (index != "onlineList") {
        let { data } = await admin_get_info_list({
          user: this.Sysname,
          token: this.Token,
          index: index
        });
        let path;
        switch (index) {
          case "onlineList":
          case "usersList":
            path = `/${index}`;
            break;
          case "ups":
          case "ac":
          case "power":
          case "io":
          case "th":
            path = `/devList/${index}`;
            break;
          default:
            path = "/main";
            break;
        }
        console.log(data)
        this.$router.push({
          path,
          query: { data:data.data }
        });
      } else {
        this.$router.push("/onlineList");
      }
    }
  }
};
</script>

<style lang='scss' scoped >
.cont {
  height: 100%;
  .home-link{
    color: #fff;
    font-size: xx-large;
    font-style: italic;
    text-decoration: none;
    margin: 0 1rem;
  }
  .admin-head {
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    background-color: #343a40;
    color: aliceblue;
    text-align: center;
    h2 {
      margin-left: auto;
      //margin: 0;
      //padding: 15px;
    }
  }
  .admin-asid {
    background-color: #343a40;
    height: 100%;
    border-top: 1px #fff double;
    .list-menu {
      border: 0;
    }
    .iconfont {
      width: 24px;
      height: 18px;
      padding-right: 10px;
    }
  }
}
</style>
