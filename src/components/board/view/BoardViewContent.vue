<template>
  <div class="container mt-5 p-4" style="background-color: #F2FFF2; border-radius: 10px; max-width: 800px; margin: auto;">
    <div class="content">
      <h4 class="text-muted mb-1">{{ state.board.cupet_board_head_name }}</h4>
      <h1 style="color: #34A853;">{{ state.board.cupet_board_title }}</h1>
      <div class="d-flex justify-content-between text-muted mb-4">
        <div>
          <span>{{ state.board.cupet_user_nickname }}</span> | 
          <span>{{ state.board.cupet_board_regdate }}</span> | 
          <span>조회수: {{ state.board.cupet_board_viewcnt }}</span>
        </div>
      </div>
      <div class="p-4" style="background-color: #FFFFFF; border: 1px solid #9CD866; border-radius: 5px;">
        <div class="content-box">
          <div v-html="cleanContent(state.board.cupet_board_content)"></div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-start mt-4">
      <button
        v-if="state.cupet_user_id === state.board.cupet_user_id"
        type="button"
        class="update-button"
        @click="GoToUpdate(state.board.cupet_board_no)"
      >
        수정
      </button>
      <button
        v-if="state.cupet_user_id === state.board.cupet_user_id"
        type="button"
        class="delete-button"
        @click="BoardDelete(state.board.cupet_board_no)"
      >
        삭제
      </button>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      state: {
        board: {},
        cupet_user_id: null,
      },
    }
  },
  mounted() {
    const cupet_board_no = this.$route.query.cupet_board_no
    axios
      .get(`/api1/boardView?cupet_board_no=${cupet_board_no}`)
      .then((response) => {
        this.state.board = response.data.board
        console.log("data : ", this.state.board)
      })
      .catch((error) => {
        console.error("Error fetching board details:", error)
      })
    this.fetchUserData()
  },
  methods: {
    cleanContent(content) {
      if (content) {
        return content.replace(/<p><\/p>/g, '')
      }
      return content
    },
    BoardDelete(cupet_board_no) {
      axios
        .get(`/api1/boardDelete?cupet_board_no=${cupet_board_no}`)
        .then((response) => {
          console.log("Board deleted:", response.data)
          // 삭제 후 BoardMain 페이지로 이동
          this.$router.push("/BoardMain")
        })
        .catch((error) => {
          console.error("Error deleting board:", error)
        })
    },
    fetchUserData() {
      const token = localStorage.getItem("Token")

      if (token) {
        axios
          .post(
            "/api1/userView",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Data received:", response.data)
            this.state.cupet_user_id = response.data.cupet_user_id
          })
          .catch((error) => {
            console.error("Error fetching user details:", error)
          })
      } else {
        console.error("Token not found")
      }
    },
    GoToUpdate(cupet_board_no) {
      this.$router.push({ path: "/BoardUpdateMain", query: { cupet_board_no } })
    },
  },
}
</script>

<style scoped>
.content {
  flex: 1;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

.change-button {
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #34a853;
  color: #ffffff;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #9cd866;
}

.update-button {
  margin-right: 10px;
} 

.delete-button {
  margin-right: 10px;
}

.cancel-button {
  margin-right: 10px;
}

.content-box {
  padding: 10px; /* Adjust padding as needed */
  height: 100%;
}
</style>
