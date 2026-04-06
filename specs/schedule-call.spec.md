# Schedule a Call

**File**: `src/pages/landing/ScheduleCall.tsx`
**Route**: `/schedule`
**Date**: 2026-04-06

## What's on the Page

### Hero
- **Badge** — "Book a Demo" teal pill
- **Headline** — "See Unlocked AEO in action."
- **Subtext** — Invitation to get a personalized walkthrough
- **Decorative elements** — Teal radial gradient glows

### Calendar Picker (left side)
- **Week header** — "Select a time" with "Week of Apr 7, 2025" and left/right navigation arrows
- **5 day columns** — Mon through Fri, each showing the date
- **6 time slots per day** — 9:00 AM, 10:00 AM, 11:00 AM, 1:00 PM, 2:00 PM, 3:00 PM
  - **Available slots** — Light teal background, clickable
  - **Unavailable slots** — Grey, disabled
  - **Selected slot** — Solid teal background with dark text
- **Timezone note** — "All times shown in Eastern Time (ET)"

### Booking Form (right side, 380px)
- **Header** — "Your details" with selected slot shown below (or "Select a time slot to continue")
- **Form fields** (2-column rows):
  - Row 1: Full Name, Work Email
  - Row 2: Company, Team Size (select)
- **Optional textarea** — "Anything specific you'd like to cover?"
- **Confirm button** — "Confirm booking" (disabled/grey until a slot is selected, teal when active)
- **Subtext** — "30-minute call · Free · No commitment"

### Reassurance Banner
- **Teal checkmark icon** in gradient circle
- **Headline** — "We're happy to help — no pressure."
- **Body** — Friendly copy about no hard sells or commitments

## Buttons & Interactions

| What | What it should do |
|------|------------------|
| Week navigation arrows (← →) | Navigate to previous/next week of available slots |
| Available time slot | Select that slot (highlights teal, updates form header) |
| Unavailable time slot | Disabled, no action |
| "Confirm booking" button (disabled) | No action when no slot selected |
| "Confirm booking" button (active) | Show loading spinner, submit booking, then show confirmation screen |

## Things That Change Dynamically

| What | How it changes |
|------|---------------|
| Time slot selection | Clicking an available slot highlights it in solid teal; previously selected slot reverts |
| Form header text | Updates from "Select a time slot to continue" to "Selected: [date] at [time] ET" |
| "Confirm booking" button | Changes from grey/disabled to teal/active when a slot is selected |
| Post-confirmation | Should show a "You're booked!" confirmation screen after successful booking |

## Different Page States

- **Loading**: Not applicable — static page
- **With data**: Default calendar view with available/unavailable slots
- **Empty / No data yet**: Same as default
- **Error**: Not designed — integration developer should handle booking failures

## New Components Created

- **`ScheduleHero`** (`src/components/home/ScheduleHero.tsx`) — Hero section with badge, headline, subtext, and decorative gradient glows.
- **`ScheduleCalendar`** (`src/components/home/ScheduleCalendar.tsx`) — Two-panel layout: left side is a 5-day calendar with time slots, right side is a booking details form. Manages selected slot state internally.

## Navigation

- **How to get here**: Contact page "Schedule a call" link, or direct URL `/schedule`
- **Where to go from here**:
  - Confirmation screen (after successful booking — not yet implemented)
  - All standard header/footer navigation

## Notes

- The calendar uses **mock data** with hardcoded available/unavailable slots for the week of Apr 7, 2025. Integration developer will need to fetch real availability from a scheduling API.
- Week navigation arrows currently don't change the week — they need to be wired to load different weeks.
- The **confirmation screen** ("You're booked!") is not yet implemented — integration developer needs to build this post-booking state.
- Form fields are display-only divs — need real inputs.
- The `ScheduleExpect` component exists but is no longer used on the page (replaced with the reassurance banner). It can be deleted or repurposed.
- All mock data is in `src/data/mock-schedule-call.ts` with TypeScript interfaces.
