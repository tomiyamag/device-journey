interface IDeviceTag {
  label: string;
}

const DeviceTag = ({ label }: IDeviceTag) => {
  return <div>{label}</div>;
};

export default DeviceTag;
