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
          <el-col :span="6" v-for="(val,key) in arr_gress" :key="key">
            <div v-for="(v1,id,k1) in val" :key="k1" v-if="item.arg[id]">
              <h4>{{lang[id]}}:{{v1}}</h4>
              <strong>(上限:{{item.arg[id][0]}}/下限:{{item.arg[id][1]}}/当前值:{{item.arg[id][2]}})</strong>
              <ProgressDashboard :num="item.arg[id][2]" :unit="v1"></ProgressDashboard>
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
      rows:[],
      arr_title: [
        "name",
        "brand",
        "status",
      ],
      arr_gress: [
        {active_power:""},
         {reactive_power:""},
         {power_factor:""},
         {quantity:"KW"},
         {input_voltage:""},
         {input_voltage_l1:""},
         {input_voltage_l2:""},
         {input_voltage_l3:""},
         {input_current:""},
         {input_current_l1:""},
         {input_current_l2:""},
         {input_current_l3:""},
         {input_frequency:""},
         {input_frequency_l1:""},
         {input_frequency_l2:""},
         {input_frequency_l3:""}
      ],
      chartSettings: {
        dimension: ["date"], //指定date 为维度
        metrics: [
          "active_power","reactive_power","power_factor","quantity","input_voltage",
          "input_voltage_l1","input_voltage_l2","input_voltage_l3",
          "input_current","input_current_l1","input_current_l2",'input_current_l3',
          "input_frequency","input_frequency_l1","input_frequency_l2","input_frequency_l3"

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
        return { ups: [] };
      }
      console.log(this.$store.state.dev)
      let power = this.$store.state.dev.data.power
      return power ;
    },
    lang() {
      return this.$store.getters.language;
    },   
  },
  methods:{
    serize(arr){
      return arr
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
  margin-top: 100px;
  margin-bottom: 450px
}
</style>
