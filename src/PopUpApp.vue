<template>
  <div v-show="display">
    <h2>Hello Extension. ({{ msg }})</h2>
    <button @click="go()">GO</button>
  </div>
</template>

<style scoped>
  h2 {
    color :blue;
  }
</style>

<script>
  export default {
    data() {
      return {
        display: false,
        msg: 'vue'
      }
    },
    methods : {
      go: function () {
        if (this.msg == 'vue') {
          this.msg = 'VUE';
        } else {
          this.msg = 'vue';
        }
      }
    },
    components: {
    },
    mounted: function () {
      let self = this;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // 非指定domain時 不顯示UI
        let tab = tabs[0];
        let url = tab.url;
        if (url.match('^http[s]{0,1}://localhost')) {
          self.display = true;
        }
      });
    }
  };
</script>
