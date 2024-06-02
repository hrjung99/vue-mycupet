<template>
  <div>
    <form>
      <div class="HeaderAndTitle">
        <BoardSelectOption id="cupet_board_head_no" name="cupet_board_head_no" v-model="cupet_board_head_no" />
        <input
          class="cupet_board_title"
          id="cupet_board_title"
          name="cupet_board_title"
          v-model="cupet_board_title"
          required="required"
          placeholder="게시물 제목을 입력해주세요"
        />
        <br />
      </div>
      <ckeditor
        class="cupet_board_content"
        id="cupet_board_content"
        name="cupet_board_content"
        :editor="editor"
        v-model="cupet_board_content"
        :config="editorConfig"
      ></ckeditor>

      <button
        type="button"
        class="delete-button"
        @click="BoardInsert"
      >
        등록
      </button>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BoardSelectOption from '@/components/board/BoardSelectOption.vue'
import axios from 'axios'

export default {
  name: 'MainPage',
  components: {
    BoardSelectOption,
  },
  data() {
    return {
      cupet_board_title: '',
      cupet_board_content: '',
      cupet_board_head_no: '',
      editor: ClassicEditor,
      editorConfig: {
        placeholder: '게시물 내용을 입력해주세요',
        require: 'require',
      },
    }
  },
  methods: {
    BoardInsert() {
      const token = localStorage.getItem('Token')
      const getInsertData = {
        cupet_board_title: this.cupet_board_title,
        cupet_board_content: this.cupet_board_content,
        cupet_board_head_no: this.cupet_board_head_no,
      }
      axios
        .post('/api1/boardInsert', getInsertData, {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스킴을 사용한 토큰 인증
          },
        })
        .then((response) => {
          if (response.data === '성공') {
            alert('성공')
          } else {
            alert('실패')
          }
          this.$router.push({ path: '/BoardMain' })
        })
        .catch((error) => {
          console.error('Error fetching board details:', error)
        })
    },
  },
}
</script>

<style>
.cupet_board_title {
  width: 100%; /* CKEditor가 전체 너비를 사용하도록 설정 */
  max-width: 600px; /* 제목과 같은 최대 너비 설정 */
}

.cupet_board_content {
  width: 100%; /* 원하는 크기 비율로 설정 */
  max-width: 600px; /* 예시로 최대 너비를 600px로 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 너비를 계산 */
}

.HeaderAndTitle {
  display: flex;
  flex-direction: row;
}
</style>
