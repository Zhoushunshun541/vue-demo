<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(th, thIndex) in tableHeader" :key="thIndex">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <tr :class="goMore? 'high':''" v-for="(tr, trIndex) in tableData" :key="trIndex" @click="goMore?doSomething(trIndex):''">
        <td v-for="(value, index) in tr" :key="index">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SampleTable',
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    goMore: Boolean
  },
  data() {
    return {}
  },
  methods: {
    doSomething(index) {
      this.$emit('update:goMore', index)
    }
  }
}
</script>
<style lang='less'>
.table {
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  max-height: 300px;
  font-size: 12px;
  th,
  td {
    height: 30px;
    padding: 0 5px;
    text-align: left;
  }
  tbody tr {
    &:nth-of-type(even) {
      background: rgba(28, 36, 59, 0.6);
    }
    &.high:hover{
      color: #007aff;
      cursor: pointer;
    }
  }
}
</style>
