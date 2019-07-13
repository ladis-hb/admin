<template>
  <transition>
    <keep-alive>
      <!-- warring -->
      <el-col :span="24" class="all-x">
        <template>
          <h3>{{type == 'error'?'错误信息':'日志信息'}}</h3>
          <el-table :data="infodata" max-height="550" style="width: 100%">
            <el-table-column prop="id" label="id" width="60px" fixed sortable></el-table-column>
            <el-table-column prop="type" label="type" width="100px" sortable></el-table-column>
            <el-table-column
              prop="level"
              label="level"
              width="100px"
              v-if="type == 'error'"
              sortable
            ></el-table-column>
            <el-table-column prop="info" label="info" sortable></el-table-column>
            <el-table-column prop="date" label="date" width="100px" sortable></el-table-column>
          </el-table>
        </template>
      </el-col>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "log",
  data() {
    return {};
  },
  props: ["infodata", "type"],
  methods: {}
};
</script>

<style scoped>
.all-x {
  width: max-width;
  margin-top: 15px;
  border-top: groove;
}
</style>


