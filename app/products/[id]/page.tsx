import { notFound } from "next/navigation";

import { db } from "@/app/_lib/prisma";

import ProductImage from "./_components/product-image";

import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <div className="py-5">
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </div>
  );
};

export default ProductsPage;
