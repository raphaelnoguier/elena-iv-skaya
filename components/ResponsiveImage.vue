<template>
  <img v-lazy="defaultImage" :alt="alt" :class="[imageClass]" v-on:load="onLoaded" :srcset="srcset" :sizes="sizes">
</template>

<script>
export default {
  name: "ResponsiveImage",
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: "all",
      validator: function(value) {
        return ["all", "tablet", "smartphone", "mobile"].indexOf(value) !== -1;
      }
    },
    widthOnScreen: {
      type: Number,
      default: 100
    },
    widthOnScreenTablet: {
      type: Number,
      default: undefined
    },
    widthOnScreenSmartphone: {
      type: Number,
      default: undefined
    },
    imageRatio: {
      type: Number,
      default: 16 / 9
    },
    alt: {
      type: String,
      default: ""
    },
    imageClass: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: Number,
      default: 1920
    }
  },
  data: () => {
    return {
      widthPlaceholder: "%width%",
      heightPlaceholder: "%height%",
      baseSizes: {
        desktop: [1920, 1600, 1440, 1366, 1024, 768],
        tabletPortrait: [1600, 1024, 768],
        smartphone: [818, 768, 640]
      },
      defaultWidth: 1600
    };
  },
  computed: {    defaultImage() {
      let finalWidth = this.getWidthAdaptedToWidthOnScreen(
        this.defaultWidth,
        this.widthOnScreen
      );
      return this.getImageUrlWithWidthAndHeight(
        finalWidth,
        this.getHeightFromWidth(finalWidth)
      );
    },
    srcset() {
      if (
        typeof this.widthOnScreenTablet === "undefined" &&
        typeof this.widthOnScreenSmartphone === "undefined"
      ) {
        return this.srcscetSizes
          .map(width => {
            let finalWidth = this.getWidthAdaptedToWidthOnScreen(
              width,
              this.widthOnScreen
            );
            return (
              this.getImageUrlWithWidthAndHeight(
                finalWidth,
                this.getHeightFromWidth(finalWidth)
              ) + ` ${finalWidth}w`
            );
          })
          .join(", ");
      } else {
        return this.getSrcsetSizes("desktop")
          .map(width => {
            let finalWidth = this.getWidthAdaptedToWidthOnScreen(
              width,
              this.widthOnScreenTablet
            );
            return (
              this.getImageUrlWithWidthAndHeight(
                finalWidth,
                this.getHeightFromWidth(finalWidth)
              ) + ` ${finalWidth}w`
            );
          })
          .join(", ");
      }
    },
    tabletSrcset() {
      return this.getSrcsetSizes("tablet")
        .map(width => {
          let finalWidth = this.getWidthAdaptedToWidthOnScreen(
            width,
            this.widthOnScreenTablet
          );
          return (
            this.getImageUrlWithWidthAndHeight(
              finalWidth,
              this.getHeightFromWidth(finalWidth)
            ) + ` ${finalWidth}w`
          );
        })
        .join(", ");
    },
    smartphoneSrcset() {
      return this.getSrcsetSizes("smartphone")
        .map(width => {
          let finalWidth = this.getWidthAdaptedToWidthOnScreen(
            width,
            this.widthOnScreenSmartphone
          );
          let result =
            this.getImageUrlWithWidthAndHeight(
              finalWidth,
              this.getHeightFromWidth(finalWidth)
            ) + ` ${finalWidth}w`;
          return result;
        })
        .join(", ");
    },
    hasTabletSrcset() {
      return (
        typeof this.widthOnScreenTablet !== "undefined" &&
        this.widthOnScreenTablet !== this.widthOnScreen
      );
    },
    hasSmartphoneSrcset() {
      return (
        typeof this.widthOnScreenSmartphone !== "undefined" &&
        this.widthOnScreenSmartphone !== this.widthOnScreen
      );
    },
    sizes() {
      return this.widthOnScreen + "vw";
    },
    tabletSizes() {
      return this.widthOnScreenTablet + "vw";
    },
    smartphoneSizes() {
      return this.widthOnScreenSmartphone + "vw";
    },
    srcscetSizes() {
      return this.getSrcsetSizes(this.mode);
    }
  },
  methods: {
    onLoaded() {
      this.$el.classList.add("loaded");
    },
    getSrcsetSizes(mode) {
      switch (mode) {
        case "tablet":
          return this.baseSizes.tabletPortrait;
          break;
        case "smartphone":
          return this.baseSizes.smartphone;
          break;
        case "mobile":
          return [
            ...new Set([
              ...this.baseSizes.tabletPortrait,
              ...this.baseSizes.smartphone
            ])
          ];
          break;
        case "desktop":
          return this.baseSizes.desktop;
          break;
        case "all":
        default:
          return [
            ...new Set([
              ...this.baseSizes.desktop,
              ...this.baseSizes.tabletPortrait,
              ...this.baseSizes.smartphone
            ])
          ];
      }
    },
    getHeightFromWidth(width) {
      return Math.round(width / this.imageRatio);
    },
    getWidthAdaptedToWidthOnScreen(width, widthOnScreen = 100) {
      if (widthOnScreen >= 100) return width;
      return Math.round((width / 100) * widthOnScreen);
    },
    getImageUrlWithWidthAndHeight(width, height) {
      return this.imageUrl
        .replace(this.widthPlaceholder, width)
        .replace(this.heightPlaceholder, height);
    }
  }
};
</script>