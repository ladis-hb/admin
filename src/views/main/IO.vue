<template>
    <keep-alive>
        <el-row>            
            <el-col :span="24">
                <el-card class="all-x"  v-for="(item, index) in airs" :key="index">
                <strong>{{item.name}}/Devid:{{item.devid}}</strong>
                <div></div>
                <strong>mode:{{arg.status[item.name]?arg.status[item.name].mode:'no'}}/brand:{{item?item.brand:'nan'}}/</strong>
                <hr/>
                <strong >power_status:</strong>
                <el-switch style="display: block" :value="serizeData(item).power_status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <strong >input_status</strong> 
                <el-switch style="display: block" :value="serizeData(item).input_status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-card>  
            </el-col>
            
        </el-row>
    </keep-alive>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        airs(){
            if(typeof(this.$store.state.dev.data) == 'undefined'){
                return {io:[]}
            }
            return this.$store.state.dev.data.io
            
        },
    },
    methods:{
        serizeData(item){            
            var arg = item.arg
            if(typeof(arg) == 'object'){
                var n = arg.length-1
                return {
                    power_status:arg[n].power_status,
                    input_status:arg[n].input_status
                }
            }
            return {
                input_status:false,
                power_status:false
            }            
        }
    }
}
</script>

<style scoped>
    .all-x{
		width: max-width;
		margin-top: 15px;
	}
</style>
