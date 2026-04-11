"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  initialIsBookmarked: boolean;
  postId: number;
  className?: string;
  iconSize?: number;
}

export function BookmarkButton({ 
  initialIsBookmarked, 
  postId, 
  className = "",
  iconSize = 20
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/login");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    // Optimistic update
    setIsBookmarked(!isBookmarked);

    try {
      const res = await fetch("/api/bbs/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      const data = await res.json();
      if (!data.success) {
        // Revert on failure
        setIsBookmarked(isBookmarked);
        console.error("Bookmark failed:", data.message);
      }
    } catch (error) {
      // Revert on failure
      setIsBookmarked(isBookmarked);
      console.error("Bookmark error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={isLoading}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
        isBookmarked 
          ? "text-amber-500 hover:bg-amber-500/10" 
          : "text-slate-500 hover:text-amber-500 hover:bg-amber-500/10"
      } ${className}`}
      title={isBookmarked ? "取消收藏" : "收藏"}
    >
      <Bookmark 
        size={iconSize} 
        className={`transition-all ${isBookmarked ? "fill-current" : ""}`} 
      />
    </button>
  );
}
