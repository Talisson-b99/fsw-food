import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurant = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="p-5 lg:px-20">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="flex w-full flex-col items-center justify-items-center gap-5 space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurant;
