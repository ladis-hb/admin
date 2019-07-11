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
              <ProgressDashboard :num="item.arg[id]" :unit="v1" :multip='multip'></ProgressDashboard>
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
      multip:1,
      arr_title: [
        "name",
        "brand",
        "mode",
        "refrigeration_stop_deviation",
        "opening_delay",
        "high_temperature_alarm_point",
        "modified_return_air_temperature",
        "Correct_air_outlet_temperature",
        "Correct_air_outlet_temperature",
        "defrosting_temperature_setting",
        "heating_opening_deviation",
        "heating_stop_deviation",
        "refrigeration_start_deviation",
        "air_outlet_temperature_deviation",
        "Starting_temperature_setting"
      ],
      arr_gress: [
        {air_change_time:'s'},
        { refrigeration_temperature: "C" },
        { evaporation_start_temperature: "C" },
        { return_air_temperature: "C" },
        { coil_temperature: "C" },
        { temperature_difference: "C" },
        { air_supply_temperature: "C" }
      ],
      chartSettings: {
        dimension: ["date"], //指定date 为维度
        metrics: [
          "refrigeration_temperature",
          "refrigeration_stop_deviation",
          "evaporation_start_temperature",
          "air_change_time",
          "opening_delay",
          "high_temperature_alarm_point",
          "return_air_temperature",
          "coil_temperature",
          "modified_return_air_temperature",
          "Correct_air_outlet_temperature",
          "defrosting_temperature_setting",
          "heating_opening_deviation",
          "heating_stop_deviation",
          "refrigeration_start_deviation",
          "air_outlet_temperature_deviation",
          "Starting_temperature_setting",
          "temperature_difference",
          "air_supply_temperature"
        ],
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
    airs() {
      if (typeof this.$store.state.dev.data == "undefined") {
        return { air_cool: [] };
      }
      return this.$store.state.dev.data.air_cool;
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  methods: {},
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
  margin-top: 800px;
}
</style>
