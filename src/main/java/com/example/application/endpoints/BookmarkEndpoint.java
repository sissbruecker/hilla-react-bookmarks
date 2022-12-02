package com.example.application.endpoints;

import com.example.application.entities.Bookmark;
import com.example.application.repositories.BookmarkRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class BookmarkEndpoint {

    private BookmarkRepository bookmarkRepository;

    public BookmarkEndpoint(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    public Bookmark getBookmark(int bookmarkId) {
        return bookmarkRepository.findById(bookmarkId).orElse(null);
    }

    public @Nonnull List<@Nonnull Bookmark> search() {
        return bookmarkRepository.findAll();
    }

    public @Nonnull Bookmark save(@Nonnull Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }

    public void remove(int bookmarkId) {
        bookmarkRepository.deleteById(bookmarkId);
    }
}
