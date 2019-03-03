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
    setTimeout(() => {
      this.launchLoading();
    }, 200);
  },

  methods: {
    launchLoading(cl) {
      const assets = document.querySelectorAll("img");
      console.log(assets);
      let promisesResolved = 0; // number of promises resolved updated at each iteration
      for (let elm of assets) {
        this.loadAssets(elm).then(value => {
          promisesResolved += 1;
          this.updateLoadProgress(promisesResolved, assets.length);
        });
      }
    },
    loadAssets(elm) {
      return new Promise(resolve => {
        if (elm.complete === true) {
          resolve();
        }
        elm.addEventListener("load", () => {
          resolve();
        });
      });
    },
    stopPreloadingAnim() {
      this.hideLoader = true;
    },
    updateLoadProgress(loaded, total) {
      return new Promise(resolve => {
        const progress = Math.round((100 / total) * loaded);
        const percentElm = this.$el.querySelector(".percent");
        const loadingProgress = this.$el.querySelector(".progress");

        percentElm.innerHTML = progress;
        loadingProgress.style.width = progress + "%";

        if (progress >= 100 && loaded === total) {
          this.stopPreloadingAnim();
          resolve();
        }
      });
    }
  }
};
</script>
