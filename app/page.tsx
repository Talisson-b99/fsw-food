import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/serach";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="">
        <CategoryList />
      </div>
    </>
  );
}
