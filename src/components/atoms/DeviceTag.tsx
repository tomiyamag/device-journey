interface DeviceTag {
  label: string;
}

const DeviceTag = ({ label }: DeviceTag) => {
  return <div>{label}</div>;
};

export default DeviceTag;
