import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex lg:hidden">
      <Input className="flex-1 border-none" placeholder="Buscar Restaurantes" />
      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
