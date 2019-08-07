<template>
  <div>
    <el-progress type="dashboard" :percentage="num10" :format="getHz" :color="colors"></el-progress>
  </div>
</template>

<script>
export default {
  name: "ProgressDashboard",
  data() {
    return {
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  props: {
    num: {
      //type: Number,
      default: 0
    },
    unit: {
      default: "%"
    },
    multip: {
      default: 10,
      type: Number
    }
  },
  computed: {
    num10() {
      //console.log(this.unit)
      if (typeof this.num == "undefined") return 0;
      return this.num / this.multip;
    }
  },
  methods: {
    getHz(p) {
      return `${p * this.multip}${this.unit}`;
    }
  }
};
</script>
