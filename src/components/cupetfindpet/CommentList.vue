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
        <button
          v-if="state.cupet_user_id === comment.cupet_user_id"
          class="delete-btn"
          @click="toggleDelete(comment.comment_no)"
        >
          X
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
import axios from "axios";
import { reactive, onMounted, watch } from "vue";

export default {
  name: "CommentList",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      cupet_user_id: "",
    });

    const reactiveComments = reactive(
      props.comments.map((comment) => ({
        ...comment,
        hasImage: false,
        showImage: false,
        imageUrl: "",
      }))
    );

    const fetchUserData = () => {
      const token = localStorage.getItem("Token");

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
            state.cupet_user_id = response.data.cupet_user_id;
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      } else {
        console.error("Token not found");
      }
    };

    const deleteCommentImage = (comment_no) => {
      axios
        .get(`/api1/images/delete/comment?use_id=${comment_no}`)
        .then(() => {
          const comment = reactiveComments.find(
            (c) => c.comment_no === comment_no
          );
          if (comment) {
            comment.imageUrl = null;
          }
        })
        .catch((error) => {
          console.error("사용자 이미지 삭제 중 에러:", error);
          alert("사용자 이미지 삭제에 실패했습니다.");
        });
    };

    const toggleDelete = (comment_no) => {
      const comment = reactiveComments.find((c) => c.comment_no === comment_no);
      if (comment && comment.imageUrl) {
        deleteCommentImage(comment_no);
      }

      axios
        .post("/api1/findpet/commentDelete", { comment_no })
        .then((response) => {
          console.log("댓글 삭제됨:", response.data);
          alert("댓글이 삭제되었습니다.");
          const index = reactiveComments.findIndex(
            (c) => c.comment_no === comment_no
          );
          if (index !== -1) {
            reactiveComments.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error("댓글 삭제 중 오류 발생:", error);
          alert("댓글 삭제에 실패했습니다.");
        });
    };

    const checkImages = () => {
      reactiveComments.forEach((comment) => {
        axios
          .get(`/api1/images/comment/${comment.comment_no}`)
          .then((response) => {
            if (response.data.data) {
              console.log(`Image found for comment ${comment.comment_no}`);
              comment.hasImage = true;
              comment.imageUrl = response.data.data;
            } else {
              console.log(`No image for comment ${comment.comment_no}`);
            }
          })
          .catch((error) => {
            console.error("Error checking pet image:", error);
          });
      });
    };

    const toggleImage = (comment_no) => {
      const comment = reactiveComments.find((c) => c.comment_no === comment_no);
      if (comment) {
        comment.showImage = !comment.showImage;
      } else {
        console.error(`Comment with comment_no ${comment_no} not found`);
      }
    };

    onMounted(() => {
      fetchUserData();
      checkImages();
    });

    watch(
      () => props.comments,
      (newComments) => {
        reactiveComments.splice(
          0,
          reactiveComments.length,
          ...newComments.map((comment) => ({
            ...comment,
            hasImage: false,
            showImage: false,
            imageUrl: "",
          }))
        );
        checkImages();
      }
    );

    return {
      state,
      reactiveComments,
      toggleImage,
      toggleDelete,
    };
  },
};
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

.image_btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: -45px;
  margin-left: -200px;
  margin-left: 5px;
  z-index: 1;
}

.delete-btn {
  background-color: transparent;
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: black;
  margin-right: 120px;
  margin-top: -3px;
  position: absolute;
  align-self: center;
  right: 0;
  z-index: 1;
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
