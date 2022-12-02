import { TextField, WebComponentModule as TextFieldWC } from '@hilla/react-components/TextField.js';
import { useEffect, useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { BookmarkEndpoint } from 'Frontend/generated/endpoints';
import Bookmark from 'Frontend/generated/com/example/application/entities/Bookmark';
import { Notification } from '@hilla/react-components/Notification.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditView() {
  const [editedBookmark, setEditedBookmark] = useState<Bookmark>({ url: '', title: '', description: '' });
  const navigate = useNavigate();
  const params = useParams();
  const bookmarkIdParam = params.id;

  useEffect(() => {
    if (bookmarkIdParam) {
      BookmarkEndpoint.getBookmark(parseInt(bookmarkIdParam)).then((bookmark) => {
        if (bookmark) {
          setEditedBookmark(bookmark);
        }
      });
    }
  }, [bookmarkIdParam]);

  const handleSave = async () => {
    await BookmarkEndpoint.save(editedBookmark);
    Notification.show('Bookmark saved', {theme: 'primary'});
    navigate('/');
  };

  return (
    <div>
      <TextField
        label="URL"
        value={editedBookmark.url}
        onInput={(e) => {
          setEditedBookmark({
            ...editedBookmark,
            url: (e.target as TextFieldWC.TextField).value,
          });
        }}
      ></TextField>
      <br />
      <TextField
        label="Title"
        value={editedBookmark.title}
        onInput={(e) =>
          setEditedBookmark({
            ...editedBookmark,
            title: (e.target as TextFieldWC.TextField).value,
          })
        }
      ></TextField>
      <br />
      <TextArea
        label="Description"
        value={editedBookmark.description}
        onInput={(e) =>
          setEditedBookmark({
            ...editedBookmark,
            description: (e.target as TextFieldWC.TextField).value,
          })
        }
      ></TextArea>
      <br />
      <HorizontalLayout theme="spacing">
        <Button theme="primary" onClick={handleSave}>
          Save
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </HorizontalLayout>
    </div>
  );
}
