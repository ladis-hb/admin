<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, key) in th.obj" :key="key">
        <hr />
        <!-- 
        <i class="iconfont icon-thdianyuan" ></i>-->
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
          <el-col :span="6" v-for="(val2,key2) in arr_gress" :key="key2">
            <div v-for="(v1,id,k1) in val2" :key="k1">
              <h4>{{lang[id]}}:{{v1}}</h4>
              <ProgressDashboard :num="item[id]" :unit="v1"></ProgressDashboard>
            </div>
          </el-col>
        </div>
        <i class="iconfont icon-tubiao-zhexiantu"></i>
        <ve-line :data="{columns:Object.keys(item),rows:th.array[item.devid]}" class :settings="chartSettings"></ve-line>
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
      arr_title: ["name", "brand", ],
      arr_gress: [{ temperature: "C" }, { humidity: "%" }],
      chartSettings: {
        dimension: ["generateTime"], //指定date 为维度
        metrics: ["temperature", "humidity"]
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
   th() {
      
      if (typeof this.$store.state.devs == "undefined") return { th: [] };
      return {
        obj:this.$store.state.dev.th,
        array:this.$store.state.devs.th
      }
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
