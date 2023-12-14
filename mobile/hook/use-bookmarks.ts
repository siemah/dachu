import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

/**
 * Manipulate bookmarked articles
 */
const bookmarkedArticles = "@article_bookmarked";
export default function useBookmarks() {
  const [loading, setLoading] = useState(true);
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
  const listify = () => {
    return Object.values(bookmarks).map(bookmark => bookmark)
  }
  const getArticle = (articleId: number) => {
    return bookmarks?.[articleId] || null;
  }
  const refetch = async () => {
    setLoading(true);
    let oldBookmarks = await getItem() ?? "{}";
    const oldBookmarksObj = JSON.parse(oldBookmarks);
    setLoading(false);
    setBookmarks(oldBookmarksObj);
  }

  useEffect(() => {
    refetch();
  }, []);

  return [
    bookmarks,
    {
      loading,
      toggleBookmark,
      isBookmarked,
      listify,
      getArticle,
      refetch
    }
  ] as const;
}