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

- [X] General Layout
  - [X] Recreate Figma Design (with seconds and main buttons)
  - [X] Create Timer Progress Bar
  - [X] Create Entrance/Exit Animation
  - [X] Set up Vue Router
  - [X] Scale layout to width
- [X] Clock
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
  - [X] Add sounds (in material)
  - [X] Breaks should be green
  - [ ] Autopause should work
  - [X] Add Settings
    - [X] Work Break Length
    - [X] Short Break Length
    - [X] Long Break Length
    - [X] Interval until long break
    - [X] Session intervals
    - [ ] Start automatically
    - [X] Disable pausing
- [ ] Interval
  - [X] Constant
  - [X] Variable
  - [X] Add layout
    - [X] Constant
    - [X] Variable
  - [X] Interval progress and indicator
- [ ] Settings
  - [X] Create Sliding Pane
  - [ ] Add 24 hour option ****
- [ ] Gripes & Fixes
  - [X] Adjust colors
    - [X] make red, green, grays palette
  - [X] App should fit in the viewport
  - [X] Interval and Pomodoro should have an indicator for what interval they're on
  - [X] Add reset buttons
  - [X] Add disabled states to button
  - [X] Make color palette and fix colors
  - [X] only allow numerical input (and colons)?
  - [x] Input Validation
    - [X] Timer
    - [X] Alarm
    - [X] Interval
  - [X] fix hours
    - [X] Timer
    <!-- - [ ] Pomodoro (lol) -->
    - [X] Interval
  - [X] Auto add colons, doesn't work properly
  - [ ] Add interval begin flash
  - [ ] Fade when inactive
  - [X] Settings
    - [X] Make in Figma
  - [X] Pomodoro Input Validation Settings
  - [ ] Clean up code
    - [ ] State should not be mutated outside mutation handlers (strict: true)
      - Potential drawback is that components are destroyed
  - [ ] Why is timer initially slow?
