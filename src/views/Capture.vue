<script setup>
  import { ref } from 'vue'
  import Camera from '../components/Camera.vue'
  import apiClient from '../stores/axios'
  
  const image = ref(null)
  const image2 = ref(null)
  const cameraState = ref(false)
  const btnLoading = ref(false)
  const snackbar = ref({
    show: false,
    message: null,
    timeout: 2500
  })
  const result = ref({
    isLoading: true,
    width: null,
    height: null,
    classification: null
  })

  const handleClose = () => {
    cameraState.value = false
  }

  const handleTakePhoto = (img) => {
    resultReset()
    btnLoading.value = true
    image2.value = null
    image.value = img
    cameraState.value = false
    sendImage(img)
  }

  const takePhoto = () => {
    cameraState.value = true
  }

  const resultReset = () => {
    result.value.isLoading = true
    result.value.width = null
    result.value.height = null
    result.value.classification = null
  }

  const sendImage = async (base64image) => {
    try {
      const response = await apiClient.post('/upload', {
        image: base64image
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        image2.value = response.data.image
        if (response.data.width && response.data.height) {
          result.value.width = response.data.width
          result.value.height = response.data.height
          result.value.classification = response.data.classification
          result.value.isLoading = false
        }
      }
      btnLoading.value = false
    } catch (error) {
      image2.value = base64image
      snackbar.value.show = true
      snackbar.value.message = (error.code != 'ERR_NETWORK') ? error.response.data.error : error.message
      btnLoading.value = false
    }
  }
 
</script>
<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="8" md="6" lg="4">
      <div class="h-screen">
        <v-skeleton-loader type="image" v-if="!cameraState && !image"></v-skeleton-loader>
        <Camera 
          v-if="cameraState"
          @closeCamera="handleClose" 
          @takePhoto="handleTakePhoto"
        />
        <div v-if="image && !cameraState" class="mx-4">
          <v-img
            height="300"
            :lazy-src="image"
            :src="image2"
          >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
          </v-img>
        </div>
        <div v-if="!cameraState" class="mx-4 mb-3">
          <v-skeleton-loader type="list-item, list-item-three-line" :loading="result.isLoading">
            <v-responsive>
              <p class="text-uppercase font-weight-black mb-1 text-error">Output:</p>
              <p class="font-90">
                <span class="font-weight-bold">Width:</span> {{ result.width }}mm
              </p>
              <p class="font-90">
                <span class="font-weight-bold">Height:</span> {{ result.height }}mm
              </p>
              <p class="font-90">
                <span class="font-weight-bold">Classification:</span> {{ result.classification }}
              </p>
            </v-responsive>
          </v-skeleton-loader>
        </div>
        <div v-if="!cameraState" class="mx-4">
          <v-btn 
            color="blue"
            :disabled="btnLoading"
            :loading="btnLoading"
            @click="takePhoto"
            block>Take Photo</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
    {{ snackbar.message }}
  </v-snackbar>
</template>
<style scoped>
  .font-90 {
    font-size: 0.9rem;
  }
</style>