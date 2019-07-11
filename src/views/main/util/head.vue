<template>
    <transition>
        <div>
            <hr/>
                <el-col :span="8">
                    <h4>name:255745 </h4><p>{{name}}</p>
                </el-col>
                <el-col :span="8">
                    <h4>Devid: </h4><p>{{Devid}}</p>
                </el-col> 
                <el-col :span="8">
                    <h4>mode: </h4><strong>{{arg.status[item.name]?arg.status[item.name].mode:'no'}}</strong>
                </el-col>
                <el-col :span="8">
                    <h4>brand: </h4><strong>{{arg.status[item.name]?arg.status[item.name].brand:'no'}}</strong>
                </el-col>
        </div>
    </transition>
</template>

<script>
export default {
    name:'head',
    data(){
        return{

        }
    },
    props:{
        name:{
            default:''
        },
        Devid:{
            default:''
        },
        mode:{
            default:''
        },
        brand:{
            default:''
        }
    }
}
</script>

<style scoped>
    h4,p{
        display: inline-block
    }
</style>


