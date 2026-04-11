"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId?: number;
  replyId?: number;
  className?: string;
  iconSize?: number;
}

export function LikeButton({ 
  initialLikeCount, 
  initialIsLiked, 
  postId, 
  replyId, 
  className = "",
  iconSize = 16
}: LikeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a Link
    e.stopPropagation();

    if (!session) {
      router.push("/login");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    // Optimistic update
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      const res = await fetch("/api/bbs/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, replyId }),
      });

      const data = await res.json();
      if (!data.success) {
        // Revert on failure
        setIsLiked(isLiked);
        setLikeCount(initialLikeCount);
        console.error("Like failed:", data.message);
      }
    } catch (error) {
      // Revert on failure
      setIsLiked(isLiked);
      setLikeCount(initialLikeCount);
      console.error("Like error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-1.5 transition-colors ${
        isLiked 
          ? "text-rose-500 hover:text-rose-600" 
          : "text-slate-500 hover:text-rose-500"
      } ${className}`}
      title={isLiked ? "取消点赞" : "点赞"}
    >
      <Heart 
        size={iconSize} 
        className={`transition-all ${isLiked ? "fill-current scale-110" : ""}`} 
      />
      <span className="text-xs font-medium">{likeCount > 0 ? likeCount : "点赞"}</span>
    </button>
  );
}
