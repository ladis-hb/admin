<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <!-- title -->
        {{collapsed?'':Sysname}}
      </el-col>
      <el-col :span="20" class="header-main">
        <el-col :span="2" class="hidden-icon">
          <i class="el-icon-menu" @click="asidCollapsed"></i>
        </el-col>
        <el-col :span="22" class="hm-main">
          <a src="#" class="hm-a">news</a>
          <div class="hm-drop">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/test' }">信息</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/setting'}">设置</el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-dropdown>
                  <span>
                    language
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu split-button slot="dropdown">
                    <el-dropdown-item>中文</el-dropdown-item>
                    <el-dropdown-item>English</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/test' }">{{sysUserName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="hm-user">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside  :class="{asid:!asidCollapse}">
        <!--导航菜单-->

        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          unique-opened
          router
          :collapse="asidCollapse"
          :show-timeout="6000"
        >
          <el-menu-item @click="toMain">
            <i class="fa fa-home" />
            <span>概览</span>
          </el-menu-item>
          <el-menu-item
            v-for="(item,index) in $router.options.routes"
            v-if="item.leaf"
            :index="item.children[0].path"
            :key="index"
          >
            <i :class="item.iconCls"></i>
            <span>{{item.children[0].name}}</span>
          </el-menu-item>

          <el-submenu
            v-for="(item,index) in $router.options.routes"
            :index="item.path"
            :key="random*index"
            v-if="!item.leaf && !item.hidden"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>

            <el-menu-item
              v-for="(child,key) in item.children"
              :index="child.path"
              :key="key+random"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      asidCollapse:false,
      asidClass:['asid'],
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    Sysname() {
      return this.$store.state.sysname;
    },
    random() {
      return this.$store.state.random;
    }
  },
  methods: {
    toMain() {
      this.$router.push("/main");
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    collapse: function() {
      this.asidCollapse = !this.asidCollapse;
      
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    asidCollapsed(){
      this.asidCollapse = !this.asidCollapse

    }
  },
  mounted() {
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width:100%;
    min-height: 400px;
  }
.asid{
  flex: 0 0 16.66667%;
  width: 16.66667%;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
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
      i{
        margin-left: 1rem;
      }
    }
    .hm-main {
      display: flex;
      align-items: center;
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
        img {
          margin-right: 6px;
          margin-top: 6px;
          max-height: 48px;
          border-radius: 100%;
        }
      }
    }
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
</style>