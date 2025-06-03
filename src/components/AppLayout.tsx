import Image from "next/image";
import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b border-gray-200 min-h-10  ">
        <div className="pl-4 py-2">
          <Image
            src={"/imgs/logo.png"}
            alt="logo"
            height={60}
            width={60}
            className=""
            priority
          />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
