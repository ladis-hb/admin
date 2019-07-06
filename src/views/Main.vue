<template>
	<section :v-loading="loading">
		<el-row>
		  <el-col :span="24">		
		<el-card class='all-x'>
			<!-- ups -->
			<div v-for="(item,key) in devinfo" :key="key" v-if="key =='ups'" >
				<h3>{{key}}</h3>
				<hr/>
				<el-table :data="item" style="width: 100%">
				  	<el-table-column label="" type="expand">
					  <template slot-scope="props">
						  <el-form label-position="left" inline class="demo-table-expand">
							  	<el-form-item label="名称">
            				  		<span>{{ props.row.name }}</span>
          						</el-form-item>
								  <el-form-item label="温度">
            				  		<span>{{ props.row.arg[0].temperature }}</span>
          						</el-form-item>
								  <el-form-item label="品牌">
            				  		<span>{{ props.row.arg[0].brand }}</span>
          						</el-form-item>
								  <el-form-item label="状态">
            				  		<span>{{ props.row.arg[0].status }}</span>
          						</el-form-item>
								  <el-form-item label="相位">
            				  		<span>{{ props.row.arg[0].phase }}</span>
          						</el-form-item>
								  <el-form-item label="剩余容量">
            				  		<span>{{ props.row.arg[0].residual_capacity }}</span>
          						</el-form-item>
								  <el-form-item label="电池电压">
            				  		<span>{{ props.row.arg[0].battery_voltage }}</span>
          						</el-form-item>
								  <el-form-item label="负电池电压">
            				  		<span>{{ props.row.arg[0].battery_voltage_negative }}</span>
          						</el-form-item>
								  <el-form-item label="烟感">
            				  		<span>{{ props.row.arg[0].smoke }}</span>
          						</el-form-item>
								  <el-form-item label="门禁">
            				  		<span>{{ props.row.arg[0].access_contral }}</span>
          						</el-form-item>
								  <el-form-item label="负载比率">
            				  		<span>{{ props.row.arg[0].load_ratio }}</span>
          						</el-form-item>
								  <el-form-item label="输出频率">
            				  		<span>{{ props.row.arg[0].output_frequency }}</span>
          						</el-form-item>
								  <el-form-item label="输入电压">
            				  		<span>{{ props.row.arg[0].input_voltage }}</span>
          						</el-form-item>
								  <el-form-item label="输入电压L1">
            				  		<span>{{ props.row.arg[0].input_voltage_l1 }}</span>
          						</el-form-item>
								  <el-form-item label="输入电压L2">
            				  		<span>{{ props.row.arg[0].input_voltage_l2 }}</span>
          						</el-form-item>
								  <el-form-item label="输入电压L3">
            				  		<span>{{ props.row.arg[0].input_voltage_l3 }}</span>
          						</el-form-item>
								  <el-form-item label="输出电压">
            				  		<span>{{ props.row.arg[0].output_voltage }}</span>
          						</el-form-item>
								  <el-form-item label="输出电压L1">
            				  		<span>{{ props.row.arg[0].output_voltage_l1 }}</span>
          						</el-form-item>
								  <el-form-item label="输出电压L2">
            				  		<span>{{ props.row.arg[0].output_voltage_l2 }}</span>
          						</el-form-item>
								  <el-form-item label="输出电压L1">
            				  		<span>{{ props.row.arg[0].output_voltage_l3 }}</span>
          						</el-form-item>
						  </el-form>
					  </template>					  
				  	</el-table-column>
				  	<el-table-column
      					label="名称"
      					prop="name">
    				</el-table-column>
					<el-table-column
      					label="品牌"
      					prop="arg[0].brand">
    				</el-table-column>
					<el-table-column
      					label="状态"
      					prop="arg[0].status">
    				</el-table-column>
					<el-table-column
      					label="负载比率"
      					prop="arg[0].load_ratio">
    				</el-table-column>
					<el-table-column
      					label="更新时间"
      					prop="date">
    				</el-table-column>
				</el-table>
			</div>
			<!-- cool -->
			<div v-for="(item,key) in devinfo" :key="key" v-if="key =='air_cool'" >
				<h3>{{key}}</h3>
				<hr/>
				<el-table :data="item" style="width: 100%">
				  	<el-table-column label="" type="expand">
					  <template slot-scope="props">
						  <el-form label-position="left" inline class="demo-table-expand">
							  	<el-form-item label="名称">
            				  		<span>{{ props.row.name }}</span>
          						</el-form-item>
								  <el-form-item label="制冷温度">
            				  		<span>{{ props.row.arg[0].refrigeration_temperature }}</span>
          						</el-form-item>
								  <el-form-item label="品牌">
            				  		<span>{{ props.row.arg[0].brand }}</span>
          						</el-form-item>
								  <el-form-item label="模式">
            				  		<span>{{ props.row.arg[0].mode}}</span>
          						</el-form-item>
								  <el-form-item label="制冷停止偏差">
            				  		<span>{{ props.row.arg[0].refrigeration_stop_deviation }}</span>
          						</el-form-item>
								  <el-form-item label="蒸发开启温度">
            				  		<span>{{ props.row.arg[0].evaporation_start_temperature }}</span>
          						</el-form-item>
								  <el-form-item label="换气时间">
            				  		<span>{{ props.row.arg[0].air_change_time }}</span>
          						</el-form-item>
								  <el-form-item label="开度延时">
            				  		<span>{{ props.row.arg[0].opening_delay }}</span>
          						</el-form-item>
								  <el-form-item label="高温报警点">
            				  		<span>{{ props.row.arg[0].high_temperature_alarm_point }}</span>
          						</el-form-item>
								  <el-form-item label="回风温度">
            				  		<span>{{ props.row.arg[0].return_air_temperature }}</span>
          						</el-form-item>
								  <el-form-item label="盘管温度">
            				  		<span>{{ props.row.arg[0].coil_temperature }}</span>
          						</el-form-item>
								<el-form-item label="修正回风温度">
            				  		<span>{{ props.row.arg[0].modified_return_air_temperature }}</span>
          						</el-form-item>
								<el-form-item label="修正出风温度">
            				  		<span>{{ props.row.arg[0].Correct_air_outlet_temperature }}</span>
          						</el-form-item>
								  <el-form-item label="修正回风温度">
            				  		<span>{{ props.row.arg[0].defrosting_temperature_setting }}</span>
          						</el-form-item>
								  <el-form-item label="除霜温度设定">
            				  		<span>{{ props.row.arg[0].defrosting_temperature_setting }}</span>
          						</el-form-item>
								  <el-form-item label="加热开启偏差">
            				  		<span>{{ props.row.arg[0].heating_opening_deviation }}</span>
          						</el-form-item>
								  <el-form-item label="加热停止偏差">
            				  		<span>{{ props.row.arg[0].heating_stop_deviation }}</span>
          						</el-form-item>
								  <el-form-item label="制冷开启偏差">
            				  		<span>{{ props.row.arg[0].refrigeration_start_deviation }}</span>
          						</el-form-item>
								  <el-form-item label="出风温度偏差">
            				  		<span>{{ props.row.arg[0].air_outlet_temperature_deviation }}</span>
          						</el-form-item>
								  <el-form-item label="开机温保设定">
            				  		<span>{{ props.row.arg[0].Starting_temperature_setting }}</span>
          						</el-form-item>
								  <el-form-item label="温差">
            				  		<span>{{ props.row.arg[0].temperature_difference }}</span>
          						</el-form-item>
								  <el-form-item label="送风温度">
            				  		<span>{{ props.row.arg[0].air_supply_temperature }}</span>
          						</el-form-item>
						  </el-form>
					  </template>					  
				  	</el-table-column>
				  	<el-table-column
      					label="名称"
      					prop="name">
    				</el-table-column>
					<el-table-column
      					label="制冷温度"
      					prop="arg[0].refrigeration_temperature">
    				</el-table-column>
					<el-table-column
      					label="模式"
      					prop="arg[0].mode">
    				</el-table-column>
					<el-table-column
      					label="送风温度"
      					prop="arg[0].air_supply_temperature">
    				</el-table-column>
					<el-table-column
      					label="更新时间"
      					prop="date">
    				</el-table-column>
				</el-table>
			</div>

			<!-- power -->
			<div v-for="(item,key) in devinfo" :key="key" v-if="key =='power'" >
				<h3>{{key}}</h3>
				<hr/>
				<el-table :data="item" style="width: 100%">
				  	<el-table-column label="" type="expand">
					  <template slot-scope="props">
						  <el-form label-position="left" inline class="demo-table-expand">
							  	<el-form-item label="名称">
            				  		<span>{{ props.row.name }}</span>
          						</el-form-item>
								  <el-form-item label="有功功率">
            				  		<span>{{ props.row.arg[0].active_power }}</span>
          						</el-form-item>
								  <el-form-item label="品牌">
            				  		<span>{{ props.row.arg[0].brand }}</span>
          						</el-form-item>
								  <el-form-item label="状态">
            				  		<span>{{ props.row.arg[0].status }}</span>
          						</el-form-item>
								  <el-form-item label="无功功率">
            				  		<span>{{ props.row.arg[0].reactive_power }}</span>
          						</el-form-item>
								  <el-form-item label="功率因素">
            				  		<span>{{ props.row.arg[0].power_factor }}</span>
          						</el-form-item>
								  <el-form-item label="电量">
            				  		<span>{{ props.row.arg[0].quantity }}</span>          						
          						</el-form-item>								  
								  <el-form-item label="输入电压">
            				  		<span>{{ props.row.arg[0].input_voltage }}</span>
          						</el-form-item>								 
								  <el-form-item label="A相输入电压">
            				  		<span>{{ props.row.arg[0].input_voltage_l1 }}</span>
          						</el-form-item>
								  <el-form-item label="B相输入电压">
            				  		<span>{{ props.row.arg[0].input_voltage_l2 }}</span>
          						</el-form-item>
								  <el-form-item label="C相输入电压">
            				  		<span>{{ props.row.arg[0].input_voltage_l3 }}</span>
          						</el-form-item>
								  <el-form-item label="相输入电流">
            				  		<span>{{ props.row.arg[0].input_current }}</span>
          						</el-form-item>
								  <el-form-item label="A相输入电流">
            				  		<span>{{ props.row.arg[0].input_current_l1 }}</span>
          						</el-form-item>
								  <el-form-item label="B相输入电流">
            				  		<span>{{ props.row.arg[0].input_current_l2 }}</span>
          						</el-form-item>
								  <el-form-item label="C相输入电流">
            				  		<span>{{ props.row.arg[0].input_current_l3 }}</span>
          						</el-form-item>
								   <el-form-item label="相有功功率">
            				  		<span>{{ props.row.arg[0].input_frequency }}</span>
          						</el-form-item>
								   <el-form-item label="A相有功功率">
            				  		<span>{{ props.row.arg[0].input_frequency_l3 }}</span>
          						</el-form-item>
								   <el-form-item label="B相有功功率">
            				  		<span>{{ props.row.arg[0].input_frequency_l3 }}</span>
          						</el-form-item>
								   <el-form-item label="C相有功功率">
            				  		<span>{{ props.row.arg[0].input_frequency_l3 }}</span>
          						</el-form-item>
						  </el-form>
					  </template>					  
				  	</el-table-column>
				  	<el-table-column
      					label="名称"
      					prop="name">
    				</el-table-column>
					<el-table-column
      					label="有功功率"
      					prop="arg[0].active_power">
    				</el-table-column>
					<el-table-column
      					label="无功功率"
      					prop="arg[0].reactive_power">
    				</el-table-column>
					<el-table-column
      					label="功率因素"
      					prop="arg[0].power_factor">
    				</el-table-column>
					<el-table-column
      					label="更新时间"
      					prop="date">
    				</el-table-column>
				</el-table>
			</div>
		<!-- io -->	
			<div v-for="(item,key) in devinfo" :key="key" v-if="key =='io'" >
				<h3>{{key}}</h3>
				<hr/>
				<el-table :data="item" style="width: 100%">
				  	<el-table-column label="" type="expand">
					  <template slot-scope="props">
						  <el-form label-position="left" inline class="demo-table-expand">
							  	<el-form-item label="名称">
            				  		<span>{{ props.row.name }}</span>
          						</el-form-item>
								  <el-form-item label="品牌">
            				  		<span>{{ props.row.arg[0].brand }}</span>
          						</el-form-item>
								  <el-form-item label="8路继电器状态">
            				  		<span>{{ props.row.arg[0].power_status }}</span>
          						</el-form-item>
								  <el-form-item label="8路数字量输入状态">
            				  		<span>{{ props.row.arg[0].input_status }}</span>
          						</el-form-item>								  
						  </el-form>
					  </template>					  
				  	</el-table-column>
				  	<el-table-column
      					label="名称"
      					prop="name">
    				</el-table-column>
					<el-table-column
      					label="品牌"
      					prop="arg[0].brand">
    				</el-table-column>
					<el-table-column
      					label="8路继电器状态"
      					prop="arg[0].power_status">
    				</el-table-column>
					<el-table-column
      					label="8路数字量输入状态"
      					prop="arg[0].input_status">
    				</el-table-column>
					<el-table-column
      					label="更新时间"
      					prop="date">
    				</el-table-column>
				</el-table>
			</div>
			<!-- th -->	
			<div v-for="(item,key) in devinfo" :key="key" v-if="key =='th'" >
				<h3>{{key}}</h3>
				<hr/>
				<el-table :data="item" style="width: 100%">
				  	<el-table-column label="" type="expand">
					  <template slot-scope="props">
						  <el-form label-position="left" inline class="demo-table-expand">
							  	<el-form-item label="名称">
            				  		<span>{{ props.row.name }}</span>
          						</el-form-item>
								  <el-form-item label="品牌">
            				  		<span>{{ props.row.arg[0].brand }}</span>
          						</el-form-item>
								  <el-form-item label="温度">
            				  		<span>{{ props.row.arg[0].temperature }}</span>
          						</el-form-item>
								  <el-form-item label="湿度">
            				  		<span>{{ props.row.arg[0].humidity }}</span>
          						</el-form-item>								  
						  </el-form>
					  </template>					  
				  	</el-table-column>
				  	<el-table-column
      					label="名称"
      					prop="name">
    				</el-table-column>
					<el-table-column
      					label="品牌"
      					prop="arg[0].brand">
    				</el-table-column>
					<el-table-column
      					label="温度"
      					prop="arg[0].temperature">
    				</el-table-column>
					<el-table-column
      					label="湿度"
      					prop="arg[0].humidity">
    				</el-table-column>
					<el-table-column
      					label="更新时间"
      					prop="date">
    				</el-table-column>
				</el-table>
			</div>
		</el-card>
		  </el-col>

		  <!-- warring -->
		  <el-col :span="12">
			<el-card class="all-x">
				  <template>
  					<el-table :data="warringinfo" height="250" style="width: 100%">
    					<el-table-column prop="id" label="id" width="60px"></el-table-column>
    					<el-table-column prop="type" label="type" width="100px"></el-table-column>
    					<el-table-column prop="level" label="level"  width="50px"></el-table-column>
						<el-table-column prop="info" label="info"></el-table-column>
						<el-table-column prop="date" label="date"  width="100px"></el-table-column>
  					</el-table>
				</template>
			  </el-card>
		  </el-col>
		  <!-- log -->
		  <el-col :span="12">
			  <el-card class="all-x">
				  <template>
  					<el-table :data="loginfo" height="250" style="width: 100%">
    					<el-table-column prop="id" label="id" width="100px"></el-table-column>
    					<el-table-column prop="type" label="type"></el-table-column>
						<el-table-column prop="info" label="info"></el-table-column>
						<el-table-column prop="date" label="date"></el-table-column>
  					</el-table>
				</template>
			  </el-card>
		  </el-col>
		</el-row>		
	</section>
</template>

<script>
	import {getDevInfo,getWarringInfo,getLog} from "../api/api";
	export default {		
		data(){
			return{
				cardcss:true,
				loading:true
			}
		},
		computed:{
			devinfo:{
				get() {
					//console.log(this.$store.state.dev.data)
					return this.$store.state.dev.data					
				},
			},
			warringinfo(){
				return this.$store.state.warringinfo.data
			},
			loginfo(){
				return this.$store.state.loginfo.data
			}
		},
		methods:{		
			getdevinfo(){
				getDevInfo({id:3})
				.then((data)=>{
					this.$store.commit('SETDEV',{data:data.data})										
				})
			},
			getwarring(){
				getWarringInfo()
				.then(data=>{
					this.$store.commit('SETWARRING',{data:data.data})
				})
			},
			getinfo(){
				getLog()
				.then(data=>{					
					this.$store.commit('SETLOG',{data:data.data})
				})
			},
			interval(){
				this.getdevinfo()
				this.getwarring()
				this.getinfo()
				this.$notify({message:'已更新数据！！！'})
				//this.loading = false
			}
		},
		mounted(){					
			setInterval(this.interval,30000)
			this.interval()
		}
	}

</script>

<style scoped>
	.all-x{
		width: max-width;
		margin-top: 15px;
	}
	.half{
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