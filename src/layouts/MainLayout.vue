<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense icon="arrow_back" v-if="this.$route.name === 'nfe'" to="produtos" />
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" v-else />
        <q-toolbar-title> EconomApp </q-toolbar-title>
        <q-btn flat dense icon="location_on" @click="showModal = true" />
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
            <q-btn flat dense icon="location_on" @click="showModal = true" :label="cidade" />
          </q-item-section>
        </q-item>
        <q-separator />
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-separator />
      <div class="q-ml-md">v1.0.7</div>
      <CidadeModal :show="showModal" @definirCidade="toggleShowModal" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import CidadeModal from 'src/components/CidadeModal.vue'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    CidadeModal,
  },
  data() {
    return {
      leftDrawerOpen: false,
      showModal: false,
      linksList: [
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
      ],
      cidade: localStorage.getItem('cidade') || '',
    }
  },
  computed: {
    logoPath() {
      return require('../assets/economapp-logo.png')
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleShowModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>
