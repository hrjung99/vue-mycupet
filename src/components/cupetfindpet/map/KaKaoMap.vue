<template>
  <div>
    <div id="map"></div>
    <div id="result"></div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "KakaoMap",
  setup() {
    const mapLocate = inject("mapLocate");
    const centerCoordinate = ref({
      lat: 33.450701,
      lan: 126.570667,
    });

    const map = ref(null);
    const marker = ref(null);

    const resizeMap = () => {
      const mapContainer = document.getElementById("map");
      mapContainer.style.width = "650px";
      mapContainer.style.height = "650px";
    };

    const userGetLocate = () => {
      const token = localStorage.getItem("Token");

      axios
        .get("/api1/findpet/getUserLocate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          centerCoordinate.value.lat = data.UserLocate.locateY;
          centerCoordinate.value.lan = data.UserLocate.locateX;

          mapLocate.lat = data.UserLocate.locateY;
          mapLocate.lan = data.UserLocate.locateX;

          initializeMap();
        })
        .catch((error) => {
          alert(error);
        });
    };

    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            centerCoordinate.value.lat,
            centerCoordinate.value.lan
          ),
          level: 3,
        };

        map.value = new window.kakao.maps.Map(container, options);

        window.kakao.maps.event.addListener(
          map.value,
          "click",
          (mouseEvent) => {
            const latlng = mouseEvent.latLng;

            mapLocate.lat = latlng.getLat();
            mapLocate.lan = latlng.getLng();

            // 마커를 생성하고 클릭한 위치에 추가
            if (marker.value) {
              marker.value.setMap(null); // 이전 마커 삭제
            }
            marker.value = new window.kakao.maps.Marker({
              position: latlng,
            });
            marker.value.setMap(map.value); // 지도에 마커 추가
          }
        );
      } else {
        console.error("Kakao Maps API is not loaded.");
      }
    };

    onMounted(() => {
      resizeMap();
      userGetLocate();
    });

    return {
      mapLocate,
    };
  },
};
</script>

<style scoped>
#result {
  margin-top: 20px;
}
</style>
