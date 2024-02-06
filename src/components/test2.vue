<template>
  <div>
    <el-button
      v-for="hour in times"
      :key="hour"
      @click="handleButtonClick(hour)"
      :disabled="isButtonDisabled(hour)"
      class="child-button"
    >
      <el-badge :is-dot="isDotStatus[hour]" class="item">
        {{ hour }}:00 - {{ hour + 1 }}:00
      </el-badge>
    </el-button>

    <el-row>
      <el-col :span="8">
        <el-button @click="submitForm" type="primary">提交表单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: [8, 9, 10, 11, 12], // Example times array
      isDotStatus: {}, // Object to store is-dot status for each button
    };
  },
  methods: {
    handleButtonClick(hour) {
      // Toggle is-dot status for the clicked button
      this.$set(this.isDotStatus, hour, !this.isDotStatus[hour]);
      console.log(this.isDotStatus[hour]);
      // Perform other actions as needed
      //   if (hour >= this.currentHour) {
      //     // Toggle is-dot status for the clicked button
      //     this.$set(this.isDotStatus, hour, !this.isDotStatus[hour]);
      //     // Perform other actions as needed
      //   }
    },
    isButtonDisabled(hour) {
      // Add your logic to determine if the button should be disabled
      const currentHour = new Date().getHours();
      //   console.log(hour);
      //   console.log(currentHour);

      if (hour >= currentHour) {
        return false;
      } else {
        return true;
      }
    },
    submitForm() {
      // Collect the is-dot status for each button
      const selectedButtons = Object.keys(this.isDotStatus).filter(
        (hour) => this.isDotStatus[hour]
      );

      // Now 'selectedButtons' contains the hours for which is-dot is true
      console.log("Selected Buttons:", selectedButtons);

      // Perform your form submission logic here
    },
  },
};
</script>
