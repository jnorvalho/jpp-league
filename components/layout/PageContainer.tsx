import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageContainer({
  children,
}: Props) {
  return (
    <main className="pb-28">
      <div className="mx-auto max-w-5xl p-6">
        {children}
      </div>
    </main>
  );
}