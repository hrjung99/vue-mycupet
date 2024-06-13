<template>
  <header>
    <div class="header-content">
      <router-link to="/">
        <img src="./assets/logo.png" alt="new" width="60" height="40" />
      </router-link>
      <h3>
        <router-link class="nav-link" to="/" id="main_link"
          >MyCupet</router-link
        >
      </h3>
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "TestHeader",
  async mounted() {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const res = await axios.post(
          "/api2/user/tokenexpcheck",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.headers.authorization) {
          const newToken = res.headers.authorization.split(" ")[1];
          localStorage.removeItem("Token");
          localStorage.setItem("Token", newToken); // 새 토큰 저장

          // Check if a new token was received and trigger reload
        }
        if (res.headers.exptoken) {
          localStorage.removeItem("Token");
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
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
