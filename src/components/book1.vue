<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="appointee" label="预定人">
        <el-input v-model="form.appointee"></el-input>
      </el-form-item>
      <el-form-item prop="meetingRoomID" label="会议室">
        <el-select
          v-model="form.meetingRoomID"
          placeholder="请选择会议室MeetingRoomID"
        >
          <el-option label="26楼401" value="1"></el-option>
          <el-option label="26楼402" value="2"></el-option>
          <el-option label="26楼403" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="活动时间">
        <el-col :span="10">
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
      <el-form-item prop="timeSlot" label="时段">
        <el-radio-group v-model="form.timeSlot">
          <el-radio
            v-for="hour in hours"
            :key="hour.hour"
            :label="hour.hour"
            :disabled="hour.disabled"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="appointmentSubject" label="活动形式">
        <el-input type="textarea" v-model="form.appointmentSubject"></el-input>
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
        appointee: "",
        meetingRoomID: "",
        date: this.today(),
        timeSlot: "",
        appointmentSubject: "",
      },
      rules: {
        appointee: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        meetingRoomID: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        date: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        timeSlot: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        appointmentSubject: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
      },
      hours: [], // 存储从8:00到19:00的时间数组
    };
  },
  created() {
    this.generateHours();
    this.dateCheck();
  },
  methods: {
    //初始化日期选择器
    today() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 表单验证通过，执行提交操作
          console.log(this.form);
          this.$http
            .post("/insert_appointment", this.form)
            .then((response) => {
              this.$message({
                message: "提交成功，预定信息为\n" + this.form.timeSlot,
                type: "success",
              });
            })
            .catch((error) => {
              console.error("提交失败:", error);
            });
        } else {
          // 表单验证失败
          console.log("表单验证失败");
          return false;
        }
      });
    },
    //dateCheck: 用于查询某个日期的可用时段，并渲染到radio上
    //输入：this.form.date
    dateCheck() {
      // axios
      console.log(this.form.date);
      const params = {
        date: this.form.date,
      };
      this.$http
        .get("/read_appointment", { params: params })
        .then((response) => {
          const timeSlot = response.data.map((obj) => obj.timeSlot); // 假设返回的是一个数组，里面包含数据库中禁用的小时
          // console.log(timeSlot);
          // console.log(this.hours);
          this.hours.forEach((item) => {
            item.disabled = timeSlot.includes(item.hour);
            // console.log(item.hour);
          });
        })
        .catch((error) => {
          console.error("Error fetching disabled hours:", error);
        });
    },
    //用于生成radio
    generateHours() {
      for (let i = 8; i <= 19; i++) {
        this.hours.push({
          hour: `${String(i).padStart(2, "0")}:00-${String(i + 1).padStart(
            2,
            "0"
          )}:00`,
          disabled: false, // 默认都是可用的
        });
      }
    },
  },
};
</script>
