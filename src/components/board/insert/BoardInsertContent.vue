<template>
  <div>
    <form id="BoardContent" name="BoardContent" @input="handleInput">
      <div class="HeaderAndTitle">
        <BoardInsertOption
          id="cupet_board_head_no"
          name="cupet_board_head_no"
          v-model="localContentData.cupet_board_head_no"
        />

        <input
          class="cupet_board_title"
          name="cupet_board_title"
          required="required"
          placeholder="게시물 제목을 입력해주세요"
          v-model="localContentData.cupet_board_title"
        />
        <br />
      </div>
      <ckeditor
        class="cupet_board_content"
        id="cupet_board_content"
        name="cupet_board_content"
        :editor="editor"
        v-model="localContentData.cupet_board_content"
        :config="editorConfig"
		@input="handleInput"
      ></ckeditor>
    </form>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BoardInsertOption from '@/components/board/insert/BoardInsertOption.vue'

export default {
  name: 'BoardInsertContent',
  components: {
    BoardInsertOption,
  },
  props: {
    contentData: Object,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: '게시물 내용을 입력해주세요',
        require: 'require',
      },
      localContentData: {
        cupet_board_head_no: '',
        cupet_board_title: '',
        cupet_board_content: '',
      },
    }
  },
  watch: {
    contentData: {
      immediate: true,
      handler(newVal) {
        this.localContentData = { ...newVal }
      }
    }
  },
  methods: {

    handleInput() {
      this.$emit('input-change', this.localContentData)
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