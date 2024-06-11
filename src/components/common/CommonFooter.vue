<template>
  <footer>
    <!-- Footer content here -->
    <p>&copy; 2024 MyProject. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "CommonFooter",
};
</script>

<style scoped>
/* Footer component styles here */
footer {
  background-color: #9cd866;
  color: #fff;
  padding: 20px;
  text-align: center;

  /* 항상 화면 맨 끝에 붙이기 */
  /* position: fixed; */
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>