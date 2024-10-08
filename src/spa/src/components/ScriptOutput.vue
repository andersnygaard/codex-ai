<template>
    <div>
      <h1>Dialog</h1>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ws: null, // WebSocket connection
        message: '', // Message to send
        messages: [], // Array of received messages
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
  };
  </script>
  
  <style scoped>
  input {
    margin-right: 10px;
  }
  </style>
  