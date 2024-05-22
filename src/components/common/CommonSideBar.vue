
<template>
  <aside>
    <!-- Sidebar content here -->
    <nav>
      <ul>
        <li><a href="#">홈페이지</a></li>
        <li><a href="#">반려동물 찾기</a></li>
        <li><a href="#">마이페이지</a></li>
        <li><a href="#">게시물</a></li>
        <li><a href="#">쇼핑몰</a></li>
        <!-- Add more menu items as needed -->
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "CommonSidebar",
};
</script>

<style scoped>
/* Sidebar component styles here */
aside {
  width: 250px;
  background-color: #f2fff2;
  padding: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-bottom: 10px;
}

nav ul li a {
  color: #000000;
  font-size: 20px;
  text-decoration: none;
}
</style>