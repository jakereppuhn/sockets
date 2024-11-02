import Esp32 from "../../components/sandbox/esp32";

const Sandbox = () => {
  return (
    <div>
      <Esp32 espId="esp001" machineId="machine001" />
      <Esp32 espId="esp002" machineId="machine002" />
      <Esp32 espId="esp003" machineId="machine003" />
    </div>
  );
};

export default Sandbox;
