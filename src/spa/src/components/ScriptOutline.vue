<template>
    <div>
      <h1>Script</h1>
      <textarea
        v-model="markdownContent"
        @input="adjustTextareaHeight"
        ref="markdownTextarea"
      ></textarea>
      <button @click="saveScriptOutline">Lagre endringer</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ScriptOutline',
    setup() {
      const markdownContent = ref('');
      const markdownTextarea = ref(null);
  
      // Fetch markdown data on component mount
      onMounted(() => {
        axios
          .get('/scriptoutline')
          .then(response => {
            markdownContent.value = response.data;
            adjustTextareaHeight(); // Adjust height after loading content
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
  
      // Function to adjust textarea height based on content
      const adjustTextareaHeight = () => {
        const textarea = markdownTextarea.value;
        if (textarea) {
          textarea.style.height = 'auto'; // Reset height
          textarea.style.height = `${textarea.scrollHeight}px`; // Set to the content height
        }
      };
  
      return {
        markdownContent,
        markdownTextarea,
        saveScriptOutline,
        adjustTextareaHeight,
      };
    },
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%; /* Takes full width */
    padding: 10px;
    font-family: monospace;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    box-sizing: border-box; /* Include padding and border in width/height calculations */
    overflow: hidden; /* Hide scrollbar */
    resize: none; /* Disable manual resize */
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
  