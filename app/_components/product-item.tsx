import Image from "next/image";

import { Prisma, Product } from "@prisma/client";

import { calculateProductTotalPrice } from "../_helpers/price";

import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

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
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("min-w-[150px] max-w-[150px]", className)}
    >
      <div className="">
        <div className="relative w-full overflow-hidden rounded-xl">
          <div className="relative min-h-[150px] w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              quality={100}
              className="object-cover"
            />
          </div>
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
