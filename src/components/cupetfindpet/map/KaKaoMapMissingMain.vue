<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "KakaoMapMissing",
  setup(props, { emit }) {
    const router = useRouter();
    const markers = ref([]);
    const centerCoordinate = ref({
      lat: 37.4956031419934,
      lng: 127.124067847413,
    });

    const getUserCenter = () => {
      const token = localStorage.getItem("Token");
      if (token) {
        axios
          .get("/api1/findpet/getUserLocate", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const data = res.data;
            if (data.msg === "success") {
              updateCoordinate(
                data.UserLocate.locateY,
                data.UserLocate.locateX
              );
            }
            initializeMap();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        initializeMap();
      }
    };

    const map = ref(null);
    const marker = ref(null);

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

        window.kakao.maps.event.addListener(map.value, "dragend", () => {
          const center = map.value.getCenter();
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

        sendCenterCoordinateToServer(
          centerCoordinate.value.lat,
          centerCoordinate.value.lng
        );
      } else {
        console.error("Kakao Maps API is not loaded.");
      }
    };

    const updateCoordinate = (newLat, newLng) => {
      centerCoordinate.value.lat = newLat;
      centerCoordinate.value.lng = newLng;
    };

    const sendCenterCoordinateToServer = (lat, lng) => {
      axios
        .post("/api1/findpet/getMarkerList", {
          params: { lat, lng },
        })
        .then((res) => {
          createMarkers(res.data.markerList);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    const createMarkers = async (markerList) => {
      markers.value.forEach((marker) => {
        marker.setMap(null);
      });
      markers.value = [];

      for (const markerInfo of markerList) {
        const position = new window.kakao.maps.LatLng(
          markerInfo.locateX,
          markerInfo.locateY
        );

        // 새 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          "/img/custommarker.png", // 이미지 경로 수정
          new window.kakao.maps.Size(100, 125) // 이미지 크기 설정
        );

        // 새로운 마커 객체 생성 및 이미지 설정
        const newMarker = new window.kakao.maps.Marker({
          title: markerInfo.cupet_pet_no,
          position,
          clickable: true,
          map: map.value,
          image: markerImage, // 새 이미지 설정
        });

        markers.value.push(newMarker);

        const petDetail = await petdetailInfo(markerInfo.cupet_pet_no);

        window.kakao.maps.event.addListener(newMarker, "click", function () {
          emit("select-pet", petDetail); // 부모 컴포넌트로 펫 정보 전달
        });
      }
    };

    const petdetailInfo = async (petNo) => {
      try {
        const res = await axios.post("/api1/findpet/getPetDetailInfo", {
          petNo,
        });
        return res.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    };

    const resizeMap = () => {
      const mapContainer = document.getElementById("map");
      mapContainer.style.width = "100%";
      mapContainer.style.height = "500px";
    };

    const goToFindPet = () => {
      const token = localStorage.getItem("Token");
      if (token) {
        router.push("/FindPet");
      } else {
        alert("로그인이 필요합니다.");
        router.push("/Login");
      }
    };

    onMounted(() => {
      resizeMap();
      getUserCenter();
    });

    return { markers, centerCoordinate, updateCoordinate, goToFindPet };
  },
};
</script>

<style>
#map {
  width: 25%;
  height: 25%;
}
</style>
