"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/formatcurrency";
import { calculateProductTotalPrice } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className="relative -mt-5 rounded-t-3xl bg-white py-5">
      <div className="flex items-center gap-1.5 px-5">
        <div className="relative size-6 overflow-hidden rounded-full">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            objectFit="cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* Nome do produto */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      {/* preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        {/* preço */}
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className="block text-xs text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        {/* Quantidade */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="block w-4 text-center">{quantity}</span>

          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Dados da entrega */}
      <DeliveryInfo restaurant={product.restaurant} />

      <div className=" mt-6 px-5">
        <h3 className="mb-3 font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="pt-6">
        <h3 className="mb-3 px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
      <div className="mt-6 px-5">
        <Button className="h-[45px] w-full text-sm font-semibold">
          Adicionar à sacola
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
