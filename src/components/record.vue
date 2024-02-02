<template>
  <div>
    <el-card v-for="o in 4" :key="o" class="box-card">
      <div slot="header" class="clearfix">
        <span>第三会议室</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >记录{{ o }}</el-button
        >
      </div>
      <div>
        <div>预定人姓名: 张三</div>
        <div>联系电话: 17354426666</div>
        <div>预定时间: 18:00 - 19:00</div>
        <div>用途： 客户访谈</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%; /* 修改为100%以适应不同屏幕宽度 */
  max-width: 480px; /*设置最大宽度，防止在大屏幕上过宽 */
  margin: 10px auto; /* 居中显示 */
}

@media (max-width: 768px) {
  /* 在屏幕宽度小于等于768px时应用的样式 */
  .box-card {
    max-width: 100%; /* 移动端时撑满屏幕 */
    margin: 10px auto; /* 居中显示 */
  }
}
</style>
