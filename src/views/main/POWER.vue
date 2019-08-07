<template>
  <keep-alive>
    <el-row>
      
      <el-col :span="24" v-for="(item, index) in power.obj" :key="index">
        <hr />
        <div class="div-block">
          <i class="iconfont icon-shebeizhuangtai" style="display: block"></i>
          <el-col :span="24">
            <h4 class="head_he">{{lang.Devid}}:</h4>
            <p>{{item.devid}}</p>
          </el-col>
          <el-col :span="8" v-for="(val,key1) in arr_title" :key="key1">
            <h4>{{lang[val]}}:</h4>
            <p>{{item[val] || 'false'}}</p>
          </el-col>
        </div>
        <div class="div-block">
          <i class="iconfont icon-yibiaopan" style="display: block"></i>
          <el-col :span="4" v-for="(val,key) in arr_gress" :key="key">
            <div v-for="(v1,id,k1) in val" :key="k1">
              <h4>{{lang[id]}}:{{v1}}</h4>
                <p>{{lang.high}}:{{item[id][0]}}/{{lang.low}}:{{item[id][1]}}/{{lang.now}}:{{item[id][2]}}</p>
              <ProgressDashboard :num="item[id][2]" :unit="v1"></ProgressDashboard>  
            </div>
          </el-col>
        </div>
        <i class="iconfont icon-tubiao-zhexiantu"></i>
        <ve-line
          :data="{columns:Object.keys(item),rows:power.array[item.devid]}"
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
      rows: [],
      arr_title: ["name", "brand", "status"],
      arr_gress: [
        { active_power: "" },
        { reactive_power: "" },
        { power_factor: "" },
        { quantity: "KW" },
        { input_voltage: "" },
        { input_voltage_l1: "" },
        { input_voltage_l2: "" },
        { input_voltage_l3: "" },
        { input_current: "" },
        { input_current_l1: "" },
        { input_current_l2: "" },
        { input_current_l3: "" },
        { input_frequency: "" },
        { input_frequency_l1: "" },
        { input_frequency_l2: "" },
        { input_frequency_l3: "" }
      ],
      chartSettings: {
        dimension: ["generateTime"], //指定date 为维度
        metrics: [
          "active_power",
          "reactive_power",
          "power_factor",
          "quantity",
          "input_voltage",
          "input_voltage_l1",
          "input_voltage_l2",
          "input_voltage_l3",
          "input_current",
          "input_current_l1",
          "input_current_l2",
          "input_current_l3",
          "input_frequency",
          "input_frequency_l1",
          "input_frequency_l2",
          "input_frequency_l3"
        ]
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
    power() {
      
      if (typeof this.$store.state.devs == "undefined") return { power: [] };
      return {
        obj:this.$store.state.dev.power,
        array:this.$store.state.devs.power
      }
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  methods: {
    serize(arr) {
      return arr;
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
.div-block h4{
  margin: 0;
}
.head_he{
  display: contents;
}
p {
  display: inline-block;
}
.div-block {
  width: 100%;
  overflow: auto;
  border-bottom-style: inset;
}
</style>
