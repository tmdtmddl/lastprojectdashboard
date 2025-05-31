import Image from "next/image";
import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen">
      <div className="border-b border-gray-200 min-h-20 ">
        <div className="pl-4 py-2.5">
          <Image
            src={"/imgs/logo.png"}
            alt="logo"
            height={80}
            width={80}
            className=""
          />
        </div>
      </div>
      <main className="">{children}</main>
    </div>
  );
};

export default AppLayout;
