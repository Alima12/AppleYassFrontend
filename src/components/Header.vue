<template>
  <header class="header">
    <Navbar />
  </header>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'

export default {
  name: 'Header',
  components: {
    Navbar,
  }
}
</script>
