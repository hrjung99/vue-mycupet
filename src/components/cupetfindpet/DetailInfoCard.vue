<template>
  <div
    v-if="petDetail"
    class="card"
    style="width: 25rem; max-height: 80vh; overflow: auto"
  >
    <img :src="petDetail.ImageUrl" class="card-img-top" alt="Pet Image" />
    <div class="card-body">
      <h5 class="card-title">펫 이름: {{ petDetail.cupet_pet_name }}</h5>
      <br />
      <p class="card-text">사례금: {{ petDetail.reward }}</p>
      <p class="card-text">종 이름: {{ petDetail.cupet_pet_type }}</p>
      <p class="card-text">주인 이름: {{ petDetail.cupet_user_name }}</p>
    </div>

    <label style="font-size: 1.2em; font-weight: bold; margin-top: 1em">
      - 제보 목록 -
    </label>
    <div
      class="comment-list"
      style="
        margin-top: 1em;
        border: 1px solid #ccc;
        padding: 1em;
        border-radius: 5px;
        background-color: #f9f9f9;
      "
    >
      <comment-body v-if="comments" :comments="comments" />
    </div>

    <!-- 댓글 입력 폼 컴포넌트를 사용합니다. -->
    <comment-input
      :cupetPetNo="petDetail.cupet_pet_no"
      @comment-added="getComments"
      style="margin-top: 1em"
    />
  </div>
  <div v-else class="alert alert-info" role="alert">
    {{
      loadingComments
        ? "댓글을 가져오는 중입니다..."
        : "펫 정보를 클릭해주세요."
    }}
  </div>
</template>

<script>
import axios from "axios";
import CommentBody from "./CommentList.vue"; // 댓글 바디 컴포넌트 임포트
import CommentInput from "./CommentInputForm.vue"; // 댓글 입력 폼 컴포넌트 임포트

export default {
  name: "DetailInfoCard",
  components: {
    CommentBody, // 댓글 바디 컴포넌트 등록
    CommentInput, // 댓글 입력 폼 컴포넌트 등록
  },
  props: {
    petDetail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      comments: null, // 댓글 목록을 저장할 변수, 초기값은 null로 설정
      loadingComments: false, // 댓글을 불러오는 중인지 여부를 나타내는 변수
    };
  },
  methods: {
    // 서버로부터 댓글을 가져오는 함수
    async getComments() {
      // petDetail에 값이 있는 경우에만 요청 보냄
      if (this.petDetail && this.petDetail.cupet_pet_no) {
        this.loadingComments = true; // 댓글을 불러오는 중임을 표시
        try {
          const res = await axios.post("/api1/findpet/MisssingPetComments", {
            cupetPetNo: this.petDetail.cupet_pet_no,
          });
          this.comments = res.data.list;
        } catch (err) {
          console.error("Error fetching comments:", err);
          // 에러 처리: 적절한 메시지 표시 또는 기타 작업 수행
        } finally {
          this.loadingComments = false; // 댓글 로딩 완료 또는 실패 후에도 로딩 상태 해제
        }
      }
    },
  },
  watch: {
    // petDetail이 변경될 때마다 댓글을 다시 가져옵니다.
    petDetail: {
      immediate: true, // 초기 로드 시에도 호출
      handler() {
        this.getComments();
      },
    },
  },
};
</script>

<style>
.card {
  max-width: 100%; /* 카드의 최대 너비를 화면 크기에 맞춤 */
  font-family: "Noto Sans KR", sans-serif; /* 적절한 한글 글꼴로 변경 */
}

.comment-input-form textarea {
  width: 100%; /* 댓글 입력란이 카드에 꽉 차게 */
}

/* 화면이 작아질 때 요소들의 스타일 조정 */
@media (max-width: 768px) {
  .card {
    /* 화면 크기에 따라 카드의 너비 조정 */
    width: 100%;
    /* 다른 스타일 변경 가능 */
  }

  .comment-input-form button {
    /* 화면 크기에 따라 버튼 스타일 조정 */
    width: 100%;
    /* 다른 스타일 변경 가능 */
  }
}
</style>
