<template>
  <q-page class="q-ma-md">
    <q-input
      filled
      bottom-slots
      v-model="filter"
      label="Pesquisar produtos"
      placeholder="Digite o nome do produto"
      debounce="1000"
    >
      <template v-slot:after>
        <q-btn icon="qr_code_scanner" to="nfe" flat round />
      </template>
    </q-input>

    <q-list v-for="produto in produtos" :key="produto.Id">
      <q-item>
        <q-item-section>
          <q-item-label>{{ produto.nome }}</q-item-label>
          <!-- <q-item-label caption lines="2">{{ produto.codigo_barras }}</q-item-label> -->
          <q-item-label caption lines="2"
            >{{ produto.loja }} | {{ formatDateTime(produto.data_hora) }}</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-positive text-bold">R${{ produto.valor }}</q-item-label>
          <!-- <q-icon name="star" color="yellow" /> -->
        </q-item-section>
      </q-item>
    </q-list>
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
      this.getProdutosByName()
    },
  },
  methods: {
    getProdutos() {
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
