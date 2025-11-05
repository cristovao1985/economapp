<template>
  <q-page class="q-ma-md">
    <q-card class="q-mb-md q-pa-md" flat bordered>
      O EconomApp é uma comunidade de compartilhamento de preços de supermercado. Nosso principal
      objetivo é ajudar outras pessoas a economizarem nas suas compras.
    </q-card>
    <q-card class="q-mb-md q-pa-md" flat bordered>
      Quero economizar

      <q-card-actions align="right">
        <q-btn to="produtos" label="Economizar" flat />
      </q-card-actions>
    </q-card>
    <q-card class="q-mb-md q-pa-md" flat bordered>
      Quero ajudar a comunidade a economizar mais
      <q-card-actions align="right">
        <q-btn to="nfe" label="Ajudar a comunidade" flat />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
