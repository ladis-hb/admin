<template>
  <section v-loading="loading">
    <keep-alive>
      <el-row>
        <el-col :span="24">
          <el-card class="all-x">
            <!-- ups -->
            <div v-for="(item,key) in devinfo" :key="key" >
              <h3>{{key}}</h3>
              <hr />
              <el-table :data="item" style="width: 100%">
                <el-table-column label type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item :label="lang[li]" v-for="(li,ikey) in list[key].li" :key="ikey">
                        <span>{{ props.row[li]? props.row[li]: props.row.arg[li] }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column :label="lang[ul]" :prop="ul" v-for="(ul,iikey) in list[key].ul" :key="iikey"></el-table-column>
                
              </el-table>
            </div>
           
          </el-card>
        </el-col>

        <log :infodata="warringinfo" type="error"></log>
        <log :infodata="loginfo" type="log"></log>
      </el-row>
    </keep-alive>
  </section>
</template>

<script>
import { getDevInfo, getWarringInfo, getLog } from "../api/api";
import log from "./log/log.vue";
export default {
  data() {
    return {
      cardcss: true,
      loading: false,
      list: {
        ups: {
          ul: ["name", "devid", "brand", "status", "load_ratio", "date"],
          li: [
            "name",
            "brand",
            "status",
            "phase",
            "smoke",
            "access_contral",
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
        },
        air_cool: {
          ul: ["name", "devid", "brand", "status", "mode", "date"],
          li: [
            "name",
            "devid",
            "brand",
            "status",
            "mode",
            "date",
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
        },
        power: {
          ul: ["name", "devid", "brand", "power_factor", "quantity", "date"],
          li: [
            "name",
            "devid",
            "brand",
            "status",
            "mode",
            "date",
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
        },
        io: {
          ul: [
            "name",
            "devid",
            "brand",
            "power_status",
            "input_status",
            "date"
          ],
          li: [
            "name",
            "devid",
            "brand",
            "status",
            "date",
            "power_status",
            "input_status"
          ]
        },
        th: {
          ul: ["name", "devid", "brand", "temperature", "humidity", "date"],
          li: [
            "name",
            "devid",
            "brand",
            "status",
            "date",
            "temperature",
            "humidity"
          ]
        }
      }
    };
  },
  components: {
    log
  },
  computed: {
    devinfo: {
      get() {
        //console.log(this.$store.state.dev.data)
        return this.$store.state.dev.data;
      }
    },
    warringinfo() {
      return this.$store.state.warringinfo.data;
    },
    loginfo() {
      return this.$store.state.loginfo.data;
    },
    lang() {
      return this.$store.getters.language;
    }
  },
  methods: {
    show(ul){
      console.log(ul)
      return ul
    },
    getdevinfo() {
      getDevInfo({ id: 3 }).then(data => {
        this.$store.commit("SETDEV", { data: data.data });
      });
    },
    getwarring() {
      getWarringInfo().then(data => {
        this.$store.commit("SETWARRING", { data: data.data });
      });
    },
    getinfo() {
      getLog().then(data => {
        this.$store.commit("SETLOG", { data: data.data });
      });
    },
    interval() {
      this.getdevinfo();
      this.getwarring();
      this.getinfo();
      this.$notify({ message: "已更新数据！！！", position: "bottom-right" });
      this.loading = false;
    }
  },
  mounted() {
    setInterval(this.interval, 15000);
    this.interval();
  }
};
</script>

<style scoped>
p {
  text-overflow: clip;
}
.all-x {
  width: max-width;
  margin-top: 15px;
}
.half {
  width: 49%;
  margin-top: 15px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>