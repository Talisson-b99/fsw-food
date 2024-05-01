import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

const BannerSearch = () => {
  return (
    <div className="flex h-[500px] gap-[60px] bg-primary px-32">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
        <p className="text-lg text-white">
          Com apenas alguns cliques, encontre refeições acessíveis perto de
          você.
        </p>
        <div className="mt-8 flex h-20 w-full items-center rounded-xl bg-white">
          <div className="flex w-full px-6">
            <Input
              placeholder="Buscar Restaurantes"
              className="flex-1 border-none outline-none "
            />
            <Button className=" bg-[#FFB100]" size="icon">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex-1">
        <Image
          src="/banner-search-desktop.png"
          alt="proto de macarrão com legumes"
          width={377}
          height={377}
          quality={100}
          className="absolute bottom-0 left-0 right-0 h-[327px] w-[327px]"
        />
      </div>
    </div>
  );
};

export default BannerSearch;
