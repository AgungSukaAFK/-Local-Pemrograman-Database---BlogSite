import { useRouter } from "next/navigation";
import "./search.css";

function Search() {
  const router = useRouter();
  function searchButton__onClick() {
    let input = document.getElementById("search-home");
    let search = input.value;

    router.push(`/home/filter?search=${search}`);
  }
  return (
    <div className="search-box">
      <input
        type="search"
        name="search-home"
        id="search-home"
        placeholder="Cari sesuatu..."
      />
      <button onClick={searchButton__onClick}>Cari</button>
    </div>
  );
}

export default Search;
