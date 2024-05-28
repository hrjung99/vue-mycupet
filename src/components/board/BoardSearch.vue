<template>
            <form>            
                <input type="text" id="SearchForm" name="SearchForm" placeholder="검색어를 입력해주세요.">
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
    button {
        background-color: transparent;
        border: none;
        padding: 0;
    }

    .search-button {
        margin-left: 5px;
    }
</style>