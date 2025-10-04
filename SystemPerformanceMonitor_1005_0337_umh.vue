// 代码生成时间: 2025-10-05 03:37:21
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

interface PerformanceData {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export default defineComponent({
  name: 'SystemPerformanceMonitor',
  props: {},
  setup() {
    const performanceData = ref<PerformanceData>({ cpuUsage: 0, memoryUsage: 0, diskUsage: 0 });
    const error = ref<string | null>(null);

    // Simulate fetching system performance data
    const fetchPerformanceData = async () => {
      try {
        // Mock data fetching logic
        // In a real scenario, this would be replaced with actual API calls
        performanceData.value = {
          cpuUsage: Math.random() * 100,
          memoryUsage: Math.random() * 100,
          diskUsage: Math.random() * 100,
        };
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      }
    };

    const intervalId = ref<number | null>(null);

    onMounted(() => {
      fetchPerformanceData();
      intervalId.value = setInterval(fetchPerformanceData, 2000); // Update every 2 seconds
    });

    onUnmounted(() => {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
      }
    });

    return {
      performanceData,
      error,
    };
  },
});
</script>

<template>
  <div>
    <h1>System Performance Monitor</h1>
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
    <div v-else>
      <p>CPU Usage: {{ performanceData.cpuUsage.toFixed(2) }}%</p>
      <p>Memory Usage: {{ performanceData.memoryUsage.toFixed(2) }}%</p>
      <p>Disk Usage: {{ performanceData.diskUsage.toFixed(2) }}%</p>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
