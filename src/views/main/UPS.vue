<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, index) in airs" :key="index">
        <hr />
        <el-col :span="24">
          <h4>{{lang.Devid}}:</h4>
          <p>{{item.devid}}</p>
        </el-col>
        <el-col :span="8" v-for="(val,key) in arr_title" :key="key">
          <h4>{{lang[val]}}:</h4>
          <p>{{item[val]?item[val]:item.arg[val]}}</p>
        </el-col>

        <div>
          <el-col :span="4" v-for="(val,key) in arr_gress" :key="key">
            <div v-for="(v1,id,k1) in val" :key="k1" v-if="item.arg[id]">
              <h4>{{lang[id]}}:{{v1}}</h4>
              <ProgressDashboard :num="item.arg[id]" :unit="v1"></ProgressDashboard>
            </div>
          </el-col>
        </div>

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
        dimension: ["date"], //指定date 为维度
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
    airs() {
      if (typeof this.$store.state.dev.data == "undefined") {
        return { ups: [] };
      }
      return this.$store.state.dev.data.ups;
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
h4,
p {
  display: inline-block;
}
.line {
  height: -webkit-fill-available;
  margin-top: 500px;
}
</style>
