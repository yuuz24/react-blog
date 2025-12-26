import { NavLink } from "react-router-dom";

type RecommendationItemProps = {
  post: Post;
};

export default function RecommendationItem({ post }: RecommendationItemProps) {
  return (
    <li>
      <NavLink to={`/read/${post.id}`}>
        <div className="page__recommend-list">
          <img src={post.thumbnail} alt="" className="page__recommend-img" />
          <div>
            <h4 className="page__recommend-subtitle">{post.title}</h4>
            <p className="page__recommend-desc">{post.desc}</p>
          </div>
        </div>
      </NavLink>
    </li>
  );
}
