import React, { useState } from 'react';

const BASE_ENDPOINT = 'ws://localhost:8000/ws/food_processing/'; // Your WebSocket endpoint

function WebSocketTask() {
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);

  const handleTaskIdChange = (event) => setTaskId(event.target.value);

  const startWebSocketConnection = () => {
    if (!taskId.trim()) {
      setError('Please enter a valid task ID.');
      return;
    }

    try {
      setIsLoading(true);
      setError(''); // Reset error message

      const socket = new WebSocket(`${BASE_ENDPOINT}${taskId}/`); // WebSocket connection

      socket.onopen = () => {
        setStatus('Connected to WebSocket!');
        socket.send(JSON.stringify({ action: 'start_task' })); // Start the task when connection opens
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setStatus(data.status); // Update status from server
      };

      socket.onerror = (err) => {
        setError('Error with WebSocket connection.');
        console.error('WebSocket Error:', err);
      };

      socket.onclose = () => {
        setStatus('WebSocket connection closed.');
      };

      setWs(socket); // Save the WebSocket connection in state
    } catch (err) {
      setError(err.message || 'Failed to connect to WebSocket.');
    } finally {
      setIsLoading(false); // Set loading to false after connection attempt
    }
  };

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = { action: 'process_food', food_data: 'Sample food data' };
      ws.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.log("WebSocket is not open.");
    }
  };

  return (
    <div>
      <h2>WebSocket Task</h2>
      <input
        type="text"
        value={taskId}
        onChange={handleTaskIdChange}
        placeholder="Enter Task ID"
      />
      <button onClick={startWebSocketConnection} disabled={isLoading}>
        {isLoading ? 'Connecting...' : 'Start WebSocket Connection'}
      </button>
      <button onClick={sendMessage} disabled={isLoading || !ws || ws.readyState !== WebSocket.OPEN}>
        Send Message
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {status && (
        <div>
          <h3>Status:</h3>
          <pre>{status}</pre>
        </div>
      )}
    </div>
  );
}

export default WebSocketTask;
