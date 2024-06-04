<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "KakaoMap",
  data() {
    return {};
  },
  setup() {
    // 마커리스트 저장
    const markers = ref([]);

    // 중앙 좌표값
    const centerCoordinate = ref({
      lat: 33.450701,
      lng: 126.570667,
    });

    const getUserCenter = () => {
      const token = localStorage.getItem("Token");
      axios
        .get("/api1/findpet/getUserLocate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          updateCoordinate(data.UserLocate.locateY, data.UserLocate.locateX);
          initializeMap();
        })
        .catch((error) => {
          alert(error);
        });
    };

    const map = ref(null);
    const marker = ref(null);

    // 지도 초기화 함수
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            centerCoordinate.value.lat,
            centerCoordinate.value.lng
          ),
          level: 3,
        };

        map.value = new window.kakao.maps.Map(container, options);

        // 지도 이동 시 발생하는 dragend 이벤트 핸들러 추가
        window.kakao.maps.event.addListener(map.value, "dragend", () => {
          // 이동 후의 중앙 좌표값 가져오기
          const center = map.value.getCenter();
          // 중앙 좌표값 업데이트
          //updateCoordinate(center.getLat(), center.getLng());
          // 서버로 중앙 좌표값 전송하고 마커 리스트 받아오기
          sendCenterCoordinateToServer(center.getLat(), center.getLng());
        });

        window.kakao.maps.event.addListener(
          map.value,
          "click",
          (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            marker.value = new window.kakao.maps.Marker({
              position: latlng,
            });
          }
        );
      } else {
        console.error("Kakao Maps API is not loaded.");
      }
    };

    // 중앙 좌표값 업데이트 함수
    const updateCoordinate = (newLat, newLng) => {
      centerCoordinate.value.lat = newLat;
      centerCoordinate.value.lng = newLng;
    };

    // 서버로 중앙 좌표값을 전송하고 마커 리스트를 받아오는 함수
    const sendCenterCoordinateToServer = (lat, lng) => {
      axios
        .post("/api1/findpet/getMarkerList", {
          params: {
            lat,
            lng,
          },
        })
        .then((res) => {
          // 받아온 데이터를 기반으로 마커 생성
          createMarkers(res.data.markerList);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    // 마커를 생성하는 함수
    const createMarkers = (markerList) => {
      // 기존 마커 삭제
      markers.value.forEach((marker) => {
        marker.setMap(null);
      });
      markers.value = [];

      // 새로운 마커 생성
      markerList.forEach((markerInfo) => {
        const position = new window.kakao.maps.LatLng(
          markerInfo.locateX,
          markerInfo.locateY
        );

        const newMarker = new window.kakao.maps.Marker({
          title: markerInfo.cupet_pet_no,
          position,
          clickable: true,
          map: map.value, // 지도에 추가
        });

        markers.value.push(newMarker);

        // markerInfo 객체의 속성 값을 포함한 iwContent를 동적으로 생성합니다
        const iwContent = `<div style="padding:5px;">
    <p>Cupet Pet No: ${markerInfo.cupet_pet_no}</p>
    <p>Other Info: ${markerInfo.otherInfo}</p>
  </div>`;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
        });

        window.kakao.maps.event.addListener(newMarker, "click", function () {
          // 마커에 클릭 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map.value, newMarker);
        });
      });
    };

    // 지도 크기 조정 함수
    const resizeMap = () => {
      const mapContainer = document.getElementById("map");
      mapContainer.style.width = "650px";
      mapContainer.style.height = "650px";
    };

    // 컴포넌트가 마운트된 후 실행되는 부분
    onMounted(() => {
      resizeMap();
      getUserCenter();
    });

    return { markers, centerCoordinate, updateCoordinate };
  },
};
</script>

<style>
#result {
  margin-top: 20px;
}
</style>
