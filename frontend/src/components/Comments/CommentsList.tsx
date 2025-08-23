import type { IComment } from "@/types/character";

interface CommentsListProps {
  comments: IComment[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="my-20">
      <h3 className="font-semibold text-md text-gray-500 uppercase mb-5">
        Comments ({comments.length ?? 0})
      </h3>
      <div className="border-t py-5">
        {comments.map((comment) => {
          const date = new Date(Number(comment.createdAt));
          return (
            <div className="">
              <span className="text-primary-600">
                {date.toLocaleString()}:{" "}
              </span>
              <span className="text-gray-500">{comment.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
