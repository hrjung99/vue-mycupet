<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 카카오맵 API 로드 확인
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map"); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도 생성
        new window.kakao.maps.Map(container, options);
      } else {
        console.error("Kakao Maps API is not loaded.");
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 100vw; /* 뷰포트 너비에 맞게 설정 */
  height: 100vh; /* 뷰포트 높이에 맞게 설정 */
}
</style>
