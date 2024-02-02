<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-table :data="userData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [], // 存放从后端获取的多个用户数据
    };
  },
  mounted() {
    // 在组件加载完成后发送请求
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 使用 Axios 发送请求
      this.$http
        .get("/read_test")
        .then((response) => {
          // 请求成功，更新数据
          this.userData = response.data;
        })
        .catch((error) => {
          // 请求失败，处理错误
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
/* 可以添加一些样式 */
</style>
