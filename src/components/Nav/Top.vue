<template>
  <nav class="cp-navigation">
    <router-link v-for="(item,index) in menu"
                 :key="index"
                 :to="item.path">
      {{ item.title }}
    </router-link>
    <!-- <router-link to="/Home/">Home</router-link>
    <router-link to="/Test/">Test</router-link>
    <router-link to="/TestJson/">Json</router-link>
    <router-link to="/TestTable/">
      <Badge dot>Table</Badge>
    </router-link>
    <router-link to="/Login/">
      <Badge text="99+">Login</Badge>
    </router-link> -->
  </nav>
</template>

<script>
import { top } from '../../router/menu'
export default {
  setup () {
    const menu = top;
    return { menu }
  }
};
</script>

<style lang="less">
.cp-navigation {
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  margin: 0.2rem;

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
}
</style>