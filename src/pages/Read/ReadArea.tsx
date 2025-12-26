import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAxios } from "../../hooks/useAxios";
import { axiosInstance } from "../../api/axiosInstance";

export default function ReadArea() {
  const params = useParams();
  const user = useAuthStore((state) => state.user);
  const {
    data: { category, title, username, thumbnail, desc, author, regdate },
    isLoading,
    error,
  } = useAxios<Post>(`/posts/${params.id}`, {} as Post);
  const navigator = useNavigate();

  const handleDelete = async () => {
    try {
      const { status } = await axiosInstance.delete(`/posts/${params.id}`);
      if (status === 204) {
        alert("삭제되었습니다.");
        navigator("/");
      } else {
        throw new Error("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };
  if (isLoading) return <div className="page__read">로딩 중...</div>;
  if (error) return <div className="page__read">불러오기 실패</div>;

  return (
    <article className="page__read">
      <section>
        <strong className="page__read-tag">{category}</strong>
        <h2 className="page__read-title">{title}</h2>
        <div className="page__read-meta-group">
          <p className="page__read-profile">
            {username} • {format(regdate, "MMM dd, yyyy")}
          </p>
          {user?.email === author && (
            <button className="page__read-btn" onClick={handleDelete}>
              삭제
            </button>
          )}
        </div>

        <img src={thumbnail} alt="" className="page__read-image" />
      </section>
      <section className="page__read-desc">
        <p>{desc}</p>
      </section>
    </article>
  );
}
