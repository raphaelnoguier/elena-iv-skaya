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
      const assets = this.$store.getters.currentDoc.data.body[0].items;
      let resolved = 0;
      for (let elm of assets) {
        let src = elm.img.url;
        elm = document.createElement("img");
        this.loadAssets(elm, src).then(value => {
          resolved += 1;
          this.updateLoadProgress(resolved, assets.length);
        });
      }
    },
    loadAssets(elm, src) {
      return new Promise(resolve => {
        elm.src = src;
        elm.addEventListener("load", function() {
          resolve();
        });
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
