<template>
  <div>
    <h2>{{ titile }} {{ bookTime }}</h2>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: ["titile", "bookTime"],
  //   自定义属性props
};
</script>
