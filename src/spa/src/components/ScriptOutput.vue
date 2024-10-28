<template>
    <div>
      <h1>Handling</h1>
      <button @click="startChapter" v-show="buttonVisible">Start handling</button>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </template>
  
  <script>
    import axios from 'axios';

    export default {
      data() {
        return {
          ws: null, // WebSocket connection
          message: '', // Message to send
          messages: [], // Array of received messages
          buttonVisible: true
        };
      },
      mounted() {
        // Koble til WebSocket-serveren når komponenten er montert
        this.ws = new WebSocket('ws://localhost:3001');
    
        // Motta meldinger fra serveren
        this.ws.onmessage = (event) => {
          this.messages.push(event.data);
        };
    
        // Håndtere WebSocket-feil
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        // Når forbindelsen er lukket
        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
      },
      methods: {
        // Function to save the updated markdown content
        startChapter() {
          axios
            .get('/scriptoutline/generate', { content: this.markdownContent })
            .then(() => {
              this.buttonVisible = false;
            })
            .catch(error => {
              console.error('Error starting script generation: ', error);
              alert('Error starting script generation');
            });
        }
      }
    };
  </script>
  
  <style scoped>
  input {
    margin-right: 10px;
  }
  ul{
    text-align: left;
    text-indent: 0;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 16px;
      list-style-type: none;
    }
  }
  button {
    width: 100%;
    background-color: #fee;
    color: #444;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top:32px;
    margin-bottom: 64px;
  }
  button:hover {
    background-color: #fcc;
  }
  </style>
  