// 代码生成时间: 2025-10-06 00:00:27
import { defineComponent, ref, onUnmounted, Ref } from 'vue';
import { useIntervalFn } from '@vueuse/core'; // Using @vueuse/core for time interval

// Interface for task data
interface Task {
  id: number;
  description: string;
  interval: number; // Interval in milliseconds
  lastRun?: Date;
}

// TaskScheduler component
export default defineComponent({
  name: 'TaskScheduler',
  setup() {
    // State for tasks
    const tasks: Ref<Task[]> = ref([]);
    const addTask = (description: string, interval: number) => {
      const newTask: Task = {
        id: tasks.value.length + 1,
        description,
        interval,
        lastRun: new Date()
      };
      tasks.value.push(newTask);
    };

    // Function to remove a task
    const removeTask = (id: number) => {
      tasks.value = tasks.value.filter(task => task.id !== id);
    };

    // Function to run a task
    const runTask = (task: Task) => {
      console.log(`Task ${task.id}: ${task.description} running at ${new Date().toISOString()}`);
      task.lastRun = new Date();
    };

    // Use interval function for task scheduling
    useIntervalFn(() => {
      tasks.value.forEach(task => {
        runTask(task);
      });
    }, tasks.value.length > 0 ? tasks.value[0].interval : null);

    onUnmounted(() => {
      // Clean up interval on component unmount
      clearAllIntervals();
    });

    return {
      tasks,
      addTask,
      removeTask
    };
  },
  template: `
    <div>
      <h1>Task Scheduler</h1>
      <input v-model="newTaskDescription" placeholder="Task description"/>
      <input v-model="newTaskInterval" type="number" placeholder="Interval in ms"/>
      <button @click="addTask(newTaskDescription, newTaskInterval)">Add Task</button>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.description }} - Last run: {{ task.lastRun ? task.lastRun.toISOString() : 'Never' }}
          <button @click="removeTask(task.id)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  data() {
    return {
      newTaskDescription: '',
      newTaskInterval: 0
    };
  },
  methods: {
    addTask,
    removeTask
  }
});

// Helper function to clear all intervals, avoid memory leaks
function clearAllIntervals() {
  // Assuming intervals are stored somehow, clear them here
  console.warn('Clearing all intervals (not implemented in this example)');
}
