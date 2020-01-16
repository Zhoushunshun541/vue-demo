<template>
  <div class="rect">
    <div v-for="(list,index) in reactList" :key="index">
      <div :class="list.color">{{ list.value }}</div>
      <div v-if="list.last" :class="list.last | classFilter(list.value, 1)">
        {{ list.last }}
        <i :class="list.last | classFilter(list.value, 2)"></i>
      </div>
      <div>{{ list.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleTitle',
  props: {
    reactList: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    classFilter(last, now, type) {
      let diff = now - last
      if (type === 1) {
        if (diff > 0) {
          return 'up'
        } else if (diff < 0) {
          return 'down'
        } else {
          return ''
        }
      } else {
        if (diff > 0) {
          return 'el-icon-top'
        } else if (diff < 0) {
          return 'el-icon-bottom'
        } else {
          return ''
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang='less'>
.rect {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  min-height: 100px;
  font-size: 12px;
  border: 1px solid rgba(0, 122, 255, 0.5);
  background: linear-gradient(to left, #007aff, #007aff) left top no-repeat,
    linear-gradient(to bottom, #007aff, #007aff) left top no-repeat,
    linear-gradient(to left, #007aff, #007aff) right top no-repeat,
    linear-gradient(to bottom, #007aff, #007aff) right top no-repeat,
    linear-gradient(to left, #007aff, #007aff) left bottom no-repeat,
    linear-gradient(to bottom, #007aff, #007aff) left bottom no-repeat,
    linear-gradient(to left, #007aff, #007aff) right bottom no-repeat,
    linear-gradient(to left, #007aff, #007aff) right bottom no-repeat;
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  > div {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    div {
      margin-bottom: 3px;
      &:first-of-type {
        font-size: 30px;
      }
      &:last-of-type {
        font-size: 14px;
        color: #8299DB;
      }
      &.yellow {
        color: #ffcc00;
      }
      &.orange {
        color: #ff9500;
      }
      &.blue {
        color: #007aff;
      }
      &.up {
        color: #4cd964;
      }
      &.down {
        color: #ff3b30;
      }
    }
  }
}
</style>
