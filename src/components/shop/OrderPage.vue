<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="orderPage">
      <div class="container">
        <main>
          <div class="py-5 text-center"><h2>주문하기</h2></div>
          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="buylist">구입 목록</span>
                <span class="badge bg-primary rounded-pill">{{ state.items.length }}</span>
              </h4>
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(item, idx) in state.items" :key="idx">
                  <div>
                    <h6 class="my-0">{{ item.cupet_prodname }}</h6>
                    <small class="text-muted">수량: {{ getItemCount(item.cupet_prodno) }}</small>
                  </div>
                  <span class="text-muted">{{ lib.getNumberFormatted(getItemTotalPrice(item)) }}원</span>
                </li>
              </ul>
              <div class="total-info">
                <h4 class="text-right">현재 보유 Point: {{ state.form.point }} &nbsp; 
                  <router-link to="/PayPage">
                    <button type="button" class="charge-button-small">충전</button>
                  </router-link>
                </h4>
              </div>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">배송 정보</h4>
              <div class="needs-validation" novalidate="">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="cupet_user_name" class="form-label">이름</label>
                    <input type="text" class="form-control" id="cupet_user_name" v-model="state.form.name">
                  </div>
                  <div class="col-12">
                    <label for="cupet_receiver_postcode">우편번호</label>
                    <input type="text" class="form-control" id="cupet_receiver_postcode" v-model="state.form.postcode" readonly required />
                    <button type="button" @click="openPostcode">우편번호 찾기</button>
                  </div>
                  <div class="col-12">
                    <label for="cupet_receiver_add">상세 주소</label>
                    <input type="text" class="form-control" id="cupet_receiver_add" v-model="state.form.address" required/>
                </div>
                  <div class="col-12">
                    <label for="cupet_user_phone" class="form-label">연락처</label>
                    <input type="text" class="form-control" id="cupet_user_phone" v-model="state.form.phone">
                  </div>
                  <div class="col-12">
                    <label for="cupet_total_price" class="form-label">총 금액</label>
                    <input type="text" class="form-control" id="cupet_total_price" :placeholder="lib.getNumberFormatted(computedPrice)" v-model="state.form.price" readonly>
                  </div>
                  <div class="col-12">
                    <label for="cupet_order_date" class="form-label">구매 날짜</label>
                    <input type="datetime-local" class="form-control" id="cupet_order_date" v-model="state.form.date" readonly>
                  </div>
                </div>
                <hr class="my-4">
                <button class="paybtn" @click="submit()">결제하기</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import { computed, reactive } from "vue";
import axios from "axios";
import lib from "@/scripts/lib";
import router from "@/router";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import "@/components/common/CommonButtonStyle.css";

export default {
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
  },
  setup() {
    const token = localStorage.getItem("Token");

    const getLocalISOString = () => {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now - timezoneOffset).toISOString().slice(0, 19).replace('T', ' ');
      return localISOTime;
    };

    const state = reactive({
      items: [],
      data: {},
      form: {
        name: "",
        postcode: "",
        address: "",
        phone: "",
        price: "",
        date: getLocalISOString(),
        point: 0
      }
    });

    const openPostcode = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          state.form.postcode = data.zonecode;
          state.form.address = data.roadAddress;
        },
        width: "100%",
        height: "100%",
        maxWidth: "600px",
        maxHeight: "400px",
        popupName: "postcodePopup",
        popupKey: "postcodePopupKey",
      }).open({
        popupName: "postcodePopup",
        left: window.screen.width / 2 - 300,
        top: window.screen.height / 2 - 200,
        width: 600,
        height: 400,
        openOnPopup: true,
      });
    };

    const load = () => {
      axios.post("/api1/cart/items", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          console.log(data);
          state.items = data;
          loadCartCount();
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });

      // 사용자 포인트 로드
      axios.get("/api1/user/point", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          state.form.point = data;
        })
        .catch(error => {
          console.error("Error fetching user points:", error);
        });
    };

    const loadCartCount = () => {
      axios.get("/api1/cart/items/count", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        state.data = response.data;
      })
      .catch(error => {
        console.error("Error fetching cart count:", error);
      });
    };

    const getItemCount = (prodno) => {
      return state.data[prodno] || 0;
    };

    const getItemTotalPrice = (item) => {
      return (item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) * getItemCount(item.cupet_prodno);
    };

    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += getItemTotalPrice(i);
      }
      return result;
    });

    const submit = () => {
      if (computedPrice.value > state.form.point) {
        alert("포인트가 부족합니다.");
        return;
      }

      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);
      args.price = computedPrice.value;
      args.date = state.form.date;

      axios.post("/api1/order", args, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        alert('주문 완료');
        router.push({ path: "/OrdersPage" });
      }).catch(error => {
        console.error("Error submitting order:", error);
      });
    };

    load();
    return { state, lib, computedPrice, submit, getItemTotalPrice, getItemCount, openPostcode };
  }
}
</script>

<style scoped>
.content-container {
  display: flex;
}

.orderPage {
  flex: 1;
  padding: 20px;
}

.total-info {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
