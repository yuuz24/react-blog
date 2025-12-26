import { useEffect, useRef, useState } from "react";
import { search } from "../../assets/images/images";
import { useNavigate } from "react-router-dom";

export default function SearchArea() {
  const [query, setQuery] = useState("");
  const debounceTimer = useRef<null | number>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      navigate(query ? "?q=" + query : "/");
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [navigate, query]);

  return (
    <section className="search-area">
      <article className="search-area__search">
        <h2 className="search-area__title">Blog Project</h2>
        <p className="search-area__description">
          A Blog About Food, Experience, and Recipes.
        </p>
        <form method="get" className="search-area__form">
          <input
            type="text"
            name="q"
            placeholder="Search"
            className="search-area__input"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-area__submit">
            <img src={search} alt="search-icon" className="search-area__icon" />
          </button>
        </form>
      </article>
    </section>
  );
}
