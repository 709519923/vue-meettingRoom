<script>
import Movie from "./components/Movie.vue";
import test from "./components/test.vue";
import test2 from "./components/test2.vue";
import book from "./components/book.vue";
import book1 from "./components/book1.vue";
import record from "./components/record.vue";
import axiosText from "./components/axiosText.vue";
import queryList from "./components/queryList.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Movie,
    test,
    test2,
    book,
    book1,
    record,
    axiosText,
    queryList,
  },
};
</script>

<template>
  <div id="app">
    <div class="container">
      <!-- <Movie titile="深分会议室预定系统（测试版）"></Movie> -->
      <!-- <test titile=" 1会议室" bookTime="book-time"></test> -->
      <!-- <axiosText></axiosText>
      <test></test>
      <test2></test2>
      <record></record>
      <book></book>
      <queryList></queryList> -->
      <router-link to="/admin">预约审核</router-link>
      <router-link to="/book">预定</router-link>
      <router-link to="/book1">预定1</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
