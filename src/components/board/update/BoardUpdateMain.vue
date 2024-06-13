<template>
  <CommonHeader />
  <div class="main-container">
    <CommonSideBar ref="sidebar" />
    <div class="content">
      <h1 style="color: #7e84a3">게시물 수정</h1>

      <BoardUpdateContent
        v-if="viewData.cupet_board_no"  
        :viewData="viewData"
        v-model:contentData="contentData"
        @input-change="updateContentData"
      />

      <button type="button" class="update-button" @click="BoardUpdate">수정</button>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
    </div>
  </div>

  <CommonFooter />
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import CommonSideBar from '@/components/common/CommonSideBar.vue'
import BoardUpdateContent from '@/components/board/update/BoardUpdateContent.vue'
import '@/components/common/CommonButtonStyle.css'
import axios from 'axios'

export default {
  name: 'MainPage',
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardUpdateContent,
  },



  data() {
    return {
      contentData: {
        cupet_board_head_no: '',
        cupet_board_title: '',
        cupet_board_content: '',
      },
      
      viewData: {},
      state: {
        board: {},
      },
    }
  },

  mounted() {
    this.changeSidebarColor()
    const cupet_board_no = this.$route.query.cupet_board_no
    this.getViewData(cupet_board_no)
  },

  methods: {
    getViewData(cupet_board_no) {
      axios
      .get(`/api1/boardView?cupet_board_no=${cupet_board_no}`)
      .then((response) => {
        this.viewData = response.data.board
        console.log('viewData : ', this.viewData)
      })
      .catch((error) => {
        console.error('Error fetching board details:', error)
      })
    },
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground('#ffffff')
    },
    updateContentData(data) {
      // 자식 컴포넌트로부터 변경된 데이터를 받아옴
      this.contentData = data
    },
    BoardUpdate() {
      const token = localStorage.getItem('Token')

      console.log('token: ', token)
      console.log('contentData: ', this.contentData)


      axios
        .post('/api1/boardUpadte', this.contentData, {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스킴을 사용한 토큰 인증
          },
        })
        .then((response) => {
          if (response.data === '성공') {
            alert('게시물이 수정되었습니다.')
          } else {
            alert('게시물 수정이 실패했습니다.')
          }
          this.$router.push({ path: '/BoardMain' })
        })
        .catch((error) => {
          console.error('updating board:', error)
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

.update-button {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
