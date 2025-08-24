import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "@/api/graphql/mutations/comments";
import type { ICharacter, IComment } from "@/types/character";
import { MessagesSquare } from "lucide-react";
import { useCharacterStore } from "@/store/useCharacterStore";

interface CommentFormProps {
  character: ICharacter;
  onCommentAdded?: (comment: IComment) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  character,
  onCommentAdded,
}) => {
  const [content, setContent] = useState("");
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT);
  const setCommentsUpdated = useCharacterStore(
    (state) => state.setCommentsUpdated
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const { data } = await addComment({
        variables: {
          characterId: parseInt(character.external_id),
          content,
        },
      });
      setContent("");
      if (
        onCommentAdded &&
        data &&
        typeof data === "object" &&
        "addComment" in data
      ) {
        onCommentAdded((data as { addComment: any }).addComment);
      }
      setCommentsUpdated(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="border p-2 rounded-md focus:outline-none focus:border-primary-600"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary-600 lg:w-[250px] text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <MessagesSquare /> {loading ? "Posting..." : "Add Comment"}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
};
