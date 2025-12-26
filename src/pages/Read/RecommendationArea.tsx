import { useParams } from "react-router-dom";
import RecommendationItem from "./RecommendationItem";
import { useAxios } from "../../hooks/useAxios";

export default function RecommendationArea() {
  const params = useParams();
  const { data, isLoading, error } = useAxios<Post[]>(
    `/posts/${params.id}/related`,
    []
  );

  if (data.length === 0) return null;

  if (isLoading) return <div className="page__recommend">로딩 중...</div>;
  if (error) return <div className="page__recommend">불러오기 실패</div>;

  return (
    <article className="page__recommend">
      <h3 className="page__recommend-title">Recommended Reading</h3>
      <ul className="page__recommend-lists">
        {data &&
          data.map((post) => <RecommendationItem key={post.id} post={post} />)}
      </ul>
    </article>
  );
}
