<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="预定负责人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="会议室">
        <el-select
          v-model="form.meetingRoom"
          placeholder="请选择会议室MeetingRoomID"
        >
          <el-option label="26楼401" value="401"></el-option>
          <el-option label="26楼402" value="402"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="5">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.date"
            style="width: 100%"
            @change="dateCheck"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="时段">
        <el-radio-group v-model="form.timeSlot">
          <el-radio
            v-for="hour in hours"
            :key="hour.hour"
            :label="hour.hour"
            :disabled="hour.disabled"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        meetingRoom: "",
        date: new Date(),
        timeSlot: "",
        desc: "",
      },
      hours: [], // 存储从8:00到19:00的时间数组
    };
  },
  created() {
    this.generateHours();
    this.dateCheck();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    },
    dateCheck() {
      // axios
      console.log(this.form.date);
      const params = {
        date: this.form.date,
      };
      axios
        .get("/read_appointment")
        .then((response) => {
          const disabledHours = response.data; // 假设返回的是一个数组，里面包含数据库中禁用的小时
          this.hours.forEach((hour) => {
            hour.disabled = disabledHours.includes(hour.hour);
          });
        })
        .catch((error) => {
          console.error("Error fetching disabled hours:", error);
        });
    },
    generateHours() {
      for (let i = 8; i <= 19; i++) {
        this.hours.push({
          hour: `${i}:00 - ${i + 1}:00`,
          disabled: false, // 默认都是可用的
        });
      }
    },
  },
};
</script>
