import { ArrowDownIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Product } from "@prisma/client";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <Badge className="text-xs font-semibold">
      <ArrowDownIcon size={12} />
      {product.discountPercentage}%
    </Badge>
  );
};

export default DiscountBadge;
