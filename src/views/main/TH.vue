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
                metrics:['temperature','humidity'],
                labelMap: {
                    temperature:'温度',
                    humidity:'湿度'
                    }
            }
        }
    },
    computed:{
        airs(){
            if(typeof(this.$store.state.dev.data) == 'undefined'){
                return {th:[]}
            }
            return this.$store.state.dev.data.th
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
            var data = {columns:this.arg.keyarr,rows:arg}
            return data            
        }
    }
}
</script>

<style scoped>

</style>
