<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CpModal from './CpModal.vue'
import { isCn } from '@/state/i18n'
import { useI18n } from 'vue-i18n'
const show = ref(false)
const emit = defineEmits(['hidden'])
const { t } = useI18n()
onMounted(() => {
  show.value = true
})
function toggleFullscreen(e: PointerEvent) {
  const elem: HTMLImageElement | null = e.target as unknown as HTMLImageElement

  if (!document.fullscreenElement) {
    if (elem?.requestFullscreen) {
      elem.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
const isEdge = navigator.userAgent.includes('Edg/')
</script>

<template>
  <CpModal
    v-model:show="show"
    :title="isEdge ? t('sstour.title') : t('svtour.title')"
    @update:show="emit('hidden')"
  >
    <div>
      <ol v-if="isEdge">
        <li>
          {{ t('sstour.step1') }}
          <img v-if="isCn" src="../imgs/se_tour_1.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/se_tour_en_1.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('sstour.step2') }}
          <img v-if="isCn" src="../imgs/se_tour_2.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/se_tour_en_2.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('sstour.step3') }}
          <img v-if="isCn" src="../imgs/se_tour_3.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/se_tour_en_3.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('sstour.step4') }}
        </li>
        <li>
          {{ t('sstour.step5') }}
          <img v-if="isCn" src="../imgs/se_tour_4.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/se_tour_en_4.jpg" @click="toggleFullscreen" />
        </li>
      </ol>
      <ol v-else>
        <li>
          {{ t('svtour.step1') }}
          <img v-if="isCn" src="../imgs/s_tour_1.png" @click="toggleFullscreen" />
          <img v-else src="../imgs/s_tour_en_1.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('svtour.step2') }}
          <img v-if="isCn" src="../imgs/s_tour_2.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/s_tour_en_2.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('svtour.step3') }}
          <img v-if="isCn" src="../imgs/s_tour_4.jpg" @click="toggleFullscreen" />
          <img v-else src="../imgs/s_tour_en_4.jpg" @click="toggleFullscreen" />
        </li>
        <li>
          {{ t('svtour.step4') }}
        </li>
      </ol>
      <br />
      <br />
      <br />
      <br />
    </div>
  </CpModal>
</template>

<style lang="css" scoped>
div {
  height: 100%;
  overflow-y: scroll;
}
ol {
  width: 380px;
  padding: 16px 8px 0 36px;
  margin-bottom: 16px;
}
img {
  width: 100%;
  padding: 8px 18px 8px 0;
}
</style>
