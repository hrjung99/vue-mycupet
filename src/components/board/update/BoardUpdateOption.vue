<template>
  <div>
    <select
      class="form-select"
      aria-label="SelectOption"
      v-model="state.selectedOption"
      @change="emitSelectedOption"
    >
      <option
        v-for="item in state.list"
        :key="item.cupet_board_head_no"
        :value="item.cupet_board_head_no"
      >
        {{ item.cupet_board_head_name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive, onMounted, watch } from 'vue'

export default {
  name: 'BoardUpdateOption',
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const state = reactive({ list: [], selectedOption: props.modelValue })
    const token = localStorage.getItem('Token')
    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }

    onMounted(() => {
      axios
        .get('/api1/selectOptionList', config)
        .then((response) => {
          state.list = response.data.list
          if (state.list.length > 0 && !state.selectedOption) {
            state.selectedOption = state.list[0].cupet_board_head_no
            emit('update:modelValue', state.selectedOption)
          }
        })
        .catch((error) => {
          console.error('Error fetching select options:', error)
        })
    })

    watch(
      () => props.modelValue,
      (newVal) => {
        state.selectedOption = newVal
      }
    )

    const emitSelectedOption = () => {
      emit('update:modelValue', state.selectedOption)
    }

    return { state, selectedOption: state.selectedOption, emitSelectedOption }
  },
}
</script>

<style>
/* 셀렉트 요소 스타일링 */
.form-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #9cd866; /* 셀렉트의 배경색 */
  border: 1px solid #9cd866;
  font-size: 14px; /* Decrease font size */
  color: white;
  padding: 6px 30px 6px 10px; /* Adjust padding to decrease height */
  background-image: url('@/components/common/assets/dropdown2.png'); /* 로컬 화살표 이미지 경로 */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 10px;
  border-radius: 0; /* Remove rounded corners */
  height: 35px; /* Reduce the height of the select box */
  line-height: 30px; /* Center text vertically */
}

/* 기본 화살표 제거 (IE) */
.form-select::-ms-expand {
  display: none;
}

/* 옵션 스타일링 */
.form-select option {
  background-color: white;
  color: black;
}
</style>
