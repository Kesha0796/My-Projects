
<script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-cookies@1.5.12/vue-cookies.js"></script>
<template>

<div id="product">
    <div class="nav-bar"></div>
    <div style="margin-left:30pt"><h3>Welcome {{$cookies.get("name")}}</h3></div>
     <div style="margin-left:30pt"><h3>Your Budget is {{this.budget}}</h3></div>
     <button v-on:click="cart()" style="margin-left:30pt">Cart</button>
     <button v-on:click="logout()" style="position:absolute;margin-left:830pt">Log Out</button>
      <div v-for="product in products" v-bind:key="product.productId">
        
     
   <div class="product">
        
     <div class="product-image">
      <img :src="product.image" />
    </div> 

    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p v-if="product.inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p :style="{color:blue}">{{product.price}}</p>
      
      <ul>
        <li v-for="detail in product.details">{{ detail }}</li>
      </ul>
       <button v-on:click="addToCart(product.productId,product.name,product.price,product.image)" :disabled="budget<=0"
          :class="{ disabledButton: budget<=0
           }">Add to cart</button>
    </div> 
    </div>
     </div>
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
                 product: 'Socks',
                 budget:$cookies.get("budget"),
                image: 'https://dl.dropboxusercontent.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
                link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
                inStock: true,
                cartdata:[],
                total:"",
                products:[
                    {
                        productId:"22",
                        name:"Socks",
                        image: 'https://dl.dropboxusercontent.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
                        inStock:true,
                        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
                        price:200
                    },
                    {
                        productId:"23",
                        name:"Boots",
                        image:'https://drive.google.com/uc?export=view&id=1M5DfPmzglWDsTQbulfXcOZPO_Ha4z0E7',
                        inStock:true,
                        details: ['80% cotton', '20% polyester', 'Gender-Male'],
                        price:300
                    },
                    {
                        productId:"24",
                        name:"Trousers",
                        image:'https://drive.google.com/uc?export=view&id=1tiif6J7jtz40GHxjO_d8c-C3uxg75YNQ',
                        inStock:true,
                        details: ['80% cotton', '20% polyester', 'Gender-Male'],
                        price:400
                    },
                    {
                        productId:"25",
                        name:"Shirts",
                        image:'https://drive.google.com/uc?export=view&id=1yuLPjejw_4IlbbHBJTZ0jNACWGXlqQt-',
                        inStock:true,
                        details: ['80% cotton', '20% polyester', 'Gender-Male'],
                        price:350
                    }
                ]
            }
        },
   methods: {
            addToCart(id,name,price,image) {
                console.log(this.products)
                console.log("id,name,price"+id+name+price)
                this.budget=this.budget-price
                $cookies.set("budget",this.budget)
                this.cartdata.push({productId:id,"name":name,"price":price,"image":image})
                console.log(this.cartdata)
                $cookies.set("cartproduct",JSON.stringify(this.cartdata))
                this.total=+price
                $cookies.set("total",this.total)
            },
            cart()
            {
                window.location.href="/cart"
            },
            logout()
            {
                window.location.href="/"
            }
         }
}
</script>
