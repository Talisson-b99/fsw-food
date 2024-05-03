import Image from "next/image";

import { Prisma, Product } from "@prisma/client";

import { calculateProductTotalPrice } from "../_helpers/price";

import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="min-w-[150px] max-w-[150px]">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
            quality={100}
            className="max-h-[150px] min-h-[150px]  min-w-[150px] max-w-[150px] object-cover"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute left-2 top-2 flex items-center gap-[2px] text-xs font-semibold">
              <ArrowDownIcon size={12} />
              {product.discountPercentage}%
            </Badge>
          )}
        </div>
        <div className="mt-2">
          <h2 className="truncate text-sm">{product.name}</h2>

          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(product.price))}
              </span>
            )}
          </div>
          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
