<template>
    <div>
        <div class="main-content">
            <div class="join-container">
                <h2>포인트 충전</h2>
                <div class="point-select">
                    <label> 5,000p </label><br/>
                    <label> 10,000p </label><br/>
                    <label> 50,000p </label><br/>
                    <label> 100,000p </label><br/>
                </div>
                <div class="button-container">
                    <router-link to="/MyCupetPointMain">
                        <button type="button" class="charge-button-small">
                            충전
                        </button>
                    </router-link>
                    <router-link to="/MyCupetPage">
                        <button type="button" class="cancel-button">
                            취소
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyCupetPage",
};
</script>

<style scoped>
.join-container {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 30px;
}

.point-select {
    background-color: #F2FFF2;
    color: #7E84A3;
    margin-top: 2px;
    padding: 10px;
    width: 210px;
    height: 140px;
}

.point-select label {
    padding: 3px 0px 3px 20px;
}

.button-container {
    display: flex;
    margin-top: 10px;
}

.charge-button-small {
    background-color: #34a853; 
    color: white; 
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
}

.charge-button-small:hover {
    background-color: #85c14a;
}

.cancel-button {
    margin-left: 5px;
}

.cancel-button:hover {
    background-color: #85c14a;
}
</style>