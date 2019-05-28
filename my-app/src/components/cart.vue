
<script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-cookies@1.5.12/vue-cookies.js"></script>
<template>

<div id="product">
    <div class="nav-bar"></div>
    <div><h2>Welcome {{$cookies.get("name")}}</h2></div> 
     
     <div v-if="$cookies.get('cartproduct')== 'empty' " >
         <h1>Your Cart is Empty....Please add products</h1>
     </div>
      <div v-else v-for="product in JSON.parse($cookies.get('cartproduct'))" v-bind:key="product.productId">


    
   <div class="product">
        
     <div class="product-image">
      <img :src="product.image" />
    </div> 

    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p style="color:blue;font-size:30px">{{product.price}}$</p>
    </div> 
    </div>
   
     </div>
 <div>
        <p style="font-size:25px;color:blue">Total:{{$cookies.get("total")}}</p>
    </div>
    <button style="margin-top:3px" v-on:click="buy()">Buy Now</button>
    

</div> 
    

</template>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
<style scoped>
body {
  font-family: tahoma;
  color: #282828;
  margin: 0px;
}

.nav-bar {
  background: linear-gradient(-90deg, #84CF6A, #16C0B0);
  height: 60px;
  margin-bottom: 15px;
}
.disabledButton {
  background-color: #d8d8d8;
}
.product {
  display: flex;
}

img {
  border: 1px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  box-shadow: 0px .5px 1px #d8d8d8;
}

.product-image {
  flex-basis: 700px;
}

.total
{
    margin-right:5pt;
    width:25pt;
}

.product-info {
  margin-top: 10px;
  flex-basis: 500px;
}

.color-box {
  width: 40px;
  height: 40px;
  margin-top: 5px;
}

.cart {
  margin-right: 25px;
  float: right;
  border: 1px solid #d8d8d8;
  padding: 5px 20px;
}

button {
  margin-top: 30px;
  border: none;
  background-color: #1E95EA;
  color: white;
  height: 40px;
  width: 100px;
  font-size: 14px;
} 

.disabledButton {
  background-color: #d8d8d8;
}

.review-form {
  width: 30%;
  padding: 20px;
  border: 1px solid #d8d8d8;  
}

input {
  width: 100%;  
  height: 25px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 60px;
}
</style>
<script>
export default {
  name: 'product',
  data() {
            return {
                 total: ''         
            }
        },
   methods: {
            buy() {
                this.$dialogs.alert("Your order is placed successfully").then(res => {
                  $cookies.set("cartproduct","empty");
                  // localStorage.setItem("budget",1000);
                  // this.$navigateTo(signup)
                 window.location.href="/product"
    })
            }
         }
}
</script>
