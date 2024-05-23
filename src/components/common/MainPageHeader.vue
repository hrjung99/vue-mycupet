<template>
  <ul class="nav nav-pills nav-justified">
    <li class="nav-item">
      <a href="#">
        <router-link class="nav-link" to="" id="home_link"
          >홈페이지</router-link
        >
      </a>
    </li>

    <template v-if="principal && principal.mid !== 'admin'">
      <li class="nav-item">
        <a href="#">
          <router-link class="nav-link" to="" id="mypage_link"
            >마이페이지</router-link
          >
        </a>
      </li>
    </template>
    <template v-else-if="principal && principal.mid === 'admin'">
      <li class="nav-item">
        <router-link class="nav-link" to="/Login" id="member_link"
          >회원관리</router-link
        >
      </li>
    </template>
    <template v-else>
      <li class="nav-item">
        <a href="./../user/LoginForm.vue">
          <router-link class="nav-link" to="" id="login_link"
            >로그인</router-link
          >
        </a>
      </li>
    </template>

    <li class="nav-item">
      <a href="#">
        <router-link class="nav-link" to="" id="petfind_link"
          >반려동물 찾기</router-link
        >
      </a>
    </li>
    <li class="nav-item">
      <a href="#">
        <router-link class="nav-link" to="" id="board_link">게시물</router-link>
      </a>
    </li>
    <li class="nav-item">
      <a href="#">
        <router-link class="nav-link" to="" id="shop_link">쇼핑몰</router-link>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      principal: null,
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = true;
      this.principal = {
        mid: "admin",
        mname: "admin",
      };
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  padding: 0;
  list-style: none;
  background-color: #ffffff; /* Optional background color */
}

.nav-item {
  margin: 0 5px; /* Adjust as needed */
}

.nav-link {
  color: #9094a8;
  text-decoration: none;
  padding: 10px 15px;
  display: block;
}
</style>