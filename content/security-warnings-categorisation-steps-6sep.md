# Getting lauracordrey.com categorised — step by step

6 Sep 2026. Companion to `security-warnings-how-to-test-6sep.md` (why) and
`security-warnings-investigation-6sep.md` (the full investigation).

**Total time: about 15 minutes. Cost: nothing. Risk: none — you are not changing
anything on the site.**

> **On accuracy:** I tried to open all six of these to verify the exact buttons
> and could not — browsing to them is blocked from my environment, and Symantec's
> asks for a human verification step, which I do not complete. So the steps below
> describe the *shape* of the process, which is the same on all six, rather than
> exact button text. Labels will differ slightly from what I write. The sequence
> will not.

---

## Before you start

Have these ready so you are not composing on the fly:

- **Domain:** `lauracordrey.com` (no `https://`, no `www.` — just the domain)
- **Requested category:** **Business** — or the closest the vendor offers, such
  as *Professional Services*, *Business and Economy*, or *Corporate*
- **Description, if there is a free-text box:**
  > Independent marketing consultancy website. Business site for a solo
  > consultant. No user-generated content, no downloads, no advertising.
- **An email address** — most will email you the outcome. Use the same one for
  all six so the replies land together.

---

## The one rule: look BEFORE you submit

**Every one of these pages shows the current category first.** That lookup is the
actual diagnosis. Write down what each one says before you submit anything.

- Says **Uncategorised / Unrated / Newly observed / Unknown** → this is the
  problem. Submit the request.
- Says **Business** or similar → that vendor is already fine. **Do not submit.**
- If **all six** already say Business → my diagnosis is wrong. Submit nothing,
  send me the results, and we look somewhere else.

Fill this in as you go:

| # | Vendor | Where | Category it showed | Submitted? |
|---|---|---|---|---|
| 1 | Symantec / Broadcom | `sitereview.bluecoat.com` | | |
| 2 | Cisco Talos | `talosintelligence.com/reputation_center` | | |
| 3 | Palo Alto Networks | `urlfiltering.paloaltonetworks.com` | | |
| 4 | Forcepoint | `csi.forcepoint.com` | | |
| 5 | Zscaler | `sitereview.zscaler.com` | | |
| 6 | Fortinet | `fortiguard.com/webfilter` | | |

Do them in that order. Symantec and Talos are the most widely licensed, so if
you only have time for two, do those.

---

## The steps — the same on all six

1. **Open the vendor's page** from the table above.
2. **Type `lauracordrey.com` into the lookup box** and submit it. Some will ask
   you to tick a "not a robot" box first — that is normal and expected. It is
   the reason I could not do this part for you.
3. **Read the category it returns, and write it in the table.** This is the step
   that matters most. Do not skip it just to get to the form.
4. **If it is already Business, stop and move to the next vendor.** Nothing to do.
5. **If it is uncategorised or wrong**, look for the option to request a review.
   It is usually near the result and worded something like "request a change",
   "dispute the category", "submit for review", or "suggest a category".
6. **Fill in the request:** category **Business**, your description, your email.
7. **Submit, and note it in the table.** Some send a confirmation email — no
   action needed on it beyond keeping it.
8. **Repeat for the next vendor.**

---

## Afterwards

- **Timeline:** most reviews are actioned within a few days. Propagation to the
  networks licensing the database takes another week or two on top.
- **How to check it worked:** go back to the same lookup page in a couple of
  weeks and search the domain again. It should show Business.
- **You do not need to do anything to the website.** No deploy, no code change,
  nothing to install. This is entirely a database entry elsewhere.

---

## What to tell me when you are done

Just the filled-in table. Two outcomes:

- **Mostly uncategorised** → diagnosis confirmed. The warnings should fade as the
  categorisations propagate. Worth re-checking in three weeks.
- **All already Business** → I was wrong, and that is genuinely useful to know,
  because it eliminates the leading theory. The next things I would look at are
  the shared Netlify IP (`75.2.60.5`, which you share with a very large number of
  unrelated sites) and getting the exact browser error code from someone who
  sees it.

---

## Worth knowing regardless of the outcome

This is not only about the reported warnings. **Corporate networks block
uncategorised domains too**, often more aggressively than home broadband does,
because blocking the unknown is the safe default for a company.

Your buyers sit on exactly those networks. If the site is genuinely
uncategorised, some prospects will have quietly failed to open it from their
desks and never mentioned it. Being correctly categorised as a business site is
basic hygiene for a consulting site, independent of this bug.
