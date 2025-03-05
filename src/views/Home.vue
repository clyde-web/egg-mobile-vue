<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const deferredPrompt = ref(null);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt.value = event;
  })
})

const installApp = () => {
  if (!deferredPrompt.value) return;

  deferredPrompt.value.prompt();
  deferredPrompt.value.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      router.push({name: 'capture'});
    }
    deferredPrompt.value = null;
  });
}
</script>
<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="8" md="6" lg="4">
      <div class="h-screen pa-3">
        <div class="main-wrapper d-flex justify-center align-center flex-column text-center">
          <div class="border rounded fit-content px-3 py-2">
            <img src="/egg.png" alt="Egg Logo" width="125" height="125" />
          </div>
          <h1 class="text-h5 font-weight-black mt-1 mb-2">Egg Sizing</h1>
          <p class="text-caption text-none text-caption-medium">Performance Evaluation of Canny Edge Detection and Machine Learning for Egg Sizing: Implementation of a Mobile Application and Single-line Flow Machine</p>
          <v-icon aria-label="Arrow Down" icon="mdi-arrow-down-thin" role="img" aria-hidden="false" size="x-large" />
        </div>
        <div class="d-flex justify-center align-center flex-column">
          <div class="mb-2">
            <v-chip prepend-icon="mdi-android" color="blue">Android</v-chip>
            <v-chip prepend-icon="mdi-apple" color="blue" class="ml-2">Apple</v-chip>
          </div>
          <v-btn @click="installApp" color="blue" block>Download</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped>
  .main-wrapper {
    height: calc(100vh - 99px) !important;
  }
  .text-caption-medium {
    font-size: 0.89rem !important;
  }
  .fit-content {
    width: fit-content !important;
  }
</style>