import { HeartIcon, ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Esp32Props = {
  espId: string;
  machineId: string;
};

const Esp32 = ({ espId, machineId }: Esp32Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [heartbeatEnabled, setHeartbeatEnabled] = useState(true);
  const [heartbeatInterval, setHeartbeatInterval] = useState<number | null>(
    null,
  );
  const [readingInterval, setReadingInterval] = useState<number | null>(null);
  const [isReadingSending, setIsReadingSending] = useState(false);

  const startHeartbeat = () => {
    if (ws && isConnected && heartbeatEnabled) {
      const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: "heartbeat",
            payload: { machineId },
            timestamp: new Date(),
          }));
        }
      }, 10000);
      setHeartbeatInterval(interval);
    }
  };

  const sendReading = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const reading = {
        type: "reading",
        payload: {
          machineId,
          espId,
          ampReading: +(Math.random() * 10).toFixed(2), // Random reading between 0-10 amps
        },
      };
      ws.send(JSON.stringify(reading));
    }
  };

  const startReadings = () => {
    if (!readingInterval) {
      const interval = setInterval(sendReading, 1000); // Send reading every second
      setReadingInterval(interval);
      setIsReadingSending(true);
    }
  };

  const stopReadings = () => {
    if (readingInterval) {
      clearInterval(readingInterval);
      setReadingInterval(null);
      setIsReadingSending(false);
    }
  };

  const stopHeartbeat = () => {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      setHeartbeatInterval(null);
    }
  };

  useEffect(() => {
    if (heartbeatEnabled && isConnected) {
      startHeartbeat();
    } else {
      stopHeartbeat();
    }

    return () => stopHeartbeat();
  }, [ws, isConnected, machineId, heartbeatEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHeartbeat();
      stopReadings();
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
        stopReadings();
      };

      socket.onerror = (e) => {
        console.error("WebSocket Error:", e);
        setError("Failed to connect");
        setIsConnected(false);
        setWs(null);
        stopReadings();
      };
    } catch (err) {
      setError(`Connection failed ${err}`);
      setIsConnected(false);
      setWs(null);
      stopReadings();
    }
  };

  const disconnect = () => {
    stopHeartbeat();
    stopReadings();
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

        <div className="flex items-center gap-2 mb-2">
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

          <button
            onClick={() => setHeartbeatEnabled(!heartbeatEnabled)}
            disabled={!isConnected}
            className={`px-4 py-2 rounded-md text-white ${
              isConnected
                ? heartbeatEnabled ? "bg-red-500" : "bg-neutral-500"
                : "bg-background"
            }`}
          >
            <HeartIcon />
          </button>

          <button
            onClick={isReadingSending ? stopReadings : startReadings}
            disabled={!isConnected}
            className={`px-4 py-2 rounded-md text-white ${
              isConnected
                ? isReadingSending ? "bg-red-500" : "bg-green-500"
                : "bg-background"
            }`}
          >
            <ZapIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Esp32;
