<template>
  <aside>
    <!-- Sidebar content here -->
    <nav>
      <ul>
        <li><a href="#">홈페이지</a></li>
        <li><a href="#">회원가입</a></li>
        <li><a href="#">반려동물 찾기</a></li>
        <li><a href="#">게시물</a></li>
        <li><a href="#">쇼핑몰</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'CommonSidebar'
};
</script>

<style scoped>
aside {
  width: 250px;
  background-color: #ffffff;
  padding: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

nav ul li {
  margin-bottom: 10px;
}

nav ul li a {
  color: #9094A8;
  text-decoration: none;
  display: block;
}
</style>