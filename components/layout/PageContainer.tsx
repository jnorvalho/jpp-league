
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageContainer({
  children,
}: Props) {
  return (
    <main className="min-h-[calc(100vh-100px)] px-4 py-5 pb-28 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="jpp-frame p-4 sm:p-6">
          {children}
        </div>
      </div>
    </main>
  );
}