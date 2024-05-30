<template>
  <div>
    <div id="map"></div>
    <div id="result"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      centerCoordinate: {
        lat: 33.450701,
        lan: 126.570667,
      },
      locateMap: {
        lat: 0,
        lan: 0,
      },
      map: null, // map 객체를 저장할 변수
    };
  },
  mounted() {
    this.resizeMap();
    this.initMap();
  },
  methods: {
    initMap() {
      // 카카오맵 API 로드 확인
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map"); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(
            this.centerCoordinate.lat,
            this.centerCoordinate.lan
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도 생성
        this.map = new window.kakao.maps.Map(container, options);

        // 클릭 이벤트 추가
        window.kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng;

          this.locateMap.lat = latlng.getLat();
          this.locateMap.lan = latlng.getLng();

          let message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
          message += "경도는 " + latlng.getLng() + " 입니다";

          const resultDiv = document.getElementById("result");
          resultDiv.innerHTML = message;
        });
      } else {
        console.error("Kakao Maps API is not loaded.");
      }
    },
    resizeMap() {
      const mapContainer = document.getElementById("map");
      mapContainer.style.width = "650px";
      mapContainer.style.height = "650px";
    },
    relayout() {
      if (this.map) {
        this.map.relayout();
      } else {
        console.error("Map is not initialized.");
      }
    },
  },
};
</script>

<style scoped>
#result {
  margin-top: 20px;
}
</style>
