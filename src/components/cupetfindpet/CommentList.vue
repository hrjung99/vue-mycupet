<template>
  <div class="comments body">
    <!-- 댓글 목록을 여기에 표시합니다. -->
    <div v-for="comment in comments" :key="comment.id">
      <p>{{ comment.cupet_user_nickname }} : {{ comment.comment }}</p>
      <!-- 이미지 아이콘이 있는 경우에만 아이콘을 표시합니다. -->
      <div v-if="comment.image">
        <a :href="comment.image.url" target="_blank">
          <img src="icon/image-icon.png" alt="Image Icon" class="image-icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.image-icon {
  width: 20px; /* 이미지 아이콘의 너비 설정 */
  height: 20px; /* 이미지 아이콘의 높이 설정 */
  cursor: pointer; /* 클릭 가능한 커서로 설정 */
}
</style>
