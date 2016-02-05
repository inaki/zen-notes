# zen-notes

App [demo](https://www.iaminaki.com/zen-notes).

Simple Notes App using Angular and localStorage.

## Summary:

I decide to use angular framework to create this simple app
that create, read, update and delete notes from the localStorage
in your browser.

Top points:
- angular as the base framework
- ui-router for managing the different views.
  - notes list
  - add new note
  - note in detail
  - edit note
- ngAnimate dependency for creating sliding effect

## Design:

I explore different notes app I use and decide to
do a simple app which let you create a note and have a list of
your notes with the date you created or updated it.

Top points:
- When click the plus sign to add a note once you touch either the
checkmark or the back button the note is saved.
- When click in the note it take you to a detail screen where you
can edit the note by touching the text and again, either you click
the checkmark or the back button, the note is updated.
- You can delete notes just by clicking on the little 'x' icon at 
the right of every note.
