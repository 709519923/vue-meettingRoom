<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="appointmentID"
      label="预约编号"
      width="50"
    ></el-table-column>
    <el-table-column
      prop="appointee"
      label="预约人姓名"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="date"
      label="时间"
      sortable
      :formatter="formatDate"
      width="100"
    ></el-table-column>
    <el-table-column prop="timeSlot" label="时段" width="100"></el-table-column>
    <el-table-column
      prop="appointmentSubject"
      label="预约主题"
    ></el-table-column>
    <el-table-column
      prop="applicationStatus"
      label="申请状态"
    ></el-table-column>
    <el-table-column label="操作" class="operation" width="150px">
      <template slot-scope="scope">
        <!-- 检查申请状态是否为"待审核" -->
        <template v-if="scope.row.applicationStatus === '待审核'">
          <el-button
            type="primary"
            size="mini"
            @click="handleAgree(scope.$index, scope.row)"
            :disabled="agreeButton"
          >
            同意
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleRefuse(scope.$index, scope.row)"
            :disabled="refuseButton"
          >
            拒绝
          </el-button>
        </template>

        <!-- 检查申请状态是否为"审核已同意" -->
        <template v-else-if="scope.row.applicationStatus === '已审核通过'">
          <el-button type="primary" size="mini" disabled> 已同意 </el-button>
        </template>
        <template v-else-if="scope.row.applicationStatus === '拒绝'">
          <el-button type="danger" size="mini" disabled> 已拒绝 </el-button>
        </template>
        <!-- 如果需要，可以添加其他状态的条件判断 -->
      </template>
    </el-table-column>
    <el-table-column prop="meetingRoomID" label="会议室"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // 存放从后端获取的多个用户数据
      agreeButton: false,
      refuseButton: false,
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
        .get("/read_appointment")
        .then((response) => {
          // 请求成功，更新数据
          this.tableData = response.data;
        })
        .catch((error) => {
          // 请求失败，处理错误
          console.error("Error fetching data:", error);
        });
    },
    formatDate(row, column) {
      console.log(row[column.property]);
      const timestamp = row[column.property];
      console.log(timestamp);
      // const milliseconds = timestamp / 1000;
      // console.log(milliseconds);
      const date = new Date(timestamp);
      console.log(date);
      return date.toLocaleDateString("zh").replaceAll("/", "-");
    },
    async handleAgree(index, row) {
      try {
        console.log(row.appointmentID);
        const response = await this.$http.post("/update_appointment", {
          // 请求参数:预约编号
          appointmentID: row.appointmentID,
          applicationStatus: "已审核通过",
        });
        this.$set(this.tableData, index, {
          ...row,
          applicationStatus: "已审核通过",
        });
      } catch (error) {
        console.error("请求失败:", error);
        // 处理请求失败的逻辑
      }
    },
    async handleRefuse(index, row) {
      try {
        console.log(row.appointmentID);
        const response = await this.$http.post("/update_appointment", {
          // 请求参数:预约编号
          appointmentID: row.appointmentID,
          applicationStatus: "拒绝",
        });
        this.$set(this.tableData, index, {
          ...row,
          applicationStatus: "拒绝",
        });
      } catch (error) {
        console.error("请求失败:", error);
        // 处理请求失败的逻辑
      }
    },
  },
  computed: {
    isButtonDisabled() {
      return (
        this.scope.row.applicationStatus == "已审核通过" ||
        this.scope.row.applicationStatus == "拒绝"
      );
    },
  },
};
</script>

<style>
.operation {
  display: block;
}
</style>
