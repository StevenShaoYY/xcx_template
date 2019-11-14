<template>
  <div class="home">
    <div class="item-container">
      首页
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
  },
  onShow() {
  },
  created() {
    
    console.log(process.env.NODE_ENV)
  },
  methods: {
    goto(url) {
      mpvue.navigateTo({
        url: `/pages/${url}/main`
      })
	  }
  }
}
</script>

<style scoped lang="less">
  .home {
  
  }
</style>