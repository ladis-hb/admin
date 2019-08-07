<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, key) in io.obj" :key="key">
        <hr />
        <!-- 
        <i class="iconfont icon-iodianyuan" ></i>-->
        <div class="div-block">
          <i class="iconfont icon-shebeizhuangtai" style="display: block"></i>
          <el-col :span="24">
            <h4>{{lang.Devid}}:</h4>
            <p>{{item.devid}}</p>
          </el-col>
          <el-col :span="8" v-for="(val,key1) in arr_title" :key="key1">
            <h4>{{lang[val]}}:</h4>
            <p>{{item[val]}}</p>
          </el-col>
        </div>
        <div class="div-block">
          <i class="iconfont icon-yibiaopan" style="display: block"></i>
          <el-col :span="12" v-for="(val,key) in arr_gress" :key="key">
            <h4>{{lang[val]}}:</h4>
             <el-switch v-model="item[val]" active-color="#13ce66" inactive-color="#ff4949" disabled></el-switch> 
          </el-col>
        </div>
      </el-col>
    </el-row>
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      arr_title: ["name", "brand",],
      arr_gress: ["power_status", "input_status"],
      el_icon_open: ["el-icon-open"],
      el_icon_turn_off: ["el-icon-turn-off"]
    };
  },
  computed: {
    io() {      
      if (typeof this.$store.state.devs == "undefined") return { io: [] };
      return {
        obj:this.$store.state.dev.io,
        array:this.$store.state.devs.io
      }
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  methods: {}
};
</script>

<style scoped>
.div-block {
  width: 100%;
  overflow: auto;
  border-bottom-style: inset;
  /* padding-top: 1rem; */
}
.all-x {
  width: max-width;
  margin-top: 15px;
}

h4,
p {
  display: inline-block;
}
h3 {
  text-align: center;
}
.swith {
  display: inline-block;
}
</style>
