<template>
  <aside :style="{ backgroundColor: backgroundColor }">
    <!-- Sidebar content here -->
    <nav>
      <ul>
        <li>
          <router-link class="nav-link" to="/" id="main_link"
            >홈페이지</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/JoinUser" id="member_link"
            >회원가입</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/Login" id="login_link"
            >로그인</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/FindPet" id="findpet_link"
            >반려동물 찾기</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/BoardMain" id="board_link"
            >게시물</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/ShopMain" id="shop_link"
            >쇼핑몰</router-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "CommonSideBar",
  data() {
    return {
      backgroundColor: "#f2fff2", // 초기 배경색 설정
    };
  },
  methods: {
    changeBackground(color) {
      this.backgroundColor = color;
    },
  },
};
</script>

<style scoped>
aside {
  width: 150px;
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
  color: #9094a8; /* 링크 색상 */
  text-decoration: none;
  display: block;
}
</style>
