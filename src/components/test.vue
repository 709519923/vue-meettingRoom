<template>
  <div>
    <el-button
      type="primary"
      @click="openConfirmationDialog"
      class="parent-button"
    >
      提交预定
    </el-button>

    <el-dialog
      title="确认预定信息"
      :visible.sync="dialogVisible"
      width="80%"
      @close="handleDialogClose"
    >
      <!-- 显示表单信息的内容 -->
      <p>预定人姓名: {{ formData.name }}</p>
      <p>联系电话: {{ formData.phone }}</p>
      <p>预约时间: {{ formData.reservationTime }}</p>
      <p>会议用途: {{ formData.purpose }}</p>

      <!-- 确认和取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleConfirm">确认</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "", // 从表单中获取的姓名
        phone: "", // 从表单中获取的电话
        reservationTime: "", // 从表单中获取的预约时间
        purpose: "", // 从表单中获取的会议用途
      },
      dialogVisible: false, // 控制对话框的显示状态
    };
  },
  methods: {
    openConfirmationDialog() {
      // 在提交按钮点击时打开确认对话框
      this.dialogVisible = true;
    },
    handleConfirm() {
      // 在确认按钮点击时执行确认操作
      // 在这里可以添加提交表单的逻辑
      console.log("Form Data Submitted:", this.formData);

      // 关闭对话框
      this.dialogVisible = false;
    },
    handleCancel() {
      // 在取消按钮点击时执行取消操作
      // 可以在需要时进行一些清理操作
      // 关闭对话框
      this.dialogVisible = false;
    },
    handleDialogClose() {
      // 处理对话框关闭时的逻辑
      // 可以在需要时进行一些清理操作
    },
  },
};
</script>

<style scoped>
.parent-button {
  margin-top: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
