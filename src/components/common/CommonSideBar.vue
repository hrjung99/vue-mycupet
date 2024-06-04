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
        <li v-if="isLoggedIn">
          <router-link class="nav-link" to="/MyCupetPage" id="member_link"
            >마이페이지</router-link
          >
        </li>
        <li v-else>
          <router-link class="nav-link" to="/JoinUser" id="member_link"
            >회원가입</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <router-link @click="logout" class="nav-link" to="/" id="logout_link"
            >로그아웃</router-link
          >
        </li>
        <li v-else>
          <router-link class="nav-link" to="/Login" id="login_link"
            >로그인</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/MissingPetMain" id="findpet_link"
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
      isLoggedIn: false,
      backgroundColor: "#f2fff2", // 초기 배경색 설정
    };
  },
  mounted() {
    const token = localStorage.getItem("Token");
    this.isLoggedIn = !!token;
  },
  methods: {
    changeBackground(color) {
      this.backgroundColor = color;
    },
    logout() {
      // 로그아웃 버튼 클릭 시 로컬 저장소에서 토큰 삭제
      localStorage.removeItem("Token");
      // 로그인 상태를 false로 설정하여 로그인 링크가 표시되도록 변경
      this.isLoggedIn = false;
      // 다른 로그아웃 관련 작업 수행 가능 (예: 서버에 로그아웃 요청 등)
    },
  },
};
</script>

<style scoped>
aside {
  min-width: 150px;
  max-width: 150px;
  padding: 10px;
  flex: 1;
  height: 100vh; /* 사이드바를 전체 높이에 맞춤 */
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
