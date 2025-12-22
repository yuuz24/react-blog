import SearchArea from "./SearchArea.tsx";
import PostArea from "./PostArea.tsx";
import "./Home.css";

export default function Home() {
  return (
    <main className="page__main">
      <SearchArea />
      <PostArea />
    </main>
  );
}
