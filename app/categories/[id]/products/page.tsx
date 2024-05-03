import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid w-full grid-cols-2 items-center justify-center justify-items-center space-y-6 lg:grid-cols-3 lg:gap-5 lg:space-y-0 xl:grid-cols-4">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="lg:min-w-full lg:max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
