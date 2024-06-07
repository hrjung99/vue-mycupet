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
  setup() {
    const markers = ref([]);
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

        const newMarker = new window.kakao.maps.Marker({
          title: markerInfo.cupet_pet_no,
          position,
          clickable: true,
          map: map.value,
        });

        markers.value.push(newMarker);

        const petDetails = await petdetailInfo(markerInfo.cupet_pet_no);

        //<p>Cupet Pet No: ${markerInfo.cupet_pet_no}</p>
        const iwContent = `<div style="padding:5px;">
          <p><img src="img/logo.png" width="200" height="150"><p>
          
          <p>펫 이름: ${petDetails ? petDetails.cupet_pet_name : "No Name"}</p>

           <p>사례금: ${
             petDetails ? petDetails.reward : "정보를 불러오지 못했습니다."
           }</p>


          <p>종 이름: ${
            petDetails
              ? petDetails.cupet_pet_type
              : "정보를 불러오지 못했습니다."
          }</p>

           <p>주인 이름: ${
             petDetails
               ? petDetails.cupet_user_name
               : "정보를 불러오지 못했습니다."
           }</p>


          <button id="closeInfoWindow" style="margin-top:10px;">Close</button>
        </div>`;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
        });

        window.kakao.maps.event.addListener(newMarker, "click", function () {
          infowindow.open(map.value, newMarker);
          const closeBtn = document.getElementById("closeInfoWindow");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              infowindow.close();
            });
          }
        });
      }
    };

    const petdetailInfo = async (petNo) => {
      try {
        const res = await axios.post("api1/findpet/getPetDetailInfo", {
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
      mapContainer.style.width = "650px";
      mapContainer.style.height = "650px";
    };

    onMounted(() => {
      resizeMap();
      getUserCenter();
    });

    return { markers, centerCoordinate, updateCoordinate };
  },
};
</script>

<style>
#map {
  width: 650px;
  height: 650px;
}
</style>
