<template>
    <transition>
        <keep-alive>
            <!-- warring -->
		  <el-col :span="12">
			<el-card class="all-x">
				  <template>
  					<el-table :data="infodata" height="250" style="width: 100%" >
    					<el-table-column prop="id" label="id" width="60px" fixed></el-table-column>
    					<el-table-column prop="type" label="type" width="100px"></el-table-column>
    					<el-table-column prop="level" label="level"  width="50px"></el-table-column>
						<el-table-column prop="info" label="info"></el-table-column>
						<el-table-column prop="date" label="date"  width="100px"></el-table-column>
  					</el-table>
				</template>
			  </el-card>
		  </el-col>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    name:'log',
    data(){
        return{

        }
    },
    props:['infodata'],
    methods:{
        
    }
}
</script>

<style scoped>

</style>


