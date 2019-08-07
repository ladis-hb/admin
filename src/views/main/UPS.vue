<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, key) in ups.obj" :key="key">
        <hr />
        <!-- 
        <i class="iconfont icon-upsdianyuan" ></i>-->
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
        <ve-line :data="{columns:Object.keys(item),rows:ups.array[item.devid]}" class :settings="chartSettings"></ve-line>
      </el-col>
    </el-row>
  </keep-alive>
</template>

<script>
import ProgressDashboard from "./util/Progress_dashboard";
export default {
  data() {
    return {
      arr_title: [
        "name",
        "brand",
        "status",
        "phase",
        "smoke",
        "access_contral"
      ],
      arr_gress: [
        { temperature: "C" },
        { residual_capacity: "KW" },
        { battery_voltage: "V" },
        { battery_voltage_negative: "V" },
        { load_ratio: "HZ" },
        { output_frequency: "HZ" },
        { input_voltage: "V" },
        { output_voltage: "V" },
        { input_voltage_l1: "V" },
        { input_voltage_l2: "V" },
        { input_voltage_l3: "V" },
        { output_voltage_l1: "V" },
        { output_voltage_l2: "V" },
        { output_voltage_l3: "V" }
      ],
      chartSettings: {
        dimension: ["generateTime"], //指定date 为维度
        metrics: [
          "temperature",
          "residual_capacity",
          "battery_voltage",
          "battery_voltage_negative",
          "load_ratio",
          "output_frequency",
          "input_voltage",
          "output_voltage",
          "input_voltage_l1",
          "input_voltage_l2",
          "input_voltage_l3",
          "output_voltage_l1",
          "output_voltage_l2",
          "output_voltage_l3"
        ]
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
    ups() {
      
      if (typeof this.$store.state.devs == "undefined") return { ups: [] };
      return {
        obj:this.$store.state.dev.ups,
        array:this.$store.state.devs.ups
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
