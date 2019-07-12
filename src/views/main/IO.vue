<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, index) in airs" :key="index" class="card">
        <hr />
        <div class="div-block">
        <el-col :span="24">
          <h4>{{lang.Devid}}:</h4>
          <p>{{item.devid}}</p>
        </el-col>
        <el-col :span="8" v-for="(val,key) in arr_title" :key="key">
          <h4>{{lang[val]}}:</h4>
          <p>{{item[val]?item[val]:item.arg[val]}}</p>
        </el-col>
        </div>
        <div class="div-block">
          <el-col :span="12" v-for="(val,key) in arr_gress" :key="key">
            <h4>{{lang[val]}}:</h4>
            <i :class="item[val]?el_icon_open:el_icon_turn_off"></i>
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
      arr_title: ["name", "brand", "status"],
      arr_gress: ["power_status", "input_status"],
      el_icon_open: ["el-icon-open"],
      el_icon_turn_off: ["el-icon-turn-off"]
    };
  },
  computed: {
    airs() {
      if (typeof this.$store.state.dev.data == "undefined") {
        return { io: [] };
      }
      console.log(this.$store.state.dev.data.io);
      return this.$store.state.dev.data.io;
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
