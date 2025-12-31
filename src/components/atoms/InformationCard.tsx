import { ReactNode } from "react";

interface IInformationCard {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const InformationCard = ({ header, footer, children }: IInformationCard) => {
  return (
    <div className="bg-gray-200 rounded-xl p-1 relative">
      {header && <div className="py-2 px-4 mb-1">{header}</div>}
      <div className="bg-white py-5 px-4 rounded-lg">{children}</div>
      {footer && <div className="py-2 px-2 sm:px-4 mt-1">{footer}</div>}
    </div>
  );
};

export default InformationCard;
