<template>
  <div class="home">
    This is test {{message}}
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  },
  data() {
    return { message : "message"};
  }
}
</script>
