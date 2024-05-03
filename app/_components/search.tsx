"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex lg:hidden" onSubmit={handleSearchSubmit}>
      <Input
        className="flex-1 border-none"
        placeholder="Buscar Restaurantes"
        onChange={handleSearch}
        value={search}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
