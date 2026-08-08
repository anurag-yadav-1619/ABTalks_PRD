# Product Requirements Document — ABTalks 60-Day Coding Challenge

**Doc owner:** Product/Design
**Status:** Draft v1.0
**Date:** August 2026
**Scope of this doc:** Redesign of 3 core screens (`/`, `/dashboard`, `/day/12`) for the existing ABTalks challenge product. No auth, no DB, no recruiter/admin surfaces.

---

## 1. Background & Problem Statement

ABTalks runs a 60-day coding challenge for Indian college students. Students pick a track, build something daily, and prove it via a GitHub commit + LinkedIn post. This creates a public streak that builds consistency and recruiter visibility.

**The product works. It has never been designed.**

Today's experience presumably lacks visual hierarchy, mobile polish, and emotional design — which matters because:
- **90%+ of usage is mobile**, late at night, after a full day of college.
- Users are **motivation-driven, not feature-driven** — the product's job is to keep a tired 19-year-old coming back for 60 consecutive days.
- Streaks are fragile psychologically — one bad night (missed day, confusing UI, slow submission flow) can break a 40-day streak and cause total drop-off.

This PRD defines the redesign of the three highest-leverage screens in that journey: acquisition (Landing), daily motivation (Dashboard), and the core habit loop (Challenge Day).

---

## 2. Goals

### 2.1 Primary Goals
1. **Convert cold visitors into committed sign-ups** — a stranger should understand what ABTalks is, why it's credible, and what a 60-day commitment looks like within 10 seconds on landing.
2. **Reinforce the daily habit loop** — the dashboard should make "what do I do today" and "how am I doing" instantly legible, especially to someone opening the app at 11 PM with low willpower.
3. **Make submission frictionless** — the Challenge Day screen is where the entire product's value is created (proof of work). Submission must be fast, forgiving, and rewarding.

### 2.2 Success Metrics (proxy, since no real backend)
| Metric | Target signal in this redesign |
|---|---|
| Landing → "Start Challenge" click-through | Clear single primary CTA, repeated at top and bottom |
| Day-1 to Day-2 retention | Dashboard clearly shows "what's due today" without digging |
| Streak-break recovery | Missed-day state doesn't feel like punishment/dead-end |
| Submission completion rate | ≤ 2 required inputs, both with inline validation and low cognitive load |
| Perceived legitimacy (trust) | Landing shows social proof, real track examples, and a visible cohort/community signal |

---

## 3. Target User & Context of Use

**Primary persona: "Late-Night Aryan"**
- 2nd–3rd year B.Tech student, tier-2/3 city or metro college.
- Owns a mid-range Android phone; uses the product almost exclusively on mobile.
- Opens the app between 10 PM–1 AM after classes/labs, tired, on low patience.
- Cares about placements, resume-building, and visible proof of skill (GitHub + LinkedIn presence).
- Anxious about consistency — has abandoned personal projects and "100 days of code" attempts before.
- Comparison anchors: LeetCode streaks, Duolingo streaks, GitHub contribution graph.

**Design implication:** the UI must work one-thumb, in low light, with minimal typing, and must never make the student feel shamed for a missed day — shame kills retention; the design should re-engage, not punish.

---

## 4. Scope

### 4.1 In Scope
- `/` — Landing Page
- `/dashboard` — Student Dashboard
- `/day/12` — Challenge Day detail + submission
- Mocked JSON data layer (student profile, challenge tracks, 60-day task list, submission state)
- Mobile-first responsive design (390px primary, desktop secondary)
- Edge case states: Day 1 (no streak), missed day, empty/new profile

### 4.2 Out of Scope
- Authentication / real accounts
- Production database / persistence beyond local mock state
- Recruiter dashboard
- Admin panel
- Matching ABTalks' actual current tech stack
- Payment/pricing flows (assume free challenge for v1)

---

## 5. Information Architecture & User Flow

```
First-time visitor
   └─ Land on "/"
        └─ Understand offer → Click "Start My 60-Day Streak"
             └─ (Mocked) Track selection → Land on "/dashboard" (Day 1, empty streak state)

Returning student
   └─ Land on "/dashboard"
        ├─ Sees current streak, today's task card, progress ring, badges
        └─ Clicks "Today's Task" → "/day/12"
             ├─ Reads task brief + acceptance criteria
             ├─ Submits GitHub link
             ├─ Submits LinkedIn post link
             └─ Confirmation → streak updates → back to "/dashboard"
```

---

## 6. Screen-by-Screen Requirements

### 6.1 Landing Page (`/`)

**Job to be done:** In under 10 seconds, a stranger should know *what this is, who it's for, why it's credible, and what happens if they click the button.*

**Must include:**
1. **Hero section**
   - One-line value prop (e.g., "Build in public. Every day. For 60 days.")
   - Sub-line clarifying mechanism: GitHub commit + LinkedIn post = daily proof
   - Primary CTA: "Start Your Streak" (sticky/repeated)
   - Visual: a stylized streak/contribution-graph motif (familiar mental model from GitHub)
2. **Social proof band**
   - Number of students / cohorts run, logos or track names, a rotating short testimonial
3. **"How it works" — 3 steps**
   - Pick a track → Build & ship daily → Prove it (GitHub + LinkedIn) → Get visible to recruiters
4. **Tracks preview**
   - Cards for tracks (e.g., Web Dev, DSA/Competitive Programming, ML/AI, Android) so students self-identify
5. **Why it matters / outcome framing**
   - Recruiter visibility angle, portfolio angle, consistency/habit angle
6. **FAQ / trust section**
   - "What if I miss a day?" "Is this free?" "Do I need to be advanced?" — pre-answer anxiety objections
7. **Final CTA band** with urgency/cohort framing (e.g., "Next cohort starts Monday")
8. **Footer** — minimal, links to about/contact

**Non-functional:**
- Must render meaningfully above the fold at 390px without requiring horizontal scroll.
- CTA tap target ≥ 44px, thumb-reachable zone.

---

### 6.2 Student Dashboard (`/dashboard`)

**Job to be done:** In one glance, tell the student "where am I, what's due today, and am I still on track" — and make the streak feel like something worth protecting.

**Must include:**
1. **Header**
   - Greeting with name/avatar (or placeholder for empty profile), track badge
2. **Streak module (hero of the page)**
   - Current streak count, flame/graph visual
   - Best streak (for motivation even after a break)
   - Visual distinction: active streak vs. broken/reset state
3. **Today's Task card** (primary CTA)
   - Day number, task title, one-line description, "Start Day X" button
   - If already submitted today: show a completed/checked state instead
4. **Progress through challenge**
   - "Day 12 of 60" progress bar or ring
   - Days remaining, % complete
5. **Overall completion / stats**
   - Tasks completed vs. missed, submission consistency %
6. **Standing / achievements**
   - Badges (e.g., "7-Day Warrior", "Halfway Hero"), and/or lightweight leaderboard position within track/cohort (no need for full recruiter-facing leaderboard — just enough for social motivation)
7. **Recent activity strip**
   - Last few days as small streak dots/icons (done / missed / today) — mirrors GitHub contribution graph mental model
8. **Empty/new-profile state**
   - Day 1, streak = 0, no badges yet, dashboard should read as *invitational* ("Let's build your first streak") not broken/empty

**Edge cases to explicitly design:**
- **First day, no streak:** streak shows "Day 1 starts today" instead of "0" looking like failure.
- **Missed a day:** streak resets but shows best streak + encouraging recovery copy ("Streaks reset, momentum doesn't. Let's start again today.") — never a red "FAILED" state.
- **Empty profile:** no avatar/track selected yet → graceful placeholder + prompt to complete setup, not a broken layout.

---

### 6.3 Challenge Day (`/day/12`)

**Job to be done:** Let the student understand exactly what to build and submit proof in under 60 seconds of "admin" time (excluding the actual coding).

**Must include:**
1. **Day context header**
   - "Day 12 of 60", track name, due/deadline framing (e.g., "Submit before midnight to keep your streak")
2. **Task brief**
   - Clear title, description of what to build, acceptance criteria / definition of done (bulleted, scannable)
   - Optional: difficulty tag, estimated time, resource links
3. **Submission form**
   - GitHub repo/commit URL field — inline validation (looks like a valid GitHub URL)
   - LinkedIn post URL field — inline validation
   - Optional short note/reflection field (nice-to-have, not required)
   - Submit button, disabled until both required fields are valid
4. **Post-submission state**
   - Confirmation animation/state (streak flame lights up), "Day 12 complete ✅"
   - CTA back to dashboard or preview of Day 13
5. **Edge/error handling**
   - Invalid URL format → inline error, not blocking submit silently
   - Already submitted today → show submitted state with edit option, not a duplicate empty form
   - Missed-day access (viewing a past incomplete day) → allow late submission with clear "late" labeling rather than hard-blocking (reduces shame, keeps engagement)

---

## 7. Mocked Data Model

```json
{
  "student": {
    "id": "stu_001",
    "name": "Aryan Verma",
    "avatarUrl": null,
    "track": "Web Development",
    "cohort": "Aug 2026 Cohort",
    "currentStreak": 11,
    "bestStreak": 11,
    "startDate": "2026-07-28",
    "badges": ["7-Day Warrior"]
  },
  "challenge": {
    "totalDays": 60,
    "currentDay": 12,
    "daysCompleted": 11,
    "daysMissed": 0,
    "completionRate": 91.6
  },
  "days": [
    {
      "day": 11,
      "status": "completed",
      "submittedAt": "2026-08-07T22:14:00+05:30"
    },
    {
      "day": 12,
      "status": "pending",
      "title": "Build a Responsive Pricing Page",
      "description": "Create a mobile-first pricing page with 3 tiers using pure CSS Grid/Flexbox.",
      "acceptanceCriteria": [
        "Responsive at 390px and 1280px",
        "At least 3 pricing tiers",
        "One CTA button per tier"
      ],
      "difficulty": "Medium",
      "estimatedTime": "90 mins"
    }
  ],
  "submissions": {
    "12": {
      "githubUrl": null,
      "linkedinUrl": null,
      "note": null,
      "submitted": false
    }
  }
}
```

---

## 8. Design Principles

1. **Mobile-first, thumb-first.** Every primary action sits in the bottom 60% of the 390px viewport. Desktop is a stretched, not redesigned, layout.
2. **Streaks are emotional, not just numeric.** Visual weight (flame, color, graph) > raw digits.
3. **Never shame a miss.** Broken streak copy is encouraging, not punitive — this is the single biggest retention lever for a 60-day habit product.
4. **Low cognitive load at night.** Minimal typing, big tap targets, clear single next action per screen.
5. **Borrow familiar mental models.** GitHub contribution graph, Duolingo streak flame — students already have a habit-loop mental model; reuse it rather than inventing new metaphors.

---

## 9. Out-of-the-Box / Beyond-Spec Features

These go beyond the literal ask and are proposed as differentiators:

1. **"Streak Freeze" (1 per 10 days)** — Borrowed from Duolingo: students earn one streak-protection token every 10 consecutive days, usable once to cover a missed day. Reduces anxiety-driven drop-off after one bad night without fully removing accountability.
2. **Night-mode-first UI** — Since usage peaks late at night, ship dark theme as the *default*, not an afterthought toggle, with warm (non-blue-heavy) accent tones to reduce eye strain.
3. **"Proof Preview" card** — After submission, auto-generate a shareable image card (streak count + day + track) sized for WhatsApp/LinkedIn status, so students can flex progress and organically market ABTalks.
4. **Micro-commitment nudge on Landing** — Instead of only "Start Challenge," add a lightweight "Which track are you thinking?" tap-to-select interaction before the CTA — increases investment before the ask (Zeigarnik/commitment-consistency effect).
5. **Day-13 Peek** — On the post-submission confirmation, show a blurred/teased preview of tomorrow's task title only ("Tomorrow: Build a ___ with ___") to reduce next-day drop-off by pre-loading curiosity.
6. **Cohort pulse, not leaderboard pressure** — Instead of a competitive ranked leaderboard (which can demotivate laggards), show a low-pressure stat like "68% of your cohort has submitted today" — social proof without public shaming.
7. **Late-submission "Comeback" framing** — If a student submits a missed day late, explicitly label and celebrate it as a comeback ("Late, but you showed up — that counts") rather than silently allowing it or blocking it.
8. **Voice-note / short reflection field (optional)** — A 1-line optional reflection on the Challenge Day form ("What was hard today?") to build a lightweight journal over 60 days, useful later for their own portfolio storytelling.

---

## 10. Non-Functional Requirements

- **Performance:** Screens should be usable on mid-range Android devices on 4G; avoid heavy animation libraries where CSS transitions suffice.
- **Accessibility:** Minimum 4.5:1 text contrast even in dark mode; all form fields labeled; error states announced, not color-only.
- **Responsiveness:** Primary breakpoint 390px; secondary ≥1024px desktop; graceful mid-range tablet behavior not required but should not visibly break.
- **Resilience of mock data:** All three screens must render correctly in Day-1/empty, mid-challenge, and missed-day states without code changes — driven purely by the JSON mock.

---

## 11. Suggested Tech Approach (implementation-agnostic per brief)

- Any modern frontend framework (React/Next.js, Vue, or plain HTML/CSS/JS) is acceptable per the assignment's "any framework" allowance.
- Mocked data served from a local JSON file/module — no backend calls required.
- State for "submitted today" / streak can be simulated client-side (e.g., local state or localStorage) to make the demo feel alive across the three routes.

---

## 12. Deliverables & Route Map

Per submission requirements, deploy and provide:

```text
/
/dashboard
/day/12
```

All three must render correctly at 390px width without manual configuration.

---

## 13. Open Questions (for future iteration, not blocking v1)

- Should track selection persist across sessions without auth (e.g., via localStorage) for demo continuity?
- Should missed-day recovery (streak freeze) be visually taught on first use, or discovered?
- Is there a lightweight way to simulate "cohort pulse" percentages realistically in mock data (e.g., pre-seeded fake cohort stats)?
