# Money Quest Somerset

A home-education website that teaches maths through money for children aged 9 to 18 in Somerset.

What's inside:

- **Mentors** – six illustrated character guides. Each child picks one and can swap any time.
- **Money Time Machine** – 13 animated stops from barter to the possible future of money, each with a Somerset link and an activity.
- **How money really works** – the three jobs of money, where money comes from, and an inflation "shrinking basket" tool.
- **The Village Swap** – a barter game that shows why money was invented.
- **Family Trading Post** – siblings log real trades, value both sides in £, and see a fairness meter and who's ahead.
- Six half-term quests, sample missions, maths tools, Somerset trips, legal ways to earn, and a Money Passport with badges.

Progress is saved in each browser's local storage. Nothing is sent to a server, and nothing needs a database.

## Files

- `index.html` – the page
- `styles.css` – the design and animation
- `app.js` – content, mentors, games, tools and progress tracking
- `.nojekyll` – tells GitHub Pages to serve the files as they are

## Put it on GitHub Pages

1. Sign in to GitHub and create a new repository, for example `money-quest`. Make it Public (required for free GitHub Pages).
2. On the repository page, choose **Add file → Upload files**, and drag in all four files above. Click **Commit changes**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then **Save**.
5. Wait a minute or two, then refresh the Pages settings. Your site address appears at the top, like `https://your-username.github.io/money-quest/`.

If you already uploaded the earlier version, upload these files over the old ones.

## Changing the content

Most content lives at the top of `app.js` in plain lists:

- `MENTORS` – names, colours, greetings, superpowers and catchphrases
- `ERAS` – the Time Machine stops
- `JOBS` – the three jobs of money
- `QUESTS` – the six quests, weekly themes and Boss Challenges
- `MISSIONS` – the worked sample weeks, with a briefing per mentor and maths per level
- `VILLAGERS` – the barter game characters
- `EARN` – ways to earn, by level
- `BADGES` and `SETUP` – badges and the parent checklist

To add a mentor, copy one entry in `MENTORS`, give it a new `id`, add a drawing for it in the `avatar` function, and add a briefing for that `id` to each mission in `MISSIONS`.

Edit a file on GitHub by opening it and clicking the pencil icon. The live site updates a minute or so after you commit.

## Notes

- Progress is stored in the browser, so each device keeps its own record. Clearing browser data removes it.
- Animations switch off automatically for anyone who has "reduce motion" turned on in their device settings.
- Facts about UK child employment rules and the digital pound were checked in October 2026. Check GOV.UK and the Bank of England for updates.
