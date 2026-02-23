import { Suspense } from "react";

import BackHome from "@/components/common/BackHome";
import PageHeading from "@/components/common/PageHeading";
import Spinner from "@/components/ui/Spinner";

import AccountFormContainer from "./_components/AccountFormContainer";

interface Props {
  searchParams: Promise<{
    message: string;
  }>;
}

export default async function AccountPage({ searchParams }: Props) {
  return (
    <section>
      <PageHeading label="アカウント設定" />

      <Suspense fallback={<Spinner className="py-32" />}>
        <AccountFormContainer searchParams={searchParams} />
      </Suspense>

      <BackHome />
    </section>
  );
}
