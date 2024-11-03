import Esp32 from "../../components/sandbox/esp32";

const Sandbox = () => {
  return (
    <div className="gap-4 flex h-max p-4 flex-wrap">
      <Esp32 espId="esp001" machineId="machine001" />
      <Esp32 espId="esp002" machineId="machine002" />
      <Esp32 espId="esp003" machineId="machine003" />
      <Esp32 espId="esp004" machineId="machine004" />
    </div>
  );
};

export default Sandbox;
