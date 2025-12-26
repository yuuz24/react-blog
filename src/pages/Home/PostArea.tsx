import { useAxios } from "../../hooks/useAxios";
import PostItem from "./PostItem";
import { useSearchParams } from "react-router-dom";

export default function PostArea() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, error, isLoading } = useAxios<Post[]>(
    q ? "/posts/search?title=" + q : "/posts",
    []
  );

  if (isLoading) {
    return <section className="posts-area">불러오는 중...</section>;
  }

  if (error) {
    return (
      <section className="posts-area">게시글을 불러오지 못했어요.</section>
    );
  }

  if (!data || data.length === 0) {
    return <section className="posts-area">게시글이 아직 없어요.</section>;
  }

  return (
    <section className="posts-area">
      {data && data.map((post) => <PostItem key={post.id} post={post} />)}
    </section>
  );
}
