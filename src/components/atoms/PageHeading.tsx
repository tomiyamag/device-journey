interface IPageHeading {
  label: string;
}

const PageHeading = ({ label }: IPageHeading) => {
  return (
    <h2 className="flex flex-col gap-4 text-center font-bold text-xl mb-8">
      <span>{label}</span>
      <span className="border-b border-b-teal-600 w-7 mx-auto"></span>
    </h2>
  );
};

export default PageHeading;
