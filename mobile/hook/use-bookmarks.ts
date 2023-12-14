import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

/**
 * Manipulate bookmarked articles
 */
const bookmarkedArticles = "@article_bookmarked";
export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState({});
  const { getItem, setItem, } = useAsyncStorage(bookmarkedArticles);
  const toggleBookmark = async (article: Record<string, any>) => {
    const newBookmarks = {
      ...bookmarks,
    };

    if (isBookmarked(article.id) === false) {
      newBookmarks[article.id] = article;
    } else {
      delete newBookmarks[article.id];
    }

    await setItem(JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }
  const isBookmarked = (articleId: number) => {
    return !!bookmarks?.[articleId];
  }

  useEffect(() => {
    const loadBookmarks = async () => {
      let oldBookmarks = await getItem() ?? "{}";
      const oldBookmarksObj = JSON.parse(oldBookmarks);

      setBookmarks(oldBookmarksObj);
    }
    loadBookmarks();
  }, []);

  return [
    bookmarks,
    {
      toggleBookmark,
      isBookmarked
    }
  ] as const;
}