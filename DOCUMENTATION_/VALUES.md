## Project Values

These guide what I build and why.

- **User Trust** — Privacy-first. No monetization of user data. No selling, targeting, or advertising. Users should feel safe and respected.
- **Thoughtful Design** — Every decision should reflect care for the people using the app. No dark patterns, no engagement tricks.
- **Real Connection** — This app exists to bring people together over food — friends and strangers alike. Features serve that purpose.
- **Accessibility** — Usable by everyone. Design for screen readers, diverse dietary needs, and varying levels of tech comfort.
- **Open to Growth** — Welcome different ways people connect over food — friends, strangers, solo diners, group organizers. Don't assume one "right" way to use the app.
- **Transparency** — Be honest with users about how the app works, what data is collected, and why. No hidden mechanics.

---

## Building It Right

The MVP of Dine-Together was built as a proof of concept. It works with some core functionality, and more importantly, it taught me a lot about what this app needs to be.

The next version (TypeScript/Supabase/React Native migration) is where these values get built into the foundation — not bolted on after the fact. That means:
- **Privacy controls from day one.** Users will be able to decide who sees their profile and activity. The database is designed around row-level security, so privacy isn't an afterthought — it's how the data works.
- **Accessibility as a baseline.** Screen reader support, keyboard navigation, readable typography, and thoughtful design for users of all abilities and comfort levels with technology.
- **Transparency built in.** Clear communication about what data is collected, why, and how it's used. No hidden tracking or mystery algorithms.
- **Room to grow.** The architecture is designed so new features — group dining, events, stranger connections — can be added without compromising the values above.