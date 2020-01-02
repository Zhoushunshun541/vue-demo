<template>
  <div class="hello">
    <input type="text" v-model="name">
    <input type="text" v-model="age">
    <button @click="init()">enter</button>
  </div>
</template>

<script>
import {getAllUser, userInfo} from '../api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {},
      name: '',
      age: ''
    }
  },
  methods: {
    init () {
      let params = {
        name: this.name,
        age: this.age
      }
      // getAllUser(params).then(res => {
      //   // eslint-disable-next-line eqeqeq
      //   if (res.data[0].name == '周顺顺') {
      //     alert('是' + res.data[0].name + '进行了操作')
      //   }
      //   console.log(res)
      // })
      userInfo({
        ...params
      }).then(res => {
        console.log(res, 123)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
