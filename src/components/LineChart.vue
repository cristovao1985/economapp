<template>
  <div>
    <h6></h6>
    <canvas id="myChart"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
import { ref } from 'vue'
export default {
  setup() {
    // setup() receives props as the first argument.
    const labels = ref([])
    const dates = ref([])

    return {
      labels,
      dates,
    }
  },
  mounted() {
    this.buildChart()
  },
  watch: {
    show() {
      this.confirm = this.show
    },
  },
  methods: {
    async buildChart() {
      const ctx = document.getElementById('myChart')
      const data = JSON.parse(localStorage.getItem('historico'))
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.datas,

          datasets: [
            {
              label: data.produto,
              data: data.valores,
              borderWidth: 3,
              borderJoinStyle: 'round',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },
  },
}
</script>
