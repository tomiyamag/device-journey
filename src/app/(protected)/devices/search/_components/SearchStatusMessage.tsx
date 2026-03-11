interface ISearchStatusMessage {
  label: string;
}

const SearchStatusMessage = ({ label }: ISearchStatusMessage) => {
  return <div className="px-3.5 py-3 text-gray-500">{label}</div>;
};

export default SearchStatusMessage;
