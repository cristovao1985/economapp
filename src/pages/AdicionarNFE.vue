<template>
  <q-page class="q-ma-md">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="qr_code_scanner" color="primary" @click="openModal('qrCode')" />
    </q-page-sticky>
    <q-card v-if="!nfeData.produtos?.length" flat bordered class="q-pa-md">
      Para compartilhar produtos com outros usuário você precisa ler o QrCode do cupom fiscal, e
      depois clicar no botão "Compartilhar Produtos". <br />
      <span class="text-negative">Nenhuma informação sua será capturada ou compartilhada</span>
      <q-card-actions align="right">
        <q-btn flat label="Voltar" to="/" />
      </q-card-actions>
    </q-card>

    <q-card flat bordered v-if="nfeData.emissor?.xNome" class="q-pa-md">
      Nº Nf-e: {{ nfeData.nfe.ide.nNF }} às {{ nfeData.nfe.ide.dhEmi }}<br />
      {{ nfeData.emissor.xNome }} <br />
      {{ nfeData.emissor.enderEmit?.xMun }}/ {{ nfeData.emissor.enderEmit?.UF }}
      <br />
      <span class="text-negative">Produtos encontrados: {{ nfeData.produtos?.length || 0 }}</span>
    </q-card>
    <q-list v-for="produto in nfeData.produtos" :key="produto.prod.xProd">
      <q-item>
        <q-item-section>
          <q-item-label>{{ produto.prod.xProd }}</q-item-label>
          <q-item-label caption lines="2">{{ produto.prod.cEAN }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-positive text-bold">R${{ produto.prod.vProd }}</q-item-label>
          <!-- <q-icon name="star" color="yellow" /> -->
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
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import nfeApi from '../api/nfe.api'
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
          console.log(res.data)
          if (res.data.message === 'Nota fiscal já existe na nossa base de dados') {
            alert(`Nota fiscal já existe na nossa base de dados: Nº${res.data.data}`)
          } else {
            this.nfeData = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async shareProducts() {
      this.loading = true
      try {
        for (const produto of this.nfeData.produtos) {
          nfeApi.shareProduct({
            codigo_barras: produto.prod.cEAN,
            nome: produto.prod.xProd,
            valor: produto.prod.vUnCom,
            loja: this.nfeData.emissor.xNome,
            uf: this.nfeData.emissor.enderEmit?.UF,
            cidade: this.nfeData.emissor.enderEmit?.xMun,
            numero_nfe: this.nfeData.nfe.ide.nNF,
            data_hora: new Date(this.nfeData.nfe.ide.dhEmi),
          })
        }
        this.shareNfe()
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    shareNfe() {
      const nfe = {
        url: this.url,
        numero_nfe: this.nfeData.nfe.ide.nNF,
      }
      nfeApi
        .shareNfe(nfe)
        .then(() => {
          alert('Produtos comprtilhados com sucesso!')
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
