<template>
    <div>
        <table class="board_list">
        <tr>
            <td></td>
            <th>게시물 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
        </tr>
        <!--
        <c:forEach var="board" items="${pageResponseVO.list}">
        -->
        <tr>
            <td><img src="@/components/common/assets/NewIcon.png" width="25" height="15"></td>
            <td style="cursor:pointer;">1</td>
            <td>2</td>
            <td>3</td>  
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
        <!--
        </c:forEach>
        -->
    </table>
        
    </div>
</template>
<script>    
export default {
    
}
</script>
<style>
th {
    text-align: center;
}

td {
    text-align: center;
}

td:nth-child(2n), th:nth-child(2n) {
    background-color: #9cd866;
    color: white;
}

td:nth-child(2n-1), th:nth-child(2n-1) {
    background-color: white;
    color: #7E84A3;
}

/* 모든 테두리를 없앰 */
th, td {
    border: none;
}

/* tr 요소의 아래쪽에만 테두리 추가 */
tr {
    border-bottom: 1px solid black;
}

/* 마지막 tr 요소의 아래쪽 테두리 제거 */
tr:last-child {
    border-bottom: none;
}

</style>