interface IDeviceSpec {
  title: string;
  detail: string;
}

const DeviceSpec = ({ title, detail }: IDeviceSpec) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-gray-200 text-xs p-2 shadow-xs">
      <div className="font-bold text-gray-400">{title}</div>
      <div>{detail}</div>
    </div>
  );
};

export default DeviceSpec;
