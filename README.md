# The December Deck

A tarot-themed advent calendar for friends. One card unwraps each morning from December 1 to 24.

- `days.js` holds all the content for the 24 cards. Anything in [square brackets] is a placeholder.
- `art/` holds the card art (`01.jpg` to `24.jpg`, 2:3). List new files in `ART` at the top of `days.js`.
- `supabase/schema.sql` sets up the database. Paste it into the Supabase SQL Editor and run it.
- The invite word and host word are set in Supabase only, never in this repo.

Testing: add `?date=2026-12-17` to the address to pretend it is that day (`?date=off` to stop).
Add `?demo=1` to try everything with pretend data that stays on your device.
