import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import Header from "@/app/_components/header";
import Container from "@/app/_components/container";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          name: "asc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <Container>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:hidden">
        <RestaurantImage restaurant={restaurant} />
      </div>

      <div className="relative -mt-5 justify-between rounded-3xl bg-white px-5 pt-5 lg:mt-5 lg:grid lg:grid-cols-2 lg:px-0 ">
        <div className="relative hidden h-[380px] min-w-[100%] max-w-[100%] overflow-hidden rounded-xl lg:block">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            objectFit="cover"
          />
        </div>

        <div className="lg:flex lg:flex-col lg:p-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  objectFit="cover"
                />
              </div>
              <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>

            <div>
              <Badge className="flex w-fit items-center gap-[2px] bg-foreground py-1">
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                    fill="#FFB100"
                    stroke="#FFB100"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                5.0
              </Badge>
            </div>
          </div>
          <DeliveryInfo restaurant={restaurant} />

          <div className="mb-8 flex gap-4 overflow-x-scroll px-5 pt-3 [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="h-[26px] min-w-[137px] rounded-lg bg-[#f4f4f4] py-1 text-center text-xs text-muted-foreground"
              >
                {category.name}
              </div>
            ))}
          </div>
          <div className="hidden px-5 lg:block">
            <h3 className="font-semibold">Sobre</h3>
            <p className="tex-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque in
              doloremque earum exercitationem aperiam impedit, facere esse
              ducimus suscipit eaque iste explicabo, repudiandae qui temporibus
              itaque adipisci labore, aspernatur accusamus!
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* TODO: mostrar produtos mais vendidos quando implementar realização de pedido */}
        <h2 className="mb-3 px-5 font-semibold lg:mt-10 lg:px-0">
          certifique-se de que a página de restauração seja responsiva para
          desktop Mais Pedidos
        </h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id}>
          <h2 className="my-6 mb-3 px-5 font-semibold lg:px-0">
            {category.name}
          </h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </Container>
  );
};

export default RestaurantPage;
