import AppLink from "../ui/AppLink";

interface IBackHome {
  prevItem?: {
    href: string;
    label: string;
    prefetch?: boolean;
  };
}

const BackHome = ({ prevItem }: IBackHome) => {
  return (
    <div className="flex gap-12 items-center justify-center mt-9">
      {prevItem && (
        <AppLink
          href={prevItem.href}
          label={prevItem.label}
          prefetch={prevItem.prefetch}
        />
      )}
      <AppLink href="/" label="ホーム" prefetch />
    </div>
  );
};

export default BackHome;
