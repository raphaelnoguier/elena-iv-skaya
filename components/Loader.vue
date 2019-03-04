<template>
  <div class="loader" :class="hideLoader ? 'hide' : ''">
    <div class="content">
      <h1>Loading</h1>
      <span class="percent">0</span>
      <div class="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideLoader: false
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.launchLoading();
    });
  },

  methods: {
    launchLoading() {
      const assets = document.querySelectorAll("img");
      let resolved = 0;
      for (let elm of assets) {
        console.log("el");
        this.loadAssets(elm).then(value => {
          resolved += 1;
          this.updateLoadProgress(resolved, assets.length);
        });
      }
    },
    loadAssets(elm) {
      return new Promise(resolve => {
        if (elm.complete === true) {
          resolve();
        }
        // elm.addEventListener("load", function() {
        //   resolve();
        // });
      });
    },
    updateLoadProgress(loaded, total) {
      return new Promise(resolve => {
        const progress = Math.round((100 / total) * loaded);
        const percent = this.$el.querySelector(".percent");
        const bar = this.$el.querySelector(".progress");

        percent.innerHTML = progress;
        bar.style.width = progress + "%";

        if (progress >= 100 && loaded === total) {
          this.stopPreloadingAnim();
          resolve();
        }
      });
    },
    stopPreloadingAnim() {
      this.hideLoader = true;
    }
  }
};
</script>
