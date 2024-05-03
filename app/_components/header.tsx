import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          width={100}
          height={30}
          alt="logo fsw food"
          quality={100}
          priority={true}
          className="h-auto w-auto"
        />
      </Link>
      <Button variant="ghost" size="icon">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
