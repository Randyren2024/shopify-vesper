<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const min = computed(() => props.min ?? 1)
const max = computed(() => props.max ?? 99)

function step(delta: number) {
  const next = Math.min(max.value, Math.max(min.value, props.modelValue + delta))
  emit('update:modelValue', next)
}

function onInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  if (!Number.isFinite(value)) return
  emit('update:modelValue', Math.min(max.value, Math.max(min.value, Math.round(value))))
}
</script>

<template>
  <div class="v-qty">
    <button type="button" aria-label="Decrease quantity" @click="step(-1)">
      <AppIcon name="minus" :size="14" />
    </button>
    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      aria-label="Quantity"
      @input="onInput"
    >
    <button type="button" aria-label="Increase quantity" @click="step(1)">
      <AppIcon name="plus" :size="14" />
    </button>
  </div>
</template>
