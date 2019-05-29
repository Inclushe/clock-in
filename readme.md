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
  - [X] Add animation
  - [X] Change progress indicator pattern to svg
- [ ] Stopwatch
  - [ ] Fix scrollbar `BACKBURNER`
- [ ] Alarm
  - [ ] Create Alarm Toggle List
  - [ ] Create Timer Create
  - [ ] Hook current time into checking for alarms
- [ ] Pomodoro
  _ [ ] Make the same as timer
  - [ ] Breaks should be green
  - [ ] Add Settings
    - [ ] Work Break Length
    - [ ] Short Break Length
    - [ ] Long Break Length
    - [ ] Interval until long break
    - [ ] Session intervals
    - [ ] Start automatically
    - [ ] Disable pausing
- [ ] Interval
  - [ ] Constant
  - [ ] Variable
  - [ ] Interval progress (where seconds are)
- [ ] Settings
  - [X] Create Sliding Pane
  - [ ] Properly shrink viewport
  - [ ] Add animation
  - [ ] Add color picker (css color variables and change back imgs to svgs)
  - [ ] Add 24 hour option