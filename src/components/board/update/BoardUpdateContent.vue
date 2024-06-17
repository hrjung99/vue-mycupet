<template>
  <div>
    <form id="BoardContent" name="BoardContent" @input="handleInput">
      <div class="HeaderAndTitle">
        <BoardUpdateOption
          id="cupet_board_head_no"
          name="cupet_board_head_no"
          v-model="localContentData.cupet_board_head_no"
          :value="localContentData.cupet_board_title" />

        <input
          class="cupet_board_title"
          name="cupet_board_title"
          required="required"
          :value="localContentData.cupet_board_title"
          placeholder="게시물 제목을 입력해주세요"
          @input="updateTitle($event.target.value)"
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
import BoardUpdateOption from '@/components/board/update/BoardUpdateOption.vue'

export default {
  name: 'BoardUpdateContent',
  components: {
    BoardUpdateOption,
  },
  props: {
    viewData: {
      type: Object,
      required: true,
    },
    contentData: {
      type: Object,

      default: () => ({
        cupet_board_head_no: '',
        cupet_board_title: '',
        cupet_board_content: '',
      }),
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: '게시물 내용을 입력해주세요',
      },
      localContentData: {
        cupet_board_head_no: '',
        cupet_board_title: '',
        cupet_board_content: '',
      },
    }
  },


  mounted() {
    console.log('viewData in update content : ', this.viewData)
    // viewData로 초기값 설정
    this.localContentData.cupet_board_head_no = this.viewData.cupet_board_head_no
    this.localContentData.cupet_board_title = this.viewData.cupet_board_title
    this.localContentData.cupet_board_content = this.viewData.cupet_board_content

    
  },

  methods: {
    handleInput() {
      this.$emit('input-change', this.localContentData)
    },
      updateTitle(value) {
        this.localContentData.cupet_board_title = value
        this.handleInput()

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
