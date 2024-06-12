<template>
  <div class="comment-input-form">
    <!-- 댓글 입력 폼을 여기에 표시합니다. -->
    <textarea v-model="newComment" rows="2"></textarea>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      style="margin-bottom: 0.5em"
    />
    <button @click="addComment" :disabled="!isCommentValid">제보 하기</button>
    <!-- 입력 필드가 비어 있을 때 메시지 표시 -->
    <p v-if="!isCommentValid" style="color: red">목격 정보를 입력해주세요</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  props: {
    cupetPetNo: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newComment: "", // 새로운 댓글을 입력하는 변수
      selectedFile: null,
    }
  },
  computed: {
    isCommentValid() {
      return this.newComment.trim() !== "" // 입력된 댓글이 비어있지 않은지 확인
    },
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.imageUrl = URL.createObjectURL(file)
      }
    },
    uploadImage(file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("image_type", "comment")
      formData.append("use_id", file.use_id)

      axios
        .post("/api1/images/upload/comment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("이미지가 업로드되었습니다.")
        })
        .catch((error) => {
          console.error("이미지 업로드 중 오류 발생:", error)
          alert("이미지를 업로드하는 중 오류가 발생했습니다.")
        })
    },
    // 새로운 댓글을 추가하는 함수
    addComment() {
      const token = localStorage.getItem("Token")
      if (!token) {
        alert("로그인이 필요합니다")
        // 로그인 페이지로 이동
        this.$router.push("/Login")
        return
      }

      // 파일 선택 확인
      const file = this.$refs.fileInput.files[0]
      if (!file) {
        alert("이미지를 선택해주세요.")
        return
      }

      // 댓글 데이터 JSON 생성
      const commentData = {
        content: this.newComment,
        cupetPetNo: this.cupetPetNo,
      }

      axios
        .post("/api1/findpet/addComment", commentData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.newComment = "" // 입력 필드 초기화
          this.$refs.fileInput.value = "" // 파일 입력 필드 초기화
          this.$emit("comment-added") // 이벤트 발생
          const comment_no = response.data
          if (comment_no != "failed") {
            // 파일 입력 요소에서 파일을 가져옵니다.
            if (file) {
              file.use_id = comment_no
              this.uploadImage(file)
            }
          }
        })
        .catch((err) => {
          console.error("Error adding comment:", err)
        })
    },
  },
}
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가할 수 있습니다. */
</style>
