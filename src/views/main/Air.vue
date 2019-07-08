<template>
    <keep-alive>
        <el-row>
            <el-col :span="24" v-for="(item, index) in airs" :key="index">
                <strong>{{item.name}}/Devid:{{item.devid}}</strong>
                <div></div>
                <strong>mode:{{arg.status[item.name]?arg.status[item.name].mode:'no'}}/brand:{{arg.status[item.name]?arg.status[item.name].brand:'no'}}/</strong>
                <hr/>
                <ve-line :data="serizeData(item)" height="500px"  :settings="chartSettings"></ve-line>
            </el-col>

        </el-row>
    </keep-alive>
</template>

<script>
export default {
    data(){
        return{
            arg:{
                keyarr:[],
                status:{

                }
            },
            chartSettings:{
                dimension: ['date'], //指定date 为维度
                metrics:["refrigeration_temperature",
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
                        "air_supply_temperature",
                ],
                labelMap: {
                    refrigeration_temperature: '制冷温度',
                    refrigeration_stop_deviation: '制冷停止偏差',
                    evaporation_start_temperature:'蒸发开启温度',
                    air_change_time:'换气时间',
                    opening_delay:'开度延时',
                    high_temperature_alarm_point:'高温报警点',
                    return_air_temperature:'回风温度',
                    coil_temperature:'盘管温度',
                    modified_return_air_temperature:'修正回风温度',
                    Correct_air_outlet_temperature:'修正出风温度',
                    defrosting_temperature_setting:'除霜温度设定',
                    heating_opening_deviation:'加热开启偏差',
                    heating_stop_deviation:'加热停止偏差',
                    refrigeration_start_deviation:'制冷开启偏差',
                    air_outlet_temperature_deviation:'出风温度偏差',
                    Starting_temperature_setting:'开机温保设定',
                    temperature_difference:'温差',
                    air_supply_temperature:'送风温度'
                    }
            }
        }
    },
    computed:{
        airs(){
            if(typeof(this.$store.state.dev.data) == 'undefined'){
                return {air_cool:[]}
            }
            return this.$store.state.dev.data.air_cool
        },
    },
    methods:{
        serizeData(item){
            var arg = item.arg
            if (this.arg.keyarr.length < 1 && typeof(arg) == 'object'){
                for (var key in arg[0]){                    
                    this.arg.keyarr.push(key)
                }
            } 
            if(typeof(arg) == 'object'){
                var n = arg.length-1
                var status = {
                    mode:arg[n].mode,
                    brand:arg[n].brand                    
                }
                this.arg.status[item.name] = status
            }               
            var data = {columns:this.arg.keyarr,rows:arg}

            return data            
        }
    }
}
</script>

<style scoped>

</style>
