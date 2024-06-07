<template>
            <form>            
                <input type="text" id="SearchForm" name="SearchForm" placeholder="검색어를 입력해주세요." class="textbox">
                <button type="submit" class="search-button">
                    <img src="../common/assets/SearchIcon.png" alt="검색" width="21" height="20" />
                </button>
            </form>
</template>

<script>
export default {
    
}
</script>

<style>
    .textbox {
        height: 35px;
        width: 300px;
    }
    .search-button {
        background-color: transparent;
        border: none;
        padding: 0;
        margin-left: 5px;
    }
</style>