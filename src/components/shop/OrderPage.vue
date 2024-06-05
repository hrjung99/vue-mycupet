<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="orderPage">
      <div class="container">
        <main>
          <div class="py-5 text-center"><h2>주문</h2></div>
          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="buylist">구입 목록</span>
                <span class="badge bg-primary rounded-pill">{{ state.items.length }}</span>
              </h4>
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(item, idx) in state.items" :key="idx">
                  <div><h6 class="my-0">{{ item.cupet_prodname }}</h6></div>
                  <span class="text-muted">{{ lib.getNumberFormatted(item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) }}원</span>
                </li>
              </ul>
              <h3 class="text-center total-price">{{ lib.getNumberFormatted(computedPrice) }}원</h3>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">주문자 정보</h4>
              <div class="needs-validation" novalidate="">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="cupet_user_name" class="form-label">이름</label>
                    <input type="text" class="form-control" id="cupet_user_name" v-model="state.form.name">
                  </div>
                  <div class="col-12">
                    <label for="cupet_user_address" class="form-label">주소</label>
                    <input type="text" class="form-control" id="cupet_user_address" v-model="state.form.address">
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
    const state = reactive({
      items: [],
      form: {
        name: "",
        address: "",
        phone: "",
        price: "",
        date: new Date().toISOString().slice(0, 16)
      }
    });

    const load = () => {
      axios.post("/api1/cart/items", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          console.log(data);
          state.items = data;
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });
    };

    const submit = () => {
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
    }

    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += i.cupet_prodprice - i.cupet_prodprice * i.cupet_proddiscountper / 100;
      }
      return result;
    });

    load();
    return { state, lib, computedPrice, submit };
  }
}
</script>

<style scoped>
.orderPage .paybtn {
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>
