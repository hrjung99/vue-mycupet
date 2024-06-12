<template>
    <CommonHeader />
    <div class="main-container">
      <CommonSideBar ref="sidebar" />
      <div class="content">
        <h1 style="color:#7E84A3;">게시물 등록</h1>
        <BoardContent v-model:contentData="contentData" @input-change="updateContentData" />
        <button type="button" class="insert-button" @click="BoardInsert">등록</button>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
      </div>
    </div>
    
    <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import BoardContent from "@/components/board/BoardContent.vue";
import '@/components/common/CommonButtonStyle.css';
import axios from 'axios'

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardContent,
  },

  data() {
    return {
      contentData: {
        cupet_board_head_no: '',
        cupet_board_title: '',
        cupet_board_content: '',
      },
    };
  },

  mounted() {
    this.changeSidebarColor();
  },

  methods: {
    
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground("#ffffff");
    },
    updateContentData(data) {
      this.contentData = data;
    },
    BoardInsert() {
      const token = localStorage.getItem('Token')
      
      console.log("contentData: ", this.contentData);
      console.log("token: ", token);

      const contentData = this.contentData

      axios
        .post('/api1/boardInsert', contentData, {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스킴을 사용한 토큰 인증
          },
        })
        .then((response) => {
          if (response.data === '성공') {
            alert('게시물이 등록되었습니다.')
          } else {
            alert('게시물 등록에 실패했습니다.')
          }
          this.$router.push({ path: '/BoardMain'})
        })
        .catch((error) => {
          console.error('Error fetching board details:', error)
        })
    },
  },
}
</script>


<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  background-color: #f2fff2;
}

.content {
  flex: 1;
  align-items: center;
  padding-left: 40px;
  margin-top: 25px;
}

.register-button {
  margin-top: 10px;
  margin-right: 10px;
}
</style>