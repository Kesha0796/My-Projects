<script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-cookies@1.5.12/vue-cookies.js"></script>
<template>
<div id="signup">
        <h1>Sign Up</h1>
        <br/>
        <div class="form-group"><label>Enter your name</label><input class="form-control" type="text" name="name" v-model="name" placeholder="name" required /></div>
        <br/>
        <div class="form-group"><label>Enter your email</label><input class="form-control" type="email" name="email" v-model="email" placeholder="Email" required/></div>
        <br/>
        <div class="form-group"><label>Enter Username</label><input class="form-control" type="text" name="username" v-model="username" placeholder="Username" required/></div>
        <br/>
        <div class="form-group"><label>Enter Password</label><input class="form-control" style="background-color:white" type="password" name="password" v-model="password" placeholder="Password" required/></div>
        <br/>
        <button type="button" class="btn btn-primary" v-on:click="signup()">Register</button>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
            return {
                
                    name:"",
                    email:"",
                    username: "",
                    password: ""
              
            }
        },
   methods: {
            signup()
            {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
              if(this.name=="" || this.email=="" || this.username=="" || this.password=="")
              {
                this.$dialogs.alert("All fields are required");
              }
              else if(!re.test(this.email.toLowerCase()))
              {
                
                this.$dialogs.alert("Invalid Email! Please enter correct email");
              }
              else
              {
                this.$dialogs.alert("Registration Successful").then(res => {
                  console.log(this.username);
                  console.log(this.password);
                  console.log(this.name);
                  console.log(this.email);
                  $cookies.set("name",this.name);
                  $cookies.set("budget",1000);
                  // localStorage.setItem("budget",1000);
                  // this.$navigateTo(signup)
                 window.location.href="/product"
                
    })
              }
                
            }
         }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#signup {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
