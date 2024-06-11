<template>
  <div>
    <div class="main-content">
      <div class="join-container">
        <h2>포인트 충전</h2>
        <div class="point-select">
          <label @click="addPoints(5000)"> 5,000p </label><br />
          <label @click="addPoints(10000)"> 10,000p </label><br />
          <label @click="addPoints(50000)"> 50,000p </label><br />
          <label @click="addPoints(100000)"> 100,000p </label><br />
        </div>
        <h5 class="price-container">
          <div class="total-price">총 금액: {{ formattedTotalAmount  }}p</div>
          <button type="submit" class="reset-point-button" @click="resetPoints">
            <img
              src="./../../MyCupetPage/image/되돌리기버튼.png"
              alt="new"
              width="20"
              height="20"
            />
          </button>
        </h5>
        <div class="button-container">
          <router-link to="/MyCupetPointMain">
            <button type="button" class="charge-button-small">충전</button>
          </router-link>
          <router-link to="/MyCupetPage">
            <button type="button" class="cancel-button">취소</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCupetPage",
  data() {
    return {
      totalAmount: 0,
    }
  },
  computed: {
    formattedTotalAmount() {
      return new Intl.NumberFormat('ko-KR').format(this.totalAmount)
    },
  },
  methods: {
    addPoints(amount) {
      this.totalAmount += amount
    },
    resetPoints() {
      this.totalAmount = 0
    },
  },
}
</script>

<style scoped>
.join-container {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 30px;
}

.point-select {
  background-color: #f2fff2;
  color: #7e84a3;
  margin-top: 2px;
  padding: 10px;
  width: 210px;
  height: 140px;
}

.point-select label {
  padding: 3px 0px 3px 20px;
  cursor: pointer;
}

.button-container {
  display: flex;
  margin-top: 10px;
}

.charge-button-small {
  background-color: #34a853;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

.charge-button-small:hover {
  background-color: #85c14a;
}

.cancel-button {
  margin-left: 5px;
}

.cancel-button:hover {
  background-color: #85c14a;
}

.total-price {
  margin-top: 13px;
}

.reset-point-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin-left: 7px;
  margin-top: 13px;
}

.price-container {
  display: flex;
  align-items: center;
  text-align: left;
}
</style>
