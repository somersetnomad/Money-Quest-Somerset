/* Money Quest Somerset: all page behaviour. Progress is saved in this browser only. */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  const MENTORS = [
    { id: "captain", name: "Captain Coin", initials: "CC", colour: "#1F6F8B",
      role: "Retired ship's captain from the Bristol Channel",
      card: "Bold, loves maps and treasure",
      hello: "Ahoy, crew! Every pound is treasure with a destination. Where shall we sail this week?",
      quest: q => `Charting a course for ${q.title}. Our heading this half-term: ${q.question}` },
    { id: "professor", name: "Professor Penny Ledger", initials: "PL", colour: "#6B45A8",
      role: "Inventor with a workshop in Glastonbury",
      card: "Curious and experimental",
      hello: "Splendid, you're here! Today's experiment: what happens to money when we poke it with maths?",
      quest: q => `New experiment: ${q.title}. My hypothesis question: ${q.question}` },
    { id: "mo", name: "Mo the Market Trader", initials: "Mo", colour: "#B5375F",
      role: "Runs a stall at Somerset farmers' markets",
      card: "Chatty, practical, a great haggler",
      hello: "Morning! Best deals go to folk who can do their sums. Shall we get the stall set up?",
      quest: q => `Right then, ${q.title}. Big question on the stall today: ${q.question}` },
    { id: "willow", name: "Willow the Wise Badger", initials: "WB", colour: "#3F6F31",
      role: "Keeper of the Mendip woods",
      card: "Calm, patient, thinks long-term",
      hello: "Hello, little one. Slow and steady fills the burrow. Shall we begin together?",
      quest: q => `Let's walk gently into ${q.title}. Ask yourself: ${q.question}` },
    { id: "rex", name: "Rex Ventures", initials: "RV", colour: "#C4600F",
      role: "Young entrepreneur from Taunton",
      card: "Fast, ambitious, full of ideas",
      hello: "Let's go! Every idea can be a business once you can do the numbers.",
      quest: q => `New sprint: ${q.title}. The pitch question: ${q.question}` },
    { id: "ava", name: "Agent Ava Cipher", initials: "AC", colour: "#27386B",
      role: "Fraud-busting detective",
      card: "Sharp and sceptical",
      hello: "Case open. Trust nothing until the numbers check out.",
      quest: q => `New case file: ${q.title}. Line of inquiry: ${q.question}` }
  ];

  const BANDS = [
    { id: "explorer", name: "Explorer", ages: "9–11" },
    { id: "trader", name: "Trader", ages: "12–14" },
    { id: "strategist", name: "Strategist", ages: "15–18" }
  ];

  const QUESTS = [
    { title: "The Story of Money", months: "Sep–Oct", question: "What is money and why does it work?",
      weeks: ["Barter and trade", "History of coins and the Royal Mint", "How banks create money", "Cash, cards and digital money", "What prices tell us"],
      boss: "Run a family barter market day, then repeat it using money and compare what changed." },
    { title: "Smart Spending", months: "Nov–Dec", question: "How do I get the most from what I have?",
      weeks: ["Needs and wants", "Unit pricing", "Offers and discounts", "Advertising tricks", "Budgeting for an event"],
      boss: "Plan and buy a family winter meal within a fixed budget." },
    { title: "Earning It", months: "Jan–Feb", question: "How do people legally get money?",
      weeks: ["Jobs and wages", "Skills and value", "Pricing your time", "Selling things you make", "Tax basics"],
      boss: "Earn a target amount through a legal mini-venture and record every cost and sale." },
    { title: "Growing It", months: "Feb–Mar", question: "How can money grow?",
      weeks: ["Savings accounts and interest", "Compound growth", "Inflation", "Shares and funds", "Risk and reward"],
      boss: "Run a 6-week pretend portfolio, the Dragon's Pot, and present your results." },
    { title: "Protecting It", months: "Apr–May", question: "How do I keep money safe?",
      weeks: ["Scams and phishing", "Insurance", "Credit and debt", "Reading contracts", "Consumer rights"],
      boss: "Investigate a real offer or contract and write a detective report on it." },
    { title: "Giving and Building", months: "Jun–Jul", question: "What is money for?",
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
    "Book the Museum of Somerset trip for Quest 1",
    "Contact Somerset Council about work permits if a child aged 13+ wants a job",
    "Choose one savings account to study together"
  ];

  const JARS = [
    { id: "spend", name: "Spend", colour: "#C2416B", start: 40 },
    { id: "save", name: "Save", colour: "#2E6B3F", start: 30 },
    { id: "grow", name: "Grow", colour: "#F2B632", start: 20 },
    { id: "give", name: "Give", colour: "#1F6F8B", start: 10 }
  ];

  /* ---------- Storage (safe if blocked) ---------- */
  const KEY = "moneyQuestSomerset.v1";
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) { /* storage unavailable */ }
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
    state = { profiles: [first], current: first.id, setup: [], quest: 0, mission: "unit" };
  }
  const me = () => state.profiles.find(p => p.id === state.current) || state.profiles[0];
  const mentor = () => MENTORS.find(m => m.id === me().mentor) || MENTORS[0];

  /* ---------- Helpers ---------- */
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const gbp = n => "£" + (Math.round(n * 100) / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function coin(m) {
    return `<svg viewBox="0 0 120 120" role="img" aria-label="${esc(m.name)}">
      <circle cx="60" cy="60" r="56" fill="${m.colour}" stroke="#1B2A41" stroke-width="4"/>
      <circle cx="60" cy="60" r="44" fill="none" stroke="#F2B632" stroke-width="4" stroke-dasharray="3 6"/>
      <text x="60" y="73" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="38" fill="#fff">${esc(m.initials)}</text>
    </svg>`;
  }

  /* ---------- Render ---------- */
  function renderProfiles() {
    $("profile-select").innerHTML = state.profiles.map(p => `<option value="${p.id}"${p.id === state.current ? " selected" : ""}>${esc(p.name)}</option>`).join("");
    document.querySelectorAll(".who-name").forEach(el => { el.textContent = me().name; });
  }

  function renderBands() {
    $("band-options").innerHTML = BANDS.map(b =>
      `<button type="button" data-band="${b.id}" aria-pressed="${me().band === b.id}">${b.name}<small>${b.ages}</small></button>`).join("");
  }

  function renderMentor(pop) {
    const m = mentor();
    document.documentElement.style.setProperty("--mentor", m.colour);
    $("mentor-big").innerHTML = coin(m);
    $("mentor-name").textContent = m.name;
    $("mentor-role").textContent = m.role;
    $("mentor-bubble").textContent = m.hello;
    $("mentor-picker").innerHTML = MENTORS.map(x =>
      `<button type="button" class="mentor-card" role="radio" aria-checked="${x.id === m.id}" data-mentor="${x.id}">${coin(x)}<strong>${esc(x.name)}</strong><span>${esc(x.card)}</span></button>`).join("");
    if (pop) {
      const big = $("mentor-big");
      big.classList.add("pop");
      setTimeout(() => big.classList.remove("pop"), 350);
    }
  }

  function renderQuests() {
    $("quest-path").innerHTML = QUESTS.map((q, i) =>
      `<li><button type="button" class="quest-btn" data-quest="${i}" aria-pressed="${i === state.quest}">
        <span class="stop">${i + 1}</span><span class="qt">${esc(q.title)}</span><span class="qm">${q.months}</span></button></li>`).join("");
    const q = QUESTS[state.quest], m = mentor();
    $("quest-detail").innerHTML = `
      <div>
        <h3>Quest ${state.quest + 1}: ${esc(q.title)}</h3>
        <p class="say"><b>${esc(m.name)}:</b> ${esc(m.quest(q))}</p>
        <ol>${q.weeks.map(w => `<li>${esc(w)}</li>`).join("")}</ol>
      </div>
      <div class="boss"><h4>Week 6: Boss Challenge</h4><p>${esc(q.boss)}</p></div>
      <p class="later">In your second and third year the same quests come back with harder maths and bigger missions.</p>`;
  }

  function renderMission() {
    $("mission-tabs").innerHTML = MISSIONS.map(x =>
      `<button type="button" class="tab" role="tab" id="tab-${x.id}" aria-controls="mission-panel" aria-selected="${x.id === state.mission}" data-mission="${x.id}">${esc(x.tab)}</button>`).join("");
    const x = MISSIONS.find(v => v.id === state.mission) || MISSIONS[0];
    const m = mentor(), band = BANDS.find(b => b.id === me().band);
    $("mission-panel").setAttribute("aria-labelledby", "tab-" + x.id);
    $("mission-panel").innerHTML = `
      <div class="mission-top">${coin(m)}<div>
        <h3>${esc(x.tab)}</h3>
        <p>"${esc(x.brief[m.id])}"</p>
        <p class="from">${esc(m.name)} · ${esc(x.quest)}</p></div></div>
      <div class="mission-body">
        <div><h4>Maths workshop (${band.name})</h4><p>${esc(x.maths[band.id])}</p>${x.formula && band.id === "strategist" ? `<p class="latex">${x.formula}</p>` : ""}</div>
        <div><h4>Game day</h4><p>${esc(x.game)}</p></div>
        <div class="homework"><h4>Homework mission</h4><p>${esc(x.homework)}</p><p><strong>For your passport:</strong> ${esc(x.evidence)}</p></div>
      </div>`;
  }

  function renderEarn() {
    const band = BANDS.find(b => b.id === me().band);
    $("earn-band-label").textContent = `${band.name}s (${band.ages})`;
    $("earn-grid").innerHTML = EARN[band.id].map(([t, d, no]) =>
      `<div class="earn${no ? " no" : ""}"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
  }

  function renderPassport() {
    const p = me();
    $("weeks").innerHTML = QUESTS.map((q, qi) => `
      <li class="qcol"><h4>${qi + 1}. ${esc(q.title)}</h4><div class="wk">
        ${[1, 2, 3, 4, 5, 6].map(w => {
          const n = qi * 6 + w, done = p.weeks.includes(n);
          return `<button type="button" data-week="${n}" aria-pressed="${done}" class="${w === 6 ? "boss-wk" : ""}" aria-label="Week ${n}${w === 6 ? ", Boss Challenge" : ""}">${n}</button>`;
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
    const rank = BANDS.find(b => b.id === p.band).name;
    $("rank-text").textContent = count >= 6
      ? `${count} badges: ${p.name} is ready for a rank-up ceremony!`
      : `${count} of 7 badges. ${6 - count} more for a ${rank} rank-up.`;
  }

  function renderSetup() {
    $("setup-list").innerHTML = SETUP.map((s, i) =>
      `<li><label><input type="checkbox" data-setup="${i}"${state.setup.includes(i) ? " checked" : ""}> ${esc(s)}</label></li>`).join("");
  }

  function renderAll() {
    renderProfiles(); renderBands(); renderMentor(false); renderQuests(); renderMission(); renderEarn(); renderPassport(); renderSetup();
  }

  /* ---------- Tools ---------- */
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
    $("grow-out").innerHTML = `After ${years} year${years > 1 ? "s" : ""}: <strong>${gbp(bal)}</strong><br>You put in ${gbp(paid)}. Interest added ${gbp(interest)}.`;
    const total = bal || 1;
    $("g-bar-paid").style.width = (paid / total * 100) + "%";
    $("g-bar-int").style.width = (interest / total * 100) + "%";
  }

  const jarPct = JARS.map(j => j.start);
  function renderJarSliders() {
    $("jar-sliders").innerHTML = JARS.map((j, i) =>
      `<div class="jar-row"><label for="jar-${j.id}" style="margin:0">${j.name}</label><input type="range" min="0" max="100" id="jar-${j.id}" data-jar="${i}" value="${jarPct[i]}"><span id="jar-pct-${i}">${jarPct[i]}%</span></div>`).join("");
  }
  function setJar(i, v) {
    // Change one jar, then spread the difference over the others so the total stays 100.
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
    });
    $("jars").innerHTML = JARS.map((j, i) =>
      `<div class="jar" role="img" aria-label="${j.name}: ${gbp(amt * jarPct[i] / 100)}"><span class="amt">${gbp(amt * jarPct[i] / 100)}</span><span class="fill" style="height:${jarPct[i]}%;background:${j.colour}"></span><span class="lab">${j.name}</span></div>`).join("");
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("button, a");
    if (!t) return;
    const d = t.dataset;
    if (d.mentor) { me().mentor = d.mentor; save(); renderMentor(true); renderQuests(); renderMission(); }
    else if (d.band) { me().band = d.band; save(); renderBands(); renderMission(); renderEarn(); renderPassport(); }
    else if (d.quest !== undefined) { state.quest = +d.quest; save(); renderQuests(); }
    else if (d.mission) { state.mission = d.mission; save(); renderMission(); }
    else if (d.week) {
      const n = +d.week, w = me().weeks, at = w.indexOf(n);
      at >= 0 ? w.splice(at, 1) : w.push(n); save(); renderPassport();
    }
    else if (d.badge !== undefined) {
      const n = +d.badge, b = me().badges, at = b.indexOf(n);
      at >= 0 ? b.splice(at, 1) : b.push(n); save(); renderPassport();
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

  // Arrow keys move between mission tabs.
  $("mission-tabs").addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = MISSIONS.findIndex(x => x.id === state.mission);
    const next = MISSIONS[(i + (e.key === "ArrowRight" ? 1 : MISSIONS.length - 1)) % MISSIONS.length];
    state.mission = next.id; save(); renderMission(); $("tab-" + next.id).focus();
  });

  $("profile-select").addEventListener("change", e => { state.current = e.target.value; save(); renderAll(); });
  $("setup-list").addEventListener("change", e => {
    const i = +e.target.dataset.setup, at = state.setup.indexOf(i);
    e.target.checked ? (at < 0 && state.setup.push(i)) : (at >= 0 && state.setup.splice(at, 1)); save();
  });
  $("unit-tool").addEventListener("input", unitTool);
  $("grow-tool").addEventListener("input", growTool);
  $("jars-tool").addEventListener("input", e => {
    if (e.target.dataset.jar !== undefined) setJar(+e.target.dataset.jar, +e.target.value);
    jarsTool();
  });

  /* ---------- Start ---------- */
  renderAll();
  renderJarSliders();
  unitTool(); growTool(); jarsTool();
})();
