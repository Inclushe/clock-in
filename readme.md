# Clock In

```bash
pnpm i
npm run watch
```

## Issues with Other Apps

- The Windows 10 Clock app is garbage
- Online clocks are ugly and/or too small

## Philosophies

- The app should be bold and playful.
- The app should have a defining symbol to differentiate from other clock apps.
- The clock itself should be as large as aesthetically possible.

## Todo

- [ ] General Layout
  - [X] Recreate Figma Design (with seconds and main buttons)
  - [X] Create Timer Progress Bar
  - [X] Create Entrance/Exit Animation
  - [X] Set up Vue Router
  - [ ] Scale layout to width
- [ ] Clock
  - [X] Make the clock functional
  - [X] Add Tick Animation
- [ ] Timer
  - [X] Create Input Type
  - [X] Parse Input
  - [X] Create unpauseTimer function
  - [X] Create pauseTimer function
  - [X] Create resetTimer function
  - [X] Add reset button (same style as stopwatch)
  - [X] Fix progress bar (stop when pausing)
  - [ ] Fix input box (Android Clock App)
    - [ ] Auto-add colons
    - [ ] Valid input
    - [ ] Handle invalid input
  - [ ] Fix hour display
  - [ ] Add notice for autoplaying disabled or find out how to "bypass" (intent)
  - [X] Add animation
  - [X] Change progress indicator pattern to svg
- [X] Stopwatch
- [X] Alarm
  - [X] Create Alarm Toggle List
  - [X] Save Alarms differently (render from dayjs in interval instead)
  - [X] Create Timer Create
  - [X] Hook current time into checking for alarms
- [ ] Pomodoro
  - [X] Plan
  _ [X] Make the same as interval
  - [X] Interval progress (where seconds are)
  - [ ] Add sounds (in material)
  - [ ] Breaks should be green
  - [ ] Autopause should work
  - [ ] Add Settings
    - [ ] Work Break Length
    - [ ] Short Break Length
    - [ ] Long Break Length
    - [ ] Interval until long break
    - [ ] Session intervals
    - [ ] Start automatically
    - [ ] Disable pausing
- [ ] Interval
  - [X] Constant
  - [X] Variable
  - [ ] Add layout
    - [X] Constant
    - [X] Variable
  - [X] Interval progress and indicator
- [ ] Settings
  - [X] Create Sliding Pane
  - [ ] Properly shrink viewport
  - [ ] Add animation
  - [ ] Add 24 hour option
- [ ] Gripes & Fixes
  - [X] Adjust colors
    - [X] make red, green, grays palette
  - [X] App should fit in the viewport
  - [ ] Fade when inactive
  - [ ] Interval and Pomodoro should have an indicator for what interval they're on
  - [ ] State should not be mutated outside mutation handlers (strict: true)
    - Potential drawback is that components are destroyed
  - [ ] Add disabled states to button
  - [ ] Make color palette and fix colors
  - [ ] fix hours
    - [ ] Timer
    - [ ] Pomodoro (lol)
    - [ ] Interval
  - [ ] Fix settings
  - [ ] only allow numerical input (and colons)?
  - [ ] Input Validation
    - [ ] Timer
    - [ ] Alarm
    - [ ] Pomodoro Settings
    - [ ] Interval
  - [ ] Add hover states for buttons
  - [ ] Add dot on section buttons
  - [ ] Clean up code
  - [ ] Why is timer initially slow?
