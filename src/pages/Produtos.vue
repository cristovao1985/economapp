<template>
  <q-page class="q-ma-md">
    <q-card class="q-mb-md q-pa-md" flat bordered>
      Pesquise o produto e compare os valores informados entre as lojas. Recomendamos pelo menos 3
      lojas distintas para o mesmo produto. <br />
      <strong class="text-positive"> Pesquise, compare e economize! </strong>
    </q-card>
    <q-input
      filled
      bottom-slots
      v-model="filter"
      label="Pesquisar produtos"
      placeholder="Digite o nome do produto"
      debounce="1000"
      clear-icon="close"
      clearable
      @clear="getProdutos"
    >
      <template v-slot:after>
        <q-btn icon="refresh" @click="getProdutos" flat round color="primary" />
      </template>
    </q-input>

    <div v-if="produtos?.length">
      <q-list v-for="produto in produtos" :key="produto.Id">
        <q-item class="bg-grey-2 q-mb-sm" style="border-radius: 10px">
          <q-item-section>
            <q-item-label class="text-bold">{{ produto.nome }}</q-item-label>
            <!-- <q-item-label caption lines="2">{{ produto.codigo_barras }}</q-item-label> -->
            <q-item-label caption lines="2"
              >{{ produto.loja }} <br />
              {{ formatDateTime(produto.data_hora) }}</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label class="text-positive text-bold">R${{ produto.valor }}</q-item-label>
            <q-item-label caption>{{ produto.unidade }}</q-item-label>
            <!-- <q-icon name="star" color="yellow" /> -->
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else class="flex flex-center">
      <h6>Nenhum produto a ser mostrado</h6>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="qr_code_scanner" color="primary" to="nfe" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import nfeApi from '../api/nfe.api'
export default {
  name: 'IndexPage',
  components: {},
  data() {
    return {
      produtos: [],
      filter: '',
    }
  },
  created() {
    this.getProdutos()
  },
  watch: {
    filter() {
      if (this.filter) {
        this.getProdutosByName()
      } else {
        this.getProdutos()
      }
    },
  },
  methods: {
    getProdutos() {
      this.filter = ''
      nfeApi
        .getProdutos()
        .then((res) => {
          this.produtos = res.data.list
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProdutosByName() {
      nfeApi
        .getProdutosByName(this.filter)
        .then((res) => {
          this.produtos = res.data.list
        })
        .catch((err) => {
          console.log(err)
        })
    },
    formatDateTime(dateTime) {
      const date = new Date(dateTime.replace(' ', 'T'))
      const formatado = date.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      })
      return formatado
    },
  },
}
</script>
