<template>
  <div class="comment-container">
    <h3>댓글</h3>
    <div v-if="comments.length === 0" class="alert alert-info" role="alert">
      아직 댓글이 없습니다.
    </div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.content }}</p>
        <small>{{ comment.author }}</small>
      </li>
    </ul>
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <label for="commentContent">댓글 작성</label>
        <textarea
          id="commentContent"
          v-model="newComment.content"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">댓글 작성</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PetComment", // 컴포넌트 이름을 변경합니다.
  props: {
    petId: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newComment: {
        content: "",
      },
    };
  },
  methods: {
    submitComment() {
      // 이벤트를 통해 새로운 댓글을 부모 컴포넌트에 전달합니다.
      this.$emit("add-comment", {
        id: Math.random().toString(36).substring(7),
        content: this.newComment.content,
        author: "사용자",
      });
      // 댓글 작성 후 폼 비우기
      this.newComment.content = "";
    },
  },
};
</script>

<style>
.comment-container {
  margin-top: 20px;
}

.comment-item {
  margin-bottom: 10px;
}
</style>
