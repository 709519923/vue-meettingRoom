<script>
import Movie from "./components/Movie.vue";
import test from "./components/test.vue";
import book from "./components/book.vue";
import record from "./components/record.vue";
import axiosText from "./components/axiosText.vue";
import queryList from "./components/queryList.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Movie,
    test,
    book,
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
      <!-- <axiosText></axiosText> -->
      <!-- <test></test> -->
      <!-- <record></record> -->
      <!-- <book></book> -->
      <queryList></queryList>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
