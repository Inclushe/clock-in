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
  - [ ] Create Animation Story?
  - [X] Set up Vue Router
- [ ] Clock
  - [X] Make the clock functional
  - [X] Add Tick Animation
- [ ] Settings
  - [X] Create Sliding Pane
  - [ ] Properly shrink viewport
  - [ ] Add animation
  - [ ] Add color picker (css color variables and change back imgs to svgs)
  - [ ] Add 24 hour option
- [ ] Timer
  - [X] Create Input Type
  - [X] Parse Input
  - [X] Create unpauseTimer function
  - [X] Create pauseTimer function
  - [X] Create resetTimer function
  - [ ] Add reset button (same style as stopwatch)
  - [ ] Fix progress bar (stop when pausing)
  - [ ] Fix input box (Android Clock App)
    - [ ] Auto-add colons
    - [ ] Valid input
  - [X] Add animation
  - [X] Change progress indicator pattern to svg
- [ ] Stopwatch
- [ ] Alarm
- [ ] Pomodoro
  - [ ] Add Settings
- [ ] Interval