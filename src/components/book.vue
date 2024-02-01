<template>
  <div>
    <el-date-picker
      v-model="selectedDate"
      :picker-options="pickerOptions"
      v-if="showDatePicker"
      @change="handleDateChange"
    />
    <el-button @click="openDatePicker" class="parent-button"
      >选择日期</el-button
    >
    <el-button
      v-for="hour in times"
      :key="hour"
      @click="handleButtonClick(hour)"
      :disabled="isButtonDisabled(hour)"
      class="child-button"
    >
      {{ hour }}:00 - {{ hour + 1 }}:00
    </el-button>
    <el-badge is-dot class="item">预定红点测试</el-badge>
    <!-- 表单提交按钮 -->
    <el-button type="primary" @click="submitForm" class="parent-button"
      >提交预定</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: 8, // 起始小时
      numberOfHours: 11, // 要生成的小时数
      disabledHours: [], // 存储被禁用的小时
      selectedDate: new Date(), // 选择的日期
      showDatePicker: false, // 控制日期选择器显示/隐藏
      formData: {
        selectedTime: null, // 存储所选的时间
        selectedDate: null, // 存储所选的日期
      },
    };
  },
  computed: {
    times() {
      const timesArray = [];
      for (let i = 0; i < this.numberOfHours; i++) {
        const hour = this.startTime + i;
        timesArray.push(hour);
      }
      return timesArray;
    },
    pickerOptions() {
      // 设置日期选择器的可选范围为一周以内
      const oneWeekLater = new Date();
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      return {
        disabledDate(time) {
          return time.getTime() > oneWeekLater.getTime();
        },
      };
    },
  },
  methods: {
    isButtonDisabled(hour) {
      return this.disabledHours.includes(hour);
    },
    handleButtonClick(hour) {
      // 在点击时将按钮状态设置为禁用
      this.disabledHours.push(hour);
      // 存储所选的时间
      this.formData.selectedTime = `${hour}:00 - ${hour + 1}:00`;
    },
    openDatePicker() {
      // 打开日期选择器
      this.showDatePicker = true;
    },
    handleDateChange(date) {
      // 处理日期选择器中日期的变化
      console.log("Selected date:", date);
      // 存储所选的日期
      this.formData.selectedDate = date;
      this.showDatePicker = false;
    },
    submitForm() {
      // 在这里提交表单，使用this.formData中的数据
      console.log("Form Data:", this.formData);
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.child-button {
  /* flex-basis: calc(33.33% - 10px); */
  width: 120px;
  height: 40px;
  font-size: 14px;
  margin-top: 15px;
  display: inline;
}

.parent-button {
  margin-top: 15px;
  display: block;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
