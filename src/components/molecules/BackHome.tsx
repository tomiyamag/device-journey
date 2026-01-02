import AppLink from "../atoms/AppLink";

const BackHome = () => {
  return (
    <div className="text-center mt-9">
      <AppLink href="/dashboard" label="ホームへ戻る" />
    </div>
  );
};

export default BackHome;
