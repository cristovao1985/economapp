<template>
  <q-page>
    <LineChart />
    <div v-for="label in data.labels" :key="label" class="q-ma-md">
      {{ label }}
    </div>
  </q-page>
</template>

<script>
import LineChart from 'src/components/LineChart.vue'
export default {
  name: 'HistoricoPage',
  components: {
    LineChart,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.getHistorico()
  },
  methods: {
    getHistorico() {
      const data = JSON.parse(localStorage.getItem('historico'))
      this.data = data
    },
  },
}
</script>
