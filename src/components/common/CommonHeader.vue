<template>
  <header>
    <!-- Header content here -->
    <div class="header-content">
      <img src="./assets/logo.png" alt="new" width="60" height="40" />
      <h3>Mycupet</h3>
    </div>
  </header>
</template>

<script>
export default {
  name: "TestHeader",
};
</script>

<style scoped>
header {
  background-color: #ffffff;
  padding: 7px;
  color: #9cd866;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-content img {
  margin-right: 10px;
}

.header-content h3 {
  margin: 0;
}
</style>