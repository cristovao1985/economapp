<template>
  <q-page class="q-ma-md">
    <q-card class="q-mb-md q-pa-md" flat bordered>
      O <strong> EconomApp</strong>
      é uma comunidade de compartilhamento de preços de supermercado no estado de
      <strong>Pernambuco</strong>.
      <br />
      Nosso principal objetivo é ajudar outras pessoas a economizarem nas suas compras.
    </q-card>

    <q-list>
      <q-item clickable v-ripple to="produtos" class="q-ma-md q-pa-lg bg-grey-3">
        <q-item-section> Quero economizar pesquisando produtos</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="arrow_forward_ios" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="nfe" class="q-ma-md q-pa-lg bg-grey-3">
        <q-item-section> Quero ajudar a comunidade a economizar mais </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="arrow_forward_ios" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
