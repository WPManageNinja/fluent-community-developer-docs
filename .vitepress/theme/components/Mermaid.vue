<template>
  <div 
    ref="mermaidContainer" 
    class="mermaid mermaid-diagram" 
    v-html="renderedContent"
    @click="handleClick"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

const mermaidContainer = ref<HTMLElement>()
const renderedContent = ref('')

const handleClick = (event: MouseEvent) => {
  event.preventDefault()
}

onMounted(async () => {
  await nextTick()
  
  try {
    const { default: mermaid } = await import('mermaid')
    
    // Initialize Mermaid with better settings for ER diagrams
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#2271b1',
        lineColor: '#2271b1',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#e2e8f0',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#f8fafc',
        tertiaryBkg: '#e2e8f0',
        entityBkg: '#ffffff',
        entityTextColor: '#1e293b',
        relationLabelColor: '#1e293b',
        relationLabelBackground: '#ffffff'
      },
      er: {
        diagramPadding: 40,
        layoutDirection: 'TB',
        minEntityWidth: 180,
        minEntityHeight: 120,
        entityPadding: 30,
        stroke: '#2271b1',
        fill: '#ffffff',
        fontSize: 13,
        useMaxWidth: true,
        relationColor: '#2271b1'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    })
    
    // Create unique ID for this diagram
    const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
    
    // Render the diagram
    const { svg } = await mermaid.render(id, props.content)
    renderedContent.value = svg
    
    // Trigger zoom setup after render
    setTimeout(() => {
      if (mermaidContainer.value) {
        mermaidContainer.value.dataset.rendered = 'true'
        
        // Modify foreignObject elements
        const foreignObjects = mermaidContainer.value.querySelectorAll('foreignObject')
        foreignObjects.forEach(foreignObj => {
          // Set height to 40 if it's currently 21
          if (foreignObj.getAttribute('height') === '21') {
            foreignObj.setAttribute('height', '40')
          }
          
          // Add 20 to the width value
          const currentWidth = foreignObj.getAttribute('width')
          if (currentWidth) {
            const newWidth = parseFloat(currentWidth) + 20
            foreignObj.setAttribute('width', newWidth.toString())
          }
        })
        
        // Dispatch a custom event to trigger zoom setup
        const event = new CustomEvent('mermaidRendered', { 
          detail: { element: mermaidContainer.value } 
        })
        window.dispatchEvent(event)
      }
    }, 100)
    
  } catch (error) {
    console.error('Mermaid rendering error:', error)
    // Fallback to showing the raw content
    renderedContent.value = `<pre style="background: #f6f8fa; padding: 1rem; border-radius: 8px; overflow: auto;"><code>${props.content}</code></pre>`
  }
})
</script>

<style scoped>
.mermaid {
  text-align: center;
  margin: 20px 0;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 80vh;
  cursor: zoom-in;
  transition: all 0.3s ease;
  user-select: none;
}

.mermaid:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

:deep(.labelBkg) {
  background: white !important;
  padding: 4px 8px !important;
  border: 1px solid #2271b1;
}
</style>
