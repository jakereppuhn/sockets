import { useEffect, useState } from "react";

type Esp32Props = {
  espId: string;
  machineId: string;
};

const Esp32 = ({ espId, machineId }: Esp32Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Setup heartbeat when connected
    if (ws && isConnected) {
      const heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: "HEARTBEAT",
            payload: { machineId },
            timestamp: new Date(),
          }));
        }
      }, 20000); // Send heartbeat every 20 seconds

      return () => clearInterval(heartbeat);
    }
  }, [ws, isConnected, machineId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connectWebSocket = () => {
    try {
      const socket = new WebSocket(
        `ws://localhost:3000?machineId=${machineId}`,
      );

      socket.onopen = () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
        setError(null);
        setWs(socket);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Received:", message);
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      socket.onclose = () => {
        console.log("WebSocket Disconnected");
        setIsConnected(false);
        setWs(null);
      };

      socket.onerror = (e) => {
        console.error("WebSocket Error:", e);
        setError("Failed to connect");
        setIsConnected(false);
        setWs(null);
      };
    } catch (err) {
      setError(`Connection failed ${err}`);
      setIsConnected(false);
      setWs(null);
    }
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setIsConnected(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-2">ESP32 Device</h3>
      <div className="space-y-2">
        <p>ESP ID: {espId}</p>
        <p>Machine ID: {machineId}</p>
        <p>Status: {isConnected ? "Connected 🟢" : "Disconnected 🔴"}</p>
        {error && <p className="text-red-500">{error}</p>}

        {!isConnected
          ? (
            <button
              onClick={connectWebSocket}
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              Connect
            </button>
          )
          : (
            <button
              onClick={disconnect}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Disconnect
            </button>
          )}
      </div>
    </div>
  );
};

export default Esp32;
