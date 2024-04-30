import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex gap-3 overflow-scroll px-5 py-6 [&::-webkit-scrollbar]:hidden">
      {categories.map((categorie) => (
        <CategoryItem category={categorie} key={categorie.id} />
      ))}
    </div>
  );
};

export default CategoryList;
