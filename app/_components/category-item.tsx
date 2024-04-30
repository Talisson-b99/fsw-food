import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex max-h-14 min-w-fit items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        quality={100}
        objectFit="cover"
        className="h-[25px] w-[25px]"
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
