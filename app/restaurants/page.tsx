"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurant(searchFor);

      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchParams, searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="flex w-full flex-col items-center space-y-6">
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

export default Restaurants;
