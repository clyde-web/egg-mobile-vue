<template>
    <v-container>
      <h1>Upload Image</h1>
      <v-file-input
        label="Select an image"
        accept="image/*"
        multiple
        @change="handleFileUpload"
      ></v-file-input>
      <v-img v-if="imageUrl" :src="imageUrl" max-width="500" class="mt-4"></v-img>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const imageUrl = ref(null)
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      imageUrl.value = URL.createObjectURL(file)
    }
  }
  </script>