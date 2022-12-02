import { TextField } from '@hilla/react-components/TextField.js';
import { useEffect, useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { BookmarkEndpoint } from 'Frontend/generated/endpoints';
import { TextFieldValueChangedEvent } from '@vaadin/text-field';
import { TextAreaValueChangedEvent } from '@vaadin/text-area';
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
        if (bookmark) setEditedBookmark(bookmark);
      });
    }
  }, [bookmarkIdParam]);

  const handleSave = async () => {
    await BookmarkEndpoint.save(editedBookmark);
    Notification.show('Bookmark saved');
    navigate('/');
  };

  return (
    <div>
      <TextField
        label="URL"
        value={editedBookmark.url}
        onValueChanged={(e: TextFieldValueChangedEvent) => {
            console.log('change url', e.detail.value)
          setEditedBookmark({
            ...editedBookmark,
            url: e.detail.value,
          });
        }}
      ></TextField>
      <br />
      <TextField
        label="Title"
        value={editedBookmark.title}
        onValueChanged={(e: TextFieldValueChangedEvent) =>
          setEditedBookmark({
            ...editedBookmark,
            title: e.detail.value,
          })
        }
      ></TextField>
      <br />
      <TextArea
        label="Description"
        value={editedBookmark.description}
        onValueChanged={(e: TextAreaValueChangedEvent) =>
          setEditedBookmark({
            ...editedBookmark,
            description: e.detail.value,
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
