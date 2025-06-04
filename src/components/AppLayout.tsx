import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="border-b border-gray-200 min-h-10  ">
        <div className="pl-4 py-2 flex gap-x-2.5 items-center">
          <Link href={"/dashboard/user"}>
            <Image
              src={"/imgs/logo.png"}
              alt="logo"
              height={60}
              width={60}
              className=""
              priority
            />
          </Link>
          <p className="font-bold text-2xl whitespace-pre-line">
            방방{"\n"}콕콕
          </p>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
