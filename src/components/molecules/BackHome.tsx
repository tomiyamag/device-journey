import AppLink from "../atoms/AppLink";

interface IBackHome {
  prevItem?: {
    href: string;
    label: string;
  };
}

const BackHome = ({ prevItem }: IBackHome) => {
  return (
    <div className="flex gap-12 items-center justify-center mt-9">
      {prevItem && <AppLink href={prevItem.href} label={prevItem.label} />}
      <AppLink href="/" label="ホーム" />
    </div>
  );
};

export default BackHome;
