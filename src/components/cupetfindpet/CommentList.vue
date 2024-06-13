<template>
  <div class="comments body">
    <!-- 댓글 목록을 여기에 표시합니다. -->
    <div
      v-for="comment in reactiveComments"
      :key="comment.id"
      class="comment-container"
    >
      <div class="comment">
        <p class="comment-text">
          {{ comment.cupet_user_nickname }} : {{ comment.comment }}
        </p>
        <button
          v-if="comment.hasImage"
          class="image_btn"
          @click="toggleImage(comment.comment_no)"
        >
          <img src="./info/assets/사진아이콘.png" class="logo sub-logo" />
        </button>
      </div>
      <img
        v-if="comment.showImage"
        :src="comment.imageUrl"
        alt="comment image"
        class="comment-image"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { reactive, onMounted } from "vue"

export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const reactiveComments = reactive(
      props.comments.map((comment) => ({
        ...comment,
        hasImage: false,
        showImage: false,
        imageUrl: "",
      }))
    )

    const checkImages = () => {
      reactiveComments.forEach((comment) => {
        axios
          .get(`/api1/images/comment/${comment.comment_no}`)
          .then((response) => {
            if (response.data.data) {
              console.log(`Image found for comment ${comment.comment_no}`)
              comment.hasImage = true
              comment.imageUrl = response.data.data
            } else {
              console.log(`No image for comment ${comment.comment_no}`)
            }
          })
          .catch((error) => {
            console.error("Error checking pet image:", error)
          })
      })
    }

    const toggleImage = (comment_no) => {
      const comment = reactiveComments.find((c) => c.comment_no === comment_no)
      if (comment) {
        comment.showImage = !comment.showImage
      } else {
        console.error(`Comment with comment_no ${comment_no} not found`)
      }
    }

    onMounted(checkImages)

    return {
      reactiveComments,
      toggleImage,
    }
  },
}
</script>

<style scoped>
.comment {
  display: flex;
  flex-direction: column;
}

.comment-text {
  display: flex;
  align-items: center;
}

.comment-text p {
  margin-right: 10px;
}

.image_btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: -45px;
  margin-left: -65px;
}

.logo.sub-logo {
  width: 20px;
  height: 20px;
}

.comment-image {
  margin-top: 10px;
  max-width: 100%;
  margin-bottom: 10px;
}
</style>
