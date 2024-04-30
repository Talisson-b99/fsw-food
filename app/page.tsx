import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/serach";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="">
        <CategoryList />
      </div>

      <div className="px-5">
        <Image
          src="/promo-banner-01.png"
          alt="até 30% de desconto"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
          className="h-auto w-full"
        />
      </div>
    </>
  );
}
