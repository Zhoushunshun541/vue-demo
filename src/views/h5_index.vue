<template>
  <div class="h5-index">
    <el-upload
        class="upload"
        :show-file-list="false"
        :action="upLodadUrl"
        :headers="upLoadHeaders"
      >
      <el-button type="">相册</el-button>
    </el-upload>
    <input type="file" accept="image/*" capture="camera" placeholder="camera">
    <input type="file" accept="video/*" capture="camcorder" placeholder="camcorder">
    <input type="file" accept="audio/*" capture="microphone" placeholder="microphone">
    <input type="file" accept="image/*" multiple placeholder="multiple">
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoadHeaders: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbiI6InRvYiIsImNoaWxkX3VzZXJfaWQiOjU1Niwic2Nob29sX2NvZGUiOiJrMTJzY2hvb2xfMDJfdGVzdCIsInVzZXJfaWQiOjE2ODN9.pY6RCE0mcZGxqmi3UArtaeC0W2iwbRQ9Oo8vLw9CA7c'
      },
      upLodadUrl: 'http://121.41.99.232:20001/shard_upload'
    }
  }
}
</script>

<style>

</style>
