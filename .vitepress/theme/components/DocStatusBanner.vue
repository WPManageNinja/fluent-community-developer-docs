<template>
  <div class="doc-status-banner">
    <span class="banner-icon">📝</span>
    <p class="banner-text">Documentation in progress - some sections may be incomplete or subject to change.</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.doc-status-banner {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 24px;
  background-color: var(--vp-custom-block-warning-bg);
  border: 1px solid var(--vp-custom-block-warning-border);
  border-left: 3px solid var(--vp-c-yellow-1, #f59e0b);
  border-radius: 8px;
  color: var(--vp-custom-block-warning-text);
}

.banner-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
  line-height: 1;
}

.banner-text {
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
}

/* Dark mode support */
.dark .doc-status-banner {
  background-color: var(--vp-custom-block-warning-bg);
  border-color: var(--vp-custom-block-warning-border);
  color: var(--vp-custom-block-warning-text);
}
</style>

