<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <!-- title -->
        {{collapsed||'Ladis'}}
      </el-col>
      <el-col :span="20" class="header-main">
        <el-col :span="2" class="hidden-icon">
          <i class="iconfont icon-liebiaomoshi_kuai" @click="asidCollapsed"></i>
        </el-col>
        <el-col :span="22" class="hm-main">
          <a src="#" class="hm-a">
            <i class="iconfont icon-xinwen"></i> news
          </a>
          <div class="hm-drop">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/Info' }">
                <i class="iconfont icon-xiaoxi text-color"></i>
                <span class="text-color">{{lang.info}}</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/Setting'}">
                <i class="iconfont icon-icon_shezhi text-color"></i>
                <span class="text-color">{{lang.setting}}</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-dropdown>
                  <span class="text-color">
                    {{lang.language}}
                    <i class="el-icon-arrow-down el-icon--right text-color"></i>
                  </span>
                  <el-dropdown-menu split-button slot="dropdown">
                    <el-dropdown-item>
                      <div @click="Setlanguage('cn')">
                        <i class="iconfont icon-zhongwen"></i>
                        <span>CN</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="Setlanguage('en')">
                        <i class="iconfont icon-yingwen"></i>
                        <span>EN</span>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-dropdown>
                  <span class="text-color">
                    {{Sysname}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu split-button slot="dropdown">
                    <el-dropdown-item>
                      <div @click="ResetPw">
                        <i class="iconfont icon-miwen"></i>
                        <span>{{lang.reset}}{{lang.password}}</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="logout">
                        <i class="el-icon-lock"></i>
                        <span>{{lang.loginout}}</span>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="hm-user">
            <img :src="userPic" />
          </div>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="{asid:!asidCollapse}">
        <!--导航菜单-->

        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo bg"
          unique-opened
          router
          :collapse="asidCollapse"
          :show-timeout="6000"
        >
          <el-menu-item @click="toMain">
            <i class="iconfont icon-shebeizhuangtai" />
            <span>{{lang.Equipment_overview}}</span>
          </el-menu-item>
          <el-menu-item
            v-for="(item,index) in $router.options.routes"
            v-if="item.leaf"
            :index="item.children[0].path"
            :key="index"
          >
            <i :class="item.children[0].iconCls"></i>
            <span>{{lang[item.children[0].name]}}</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{lang[$route.name]}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item
                v-for="item in $route.matched"
                :key="item.path"
              >{{ lang[item.name] }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- Main -->
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view class="main-view"></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { getUserInfo, getDevInfo, getWarringInfo, getLog } from "../api/api";
export default {
  data() {
    return {
      asidCollapse: false,
      asidClass: ["asid"],
      collapsed: false
    };
  },
  computed: {
    //用户名
    Sysname() {
      return (
        this.$store.state.user.name ||
        JSON.parse(sessionStorage.getItem("user"))
      );
    },
    userPic() {
      return this.$store.state.user.pic;
    },
    Token() {
      return this.$store.state.token || sessionStorage.getItem("token");
    },
    //语言
    lang() {
      return this.$store.getters.language;
    },
    //数据更新间隔
    interval_time() {
      return this.$store.state.interval_time;
    }
  },
  methods: {
    Setlanguage(lang) {
      console.log(lang);
      this.$store.commit("SETlanguage", { data: lang });
    },
    toMain() {
      this.$router.push("/main");
    },
    //重置密码
    ResetPw() {
      this.$router.push({ path: "/Passwdreset" });
    },
    //退出登录
    logout: function() {
      this.$confirm(this.lang.Confirm_exit, this.lang.tip, {
        confirmButtonText: this.lang.yes,
        cancelButtonText: this.lang.no,
        type: "warning"
      })
        .then(() => {
          this.$emit("clearinterval");
          sessionStorage.removeItem("user");
          this.$store.commit("SETuser", { user: "", token: "" });
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    collapse: function() {
      this.asidCollapse = !this.asidCollapse;
    },
    //
    asidCollapsed() {
      this.asidCollapse = !this.asidCollapse;
    },
    //获取用户信息
    getUserinfo() {
      getUserInfo({ user: this.Sysname, token: this.Token }).then(res => {
        if (res.data.code == 200)
          this.$store.commit("SETuserInfo", res.data.data);
        else console.log(res.data);
      });
    },
    //获取设备数据信息
    getdevinfo() {
      getDevInfo({
        user: this.Sysname,
        token: this.Token
      }).then(res=> {
        this.$store.commit("SETDEV", res.data);
        this.$store.dispatch('Serize_dev',res.data)
      });
    },
    //获取错误日志
    getwarring() {
      getWarringInfo({
        user: this.Sysname,
        token: this.Token
      }).then(data => {
        this.$store.commit("SETWARRING", data.data);
      });
    },
    //获取运行日志
    getinfo() {
      getLog({ id: 10, user: "user", token: "***", type: "getInfo" }).then(
        data => {
          this.$store.commit("SETLOG", data.data);
        }
      );
    },
    //定时任务
    interval_event() {
      this.getdevinfo();
      //this.getwarring();
      //this.getinfo();
      //this.$notify({ message: "已更新数据！！！", position: "bottom-right" });
      this.loading = false;
    }
  },
  //页面read
  mounted() {
    this.getUserinfo();
    var interval = setInterval(this.interval_event, this.interval_time);
    this.interval_event();
    this.$once("clearinterval", () => {
      clearInterval(interval);
    });

    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
    this.$nextTick().then(() => {
      this.$router.push("/main");
    });
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
@media screen and (max-width: 768px) {
  .showinfo {
    width: 35%;
  }
}
@media screen and (max-width: 1024px) {
  .showinfo {
    width: 45.83333%;
  }
}
.bg {
  background-color: #343a40;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
.asid {
  flex: 0 0 16.66667%;
  width: 16.66667%;
  border-top: 1px #fff double;

  .el-menu {
    background-color: #343a40;
    span {
      color: #fff;
    }
    li:hover {
      span {
        color: #343a40;
      }
    }
  }
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  span {
    font-size: 1rem;
    padding-left: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header {
    height: 60px;
    line-height: 60px;
    background: #343a40;
    color: #fff;
    .logo {
      max-width: 100%;
      //height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        max-width: 60%;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
  }
  .header-main {
    height: 60px;
    //font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .hidden-icon {
      margin-right: 1rem;
      max-height: 60px;
      i {
        margin-left: 1rem;
      }
    }
    .hm-main {
      display: flex;
      align-items: center;
      max-height: 60px;
      .hm-a {
        margin-right: 1rem;
      }
      .hm-drop {
        display: flex;
        margin-left: auto;
        margin-right: 2rem;
      }
      .hm-user {
        margin-left: 1rem;
        max-height: 60px;
        img {
          margin-right: 6px;
          margin-top: 6px;
          max-height: 48px;
          border-radius: 100%;
        }
      }
    }
  }
  .main-view {
    padding: 0rem 2rem;
  }
  //main
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    aside {
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 16.66667%;
      width: 16.66667%;
    }
    .content-container {
      flex: 1;
      margin-left: auto;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}

.breadcrumb {
  font-size: 16px;
  margin-top: 22px;
}
.text-color {
  color: #fff;
}
</style>