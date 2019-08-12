<template>
  <section v-loading="loading2"
       element-loading-text="正在注册用户,以获取设备信息...">
    <keep-alive>
      <el-row>
        <el-col :span="24">
          <!-- <el-card class="all-x"> -->
          <!-- ups -->
          <div v-for="(item,key) in devinfo" :key="key" class="tab-border">
            <h3>{{lang[key]}}</h3>
            <hr />
            <el-table :data="item" style="width: 100%">
              <el-table-column label type="expand" class="expanded1">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="lang[li]" v-for="(val,li,ikey) in props.row" :key="ikey" v-if="li != '_id'">
                      <span>{{ val || 'false' }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column v-for="(td,iikey) in ul" :label="lang[td]" :prop="td" :key="iikey"></el-table-column>
            </el-table>
          </div>
        </el-col>

       <!--  <log :infodata="warringinfo" type="error"></log>
        <log :infodata="loginfo" type="log"></log> -->
      </el-row>
    </keep-alive>
  </section>
</template>

<script>
const io = require("socket.io-client");
const config = require('../../server/config')
let ad = config.development?'http://127.0.0.1:3000':''
const socket = io(ad);
import log from "./log/log.vue";
export default {
  data() {
    return {

      loading2:true,
      cardcss: true,
      loading: false,
      ul: ["name", "devid", "brand", "generateTime"],
      list: {
        ups: {
          ul: ["name", "devid", "brand", "generateTime"],
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
        ac: {
          ul: ["name", "devid", "brand", "generateTime"],
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
          ul: ["name", "devid", "brand", "generateTime"],
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
          ul: ["name", "devid", "brand", "generateTime"],
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
          ul: ["name", "devid", "brand", "generateTime"],
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
     //用户名
    Sysname() {
      return (
        this.$store.state.user.name ||
        JSON.parse(sessionStorage.getItem("user"))
      );
    },
    Token() {
      return this.$store.state.token || sessionStorage.getItem("token");
    },
    devinfo: {
      get() {
        return this.$store.state.dev;
      }
    },
    warringinfo() {
      return this.$store.state.warringinfo;
    },
    loginfo() {
      return this.$store.state.loginfo;
    },
    lang() {
      return this.$store.getters.language;
    }
  },

  mounted() {
    console.log('main mounted')
    //注册socket
    socket.emit("register", { user: this.Sysname, token: this.Token });
    //监听掉线，重连后重新注册
    socket.on('reconnect',()=>{
      console.log(`Socket reconnect`)
      socket.emit("register", { user: this.Sysname, token: this.Token });
    })
    //监听设备信息
    socket.on("newDevs", data => {
      //console.log(data)
      this.loading2 = false
      this.$store.commit('SetDev_socket',data)
    });
    //监听用户信息流
    socket.on('infoStream',data =>{
      //console.log(data)
      this.$store.commit('infoStream',data)
    })

    
  },
};
</script>

<style scoped>
.expanded1{
  background-color: #99a9bf
}
p {
  text-overflow: clip;
  word-wrap: none;
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
.tab-border {
  border-bottom: groove;
}
</style>