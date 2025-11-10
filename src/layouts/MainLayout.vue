<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> EconomApp </q-toolbar-title>
        <div>v0.1.4</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <q-item-section top avatar>
            <q-avatar rounded>
              <q-img :src="logoPath" style="width: 250px" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>EconomApp</q-item-label>
            <q-item-label caption lines="2">Comunidade de Preços</q-item-label>
          </q-item-section>
        </q-item>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Economapp',
    icon: 'home',
    link: '#/',
  },
  {
    title: 'Produtos',
    caption: 'Produtos Compartilhados',
    icon: 'shopping_cart',
    link: '#/produtos',
  },
  {
    title: 'Compartilhar',
    caption: 'Compartilhar Produtos',
    icon: 'qr_code_scanner',
    link: '#/nfe',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const logoPath = require('../assets/economapp-logo.png')

    return {
      linksList,
      leftDrawerOpen,
      logoPath,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
