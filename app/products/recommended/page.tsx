import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const ProducstRecommended = async () => {
  // TODO: pegar produtos com mais pedidos
  const products = await db.product.findMany({
    take: 10,
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
      <div className="p-5">
        <h2 className="mb-6 text-lg font-semibold">Produtos recomendados</h2>
        <div className="grid w-full grid-cols-2 flex-col items-center justify-center justify-items-center gap-3 space-y-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProducstRecommended;
