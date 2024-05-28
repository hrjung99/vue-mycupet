<template>
        <div>
            <select class="SelectOption" aria-label="SelectOption">
                <option selected>제목</option>
                <option value="1">작성자</option>
                <option value="2">제목+작성자</option>

            </select>
        </div>
</template>
<script>
export default {
    
}
</script>
<style>
/* 셀렉트 요소 스타일링 */
.SelectOption {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #9cd866; /* 셀렉트의 배경색 */
    border: 1px solid #9cd866;
    font-size: 16px;
    color: white;
    padding-right: 30px; /* 화살표 공간 확보 */
    background-image: url('@/components/common/assets/dropdown2.png'); /* 로컬 화살표 이미지 경로 */
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 10px 10px;
}

/* 기본 화살표 제거 (IE) */
.SelectOption::-ms-expand {
    display: none;
}

/* 옵션 스타일링 */
.SelectOption option {
    background-color: white;
    color: black;
}
</style>