<template>
  <div ref="map" style="width:100%;height:350px;"></div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const map = ref(null);

    onMounted(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(37.502, 127.026581),
        level: 4
      };

      map.value = new kakao.maps.Map(mapContainer, mapOption);

      const content = '<div class="overlaybox">' +
        '    <div class="boxtitle">금주 영화순위</div>' +
        '    <div class="first">' +
        '        <div class="triangle text">1</div>' +
        '        <div class="movietitle text">드래곤 길들이기2</div>' +
        '    </div>' +
        '    <ul>' +
        '        <li class="up">' +
        '            <span class="number">2</span>' +
        '            <span class="title">명량</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">2</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">3</span>' +
        '            <span class="title">해적(바다로 간 산적)</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">6</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">4</span>' +
        '            <span class="title">해무</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">3</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">5</span>' +
        '            <span class="title">안녕, 헤이즐</span>' +
        '            <span class="arrow down"></span>' +
        '            <span class="count">1</span>' +
        '        </li>' +
        '    </ul>' +
        '</div>';

      const position = new kakao.maps.LatLng(37.49887, 127.026581);

      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91
      });

      customOverlay.setMap(map.value);
    });

    return { map };
  }
}
</script>
