# 🎉 Release v0.2.0: Enhanced Features and Improved Usability

## ✨ Major Features

### 🖼️ Customizable Logo System
- Upload logo from local file or external URL
- Position logo on left or right side of scoreboard
- Enable/disable toggle with live preview
- Automatic conversion to base64 for local files
- Maximum size: 120x120px with professional drop-shadow effect

### 🚩 Flag-Icons with 3-Letter Country Codes
- Replace emoji flags with high-quality SVG flag icons
- Support for 40+ countries with 3-letter codes
- Central America: **GUA**, **ESA**, **NCA**, **HON**, **PAN**, CRC, BLZ
- International: ESP, ARG, BRA, MEX, USA, CAN, and many more
- Automatic mapping to ISO 3166-1 alpha-2 standards
- Powered by [flag-icons](https://github.com/lipis/flag-icons) library

### 🎨 Dynamic Background Color Selector
- 6 predefined colors optimized for OBS chroma key
- 🟢 Green (#00FF00) - Default
- 🔵 Blue (#0000FF)
- 🟣 Magenta (#FF00FF)
- 🔴 Red (#FF0000)
- 🌈 Gradient (Blue gradient)
- ⚪ Transparent
- Applied to body background for proper chroma keying

### ⚡ Automatic Service Rotation
- Follows official table tennis rules
- **Normal play**: Service alternates every 2 points
- **Deuce (10-10+)**: Service alternates every 1 point
- Works with keyboard shortcuts and control panel
- Manual override available with 'S' key

### 🏓 Enhanced Service Ball
- Changed from blue to **bright white** (#ffffff)
- Double box-shadow for professional glow effect
- Better visibility and realistic ping pong ball appearance

## 🎨 UI/UX Improvements

### Larger, More Usable Buttons
- Points/Sets buttons: **+167% larger** (8px padding, 16px font)
- New layout: Number display on top, +/- buttons below
- Service buttons: **+50% padding** (6px vs 4px)
- Color buttons: **+100% padding** (8px vs 4px)
- Hover scale animations for better feedback
- Touch-friendly design for tablets and touch screens

### Ultra-Compact Control Panel
- Optimized for **single-screen setups**
- Fits in quarter of screen (compatible with OBS layout)
- Reduced spacing and margins by 30-50%
- 3-column grid layout for controls
- Shortened labels to uppercase (SERVICIO, COLOR FONDO, RESET)

### Modern Typography
- Switched from Arial to **Montserrat** font
- Imported from Google Fonts
- Weights: 400 (regular), 600 (semi-bold), 700 (bold)
- Cleaner, more professional appearance

### Streamlined Interface
- Removed unnecessary "role/description" field
- Focus on essential information only
- Cleaner data structure in localStorage

## 🔧 Technical Improvements

### Bidirectional Synchronization
- Added `storage` event listener to control panel
- Real-time updates when using keyboard shortcuts
- Overlay ↔️ Control Panel sync in both directions
- No refresh needed for changes to propagate

### Code Quality
- Modular functions for better maintainability
- `updateService()` function for automatic service logic
- `applyLogo()` for dynamic logo rendering
- `updateLogoUI()` for control panel state management
- Improved error handling and fallbacks

## 📊 Statistics

- **11 commits** merged to main
- **959 lines** of code added
- **3 files** modified
- **40+ countries** supported with flags
- **6 background colors** for chroma key
- **100% backwards compatible** with v0.1.0 localStorage

## 🎮 How to Use New Features

### Logo Upload
1. Open `control.html`
2. Navigate to "🖼️ LOGO" section
3. Option A: Paste image URL → Enter
4. Option B: Click 📁 → Select local file
5. Choose position: ⬅️ Izq or Der ➡️
6. Toggle ✅ On to display

### Country Flags
1. Enter 3-letter country code (e.g., **GUA** for Guatemala)
2. Supported codes: GUA, ESA, NCA, HON, PAN, ESP, ARG, MEX, USA, and more
3. Flags update automatically

### Background Color
1. Click emoji button to select color
2. Green (🟢) recommended for best chroma key results
3. Color applies immediately to overlay

### Automatic Service
- Service changes automatically every 2 points
- In deuce (10-10+), changes every point
- Press 'S' key to manually override if needed

## 🐛 Bug Fixes

- Fixed chroma key background application (now targets body, not scoreboard)
- Added missing storage listener for keyboard shortcut synchronization
- Improved service ball visibility

## 📚 Updated Documentation

- New `docs/ROADMAP_v0.2.0.md` with detailed feature planning
- Updated inline code comments
- Comprehensive commit messages with implementation details

## 🙏 Credits

Built with ❤️ using:
- [flag-icons](https://github.com/lipis/flag-icons) by @lipis
- [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)

---

**Full Changelog**: https://github.com/boggdan95/ping-pong-overlay/compare/v0.1.0...v0.2.0

🤖 Generated with [Claude Code](https://claude.com/claude-code)
