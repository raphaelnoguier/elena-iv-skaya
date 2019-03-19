<template>
  <div class="nav" :class="$route.path.includes('serie') ? 'serie-page' : ''">
    <ul>
      <li>
        <nuxt-link to="/">Elena Iv-Skaya</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
};
</script>

