import { useEffect, useState } from 'react';
import { BookmarkEndpoint } from 'Frontend/generated/endpoints';
import Bookmark from 'Frontend/generated/com/example/application/entities/Bookmark';
import { BookmarkItem } from 'Frontend/views/list/BookmarkItem';

export default function ListView() {
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);

  useEffect(() => {
    BookmarkEndpoint.search().then(setBookmarks);
  }, []);

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
