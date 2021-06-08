<!--
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2021-06-08 22:08:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-08 22:08:57
-->
<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link active" to="/">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            登录注册 pages/login.vue
            <nuxt-link class="nav-link" to="/profile/lpz">
              <img
                class="user-pic"
                src="http://toutiao.meiduo.site/FtNcS8sKFSYQbtBbd40eFTL6lAs_"
                ng-src="http://toutiao.meiduo.site/FtNcS8sKFSYQbtBbd40eFTL6lAs_"
              />
              LPZ
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login"> Sign in </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register"> Sign up </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://kaiwu.lagou.com/">lagou</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "LayoutIndex",
};
</script>
<style>
</style>