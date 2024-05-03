import Header from "./_components/header";
import Search from "./_components/search";
import PromoBanner from "./_components/promo-banner";
import ProductList from "./_components/product-list";
import CategoryList from "./_components/category-list";

import { Button } from "./_components/ui/button";

import { ChevronRight } from "lucide-react";

import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurant-list";
import BannerSearch from "./_components/banner-search";
import Container from "./_components/container";
import Link from "next/link";

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
      <div className="hidden lg:block">
        <BannerSearch />
      </div>
      <Container>
        <div className="">
          <CategoryList />
        </div>
        <div className="flex flex-col">
          <div className="px-5 lg:hidden">
            <PromoBanner src="/promo-banner-01.png" alt="até 30% de desconto" />
          </div>

          <div className="pt-6">
            <div className="flex items-center justify-between px-5 lg:px-0">
              <h2 className="font-semibold">Produtos recomendados</h2>

              <Button
                asChild
                variant="ghost"
                className="h-fit px-0 text-primary hover:bg-transparent"
              >
                <Link href="/products/recommended">
                  Ver todos
                  <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
            <ProductList products={products} />
          </div>

          <div className="px-5 pt-6 lg:order-2 lg:flex lg:items-center lg:justify-between lg:gap-5 lg:px-0">
            <div className="hidden w-full lg:block">
              <PromoBanner
                src="/promo-banner-01.png"
                alt="até 30% de desconto"
                className=""
              />
            </div>
            <div className="w-full">
              <PromoBanner
                src="/promo-banner-02.png"
                alt="apartir de 17,90 em lanches"
                className=""
              />
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="flex items-center justify-between px-5 lg:px-0">
            <h2 className="font-semibold">Restaurantes Recomendados</h2>

            <Button
              variant="ghost"
              className="h-fit px-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href={"/restaurants/recommended"}>
                Ver todos
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </Container>
    </>
  );
}
