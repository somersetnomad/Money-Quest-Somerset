# Money Quest Somerset

A home-education website that teaches maths through money for children aged 9 to 18 in Somerset. Children choose a character mentor (and can swap any time), pick their level, follow six half-term quests, use maths tools, and tick off weekly Money Passport pages and badges.

Progress is saved in each browser's local storage. Nothing is sent to a server, and nothing needs a database.

## Files

- `index.html` – the page
- `styles.css` – the design
- `app.js` – mentors, quests, missions, tools and progress tracking
- `.nojekyll` – tells GitHub Pages to serve the files as they are

## Put it on GitHub Pages

1. Sign in to GitHub and create a new repository, for example `money-quest`. Make it Public (required for free GitHub Pages).
2. On the repository page, choose **Add file → Upload files**, and drag in all four files above. Click **Commit changes**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then **Save**.
5. Wait a minute or two, then refresh the Pages settings. Your site address appears at the top, like `https://your-username.github.io/money-quest/`.

## Changing the content

Most content lives at the top of `app.js` in plain lists:

- `MENTORS` – names, colours, greetings and how each one introduces a quest
- `QUESTS` – the six quests, weekly themes and Boss Challenges
- `MISSIONS` – the worked sample weeks, with a briefing per mentor and maths per level
- `EARN` – ways to earn, by level
- `BADGES` and `SETUP` – badges and the parent checklist

To add a mentor, copy one entry in `MENTORS`, give it a new `id`, and add a briefing for that `id` to each mission in `MISSIONS`.

Edit a file on GitHub by opening it and clicking the pencil icon. The live site updates a minute or so after you commit.

## Note on progress

Because progress is stored in the browser, each device keeps its own record. Clearing browser data removes it.
