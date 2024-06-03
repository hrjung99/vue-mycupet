<template>
  <div class="container missingcard-main-container">
    <div class="row justify-content-center">
      <div class="col-md-8 card">
        <div class="card-body text-center">
          <img
            src="./assets/mob.png"
            alt="new"
            class="img-fluid rounded-circle mb-3"
            width="200"
            height="200"
          />
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="id">아이디: {{ state.cupet_user_id }}</label>
              <br />
              <select
                v-model="petName"
                class="form-control"
                style="text-align: center"
                required
              >
                <option value="" disabled>애완 동물을 선택하시오</option>
                <option
                  v-for="pet in petList"
                  :key="pet.id"
                  :value="pet.cupet_pet_no"
                >
                  {{ pet.cupet_pet_name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="missing-time">실종시간 : </label>
              <input
                type="datetime-local"
                id="missing-time"
                v-model="birth"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="map-location">실종위치:</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="map-location"
                  :value="mapLocate.lat"
                  disabled
                />
                <div class="input-group-append">
                  <span class="input-group-text">Latitude</span>
                </div>
              </div>
              <div class="input-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  :value="mapLocate.lan"
                  disabled
                />
                <div class="input-group-append">
                  <span class="input-group-text">Longitude</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="features">특징</label>
              <textarea id="features" class="form-control"></textarea>
            </div>
            <div class="form-group" style="padding-bottom: 20px">
              <label for="reward">사례금</label><br />
              <label>보유 포인트 : {{ state.cupet_user_point }} p</label>
              <input type="number" id="reward" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">
              잃어버린 반려동물 등록
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "MissingPetInfo",
  props: {
    mapLocate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      petList: [],
      state: reactive({}),
      petName: "", // 선택된 동물 이름
      birth: "", // 생년월일 데이터
    };
  },
  methods: {
    redirectToken() {
      const token = localStorage.getItem("Token");
      if (token) {
        alert("토큰 재생성 시작");
        axios
          .post(
            "/api2/user/redirectToken",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            localStorage.removeItem("Token");
            localStorage.setItem("Token", res.data);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      }
    },

    fetchUserData() {
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
            console.log("Data received:", response.data);
            Object.assign(this.state, response.data);
            this.fetchPetData(); // 유저 데이터 받아온 후 펫 데이터도 가져옴
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      } else {
        console.error("Token not found");
      }
    },
    fetchPetData() {
      axios
        .get(`/api1/petView?cupet_user_id=${this.state.cupet_user_id}`)
        .then((response) => {
          this.petList = response.data.petView;
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error);
        });
    },
    submitForm() {
      const formData = {
        petName: this.petName, // 추가된 부분
        birth: this.birth,
        locateX: this.mapLocate.lat,
        locateY: this.mapLocate.lan,
        features: document.getElementById("features").value,
        reward: document.getElementById("reward").value,
      };

      const token = localStorage.getItem("Token");
      if (token) {
        axios
          .post("/api1/findpet/misiinPetInsert", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            var msg = response.data.result;
            if (msg === "notoken") {
              alert("로그인 정보가 만료되었습니다");
              this.$router.push("/FindPet");
            }
            if (msg === "success") {
              alert("등록이 완료되었습니다");
              this.redirectToken();
              this.$router.push("/");
            }
            if (msg === "morepoint") {
              alert("현재 가진 포인트보다 많은 사례금을 입력하였습니다.");
              this.$router.push("/FindPet");
            }
            if (msg === "exist") {
              alert("이미 잃어버린 반려견에 등록되어있습니다.");
              this.$router.push("/FindPet");
            }

            if (msg === "failed") {
              alert("등록에 실패하였습니다.");
              this.$router.push("/FindPet");
            }
          })
          .catch((error) => {
            console.error("Error submitting form", error);
            // 제출 실패시 할 일
          });
      } else {
        console.error("Token not found");
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style>
.missingcard-main-container {
  margin-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
}

.card {
  padding: 20px;
  min-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
