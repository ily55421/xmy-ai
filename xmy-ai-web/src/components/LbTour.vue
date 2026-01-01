<script lang="ts" setup>
import { ini_ui_language } from '@/state/i18n'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div>
    <br />
    {{ t('tour.install-instruct') }}
    <ol>
      <li>
        <a href="./xmy-ai-chrome-plugin.7z">{{ t('tour.step1') }}</a>
      </li>
      <li>{{ t('tour.step2') }}</li>
      <li>{{ t('tour.step3') }}</li>
      <li>
        {{ t('tour.step4') }}
        <img v-if="ini_ui_language === 'zh-CN'" src="../imgs/tour_1.jpg" />
        <img v-else src="../imgs/tour_1_en.jpg" />
      </li>
      <li>{{ t('tour.step5') }}</li>
      <li>{{ t('tour.step6') }}</li>
    </ol>
  </div>
</template>

<style lang="css" scoped>
a {
  color: #eee;
}
.dark a {
  color: #aaa;
}
img {
  width: 100%;
  padding: 8px 18px 8px 0;
}
</style>
