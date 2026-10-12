/* Money Quest Somerset: all page behaviour. Progress is saved in this browser only. */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     DATA
     ========================================================= */
  const MENTORS = [
    { id: "captain", name: "Captain Coin", colour: "#1D6E8C",
      role: "Retired ship's captain from the Bristol Channel",
      card: "Bold, loves maps and treasure",
      power: "Turns every savings goal into a treasure map",
      catch: "“A pound with a plan is a pound that sails.”",
      hello: "Ahoy, crew! Every pound is treasure with a destination. Shall we chart a course and see where your money can take you?",
      quest: q => `Charting a course for ${q.title}. Our heading this half-term: ${q.question}` },
    { id: "professor", name: "Professor Penny Ledger", colour: "#6B45A8",
      role: "Inventor with a workshop in Glastonbury",
      card: "Curious and experimental",
      power: "Can turn any price tag into an experiment",
      catch: "“Don’t guess. Test it!”",
      hello: "Splendid, you're here! I've got goggles, a calculator and a hunch. Today we find out what really happens to money when we poke it with maths.",
      quest: q => `New experiment: ${q.title}. My hypothesis question: ${q.question}` },
    { id: "mo", name: "Mo the Market Trader", colour: "#B5375F",
      role: "Runs a stall at Somerset farmers' markets",
      card: "Chatty, practical, a great haggler",
      power: "Spots a bargain from the other end of the market",
      catch: "“Know your costs, know your worth.”",
      hello: "Morning! Best deals go to folk who can do their sums. Grab an apron, the stall opens in five minutes and I need a sharp mind on the till.",
      quest: q => `Right then, ${q.title}. Big question on the stall today: ${q.question}` },
    { id: "willow", name: "Willow the Wise Badger", colour: "#3F6F31",
      role: "Keeper of the Mendip woods",
      card: "Calm, patient, thinks long-term",
      power: "Sees how today's choices grow over many years",
      catch: "“Slow and steady fills the burrow.”",
      hello: "Hello, little one. Come and sit by the old oak. Money is a lot like acorns: plant a few wisely and one day you have a forest. Shall we begin?",
      quest: q => `Let's walk gently into ${q.title}. Ask yourself: ${q.question}` },
    { id: "rex", name: "Rex Ventures", colour: "#C4600F",
      role: "Young entrepreneur from Taunton",
      card: "Fast, ambitious, full of ideas",
      power: "Turns a hobby into a business plan in ten minutes",
      catch: "“Ideas are free. Profit takes maths.”",
      hello: "Let's go! I started with a cake stall and a spreadsheet. Every idea can be a business once you can do the numbers. What are we building?",
      quest: q => `New sprint: ${q.title}. The pitch question: ${q.question}` },
    { id: "ava", name: "Agent Ava Cipher", colour: "#27386B",
      role: "Fraud-busting detective",
      card: "Sharp and sceptical",
      power: "Reads the small print nobody else reads",
      catch: "“If it sounds too good to be true, investigate.”",
      hello: "Case open. Somewhere out there, a deal is pretending to be better than it is. Your job: trust nothing until the numbers check out.",
      quest: q => `New case file: ${q.title}. Line of inquiry: ${q.question}` }
  ];

  const BANDS = [
    { id: "explorer", name: "Explorer", ages: "9–11" },
    { id: "trader", name: "Trader", ages: "12–14" },
    { id: "strategist", name: "Strategist", ages: "15–18" }
  ];

  const ERAS = [
    { id: "barter", when: "Long ago", title: "Swapping things", icon: "swap",
      what: "Before money, people swapped things directly. A farmer might trade a basket of eggs for a woollen blanket. This is called barter.",
      why: "Barter only works when you both want what the other has. Grown-ups call this the “double coincidence of wants”. If the blanket-maker doesn't want eggs, you're stuck.",
      somerset: "Around 2,000 years ago, people at Glastonbury Lake Village lived in round houses on the marshes and traded goods with other communities.",
      tryit: "Play the Village Swap game further down this page and count how many trades it takes to get one book." },
    { id: "commodity", when: "About 3,000 years ago", title: "Shells, salt and cattle", icon: "shell",
      what: "People began using things almost everyone wanted as a go-between. Cowrie shells, salt, grain and cattle all worked as early money in different parts of the world.",
      why: "Now you could sell your eggs for shells, then use the shells to buy a blanket. Shells were small, hard to fake and easy to count.",
      somerset: "Think about Somerset today: if everyone in your village had to agree on one useful thing to use as money, what would it be? Cheese? Apples?",
      tryit: "For one day, use buttons or dried beans as family money. Decide what each job or treat costs." },
    { id: "coins", when: "About 2,600 years ago", title: "The first coins", icon: "coin",
      what: "In Lydia, in what is now Turkey, people started stamping lumps of precious metal with a mark. These were among the very first coins.",
      why: "The stamp promised the weight and purity, so nobody had to weigh the metal at every sale. Trade got much faster.",
      somerset: "Before the Romans arrived, Iron Age tribes in the South West of Britain made their own coins too.",
      tryit: "Design your own family coin. What symbol goes on it, and what is it worth?" },
    { id: "roman", when: "AD 43 to 410", title: "Roman money in Britain", icon: "hoard",
      what: "The Romans brought their coins to Britain and used them to pay soldiers, collect taxes and trade across a huge empire.",
      why: "One currency across many countries made it easier to trade over long distances, a bit like the euro today.",
      somerset: "In 2010, a metal detectorist found the Frome Hoard near Frome: 52,503 Roman coins buried in a single pot. You can see it at the Museum of Somerset in Taunton.",
      tryit: "If each coin is worth £30 to a collector today, what is the whole hoard worth? Now try £45 per coin." },
    { id: "penny", when: "About 1,200 years ago", title: "Where the pound came from", icon: "scales",
      what: "Anglo-Saxon kings made silver pennies. 240 pennies were cut from one pound weight of silver. That is why our money is called the pound.",
      why: "The name stuck for over a thousand years, even after coins stopped being made from a pound of silver.",
      somerset: "Somerset towns including Ilchester and Watchet had their own mints that made pennies for the king.",
      tryit: "If 240 pennies make a pound, how many pennies make half a pound? A quarter?" },
    { id: "paper", when: "About 1,000 years ago", title: "Paper money", icon: "note",
      what: "In China during the Song dynasty, traders were tired of carrying heavy strings of iron coins, so paper money began to be used.",
      why: "Paper is light and easy to carry. But it only works if people trust that the piece of paper really is worth something.",
      somerset: "Look closely at a real banknote. Find the security features that stop people faking it.",
      tryit: "Make a banknote for your family money with three anti-forgery features." },
    { id: "bank", when: "1694", title: "The Bank of England", icon: "bank",
      what: "The Bank of England was set up in London in 1694 to lend money to the government. Its early banknotes were handwritten promises to pay.",
      why: "Banks let people keep money safely and borrow for big things like ships, farms and houses. Today the Bank of England also tries to keep prices steady.",
      somerset: "Every Bank of England note still says “I promise to pay the bearer on demand…”. Find it on a note at home.",
      tryit: "Write your own “promise to pay” note to a brother or sister. What makes them trust it?" },
    { id: "decimal", when: "15 February 1971", title: "Decimal Day", icon: "ten",
      what: "Until 1971, there were 12 pennies in a shilling and 20 shillings in a pound. Then Britain switched to 100 pence in a pound.",
      why: "Counting in tens is much easier. Shopkeepers, banks and children no longer had to do sums in twelves and twenties.",
      somerset: "Ask a grandparent what they remember about “old money”: shillings, half-crowns and threepenny bits.",
      tryit: "Something cost 2 shillings and 6 pence in old money. How many old pennies is that?" },
    { id: "plastic", when: "1967 onwards", title: "Machines and cards", icon: "card",
      what: "The world's first cash machine opened in Enfield, north London, in 1967. Later came debit cards, and in 2007 contactless payments arrived in the UK.",
      why: "Money became quicker to use, but also easier to spend without noticing. Tapping a card doesn't feel like handing over notes.",
      somerset: "Next time you go shopping, count how many people pay with cash and how many tap a card or phone.",
      tryit: "Spend a week paying for treats with cash only, then a week by card with a parent. Which week did you spend more?" },
    { id: "digital", when: "2000s to today", title: "Phones, apps and crypto", icon: "phone",
      what: "Most money is now just numbers in computers. People bank on apps and pay with phones and watches. Bitcoin, created in 2009, was the first well-known cryptocurrency.",
      why: "Digital money is fast and works anywhere, but scams and hacking are new dangers. Crypto prices can rise or fall very sharply.",
      somerset: "Even Somerset market stalls now take card payments. Ask a stallholder how much of their money comes in as cash.",
      tryit: "List three good things and three risky things about money that only exists on screens." },
    { id: "cbdc", when: "Possible future", future: true, title: "A digital pound?", icon: "spark",
      what: "The Bank of England and the government are exploring a “digital pound”: a form of money issued by the Bank of England that you would keep in a digital wallet.",
      why: "As of 2026 no decision has been made. They are still designing it and asking questions about privacy, safety and whether people actually need it.",
      somerset: "If cash disappeared, who in your village might find life harder? Who might find it easier?",
      tryit: "Hold a family debate: should Britain have a digital pound? Each side gets three minutes." },
    { id: "invisible", when: "Possible future", future: true, title: "Invisible money", icon: "eye",
      what: "Some people think we may pay by face, voice or smart glasses, and that AI helpers might shop and compare prices for us.",
      why: "Paying could become almost invisible. That's handy, but it makes it even more important to keep track of what you spend and protect your data.",
      somerset: "Nobody knows exactly what will happen. Experts disagree, and some of these ideas may never take off.",
      tryit: "Invent a payment method for 2050. Draw it, name it, and list one way someone might try to cheat it." },
    { id: "you", when: "Your future", future: true, title: "Money you'll shape", icon: "rocket",
      what: "The children learning about money today will be the bankers, inventors, shop owners and law-makers of tomorrow.",
      why: "Every big change in money came from someone solving a problem: barter was slow, coins were heavy, sums were hard. What problem will you solve?",
      somerset: "Maybe the next big idea in money starts at a kitchen table in Somerset.",
      tryit: "Write one paragraph: “If I could change one thing about money, it would be…”" }
  ];

  const JOBS = [
    { title: "Swap helper", formal: "Medium of exchange", icon: "swap",
      text: "Money lets you swap without needing to find someone who wants exactly what you have.",
      eg: "You sell your old bike for £40, then spend it on football boots. No need to find a boot-seller who wants a bike." },
    { title: "Time capsule", formal: "Store of value", icon: "jar",
      text: "Money keeps its value so you can save it now and spend it later. Apples go mouldy; pounds don't.",
      eg: "You save £5 a week for 10 weeks and buy something worth £50." },
    { title: "Measuring stick", formal: "Unit of account", icon: "ruler",
      text: "Money gives everything a price, so you can compare things that are totally different.",
      eg: "A cinema ticket is £8 and a book is £8, so they cost the same, even though they're nothing alike." }
  ];

  const QUESTS = [
    { title: "The Story of Money", months: "Sep–Oct", question: "What is money and why does it work?",
      why: "Knowing where money came from helps you see it's a human invention that changes, and can change again.",
      weeks: ["Barter and trade", "Shells, coins and the Royal Mint", "How banks create money", "Cash, cards and digital money", "What prices tell us"],
      boss: "Run a family barter market day, then repeat it using money and compare what changed." },
    { title: "Smart Spending", months: "Nov–Dec", question: "How do I get the most from what I have?",
      why: "Shops are very good at making you spend. Smart spenders get more for the same money.",
      weeks: ["Needs and wants", "Unit pricing", "Offers and discounts", "Advertising tricks", "Budgeting for an event"],
      boss: "Plan and buy a family winter meal within a fixed budget." },
    { title: "Earning It", months: "Jan–Feb", question: "How do people legally get money?",
      why: "There are many more ways to earn than having a job. Knowing them gives you choices.",
      weeks: ["Jobs and wages", "Skills and value", "Pricing your time", "Selling things you make", "Tax basics"],
      boss: "Earn a target amount through a legal mini-venture and record every cost and sale." },
    { title: "Growing It", months: "Feb–Mar", question: "How can money grow?",
      why: "Money left alone in the right place can grow by itself. Time is the secret ingredient.",
      weeks: ["Savings accounts and interest", "Compound growth", "Inflation", "Shares and funds", "Risk and reward"],
      boss: "Run a 6-week pretend portfolio, the Dragon's Pot, and present your results." },
    { title: "Protecting It", months: "Apr–May", question: "How do I keep money safe?",
      why: "Scammers target young people online. Detectives who know the tricks don't fall for them.",
      weeks: ["Scams and phishing", "Insurance", "Credit and debt", "Reading contracts", "Consumer rights"],
      boss: "Investigate a real offer or contract and write a detective report on it." },
    { title: "Giving and Building", months: "Jun–Jul", question: "What is money for?",
      why: "Money is a tool. The best money skills help you build the life you want and help others too.",
      weeks: ["Charity and community", "Ethical spending", "The Somerset local economy", "Life goals", "Future careers"],
      boss: "Market Day: run a stall at a local market or fete and give a share of the profit to a cause you choose." }
  ];

  const MISSIONS = [
    { id: "unit", tab: "The Supermarket Detective", quest: "Quest 2, week 2 · Unit pricing",
      brief: {
        captain: "Two treasure chests, two price tags. Only a sharp-eyed sailor spots which holds more gold per coin.",
        professor: "Experiment: is the big pack really cheaper? Measure, divide, conclude.",
        mo: "Big pack, small pack, which is the real bargain? Shops are counting on you not to check.",
        willow: "Bigger isn't always better, little one. Let's weigh it up carefully.",
        rex: "Shops price things to win. Let's see if we can beat them at their own game.",
        ava: "Exhibit A: a family-size box. Suspect: the price label. Let's question it."
      },
      idea: "The price on the shelf isn't the whole story. To compare fairly you need the price for the same amount, like the price per 100 grams or per item. That's called the unit price.",
      maths: {
        explorer: "Work out the price of one item by dividing. 6 apples for £1.80 is 30p each. Compare two packs.",
        trader: "Work out price per 100 g and per litre. Find the percentage saved on multibuys.",
        strategist: "Prove when a 3-for-2 beats 30% off. Build a spreadsheet formula that ranks deals."
      },
      game: "Deal or Dud: lay out 10 real product pairs with prices. Teams race to pick the better value.",
      homework: "At a Somerset supermarket or market, record 10 products in two sizes or brands. Work out unit prices and find the three biggest traps. Bonus: compare one item at a supermarket and a farmers' market and list reasons someone might pay more.",
      evidence: "Price table, photos of shelf labels, three sentences on what surprised you." },
    { id: "grow", tab: "The Magic of Compound Growth", quest: "Quest 4, week 2 · Compound interest",
      brief: {
        captain: "Bury treasure, leave it be, and it grows little chests of its own. Strange but true.",
        professor: "Interest that earns interest! It's a chain reaction. Let's measure it.",
        mo: "Leave your takings in the tin long enough and they start working the stall for you.",
        willow: "A small acorn saved today becomes a whole oak if you leave it alone long enough.",
        rex: "Money that makes money while you sleep. That's the dream. Let's crunch it.",
        ava: "Banks advertise rates. Let's check what those rates really do over time."
      },
      idea: "When a bank pays you interest, it adds money to your savings. Next year, you earn interest on that extra money too. Interest on interest makes savings grow faster and faster over time.",
      maths: {
        explorer: "Play a 10% interest game with counters over 5 rounds. Notice the jump gets bigger each time.",
        trader: "Compare simple and compound interest on £100 over 5 years at 5%. Draw both on a graph.",
        strategist: "Use the formula below and the Rule of 72. Graph growth at 2%, 5% and 8% over 40 years."
      },
      formula: "A = P (1 + r/n)<sup>nt</sup>",
      game: "Rice on the Chessboard: double the grains of rice square by square until the bag runs out.",
      homework: "With a parent, find three real UK savings accounts for young people. Note their interest rates and work out what £50 a month becomes in each after 5 years. Then ask a grandparent what interest rates were like when they were young.",
      evidence: "Your comparison table, your growth graph and notes from the interview." },
    { id: "time", tab: "Price Your Time", quest: "Quest 3, week 3 · Pricing your time",
      brief: {
        captain: "Every hour a crew member works has value. Let's chart what yours is worth.",
        professor: "Variables: time, costs, price. Output: profit. Let's run the numbers.",
        mo: "If you don't price it right, you're working for nothing. Let's fix that.",
        willow: "Your time is precious. Let's learn to value it kindly and fairly.",
        rex: "Your time is your first product. What's an hour of you worth?",
        ava: "Hidden costs are the usual suspects. Let's find every one before we set a price."
      },
      idea: "Profit is what's left after you pay all your costs. If you sell cakes for £10 but the ingredients cost £8, your profit is only £2, and you haven't counted your time yet.",
      maths: {
        explorer: "Add up the cost of making something, like ingredients or card, then choose a price that makes a profit.",
        trader: "Find cost per item, the break-even point and the profit margin as a percentage.",
        strategist: "Work out your hourly rate after costs, compare it with the minimum wage, and price a service."
      },
      game: "Shark Tank Somerset: pitch a product to family investors with your costs and price.",
      homework: "Make and sell a small batch of something (cards, cakes, plants, seed packets) to friends, neighbours or at a fete, with a parent. Track every cost and sale on a profit sheet.",
      evidence: "Profit sheet, a photo of your product and one change you would make next time." }
  ];

  const EARN = {
    explorer: [
      ["Earning at home", "Paid extra jobs beyond normal chores, agreed on a family job board."],
      ["Making and selling", "Crafts, cards, baking or plants, sold with a parent present."],
      ["Services", "Feeding a neighbour's pet, with a parent."],
      ["Paid jobs", "Not yet. Paid jobs start at 14, or 13 in some council areas.", true],
      ["Saving", "A savings jar and a children's savings account."],
      ["Prizes", "Art, writing and maths competitions."]
    ],
    trader: [
      ["Earning at home", "Bigger paid projects: a garden clear-out, washing the car, sorting the loft."],
      ["Making and selling", "A small product line at a fete or car-boot sale, with a costing sheet."],
      ["Services", "Dog walking, helping with babysitting, tutoring younger children."],
      ["Paid jobs", "From 14 (13 in some areas) with a council work permit, within the hours rules below."],
      ["Saving and investing", "An account that pays interest. Learn how Junior ISAs work."],
      ["Prizes", "Enterprise challenges and youth awards."]
    ],
    strategist: [
      ["Earning at home", "Family contracts with quotes, invoices and deadlines."],
      ["Making and selling", "An online shop through a parent's account, with branding and stock control."],
      ["Services", "Tutoring, tech help, photography or a gardening round."],
      ["Paid jobs", "A part-time job within the rules. Full-time work only after school-leaving age."],
      ["Saving and investing", "A Junior ISA in your name. Learn about shares, funds and pensions."],
      ["Prizes and grants", "Scholarships, bursaries and business grants for young people."]
    ]
  };

  const BADGES = [
    ["Coin Historian", "Finish Quest 1 and the barter market"],
    ["Deal Detective", "Find 10 shelf traps and stay in the meal budget"],
    ["First Pound", "Earn money through a legal venture and record the profit"],
    ["Acorn to Oak", "Run the pretend portfolio for 6 weeks"],
    ["Scam Buster", "Write a detective report on a real offer"],
    ["Market Master", "Run a stall and give a share to a cause"],
    ["Leadership", "Teach a money lesson to someone younger"]
  ];

  const SETUP = [
    "Each child chooses a mentor and decorates their Money Passport cover",
    "Set up the Four Jars and agree a pocket-money or earnings plan",
    "Open the Family Trading Post and agree the golden rules together",
    "Book the Museum of Somerset trip for Quest 1",
    "Contact Somerset Council about work permits if a child aged 13+ wants a job",
    "Choose one savings account to study together"
  ];

  const JARS = [
    { id: "spend", name: "Spend", colour: "#D2456F", start: 40 },
    { id: "save", name: "Save", colour: "#2F8A57", start: 30 },
    { id: "grow", name: "Grow", colour: "#F4B23E", start: 20 },
    { id: "give", name: "Give", colour: "#2C7DA0", start: 10 }
  ];

  /* Village Swap game */
  const ITEMS = {
    apples: { name: "apples", colour: "#D2456F" }, wool: { name: "wool", colour: "#C9C2B3" },
    eggs: { name: "eggs", colour: "#F1E3C8" }, bread: { name: "bread", colour: "#D79A4E" },
    book: { name: "a book", colour: "#2C7DA0" }, cheese: { name: "cheese", colour: "#F4C84A" }
  };
  const VILLAGERS = [
    { id: "cath", name: "Cath", job: "Cheesemaker", has: "cheese", wants: "book", price: 4 },
    { id: "bo", name: "Bo", job: "Bookseller", has: "book", wants: "bread", price: 3 },
    { id: "sam", name: "Sam", job: "Shepherd", has: "wool", wants: "apples", price: 2 },
    { id: "bea", name: "Bea", job: "Baker", has: "bread", wants: "eggs", price: 1 },
    { id: "fen", name: "Fen", job: "Farmer", has: "eggs", wants: "wool", price: 2 }
  ];

  /* =========================================================
     STORAGE (safe if blocked)
     ========================================================= */
  const KEY = "moneyQuestSomerset.v2";
  function load() {
    try {
      const raw = localStorage.getItem(KEY) || localStorage.getItem("moneyQuestSomerset.v1");
      if (raw) return JSON.parse(raw);
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }
  function newProfile(name) {
    return { id: "p" + Date.now().toString(36) + Math.floor(Math.random() * 1000), name: name, mentor: "captain", band: "explorer", weeks: [], badges: [] };
  }
  let state = load();
  if (!state || !Array.isArray(state.profiles) || !state.profiles.length) {
    const first = newProfile("Learner 1");
    state = { profiles: [first], current: first.id };
  }
  state.setup = state.setup || [];
  state.quest = state.quest || 0;
  state.mission = state.mission || "unit";
  state.era = state.era || 0;
  state.trades = state.trades || [];

  const me = () => state.profiles.find(p => p.id === state.current) || state.profiles[0];
  const mentor = () => MENTORS.find(m => m.id === me().mentor) || MENTORS[0];

  /* =========================================================
     HELPERS
     ========================================================= */
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const gbp = n => "£" + (Math.round(n * 100) / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function countTo(el, to, fmt) {
    const from = +(el.dataset.v || 0);
    el.dataset.v = to;
    if (reduceMotion) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 600;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* =========================================================
     ILLUSTRATIONS
     ========================================================= */
  const INK = "#14213D";
  function avatar(id) {
    const m = MENTORS.find(x => x.id === id) || MENTORS[0];
    const bg = `<circle cx="60" cy="60" r="57" fill="${m.colour}"/><circle cx="60" cy="60" r="57" fill="url(#shine)" opacity=".35"/>`;
    const eyes = (y, c) => `<circle cx="49" cy="${y}" r="3.6" fill="${c || INK}"/><circle cx="71" cy="${y}" r="3.6" fill="${c || INK}"/><circle cx="50.2" cy="${y - 1.2}" r="1.1" fill="#fff"/><circle cx="72.2" cy="${y - 1.2}" r="1.1" fill="#fff"/>`;
    const cheeks = `<circle cx="41" cy="74" r="5" fill="#F08A8A" opacity=".45"/><circle cx="79" cy="74" r="5" fill="#F08A8A" opacity=".45"/>`;
    let body = "";
    switch (id) {
      case "captain":
        body = `<path d="M30 112 Q60 92 90 112 Z" fill="#14213D"/>
          <circle cx="60" cy="68" r="28" fill="#F6CBA3"/>
          <path d="M33 70 Q34 102 60 104 Q86 102 87 70 Q78 86 60 86 Q42 86 33 70Z" fill="#FFFFFF"/>
          ${eyes(64)}<ellipse cx="60" cy="75" rx="5" ry="4" fill="#E9A57B"/>
          <path d="M51 88 Q60 94 69 88" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <path d="M28 50 Q60 20 92 50 L88 56 Q60 46 32 56Z" fill="#14213D"/>
          <rect x="24" y="50" width="72" height="9" rx="4.5" fill="#0B1428"/>
          <circle cx="60" cy="40" r="6.5" fill="#F4B23E"/><path d="M57 40h6M60 37v6" stroke="#14213D" stroke-width="1.6"/>`;
        break;
      case "professor":
        body = `<path d="M30 112 Q60 94 90 112 Z" fill="#FFFFFF"/>
          <circle cx="34" cy="56" r="13" fill="#E6E3EE"/><circle cx="44" cy="40" r="14" fill="#E6E3EE"/><circle cx="62" cy="35" r="15" fill="#E6E3EE"/><circle cx="80" cy="42" r="14" fill="#E6E3EE"/><circle cx="88" cy="58" r="12" fill="#E6E3EE"/>
          <circle cx="60" cy="68" r="27" fill="#F3C7A8"/>
          <rect x="33" y="44" width="54" height="5" rx="2.5" fill="${INK}"/>
          <circle cx="49" cy="47" r="9" fill="#A9E3F0" stroke="${INK}" stroke-width="3"/><circle cx="71" cy="47" r="9" fill="#A9E3F0" stroke="${INK}" stroke-width="3"/>
          <circle cx="46" cy="44" r="2.5" fill="#fff"/><circle cx="68" cy="44" r="2.5" fill="#fff"/>
          ${eyes(67)}${cheeks}
          <path d="M50 80 Q60 89 70 80" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
        break;
      case "mo":
        body = `<path d="M28 112 Q60 90 92 112 Z" fill="#F4B23E"/><path d="M40 101 L80 101" stroke="#B5375F" stroke-width="5"/>
          <circle cx="60" cy="68" r="28" fill="#8D5A3B"/>
          <path d="M30 55 Q58 26 90 52 L97 58 Q62 50 31 58Z" fill="#3B4A63"/><path d="M33 52 Q58 34 86 50" stroke="#556683" stroke-width="2" fill="none"/>
          ${eyes(66, "#1a1208")}
          <path d="M47 77 Q60 92 73 77 Z" fill="#fff" stroke="#1a1208" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="40" cy="76" r="5" fill="#C9705A" opacity=".5"/><circle cx="80" cy="76" r="5" fill="#C9705A" opacity=".5"/>`;
        break;
      case "willow":
        body = `<circle cx="34" cy="42" r="10" fill="#4E4E58"/><circle cx="86" cy="42" r="10" fill="#4E4E58"/><circle cx="34" cy="42" r="5" fill="#D9A0A0"/><circle cx="86" cy="42" r="5" fill="#D9A0A0"/>
          <ellipse cx="60" cy="68" rx="33" ry="31" fill="#8E8E99"/>
          <ellipse cx="60" cy="62" rx="10" ry="32" fill="#FFFFFF"/>
          <ellipse cx="43" cy="66" rx="8.5" ry="13" fill="#1F1F26" transform="rotate(-14 43 66)"/><ellipse cx="77" cy="66" rx="8.5" ry="13" fill="#1F1F26" transform="rotate(14 77 66)"/>
          <circle cx="44" cy="65" r="3.4" fill="#fff"/><circle cx="76" cy="65" r="3.4" fill="#fff"/>
          <ellipse cx="45" cy="88" rx="11" ry="8" fill="#E9E9EE"/><ellipse cx="75" cy="88" rx="11" ry="8" fill="#E9E9EE"/>
          <ellipse cx="60" cy="88" rx="7" ry="5" fill="#26262c"/>
          <path d="M55 95 Q60 99 65 95" stroke="#26262c" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        break;
      case "rex":
        body = `<path d="M28 112 Q60 90 92 112 Z" fill="#14213D"/>
          <circle cx="60" cy="68" r="28" fill="#F1C27D"/>
          <path d="M33 58 L38 36 L46 48 L52 30 L60 46 L68 30 L74 48 L82 36 L87 58 Q60 46 33 58Z" fill="#2B1D14"/>
          <rect x="39" y="59" width="18" height="12" rx="5" fill="${INK}"/><rect x="63" y="59" width="18" height="12" rx="5" fill="${INK}"/><path d="M57 64h6" stroke="${INK}" stroke-width="2.4"/>
          <path d="M42 62 l6 0" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M66 62 l6 0" stroke="#fff" stroke-width="2" opacity=".7"/>
          <path d="M48 80 Q60 92 72 80" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
          <path d="M30 86 Q30 108 60 108 Q90 108 90 86" stroke="#F4B23E" stroke-width="5" fill="none"/>
          <rect x="24" y="80" width="10" height="16" rx="4" fill="#F4B23E"/><rect x="86" y="80" width="10" height="16" rx="4" fill="#F4B23E"/>`;
        break;
      case "ava":
        body = `<path d="M28 112 Q60 90 92 112 Z" fill="#C79A5B"/><path d="M60 98 L54 112 M60 98 L66 112" stroke="#8C6634" stroke-width="2.4"/>
          <circle cx="60" cy="70" r="27" fill="#C68642"/>
          <ellipse cx="60" cy="50" rx="42" ry="8" fill="#22262E"/>
          <path d="M38 50 Q40 24 60 24 Q80 24 82 50Z" fill="#2E333D"/><rect x="38" y="42" width="44" height="7" fill="#B5375F"/>
          <path d="M44 63 L54 61" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M66 59 L76 62" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
          ${eyes(68, "#1a1208")}
          <path d="M53 82 Q62 86 69 80" stroke="#1a1208" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <circle cx="92" cy="92" r="11" fill="#CFEFFA" fill-opacity=".6" stroke="#F4B23E" stroke-width="4"/><path d="M84 100 L74 112" stroke="#F4B23E" stroke-width="5" stroke-linecap="round"/>`;
        break;
    }
    return `<svg viewBox="0 0 120 120" role="img" aria-label="${esc(m.name)}"><defs><radialGradient id="shine" cx="30%" cy="25%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><clipPath id="cl-${id}"><circle cx="60" cy="60" r="57"/></clipPath></defs>${bg}<g clip-path="url(#cl-${id})">${body}</g><circle cx="60" cy="60" r="57" fill="none" stroke="${INK}" stroke-width="3"/></svg>`;
  }

  function icon(name, c) {
    c = c || "currentColor";
    const s = `fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
    const map = {
      swap: `<path d="M14 22h30l-7-7M50 42H20l7 7" ${s}/>`,
      shell: `<path d="M32 10c12 0 18 12 18 24S42 54 32 54 14 46 14 34 20 10 32 10z" ${s}/><path d="M32 14v36M26 18c-2 10-2 20 0 30M38 18c2 10 2 20 0 30" ${s}/>`,
      coin: `<circle cx="32" cy="32" r="20" ${s}/><circle cx="32" cy="32" r="13" ${s}/><path d="M28 38h9M29 38c2-4 1-8 1-10a4 4 0 0 1 7-2M27 32h7" ${s}/>`,
      hoard: `<path d="M18 26h28l-3 26H21z" ${s}/><path d="M16 26c4-6 28-6 32 0" ${s}/><circle cx="26" cy="16" r="5" ${s}/><circle cx="38" cy="14" r="5" ${s}/><circle cx="33" cy="22" r="4" ${s}/>`,
      scales: `<path d="M32 10v42M20 52h24M14 18h36M14 18l-6 14h12zM50 18l-6 14h12z" ${s}/>`,
      note: `<rect x="8" y="18" width="48" height="28" rx="4" ${s}/><circle cx="32" cy="32" r="7" ${s}/><path d="M14 24h4M46 40h4" ${s}/>`,
      bank: `<path d="M8 24 32 10l24 14zM12 28v18M24 28v18M40 28v18M52 28v18M8 52h48" ${s}/>`,
      ten: `<path d="M16 22l6-4v28M34 18h8a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z" ${s}/>`,
      card: `<rect x="8" y="16" width="48" height="32" rx="5" ${s}/><path d="M8 26h48M16 40h10" ${s}/><path d="M44 36c3 2 3 6 0 8M48 33c5 4 5 10 0 14" ${s}/>`,
      phone: `<rect x="18" y="8" width="28" height="48" rx="6" ${s}/><path d="M28 48h8" ${s}/><path d="M32 22l6 6-6 6-6-6z" ${s}/>`,
      spark: `<path d="M32 8v10M32 46v10M8 32h10M46 32h10M15 15l7 7M42 42l7 7M49 15l-7 7M22 42l-7 7" ${s}/><circle cx="32" cy="32" r="7" ${s}/>`,
      eye: `<path d="M6 32s10-16 26-16 26 16 26 16-10 16-26 16S6 32 6 32z" ${s}/><circle cx="32" cy="32" r="7" ${s}/>`,
      rocket: `<path d="M32 6c10 8 12 22 8 34H24C20 28 22 14 32 6z" ${s}/><circle cx="32" cy="24" r="4" ${s}/><path d="M24 40l-8 8 2-12M40 40l8 8-2-12M28 46l4 10 4-10" ${s}/>`,
      jar: `<path d="M20 16h24M22 16v6c-6 4-8 8-8 14v12a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V36c0-6-2-10-8-14v-6" ${s}/><circle cx="32" cy="40" r="6" ${s}/>`,
      ruler: `<rect x="6" y="22" width="52" height="20" rx="3" ${s}/><path d="M14 22v8M22 22v5M30 22v8M38 22v5M46 22v8" ${s}/>`
    };
    return `<svg viewBox="0 0 64 64" aria-hidden="true">${map[name] || map.coin}</svg>`;
  }

  function itemIcon(key) {
    const it = ITEMS[key], c = it.colour, o = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"`;
    const art = {
      apples: `<circle cx="22" cy="34" r="12" fill="${c}" ${o}/><circle cx="40" cy="34" r="12" fill="${c}" ${o}/><path d="M31 20q2-6 7-7" ${o} fill="none"/><path d="M33 17q6-4 10 0q-6 3-10 0z" fill="#3E8E4F" ${o}/>`,
      wool: `<circle cx="32" cy="32" r="18" fill="${c}" ${o}/><path d="M18 26q14 6 28-2M16 34q16 6 32-2M20 42q12 4 24-2" fill="none" ${o}/>`,
      eggs: `<ellipse cx="24" cy="34" rx="10" ry="13" fill="${c}" ${o}/><ellipse cx="41" cy="36" rx="10" ry="13" fill="${c}" ${o}/>`,
      bread: `<path d="M10 34q0-14 22-14t22 14v10H10z" fill="${c}" ${o}/><path d="M22 26l-3 6M32 25v7M42 26l3 6" ${o} fill="none"/>`,
      book: `<path d="M12 16h18a4 4 0 0 1 4 4v30a4 4 0 0 0-4-4H12zM52 16H38a4 4 0 0 0-4 4v30a4 4 0 0 1 4-4h14z" fill="${c}" ${o}/>`,
      cheese: `<path d="M10 42l34-22 10 8v14z" fill="${c}" ${o}/><path d="M10 42h44v8H10z" fill="#E5B12E" ${o}/><circle cx="34" cy="36" r="3" fill="#E5B12E"/><circle cx="44" cy="38" r="2" fill="#E5B12E"/>`
    };
    return `<svg viewBox="0 0 64 64" aria-hidden="true">${art[key]}</svg>`;
  }

  /* =========================================================
     RENDER: profile, bands, mentors
     ========================================================= */
  function renderProfiles() {
    $("profile-select").innerHTML = state.profiles.map(p => `<option value="${p.id}"${p.id === state.current ? " selected" : ""}>${esc(p.name)}</option>`).join("");
    document.querySelectorAll(".who-name").forEach(el => { el.textContent = me().name; });
  }

  function renderBands() {
    $("band-options").innerHTML = BANDS.map(b =>
      `<button type="button" data-band="${b.id}" aria-pressed="${me().band === b.id}">${b.name}<small>${b.ages}</small></button>`).join("");
  }

  let typeTimer = null;
  function typeInto(el, text) {
    clearInterval(typeTimer);
    if (reduceMotion) { el.textContent = text; return; }
    el.textContent = "";
    let i = 0;
    typeTimer = setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(typeTimer);
    }, 18);
  }

  function renderMentor(animate) {
    const m = mentor();
    document.documentElement.style.setProperty("--mentor", m.colour);
    const big = $("mentor-big");
    const paint = () => {
      big.innerHTML = avatar(m.id);
      $("mentor-name").textContent = m.name;
      $("mentor-role").textContent = m.role;
      $("mentor-power").textContent = m.power;
      $("mentor-catch").textContent = m.catch;
      typeInto($("mentor-bubble-text"), m.hello);
    };
    if (animate && !reduceMotion) {
      big.classList.remove("flip-in"); big.classList.add("flip-out");
      setTimeout(() => { paint(); big.classList.remove("flip-out"); big.classList.add("flip-in"); }, 220);
    } else paint();
    $("mentor-picker").innerHTML = MENTORS.map(x =>
      `<button type="button" class="mentor-card" role="radio" aria-checked="${x.id === m.id}" data-mentor="${x.id}" style="--c:${x.colour}">${avatar(x.id)}<strong>${esc(x.name)}</strong><span>${esc(x.card)}</span></button>`).join("");
    document.querySelectorAll(".mini-mentor").forEach(el => { el.innerHTML = avatar(m.id); });
    document.querySelectorAll(".mentor-first").forEach(el => { el.textContent = m.name.split(" ")[0] === "Captain" || m.name.split(" ")[0] === "Professor" || m.name.split(" ")[0] === "Agent" ? m.name : m.name.split(" ")[0]; });
  }

  /* =========================================================
     TIME MACHINE
     ========================================================= */
  function renderEraTrack() {
    $("era-track").innerHTML = ERAS.map((e, i) =>
      `<li><button type="button" class="era-stop${e.future ? " future" : ""}" data-era="${i}" aria-current="${i === state.era ? "step" : "false"}" aria-label="${esc(e.when)}: ${esc(e.title)}">
        <span class="dot">${icon(e.icon)}</span><span class="era-when">${esc(e.when)}</span></button></li>`).join("");
  }
  function renderEra(dir) {
    const e = ERAS[state.era], panel = $("era-panel");
    document.querySelectorAll(".era-stop").forEach((b, i) => b.setAttribute("aria-current", i === state.era ? "step" : "false"));
    const fill = $("era-fill");
    if (fill) fill.style.width = (state.era / (ERAS.length - 1) * 100) + "%";
    const html = `
      <div class="era-art${e.future ? " future" : ""}">${icon(e.icon)}<span class="era-num">${state.era + 1}<small>/${ERAS.length}</small></span></div>
      <div class="era-copy">
        <p class="era-kicker">${e.future ? '<span class="maybe">Maybe</span> ' : ""}${esc(e.when)}</p>
        <h3>${esc(e.title)}</h3>
        <p class="era-what">${esc(e.what)}</p>
        <div class="era-cols">
          <div><h4>Why it mattered</h4><p>${esc(e.why)}</p></div>
          <div><h4>${e.future ? "Think about it" : "Somerset link"}</h4><p>${esc(e.somerset)}</p></div>
        </div>
        <div class="era-try"><span class="mini-mentor" aria-hidden="true">${avatar(mentor().id)}</span><p><b>Try this:</b> ${esc(e.tryit)}</p></div>
      </div>`;
    if (reduceMotion || !dir) { panel.innerHTML = html; return; }
    panel.classList.remove("slide-l", "slide-r");
    void panel.offsetWidth;
    panel.innerHTML = html;
    panel.classList.add(dir > 0 ? "slide-l" : "slide-r");
  }
  function goEra(i) {
    const n = Math.max(0, Math.min(ERAS.length - 1, i));
    const dir = n - state.era;
    state.era = n; save(); renderEra(dir || 1);
    const btn = document.querySelector(`.era-stop[data-era="${n}"]`);
    if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
  }
  let eraPlay = null;
  function togglePlay() {
    const b = $("era-play");
    if (eraPlay) { clearInterval(eraPlay); eraPlay = null; b.textContent = "Travel through time"; b.setAttribute("aria-pressed", "false"); return; }
    b.textContent = "Pause"; b.setAttribute("aria-pressed", "true");
    if (state.era === ERAS.length - 1) goEra(0);
    eraPlay = setInterval(() => {
      if (state.era >= ERAS.length - 1) { togglePlay(); return; }
      goEra(state.era + 1);
    }, 5200);
  }

  /* =========================================================
     HOW MONEY WORKS
     ========================================================= */
  function renderJobs() {
    $("jobs").innerHTML = JOBS.map((j, i) =>
      `<li><button type="button" class="job" data-job="${i}" aria-pressed="false">
        <span class="job-front"><span class="job-icon">${icon(j.icon)}</span><strong>${esc(j.title)}</strong><em>${esc(j.formal)}</em><span class="tap">Tap to find out</span></span>
        <span class="job-back"><strong>${esc(j.title)}</strong><span>${esc(j.text)}</span><span class="eg">${esc(j.eg)}</span></span>
      </button></li>`).join("");
  }

  function inflationTool() {
    const amt = Math.max(0, +$("i-amount").value || 0);
    const rate = Math.max(0, +$("i-rate").value || 0) / 100;
    const yrs = +$("i-years").value;
    $("i-years-out").textContent = yrs;
    const factor = 1 / Math.pow(1 + rate, yrs);
    countTo($("i-result"), amt * factor, gbp);
    $("i-sentence").textContent = `In ${yrs} year${yrs > 1 ? "s" : ""}, ${gbp(amt)} kept under the bed would only buy what ${gbp(amt * factor)} buys today. Prices would be about ${Math.round((Math.pow(1 + rate, yrs) - 1) * 100)}% higher.`;
    const keep = Math.round(10 * factor);
    $("basket").innerHTML = Array.from({ length: 10 }, (_, i) =>
      `<span class="bk${i < keep ? "" : " gone"}">${itemIcon(["apples", "bread", "eggs", "cheese", "book"][i % 5])}</span>`).join("");
  }

  /* =========================================================
     VILLAGE SWAP (barter game)
     ========================================================= */
  const game = { mode: "barter", have: "apples", trades: 0, tries: 0, cash: 5, won: false, log: [] };
  let villagerOrder = VILLAGERS.slice();
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function renderGame() {
    const g = game, money = g.mode === "money";
    $("game-have").innerHTML = money
      ? `<span class="inv-coin">£${g.cash}</span><span>${g.won ? "and a book" : "in your purse"}</span>`
      : `${itemIcon(g.have)}<span>${esc(ITEMS[g.have].name)}</span>`;
    $("game-stats").innerHTML = `<span><b>${g.trades}</b> ${money ? "purchase" : "trade"}${g.trades === 1 ? "" : "s"}</span><span><b>${g.tries}</b> tr${g.tries === 1 ? "y" : "ies"}</span>`;
    $("villagers").innerHTML = villagerOrder.map(v => {
      const has = money ? (g.won && v.has === "book" ? null : v.has) : (v.has);
      return `<li class="villager" id="v-${v.id}">
        <div class="v-top"><span class="v-face" style="--h:${(v.id.charCodeAt(0) * 37) % 360}">${esc(v.name[0])}</span><div><strong>${esc(v.name)}</strong><span>${esc(v.job)}</span></div></div>
        <div class="v-goods">${has ? itemIcon(has) : ""}<span>${money ? `Sells ${esc(ITEMS[v.has].name)} for <b>£${v.price}</b>` : `Has ${esc(ITEMS[v.has].name)}`}</span></div>
        <button type="button" class="btn small" data-trade="${v.id}"${g.won ? " disabled" : ""}>${money ? `Buy for £${v.price}` : `Offer my ${esc(ITEMS[g.have].name)}`}</button>
        <p class="v-say" id="say-${v.id}" aria-live="polite"></p>
      </li>`;
    }).join("");
    $("game-log").innerHTML = g.log.slice(-5).map(l => `<li>${l}</li>`).join("");
    $("game-mode").textContent = money ? "Round 2: with money" : "Round 1: barter only";
  }

  function say(v, text, ok) {
    const card = $("v-" + v.id), s = $("say-" + v.id);
    if (s) s.textContent = text;
    if (card && !reduceMotion) {
      card.classList.remove("shake", "pop");
      void card.offsetWidth;
      card.classList.add(ok ? "pop" : "shake");
    }
  }

  function trade(id) {
    const g = game, v = VILLAGERS.find(x => x.id === id);
    if (g.won) return;
    g.tries++;
    if (g.mode === "barter") {
      if (v.wants === g.have) {
        const gave = g.have;
        g.have = v.has; v.has = gave; g.trades++;
        g.log.push(`You swapped ${esc(ITEMS[gave].name)} with ${esc(v.name)} for ${esc(ITEMS[g.have].name)}.`);
        renderGame(); say(v, `Lovely, just what I needed!`, true);
        if (g.have === "book") win();
      } else {
        renderGame();
        say(v, `No thanks. I don't need ${ITEMS[g.have].name}. I want ${ITEMS[v.wants].name}.`, false);
      }
    } else {
      if (v.has !== "book") {
        renderGame(); say(v, `I'm selling ${ITEMS[v.has].name}, but you came for a book, didn't you?`, false); return;
      }
      if (g.cash >= v.price) {
        g.cash -= v.price; g.trades++; g.won = true;
        g.log.push(`You paid ${esc(v.name)} £${v.price} for a book. Done!`);
        renderGame(); say(v, "Thank you! Enjoy the book.", true); win();
      }
    }
  }

  function win() {
    const g = game, box = $("game-result");
    if (g.mode === "barter") {
      box.innerHTML = `<h4>You got the book in ${g.trades} trades and ${g.tries} tries!</h4>
        <p>That took a lot of walking around the village. Each person only traded if you had exactly what they wanted. That problem is called the <b>double coincidence of wants</b>, and it's the reason people invented money.</p>
        <button type="button" class="btn gold" id="game-money">Play round 2 with money</button>`;
    } else {
      box.innerHTML = `<h4>One trade, one try. Money made it easy.</h4>
        <p>With money, the bookseller doesn't need to want what you have. You pay, and Bo can spend the money on bread later. Money works as a <b>swap helper</b>, one of its three big jobs.</p>
        <button type="button" class="btn ghost light" id="game-reset">Play again</button>`;
    }
    box.hidden = false;
    celebrate();
  }

  function resetGame(mode) {
    VILLAGERS.forEach(v => { v.has = { cath: "cheese", bo: "book", sam: "wool", bea: "bread", fen: "eggs" }[v.id]; });
    Object.assign(game, { mode: mode || "barter", have: "apples", trades: 0, tries: 0, cash: 5, won: false, log: [] });
    villagerOrder = shuffle(VILLAGERS.slice());
    $("game-result").hidden = true;
    renderGame();
  }

  /* =========================================================
     FAMILY TRADING POST
     ========================================================= */
  function traderOptions() {
    const names = state.profiles.map(p => p.name);
    return names.map(n => `<option>${esc(n)}</option>`).join("") + `<option>Someone else</option>`;
  }
  function renderTradeForm() {
    $("t-from").innerHTML = traderOptions();
    $("t-to").innerHTML = traderOptions();
    $("t-to").selectedIndex = 1;
    fairness();
  }
  function fairnessOf(a, b) {
    if (!(a > 0) || !(b > 0)) return null;
    const gap = Math.abs(a - b) / Math.max(a, b);
    const label = gap <= 0.15 ? "Fair trade" : gap <= 0.4 ? "A bit lopsided" : "Very lopsided";
    const cls = gap <= 0.15 ? "fair" : gap <= 0.4 ? "meh" : "unfair";
    return { gap, label, cls };
  }
  function fairness() {
    const a = +$("t-gave-v").value, b = +$("t-got-v").value, f = fairnessOf(a, b);
    const needle = $("needle");
    if (!f) {
      $("fair-label").textContent = "Add both values to check fairness";
      needle.style.setProperty("--a", "0deg");
      return;
    }
    // Needle swings toward whoever comes out ahead.
    const lean = Math.max(-1, Math.min(1, (b - a) / Math.max(a, b)));
    needle.style.setProperty("--a", (lean * 70) + "deg");
    const from = $("t-from").value;
    const ahead = Math.abs(a - b) < 0.005 ? "" : (b > a ? `${from} comes out ${gbp(b - a)} ahead.` : `${from} gives away ${gbp(a - b)} more than they get.`);
    $("fair-label").innerHTML = `<b class="${f.cls}">${f.label}.</b> ${esc(ahead)}`;
  }
  function renderLedger() {
    const t = state.trades;
    $("t-count").textContent = t.length;
    if (!t.length) {
      $("ledger").innerHTML = `<li class="empty">No trades yet. Log the first swap between brothers and sisters above.</li>`;
      $("t-scores").innerHTML = "";
      return;
    }
    $("ledger").innerHTML = t.slice().reverse().map(x => {
      const f = fairnessOf(x.gv, x.tv);
      return `<li><div class="l-main"><b>${esc(x.from)}</b> gave <b>${esc(x.gave)}</b> (${gbp(x.gv)}) to <b>${esc(x.to)}</b> for <b>${esc(x.got)}</b> (${gbp(x.tv)})</div>
        <div class="l-meta"><span class="tag ${f ? f.cls : ""}">${f ? f.label : "Unvalued"}</span><span>${esc(x.date)}</span><button type="button" class="link-btn" data-del="${x.id}" aria-label="Delete this trade">Remove</button></div></li>`;
    }).join("");
    const net = {};
    t.forEach(x => {
      net[x.from] = (net[x.from] || 0) + (x.tv - x.gv);
      net[x.to] = (net[x.to] || 0) + (x.gv - x.tv);
    });
    $("t-scores").innerHTML = Object.keys(net).map(n =>
      `<li><span>${esc(n)}</span><b class="${net[n] > 0.004 ? "up" : net[n] < -0.004 ? "down" : ""}">${net[n] >= 0 ? "+" : "−"}${gbp(Math.abs(net[n]))}</b></li>`).join("");
  }
  function addTrade() {
    const from = $("t-from").value, to = $("t-to").value;
    const gave = $("t-gave").value.trim(), got = $("t-got").value.trim();
    const gv = +$("t-gave-v").value, tv = +$("t-got-v").value;
    const err = $("t-error");
    if (!gave || !got) { err.textContent = "Say what each person traded."; return; }
    if (from === to && from !== "Someone else") { err.textContent = "Pick two different people."; return; }
    if (!(gv >= 0) || !(tv >= 0)) { err.textContent = "Values must be 0 or more."; return; }
    err.textContent = "";
    const d = new Date();
    state.trades.push({ id: "t" + d.getTime(), from, to, gave: gave.slice(0, 60), got: got.slice(0, 60), gv, tv,
      date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) });
    save(); renderLedger();
    ["t-gave", "t-got", "t-gave-v", "t-got-v"].forEach(id => { $(id).value = ""; });
    fairness();
    const f = fairnessOf(gv, tv);
    if (f && f.cls === "fair") celebrate(40);
  }

  /* =========================================================
     QUESTS, MISSIONS, EARN, PASSPORT, SETUP
     ========================================================= */
  function renderQuests() {
    $("quest-path").innerHTML = QUESTS.map((q, i) =>
      `<li><button type="button" class="quest-btn" data-quest="${i}" aria-pressed="${i === state.quest}">
        <span class="stop">${i + 1}</span><span class="qt">${esc(q.title)}</span><span class="qm">${q.months}</span></button></li>`).join("");
    const pf = $("quest-fill");
    if (pf) pf.style.width = (state.quest / (QUESTS.length - 1) * 84) + "%";
    const q = QUESTS[state.quest], m = mentor();
    $("quest-detail").innerHTML = `
      <div>
        <p class="eyebrowless">Quest ${state.quest + 1} · ${q.months}</p>
        <h3>${esc(q.title)}</h3>
        <div class="say"><span class="mini-mentor" aria-hidden="true">${avatar(m.id)}</span><p><b>${esc(m.name)}:</b> ${esc(m.quest(q))}</p></div>
        <p class="why">${esc(q.why)}</p>
        <ol class="weeklist">${q.weeks.map((w, i) => `<li><span>Week ${i + 1}</span>${esc(w)}</li>`).join("")}</ol>
      </div>
      <div class="boss"><span class="boss-tag">Week 6</span><h4>Boss Challenge</h4><p>${esc(q.boss)}</p></div>`;
    if (!reduceMotion) { const d = $("quest-detail"); d.classList.remove("swap"); void d.offsetWidth; d.classList.add("swap"); }
  }

  function renderMission() {
    $("mission-tabs").innerHTML = MISSIONS.map(x =>
      `<button type="button" class="tab" role="tab" id="tab-${x.id}" aria-controls="mission-panel" aria-selected="${x.id === state.mission}" tabindex="${x.id === state.mission ? 0 : -1}" data-mission="${x.id}">${esc(x.tab)}</button>`).join("");
    const x = MISSIONS.find(v => v.id === state.mission) || MISSIONS[0];
    const m = mentor(), band = BANDS.find(b => b.id === me().band);
    $("mission-panel").setAttribute("aria-labelledby", "tab-" + x.id);
    $("mission-panel").innerHTML = `
      <div class="mission-top"><span class="mission-avatar">${avatar(m.id)}</span><div>
        <p class="from">${esc(x.quest)}</p>
        <h3>${esc(x.tab)}</h3>
        <p class="quote">“${esc(x.brief[m.id])}”</p>
        <p class="from">${esc(m.name)}</p></div></div>
      <div class="mission-idea"><h4>The big idea</h4><p>${esc(x.idea)}</p></div>
      <div class="mission-body">
        <div><span class="step">Tue</span><h4>Maths workshop · ${band.name}</h4><p>${esc(x.maths[band.id])}</p>${x.formula && band.id === "strategist" ? `<p class="latex">${x.formula}</p>` : ""}</div>
        <div><span class="step">Wed</span><h4>Game day</h4><p>${esc(x.game)}</p></div>
        <div class="homework"><span class="step">Thu–Sat</span><h4>Homework mission</h4><p>${esc(x.homework)}</p><p><strong>For your passport:</strong> ${esc(x.evidence)}</p></div>
      </div>`;
  }

  function renderEarn() {
    const band = BANDS.find(b => b.id === me().band);
    $("earn-band-label").textContent = `${band.name}s (${band.ages})`;
    $("earn-grid").innerHTML = EARN[band.id].map(([t, d, no], i) =>
      `<div class="earn${no ? " no" : ""}" style="--i:${i}"><span class="earn-n">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
  }

  function renderPassport() {
    const p = me();
    $("weeks").innerHTML = QUESTS.map((q, qi) => `
      <li class="qcol"><h4>${qi + 1}. ${esc(q.title)}</h4><div class="wk">
        ${[1, 2, 3, 4, 5, 6].map(w => {
          const n = qi * 6 + w, done = p.weeks.includes(n);
          return `<button type="button" data-week="${n}" aria-pressed="${done}" class="${w === 6 ? "boss-wk" : ""}" aria-label="Week ${n}${w === 6 ? ", Boss Challenge" : ""}">${done ? "✓" : n}</button>`;
        }).join("")}
      </div></li>`).join("");
    const pct = Math.round(p.weeks.length / 36 * 100);
    $("progress-text").textContent = `${p.weeks.length} of 36 weeks done`;
    $("progress-fill").style.width = pct + "%";

    $("badges").innerHTML = BADGES.map(([n, d], i) => {
      const got = p.badges.includes(i);
      return `<li><button type="button" class="badge" data-badge="${i}" aria-pressed="${got}"><span class="medal" aria-hidden="true">${got ? "★" : i + 1}</span><strong>${esc(n)}</strong><small>${esc(d)}</small></button></li>`;
    }).join("");
    const count = p.badges.length;
    $("rank-text").textContent = count >= 6
      ? `${count} badges: ${p.name} is ready for a rank-up ceremony!`
      : `${count} of 7 badges. ${6 - count} more to rank up.`;
  }

  function renderSetup() {
    $("setup-list").innerHTML = SETUP.map((s, i) =>
      `<li><label><input type="checkbox" data-setup="${i}"${state.setup.includes(i) ? " checked" : ""}> <span>${esc(s)}</span></label></li>`).join("");
  }

  function renderAll() {
    renderProfiles(); renderBands(); renderMentor(false); renderEra(0); renderQuests(); renderMission(); renderEarn(); renderPassport(); renderSetup(); renderTradeForm(); renderLedger();
  }

  /* =========================================================
     TOOLS
     ========================================================= */
  function unitTool() {
    const a = { p: +$("ua-price").value, q: +$("ua-qty").value }, b = { p: +$("ub-price").value, q: +$("ub-qty").value };
    if (!(a.q > 0 && b.q > 0)) { $("unit-out").textContent = "Enter an amount above 0 for both packs."; return; }
    const ua = a.p / a.q, ub = b.p / b.q;
    const fmt = u => u < 1 ? (u * 100).toFixed(1) + "p" : gbp(u);
    let verdict;
    if (Math.abs(ua - ub) < 1e-9) verdict = "<strong>Same value.</strong> Pick the size you'll actually use.";
    else {
      const winner = ua < ub ? "A" : "B", lo = Math.min(ua, ub), hi = Math.max(ua, ub);
      verdict = `<strong>Pack ${winner} wins.</strong> It's ${Math.round((hi - lo) / hi * 100)}% cheaper per unit.`;
    }
    $("unit-out").innerHTML = `Pack A: ${fmt(ua)} each · Pack B: ${fmt(ub)} each<br>${verdict}`;
  }

  function growTool() {
    const start = Math.max(0, +$("g-start").value || 0), monthly = Math.max(0, +$("g-month").value || 0);
    const rate = Math.max(0, +$("g-rate").value || 0) / 100, years = +$("g-years").value;
    $("g-years-out").textContent = years;
    const r = rate / 12, n = years * 12;
    let bal = start;
    for (let i = 0; i < n; i++) bal = bal * (1 + r) + monthly;
    const paid = start + monthly * n, interest = Math.max(0, bal - paid);
    countTo($("g-total"), bal, gbp);
    $("g-detail").textContent = `You put in ${gbp(paid)}. Interest added ${gbp(interest)}.`;
    const total = bal || 1;
    $("g-bar-paid").style.width = (paid / total * 100) + "%";
    $("g-bar-int").style.width = (interest / total * 100) + "%";
  }

  const jarPct = JARS.map(j => j.start);
  function renderJarSliders() {
    $("jar-sliders").innerHTML = JARS.map((j, i) =>
      `<div class="jar-row"><label for="jar-${j.id}">${j.name}</label><input type="range" min="0" max="100" id="jar-${j.id}" data-jar="${i}" value="${jarPct[i]}" style="accent-color:${j.colour}"><span id="jar-pct-${i}">${jarPct[i]}%</span></div>`).join("");
    $("jars").innerHTML = JARS.map((j, i) =>
      `<div class="jar" id="jar-vis-${i}"><span class="amt" id="jar-amt-${i}"></span><span class="fill" id="jar-fill-${i}" style="background:${j.colour}"><i></i></span><span class="lab">${j.name}</span></div>`).join("");
  }
  function setJar(i, v) {
    v = Math.max(0, Math.min(100, v));
    let diff = v - jarPct[i];
    jarPct[i] = v;
    const others = [0, 1, 2, 3].filter(k => k !== i);
    let guard = 0;
    while (diff !== 0 && guard++ < 400) {
      for (const k of others) {
        if (diff === 0) break;
        if (diff > 0 && jarPct[k] > 0) { jarPct[k]--; diff--; }
        else if (diff < 0 && jarPct[k] < 100) { jarPct[k]++; diff++; }
      }
    }
  }
  function jarsTool() {
    const amt = Math.max(0, +$("j-amount").value || 0);
    JARS.forEach((j, i) => {
      $("jar-" + j.id).value = jarPct[i];
      $("jar-pct-" + i).textContent = jarPct[i] + "%";
      $("jar-amt-" + i).textContent = gbp(amt * jarPct[i] / 100);
      $("jar-fill-" + i).style.height = jarPct[i] + "%";
      $("jar-vis-" + i).setAttribute("aria-label", `${j.name}: ${gbp(amt * jarPct[i] / 100)}`);
    });
  }

  /* =========================================================
     MOTION: hero coins, parallax, reveal, confetti
     ========================================================= */
  function heroCoins() {
    const box = $("float-coins");
    if (!box || reduceMotion) return;
    const n = window.innerWidth < 700 ? 7 : 14;
    let html = "";
    for (let i = 0; i < n; i++) {
      const size = 18 + Math.random() * 30, left = Math.random() * 100, dur = 9 + Math.random() * 10, delay = -Math.random() * dur;
      html += `<span class="fc" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s"><span>£</span></span>`;
    }
    box.innerHTML = html;
  }

  function parallax() {
    const layers = reduceMotion ? [] : document.querySelectorAll("[data-depth]");
    const topbar = $("topbar");
    let ticking = false;
    const run = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) layers.forEach(l => { l.style.transform = `translate3d(0, ${y * +l.dataset.depth}px, 0)`; });
      topbar.classList.toggle("scrolled", y > 30);
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  function reveal() {
    const els = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  const canvas = $("confetti"), ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  let bits = [], raf = null;
  function celebrate(count) {
    if (reduceMotion || !ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const cols = ["#F4B23E", "#D2456F", "#2F8A57", "#2C7DA0", "#FFFFFF"];
    for (let i = 0; i < (count || 90); i++) {
      bits.push({ x: window.innerWidth * (0.2 + Math.random() * 0.6), y: window.innerHeight * 0.35, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 12 - 4,
        r: 4 + Math.random() * 6, c: cols[i % cols.length], coin: Math.random() < 0.45, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, life: 0 });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(b => {
      b.vy += 0.32; b.x += b.vx; b.y += b.vy; b.vx *= 0.99; b.rot += b.vr; b.life++;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
      if (b.coin) {
        ctx.scale(Math.abs(Math.cos(b.rot * 2)) + 0.2, 1);
        ctx.beginPath(); ctx.arc(0, 0, b.r + 3, 0, Math.PI * 2); ctx.fillStyle = "#F4B23E"; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = "#B97F12"; ctx.stroke();
      } else { ctx.fillStyle = b.c; ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r); }
      ctx.restore();
    });
    bits = bits.filter(b => b.y < canvas.height + 40 && b.life < 400);
    if (bits.length) raf = requestAnimationFrame(tick);
    else { raf = null; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }

  /* =========================================================
     EVENTS
     ========================================================= */
  document.addEventListener("click", e => {
    const t = e.target.closest("button, a");
    if (!t) return;
    const d = t.dataset;
    if (d.mentor) { me().mentor = d.mentor; save(); renderMentor(true); renderQuests(); renderMission(); renderEra(0); }
    else if (d.band) { me().band = d.band; save(); renderBands(); renderMission(); renderEarn(); renderPassport(); }
    else if (d.era !== undefined) { goEra(+d.era); }
    else if (t.id === "era-prev") goEra(state.era - 1);
    else if (t.id === "era-next") goEra(state.era + 1);
    else if (t.id === "era-play") togglePlay();
    else if (d.job !== undefined) { t.setAttribute("aria-pressed", t.getAttribute("aria-pressed") === "true" ? "false" : "true"); }
    else if (d.trade) trade(d.trade);
    else if (t.id === "game-money") resetGame("money");
    else if (t.id === "game-reset" || t.id === "game-restart") resetGame("barter");
    else if (t.id === "t-add") addTrade();
    else if (d.del) { state.trades = state.trades.filter(x => x.id !== d.del); save(); renderLedger(); }
    else if (d.quest !== undefined) { state.quest = +d.quest; save(); renderQuests(); }
    else if (d.mission) { state.mission = d.mission; save(); renderMission(); }
    else if (d.week) {
      const n = +d.week, w = me().weeks, at = w.indexOf(n);
      if (at >= 0) w.splice(at, 1); else { w.push(n); celebrate(n % 6 === 0 ? 120 : 30); }
      save(); renderPassport();
    }
    else if (d.badge !== undefined) {
      const n = +d.badge, b = me().badges, at = b.indexOf(n);
      if (at >= 0) b.splice(at, 1); else { b.push(n); celebrate(140); }
      save(); renderPassport();
    }
    else if (t.id === "add-profile") {
      const name = (window.prompt("Learner's first name?") || "").trim().slice(0, 30);
      if (!name) return;
      const p = newProfile(name); state.profiles.push(p); state.current = p.id; save(); renderAll();
    }
    else if (t.classList.contains("nav-toggle")) {
      const list = $("nav-list"), open = list.classList.toggle("open");
      t.setAttribute("aria-expanded", open);
    }
    else if (t.closest("#nav-list")) { $("nav-list").classList.remove("open"); document.querySelector(".nav-toggle").setAttribute("aria-expanded", "false"); }
  });

  $("mission-tabs").addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = MISSIONS.findIndex(x => x.id === state.mission);
    const next = MISSIONS[(i + (e.key === "ArrowRight" ? 1 : MISSIONS.length - 1)) % MISSIONS.length];
    state.mission = next.id; save(); renderMission(); $("tab-" + next.id).focus();
  });
  $("era-panel").closest("section").addEventListener("keydown", e => {
    if (e.target.closest("input, select, textarea")) return;
    if (e.key === "ArrowRight" && e.target.closest(".era-stop")) { goEra(state.era + 1); document.querySelector(`.era-stop[data-era="${state.era}"]`).focus(); }
    if (e.key === "ArrowLeft" && e.target.closest(".era-stop")) { goEra(state.era - 1); document.querySelector(`.era-stop[data-era="${state.era}"]`).focus(); }
  });

  $("profile-select").addEventListener("change", e => { state.current = e.target.value; save(); renderAll(); });
  $("setup-list").addEventListener("change", e => {
    const i = +e.target.dataset.setup, at = state.setup.indexOf(i);
    if (e.target.checked) { if (at < 0) state.setup.push(i); } else if (at >= 0) state.setup.splice(at, 1);
    save();
  });
  $("unit-tool").addEventListener("input", unitTool);
  $("grow-tool").addEventListener("input", growTool);
  $("infl-tool").addEventListener("input", inflationTool);
  $("trade-form").addEventListener("input", fairness);
  $("trade-form").addEventListener("change", fairness);
  $("jars-tool").addEventListener("input", e => {
    if (e.target.dataset.jar !== undefined) setJar(+e.target.dataset.jar, +e.target.value);
    jarsTool();
  });

  /* =========================================================
     START
     ========================================================= */
  renderEraTrack();
  renderJobs();
  renderAll();
  renderJarSliders();
  unitTool(); growTool(); jarsTool(); inflationTool();
  resetGame("barter");
  heroCoins(); parallax(); reveal();
})();
