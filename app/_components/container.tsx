import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:mx-auto lg:max-w-[1444px] lg:px-32">{children}</div>
  );
};

export default Container;
