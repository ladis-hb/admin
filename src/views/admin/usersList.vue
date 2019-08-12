<template>
  <el-container class="cont">
    <el-row>
      <el-col cols=":24">
        <el-card>
          <el-table :data="userlsit.data" border style="width: 100%">
            <el-table-column fixed prop="creatTime" label="注册日期" width="150"></el-table-column>
            <el-table-column prop="name" label="用户名" width="80"></el-table-column>
            <el-table-column prop="mail" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="tel" label="电话" width="120"></el-table-column>
            <el-table-column prop="address" label="登录地址" width="120"></el-table-column>
            <el-table-column prop="orgin" label="组织"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="dialog">
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="userinfo">
          <el-form-item label="名称:" :label-width="formLabelWidth">
            <el-input v-model="userinfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组织:" :label-width="formLabelWidth">
            <el-input v-model="userinfo.orgin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话:" :label-width="formLabelWidth">
            <el-input v-model="userinfo.tel" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;dialogFormVisible_load=false">取 消</el-button>
          <el-button type="primary" @click="modify_user_info" :loading="dialogFormVisible_load">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import { modify_user_info } from "../../api/api";
export default {
  data() {
    return {
      userinfo: {
        address: "",
        creatTime: "",
        mail: "",
        name: "",
        orgin: "",
        tel: ""
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      dialogFormVisible_load: false
    };
  },
  computed: {
    userlsit() {
      return this.$route.query;
    },
    //用户名
    Sysname() {
      return (
        this.$store.state.user.name ||
        JSON.parse(sessionStorage.getItem("user"))
      );
    },
    Token() {
      return this.$store.state.token || sessionStorage.getItem("token");
    }
  },
  methods: {
    handleClick(row) {
      this.userinfo = row;
      this.dialogFormVisible = true;
    },
    async modify_user_info() {
      this.dialogFormVisible_load = true;
      let { data } = await modify_user_info({
        user: this.Sysname,
        token: this.Token,
        mail: this.userinfo.mail,
        name: this.userinfo.name,
        orgin: this.userinfo.orgin,
        tel: this.userinfo.tel
      });
      if (data.code == 200) {
        this.dialogFormVisible = false;
        this.dialogFormVisible_load = false;
        this.$router.push("/onlineList");
      }
    }
  }
};
</script>

<style lang='scss' scoped >
</style>
