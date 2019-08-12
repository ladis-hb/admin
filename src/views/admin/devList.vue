<template>
  <div>
    <el-card>
      <el-table :data="devlsit.data" border style="width: 100%">
            <el-table-column fixed prop="generateTime" label="注册日期" sortable ></el-table-column>
            <el-table-column prop="name" label="设备名称" ></el-table-column>
            <el-table-column prop="devid" label="设备Id"></el-table-column>
            <el-table-column prop="brand" label="品牌" ></el-table-column>
            
          </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  computed:{
    devlsit(){
      return this.$route.query
          }
  }
}
</script>

<style lang='scss' scoped >

</style>
