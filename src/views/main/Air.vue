<template>
  <keep-alive>
    <el-row>
      <el-col :span="24" v-for="(item, key) in ac.obj" :key="key">
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
        <ve-line :data="{columns:Object.keys(item),rows:ac.array[item.devid]}" class :settings="chartSettings"></ve-line>
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
        { air_change_time: "s" },
        { refrigeration_temperature: "C" },
        { evaporation_start_temperature: "C" },
        { return_air_temperature: "C" },
        { coil_temperature: "C" },
        { temperature_difference: "C" },
        { air_supply_temperature: "C" }
      ],
      chartSettings: {
        dimension: ["generateTime"], //指定date 为维度
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
        ]
      }
    };
  },
  components: {
    ProgressDashboard
  },
  computed: {
   ac() {
      
      if (typeof this.$store.state.devs == "undefined") return { ac: [] };
      return {
        obj:this.$store.state.dev.ac,
        array:this.$store.state.devs.ac
      }
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
.div-block {
  width: 100%;
  overflow: auto;
  border-bottom-style: inset;
  /* /*padding-top: 1rem; */
}
h4,
p {
  display: inline-block;
}
</style>
