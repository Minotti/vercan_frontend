<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
  </VApp>
</template>

<style lang="scss">
.label-required:after {
  content: '*';
  margin-left: 5px;
  color: rgb(var(--v-theme-error))
}
</style>
