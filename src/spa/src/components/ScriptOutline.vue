<template>
  <div>
    <h1>Script outline</h1>
    <textarea v-model="markdownContent" rows="10" cols="50"></textarea>
    <button @click="saveScriptOutline">Save Script Outline</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'ScriptOutline',
  setup() {
    const markdownContent = ref('');

    // Fetch markdown data on component mount
    onMounted(() => {
      axios
        .get('/scriptoutline')
        .then(response => {
          markdownContent.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching script outline:', error);
        });
    });

    // Function to save the updated markdown content
    const saveScriptOutline = () => {
      axios
        .post('/scriptoutline', { content: markdownContent.value })
        .then(() => {
          alert('Script outline saved successfully!');
        })
        .catch(error => {
          console.error('Error saving script outline:', error);
          alert('Failed to save script outline');
        });
    };

    return {
      markdownContent,
      saveScriptOutline,
    };
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  padding: 10px;
  font-family: monospace;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
