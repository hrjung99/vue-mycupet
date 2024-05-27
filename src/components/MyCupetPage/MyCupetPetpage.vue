<template lang="">
    <div>
        <div class="sub-content-inner">
            <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo sub-logo"/>
            <div class="pet-info">
                <div class="form-group">
                    <label for="pet-name">이름: </label>
                    <input type="text" id="pet-name" v-model="name" />
                </div>
                <div class="form-group">
                    <label for="pet-birth">생년월일: </label>
                    <input type="text" id="pet-birth" v-model="birth" />
                </div>
                <div class="form-group">
                    <label for="pet-type">종: </label>
                    <input type="text" id="pet-type" v-model="type" />
                </div>
                <div class="form-group">                
                    <button type="submit">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
    .sub-content-inner {
        display: flex;
        align-items: flex-start;
    }

    .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        text-align: left;
    }

    .form-group button {
        margin-left: 218px;
    }

    label {
        width: 80px; 
        margin-right: 10px;
    }
</style>