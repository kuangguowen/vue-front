<template>
<div class="box">

    <el-menu-item :index="item.menuPath" v-if="item.menuType == 1">
      <i :class="item.menuIcon"></i>
      <span slot="title">{{item.menuTitle}}</span>
    </el-menu-item>

    <el-submenu :index="item.menuPath" v-if="item.menuType == 0">
      <template slot="title">
        <i :class="item.menuIcon"></i>
        <span slot="title">{{item.menuTitle}}</span>
      </template>

      <menu-list v-for="(item,index) in item.children" :key="index" :item="item"/>
    </el-submenu>
</div>
</template>



<script>
export default {
name: "menuList",
  props:['item'],
}
</script>

<style scoped>

</style>