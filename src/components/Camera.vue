<script setup>
 import { ref, onUnmounted, onMounted } from 'vue'
    const stream = ref(null)
    const video = ref(null)
    const image = ref(null)
    const emit = defineEmits(['takePhoto', 'closeCamera'])

    const requestCameraAccess = async () => {
        try {
            stream.value = await navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"} })
            if (stream.value) {
                cameraAllowed.value = true
            }
        } catch (error) {
        
        }
    }

    const capture = () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.value.videoWidth
        canvas.height = video.value.videoHeight
        canvas.getContext('2d').drawImage(video.value, 0, 0, canvas.width, canvas.height)
        image.value = canvas.toDataURL('image/png')
        closeCamera()
        emit('takePhoto', image.value)
    }

    const close = () => {
        closeCamera()
        emit('closeCamera')
    }

    const closeCamera = () => {
        if (stream.value) {
            stream.value.getTracks().forEach(track => track.stop())
        }
    }

    onMounted(() => {
        requestCameraAccess()
    })

    onUnmounted(() => {
        return () => {
            if (stream.value) {
                stream.value.getTracks().forEach(track => track.stop())
            }
        }
    })
</script>
<template>
    <div class="fill-height bg-black">
        <video class="capture-img" :srcObject="stream" ref="video" autoplay></video>
        <div class="mx-5 d-flex justify-space-between">
            <v-btn @click="close" icon="mdi-close"></v-btn>
            <v-btn @click="capture" icon="mdi-check"></v-btn>
        </div>
    </div>
</template>
<style scoped>
.capture-img {
    aspect-ratio: 9/16;
    width: 100%;
    height: 89vh;
}
</style>