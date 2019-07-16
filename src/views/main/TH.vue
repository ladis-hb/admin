<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, index) in airs" :key="index">
        <hr />
        <div class="div-block">
          <i class="iconfont icon-shebeizhuangtai" style="display: block"></i>
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
          <i class="iconfont icon-yibiaopan" style="display: block"></i>
          <el-col :span="12" v-for="(val,key) in arr_gress" :key="key">
            <div v-for="(v1,id,k1) in val" :key="k1" v-if="item.arg[id]">
              <h4>{{lang[id]}}:{{v1}}</h4>
              <ProgressDashboard :num="item.arg[id]" :unit="v1" :multip="multip"></ProgressDashboard>
            </div>
          </el-col>
        </div>
        <i class="iconfont icon-tubiao-zhexiantu"></i>
        <ve-line
          :data="{columns:item.titles,rows:item.args}"
          class="line"
          :settings="chartSettings"
        ></ve-line>
      </el-col>
    </el-row>
  </keep-alive>
</template>

<script>
import ProgressDashboard from "./util/Progress_dashboard";
export default {
  data() {
    return {
      multip: 1,
      arr_title: ["name", "brand", "status"],
      arr_gress: [{ temperature: "C" }, { humidity: "%" }],
      chartSettings: {
        dimension: ["date"], //指定date 为维度
        metrics: ["temperature", "humidity"]
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
    airs() {
      if (typeof this.$store.state.dev == "undefined") {
        return { th: [] };
      }
      return this.$store.state.dev.th;
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      var labelMap = {};
      for (var i of this.chartSettings.metrics) {
        labelMap[i] = this.lang[i];
      }
      this.chartSettings.labelMap = labelMap;
    });
  }
};
</script>

<style scoped>
.div-block {
  width: 100%;
  overflow: auto;
  border-bottom-style: inset;
  /* padding-top: 1rem; */
}
h4,
p {
  display: inline-block;
}
</style>
