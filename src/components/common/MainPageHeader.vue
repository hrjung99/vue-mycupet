<template>
  <ul class="nav nav-pills nav-justified">
    <li class="nav-item" v-if="isLoggedIn">
      <router-link @click="logout" class="nav-link" to="/" id="logout_link"
        >로그아웃</router-link
      >
    </li>
    <li class="nav-item" v-else>
      <router-link class="nav-link" to="/Login" id="login_link"
        >로그인</router-link
      >
    </li>

    <li class="nav-item" v-if="isLoggedIn">
      <router-link class="nav-link" to="/MyCupetPage" id="member_link"
        >마이페이지</router-link
      >
    </li>
    <li class="nav-item" v-else>
      <router-link class="nav-link" to="/JoinUser" id="member_link"
        >회원가입</router-link
      >
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/MissingPetMain" id="petfind_link"
        >잃어버린 반려동물</router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/BoardMain" id="board_link"
        >게시물</router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/ShopMain" id="shop_link"
        >쇼핑몰</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      isAuthenticated: false,
      principal: null,
    };
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    const token = localStorage.getItem("Token");
    this.isLoggedIn = !!token;
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = true;
      this.principal = {
        mid: "admin",
        mname: "admin",
      };
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
.nav {
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
}

.nav-item {
  width: calc(100% / 7);
}

.nav-link {
  color: #9094a8;
  text-decoration: none;
  padding: 10px 0;
  display: block;
  text-align: center;
}
</style>