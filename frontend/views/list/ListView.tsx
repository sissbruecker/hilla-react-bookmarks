import { useEffect, useState } from 'react';
import { BookmarkEndpoint } from 'Frontend/generated/endpoints';
import Bookmark from 'Frontend/generated/com/example/application/entities/Bookmark';
import { BookmarkItem } from 'Frontend/views/list/BookmarkItem';
import { TextField } from '@hilla/react-components/TextField.js';
import { Notification } from '@hilla/react-components/Notification.js';

export default function ListView() {
  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);

  useEffect(() => {
    BookmarkEndpoint.search(query).then(setBookmarks);
  }, [query]);

  const handleDelete = async (bookmark: Bookmark) => {
    await BookmarkEndpoint.remove(bookmark.id!);
    BookmarkEndpoint.search(query).then(setBookmarks);
    Notification.show('Bookmark removed', { theme: 'primary' });
  };

  return (
    <div>
      <TextField
        placeholder="Search"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      ></TextField>
      <br />
      <br />
      <div>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
