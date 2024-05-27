<template>
    <div>
      <div class="main-content">
          <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo"/>
          <div class="join-container">
              <h2>마이페이지</h2>
              <div class="form-group">
                  <label for="id">아이디: </label>
              </div>
              <div class="form-group">
                  <label for="nickname">닉네임: </label>
              </div>
              <div class="form-group">
                  <label for="name">이름: </label>
              </div>
              <div class="form-group">
                  <label for="add">주소: </label>
              </div>
              <div class="form-group">
                  <label for="phone">전화번호: </label>
              </div>
              <div class="form-group">
                  <label for="birth">생년월일: </label>
              </div>
              <div class="form-group">
                  <label>성별: </label>
              </div>
              <br/>
          </div>
      </div>

      <div class="sub-content">
          <div class="header-container">
              <h2>나의 애완동물</h2>
              <div class="pet-button-container">
                  <button type="submit" class="plus-button" @click="addNewPet">
                      <img src="./../MyCupetPage/image/플러스버튼.png" alt="new" width="30" height="30"/>
                  </button>
              </div>
          </div>

          <div class="pet-container">
              <div v-for="(pet, index) in petList" :key="index">
                  <MyCupetPetpage v-bind="pet" />
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import MyCupetPetpage from "@/components/MyCupetPage/MyCupetPetpage.vue";

export default {
    name: "MyCupetPage",
    components: {
      MyCupetPetpage,
    },
    data() {
        return {
            petList: [] // 애완동물 목록을 담을 배열
        };
    },
    methods: {
        addNewPet() {
            this.petList.push({
                id: '',
                nickname: '',
                name: '',
                add: '',
                phone: '',
                birth: '',
                gender: '',
                petId: '',
                petNickname: '',
                petName: '',
                petAdd: '',
                petPhone: '',
                petBirth: '',
                petType: ''
            });
        }
    }
};
</script>

<style scoped>
.main-content, .sub-content {
    background-color: #f2fff2;
}

.main-content {
    display: flex;
    align-items: flex-start;
    min-width: 500px;
}

.logo {
    margin-left: 20px;
}

.header-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
}

.plus-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.pet-button-container {
    margin-right: 20px;
}

.pet-container {
    display: flex;
    flex-wrap: nowrap; /* 수평으로만 요소를 배치 */
    overflow-x: auto; /* 요소가 넘칠 경우 가로 스크롤 표시 */
  }

  .pet-container::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }

  .pet-container > * {
    flex: 0 0 auto; /* 자식 요소가 크기를 자동 조정하지 않고 고정 크기로 설정 */
    margin-right: 20px; /* 요소 간 간격 조절 */
  }

.join-container, .pet-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    text-align: left;
}

input {
    flex: 1;
}

button {
    border: none;
    background-color: #f2fff2; 
}

.register-button {
    margin-top: 5px;
    margin-left: 150px;
    background-color: #34a853; 
    color: white; 
    border: none;
    width: 100px;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}

.register-button:hover {
    background-color: #85c14a; 
}
</style>
