<template>
  <q-page class="q-ma-md">
    <q-card v-if="!nfeData.produtos?.length" flat bordered class="q-pa-md">
      Para compartilhar produtos com outros usuário você precisa ler o QR Code do cupom fiscal, e
      depois clicar no botão "Compartilhar Produtos". <br />
      <span class="text-negative">Nenhuma informação sua será capturada ou compartilhada.</span>
      <q-card-actions align="right">
        <q-btn flat label="Voltar" to="produtos" dense />
      </q-card-actions>
    </q-card>

    <q-card flat bordered v-if="nfeData.emissor?.xNome" class="q-pa-md">
      Nº NF-e: {{ nfeData.nfe.ide.nNF }} às {{ nfeData.nfe.ide.dhEmi }}<br />
      R$ {{ nfeData.pagamento.detPag.vPag }} em {{ tipoPagamento(nfeData.pagamento.detPag.tPag) }}
      <br />
      {{ nfeData.emissor.xNome }} <br />
      {{ nfeData.emissor.enderEmit?.xMun }}/ {{ nfeData.emissor.enderEmit?.UF }}
      <br />
      <span class="text-negative">Produtos encontrados: {{ nfeData.produtos?.length || 0 }}</span>
    </q-card>
    <q-list v-for="produto in nfeData.produtos" :key="produto.codigo_barras">
      <q-item class="bg-grey-2 q-mb-sm" style="border-radius: 10px">
        <q-item-section>
          <q-item-label class="text-bold">{{ produto.nome }}</q-item-label>
          <q-item-label caption lines="2">{{ produto.codigo_barras }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-positive text-bold">R${{ produto.valor }}</q-item-label>
          <q-item-label caption>{{ produto.unidade }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-footer v-if="nfeData.produtos?.length">
      <q-btn
        class="full-width"
        label="Compartilhar produtos"
        color="primary"
        @click="shareProducts"
        :loading="loading"
        size="large"
      />
    </q-footer>
    <q-dialog v-model="showModal.qrCode">
      <q-card>
        <q-card-section>
          Aponte a camêra para o QrCode do cupom fiscal e aguarde até a leitura ser finalizada
        </q-card-section>
        <q-card-section>
          <qrcode-stream @detect="onDetect"> </qrcode-stream>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="qr_code_scanner" color="positive" @click="openModal('qrCode')" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import nfeApi from '../api/nfe.api'
import dateHelper from '../helpers/dateHelper'
import notify from '../boot/notify'
export default {
  name: 'AdicionaNfePage',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      showModal: {
        qrCode: false,
      },
      nfeData: {
        emissor: {},
        nfe: {},
        produtos: [],
      },
      loading: false,
      url: '',
    }
  },
  created() {
    this.startCamera()
  },
  methods: {
    async startCamera() {
      try {
        // Solicita permissão e ativa câmera
        await navigator.mediaDevices.getUserMedia({ video: true })
      } catch (err) {
        console.error('Permissão negada ou erro ao acessar a câmera:', err)
      }
    },
    openModal(modal) {
      this.showModal[modal] = true
    },
    closeModal(modal) {
      this.showModal[modal] = false
    },
    onDetect(detectedCodes) {
      // ...
      const qrCodeValue = detectedCodes[0].rawValue

      this.url = qrCodeValue
      this.getNfeData(qrCodeValue)
    },
    async getNfeData(nfeUrl) {
      this.closeModal('qrCode')
      await nfeApi
        .getNfeData(nfeUrl)
        .then((res) => {
          if (res.data.message === 'Nota fiscal já existe na nossa base de dados') {
            notify.showWarning(`Nota fiscal Nº${res.data.data} já existe na nossa base de dados.`)
          } else {
            //this.nfeData = res.data
            if (res.data.produtos.length) {
              res.data.produtos.forEach((produto) => {
                this.nfeData.produtos.push({
                  codigo_barras: produto.prod.cEAN,
                  nome: produto.prod.xProd,
                  valor: parseFloat(produto.prod.vUnCom).toFixed(2),
                  unidade: produto.prod.uCom.substring(0, 2),
                })
              })
            } else {
              const produto = res.data.produtos.prod

              this.nfeData.produtos.push({
                codigo_barras: produto.cEAN,
                nome: produto.xProd,
                valor: parseFloat(produto.vUnCom).toFixed(2),
                unidade: produto.uCom.substring(0, 2),
              })
            }
            this.nfeData.emissor = res.data.emissor
            this.nfeData.nfe = res.data.nfe

            this.nfeData.pagamento = res.data.pagamento
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    shareProducts() {
      this.loading = true
      try {
        const date = dateHelper.sqlDate(this.nfeData.nfe.ide.dhEmi)

        for (const produto of this.nfeData.produtos) {
          nfeApi.shareProduct({
            codigo_barras: produto.codigo_barras,
            nome: produto.nome,
            valor: produto.valor,
            unidade: produto.unidade.substring(0, 2),
            loja: this.nfeData.emissor.xNome,
            uf: this.nfeData.emissor.enderEmit?.UF,
            cidade: this.nfeData.emissor.enderEmit?.xMun,
            numero_nfe: this.nfeData.nfe.ide.nNF,
            data_hora: date,
          })
        }
        this.shareNfe()
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async shareNfe() {
      const nfe = {
        url: this.url,
        numero_nfe: this.nfeData.nfe.ide.nNF,
        tipo_pagamento: this.tipoPagamento(this.nfeData.pagamento.detPag.tPag),
        valor_nfe: parseFloat(this.nfeData.pagamento.detPag.vPag),
        uf: this.nfeData.emissor.enderEmit?.UF,
        cidade: this.nfeData.emissor.enderEmit?.xMun,
      }
      await nfeApi
        .shareNfe(nfe)
        .then(() => {
          notify.showSuccess('Produtos compartilhados com sucesso!')
          this.$router.push({ name: 'produtos' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    tipoPagamento(tipo) {
      switch (tipo) {
        case '01':
          return 'Dinheiro'
        case '02':
          return 'Cheque'
        case '03':
          return 'Cartão de Crédito'
        case '04':
          return 'Cartão de Débito'
        case '11':
          return 'Vale Alimentação'
        case '12':
          return 'Vale Refeição'
      }
    },
  },
}
</script>
