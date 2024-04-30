import Header from "./_components/header";
import Search from "./_components/serach";
import PromoBanner from "./_components/promo-banner";
import ProductList from "./_components/product-list";
import CategoryList from "./_components/category-list";

import { Button } from "./_components/ui/button";

import { ChevronRight } from "lucide-react";

import { db } from "./_lib/prisma";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 12,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

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
        <PromoBanner src="/promo-banner-01.png" alt="até 30% de desconto" />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Produtos recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit px-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRight size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="apartir de 17,90 em lanches"
        />
      </div>
    </>
  );
}
