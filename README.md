# 🏓 Ping Pong Overlay

🌐 [Versión en Español](README.es.md)

A professional overlay for table tennis live streaming with real-time control of points, sets, player names, and service indicator.

## 📋 Description

This project provides:
- **Visual overlay** with professional design (gradient blue background)
- **Control panel** to manage the scoreboard in real-time
- **Automatic synchronization** between overlay and control panel
- **Responsive design** that adapts to different resolutions
- **OBS compatible** for chroma key capture

## ✨ Features

### Core Features
- ✅ Two vertical rows (one per player)
- ✅ Country flag (customizable with emoji)
- ✅ Player name
- ✅ Points and sets counter
- ✅ Visual service indicator (blue ball)
- ✅ Transparent or chroma key background for OBS capture
- ✅ Quick keyboard controls (1, 2, S)
- ✅ Local storage (localStorage)

### ✨ NEW in v1.0.0
- 📋 **Auto-suggestion System**: Load players from CSV for quick autocomplete
- 🎮 **Game Modes**: Singles (1v1), Doubles (2v2), Teams
- 🏆 **Winner Screen**: Automatic overlay when match is won
- ⚙️ **Sets Configuration**: Best of 3, 5, or 7 sets
- ✏️ **Manual Editing**: Click on points/sets to correct errors
- 📊 **Sets History**: Complete visualization of played sets

### ✨ Features v0.3.x
- 🎬 **Animations**: Visual effects when scoring points, winning sets, and changing service
- 🎨 **Theme System**: 6 predefined themes for the scoreboard
- 🎮 **Improved Control Panel**: Interface with 2 tabs (Match/Settings)
- 👁️ **Visibility Toggle**: Hide the overlay while configuring
- 🖼️ **Logo System**: Upload logos that automatically adapt
- 📱 **Responsive Design**: Compact panel for quarter-screen use

## 📁 Project Structure

```
ping-pong-overlay/
├── 📄 LEEME.txt               # ⭐ Quick instructions (Spanish)
├── 🌐 hub.html                # ⭐ Start page with buttons
├── 🖥️ index.html              # Main overlay (capture in OBS)
├── 🎮 control.html            # Control panel
├── 🗑️ clear-storage.html     # Utility to clear localStorage
├── 📋 jugadores-ejemplo.csv   # Example CSV for auto-suggestion
├── docs/                      # Technical documentation and guides
│   ├── GUIA_OBS.md           # Complete OBS guide (Spanish)
│   ├── DESCARGAR.txt         # Download guide
│   ├── AUTOSUGERENCIA.md     # ⭐ Auto-suggestion system guide
│   ├── ROADMAP_v1.0.0.md     # Current roadmap
│   ├── SETUP_GITHUB.md       # GitHub configuration
│   └── START.md              # Quick start guide
├── logos/                     # Logos for the overlay
├── CLAUDE.md                  # Guide for Claude Code AI
├── CONTRIBUTING.md            # Contribution guide
├── LICENSE                    # MIT License
├── package.json               # Project metadata
├── README.md                  # This file (English)
└── README.es.md               # Spanish version
```

## 🚀 How to Use with OBS

### 🎯 Entry Point

**First time**: Open `hub.html` or read `LEEME.txt` for quick instructions.

### ⚡ Quick Setup (5 minutes)

1. **Open both files in the SAME browser:**
   - Open `index.html` in Chrome/Edge/Firefox (this is the overlay)
   - Open `control.html` in another tab of the **same browser**
   - **Important:** Both must be in the same browser for sync to work

2. **In OBS Studio:**
   - Add a source → **Window Capture**
   - Select the browser window showing `index.html`
   - Apply **Chroma Key** filter (green or blue background)
   - In control.html, set the background color to match your chroma key

3. **During the match:**
   - Use the control panel to change scores
   - Changes reflect **INSTANTLY** in the overlay
   - Or use keyboard shortcuts: `1` = +1 P1, `2` = +1 P2, `S` = Change service

### ⚠️ Why NOT Browser Source?

**Browser Source does NOT sync** with your control panel because:
- OBS Browser Source uses an embedded Chromium browser (CEF)
- This is a **separate browser** from Chrome/Edge/Firefox on your system
- localStorage is **not shared** between different browsers
- Result: Changes in control.html won't appear in OBS

**Correct method:** Use **Window Capture** + **Chroma Key** to capture your system browser where both files share localStorage.

### 📚 Complete Guide

👉 **[Complete OBS Guide](docs/GUIA_OBS.md)** (Spanish) - Includes:
- Step-by-step configuration with screenshots
- Chroma key setup for transparency
- Workflow for 1 or 2 screens
- Common troubleshooting
- Professional tips

## 🎮 Controls

### Control Panel
- **Names**: Edit name and description of each player
- **Flags**: Change the flag emoji (e.g., 🇪🇸, 🇦🇷, 🇲🇽)
- **Points**: Use +/− buttons to increment/decrement
- **Sets**: Same control as points
- **Service**: Buttons to assign who is serving
- **Reset**: Returns everything to 0

### Keyboard Shortcuts (in Overlay)
- **Key 1**: +1 point Player 1
- **Key 2**: +1 point Player 2
- **Key S**: Change service

## 🎨 Customization

### Change colors
Edit the color variables in `<style>`:
```css
background: linear-gradient(135deg, #003d8c 0%, #0052CC 100%);
```

### Change font sizes
In the CSS, look for:
```css
.player-name {
    font-size: 28px;  /* Change size */
}
```

### Change default flags
In the script, modify:
```javascript
flag: '🇪🇸'  // Player 1
flag: '🇦🇷'  // Player 2
```

## 💾 Storage

Data is automatically saved in the browser's `localStorage`. This means:
- Data persists between page refreshes
- Shared between tabs of the same browser
- Lost if browser storage is cleared

## 📱 Responsive Design

- ✅ Works on large screens (1920x1080+)
- ✅ Works on tablets (768px - 1024px)
- ✅ Works on mobile (small scale)

## 🔧 Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection (optional, works offline)

## 📝 OBS Usage Example

1. **In your browser (Chrome/Edge/Firefox):**
   - Open `index.html` (the overlay)
   - Open `control.html` in another tab (same browser!)
   - In control.html → Settings → Set background to Green or Blue

2. **In OBS Studio:**
   - Create new scene
   - Add source → **Window Capture**
   - Select the browser window with `index.html`
   - Right-click source → **Filters** → Add **Chroma Key**
   - Configure: Key Color = Green (or Blue), adjust Similarity/Smoothness

3. **Position the overlay:**
   - Resize and position the scoreboard in your scene
   - The chroma key removes the background, leaving only the scoreboard

4. **Control the match:**
   - Use `control.html` tab to update scores
   - Changes appear instantly in OBS

## 🐛 Troubleshooting

**Q: The overlay doesn't sync with the control**
A: Make sure both windows use the same browser and that localStorage is not disabled.

**Q: Changes don't save**
A: Verify that the browser allows localStorage. It doesn't work in private/incognito browsers.

**Q: Colors don't look right in OBS**
A: Manually adjust the Chroma Key in OBS. It may vary depending on lighting.

**Q: I want to completely change the design**
A: Edit the CSS in the `<style>` section of `index.html`.

## 📋 Roadmap v1.0.0

### Completed ✅
- [x] Auto-suggestion system from CSV
- [x] Support for multiple modes (singles, doubles, teams)
- [x] Animations and transitions
- [x] Visual theme system
- [x] Sets history
- [x] Automatic winner screen

### Future (v2.0.0+)
- [ ] Database to save matches
- [ ] Export results in multiple formats
- [ ] REST API for remote control
- [ ] Advanced statistics system
- [ ] Multi-language support (i18n)

## 📄 License

MIT - Use it freely in your projects

## 👨‍💻 Contributing

If you have improvements or find bugs:
1. Fork the project
2. Create a branch with your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ❓ FAQ

**Can I use this in my streams?**
Yes, it's completely free and open source.

**Do I need to register for anything?**
No, it works completely locally.

**Does it work on all platforms?**
Yes: OBS, StreamLabs, Twitch Studio, etc.

**Can I have multiple simultaneous matches?**
Currently no, but you can open in different browsers.

## 📋 Changelog

### v1.0.0 (2025-11-06) 🎉
**🚀 Official Release - Complete Professional Overlay System**

#### Major New Features

**📋 Auto-suggestion System from CSV (Feature 5)**
- ✅ Load players from CSV file (format: name,flag,country)
- ✅ Intelligent autocomplete while typing (minimum 2 characters)
- ✅ Dropdown with all players on focus
- ✅ On/Off toggle to enable/disable as needed
- ✅ Automatic fill of name + flag
- ✅ Persistence in localStorage between sessions
- ✅ Compatible with Singles and Teams mode
- ✅ Example file included: `jugadores-ejemplo.csv`
- 📚 Documentation: `docs/AUTOSUGERENCIA.md`

**🎮 Complete Game Modes (Feature 4)**
- ✅ Singles (1v1) - Classic mode
- ✅ Doubles (2v2) - Pairs with surname format
- ✅ Teams (Country vs Country) - Individual match tracking + country points

**🏆 Automatic Winner Screen (Feature 3)**
- ✅ Automatic detection when reaching required sets
- ✅ Confirmation modal before declaring winner
- ✅ Fullscreen overlay with name, flag, and final score
- ✅ Confetti animation (configurable)
- ✅ Emoji selector (🏆, 🥇, 🏅, ⭐, 👑)
- ✅ Post-winner flow: Winner (7s) → History (5s) → Hide overlay dialog

**⚙️ Sets Configuration (Feature 2)**
- ✅ Best of 3 (first to win 2)
- ✅ Best of 5 (first to win 3)
- ✅ Best of 7 (first to win 4)
- ✅ Automatic winner detection

**✏️ Manual Score Editing (Feature 1)**
- ✅ Click on points/sets to edit directly
- ✅ Temporary input with validation
- ✅ Automatic synchronization with overlay

#### Critical Bug Fixes

**🔧 Automatic Service Alternation Between Sets**
- ❌ Problem: When winning a set, system didn't automatically alternate service
- ✅ Solution: `firstServerHistory[]` tracking system
- ✅ Now alternates correctly: Set 1 (P1) → Set 2 (P2) → Set 3 (P1)
- ✅ Respects official ITTF alternation rule
- 📚 Complete documentation: `docs/BUG_FIX_SERVICIO_ENTRE_SETS.md`

**🔒 Automatic Reset When Changing Game Mode**
- ❌ Problem: Data was lost without confirmation
- ✅ Solution: Confirmation modal with cancel option
- ✅ Complete state reset: points, sets, service, history

#### UX/DX Improvements

- ✅ Professional post-winner flow (Winner → History → Prepare next)
- ✅ Confirmations before destructive actions
- ✅ Toggle to enable/disable autocomplete
- ✅ Exhaustive testing plan (90+ documented tests)
- ✅ Repository cleanup (obsolete files removed)

#### New Documentation

- 📚 `docs/AUTOSUGERENCIA.md` - Complete autocomplete system guide
- 📚 `docs/TESTING_v1.0.0.md` - Testing plan with 90+ tests
- 📚 `docs/BUG_FIX_SERVICIO_ENTRE_SETS.md` - Critical bug analysis
- 📚 `jugadores-ejemplo.csv` - 15 example Latin American players

#### Release Files

**Total lines added:** ~1,200
- `control.html`: ~350 new lines
- Documentation: ~850 lines
- 6 commits in this version

#### Final Status

- ✅ All planned features (6/6 - 100%)
- ✅ 0 known critical bugs
- ✅ Exhaustive documentation
- ✅ Ready for production
- ✅ Compatible with OBS Studio

---

*For complete changelog of previous versions, see [README.es.md](README.es.md)*

## 📚 Additional Documentation

For more information, check the documentation in the `docs/` folder:

- **[Quick Start Guide](docs/START.md)** - Quick instructions to get started (Spanish)
- **[Auto-suggestion System](docs/AUTOSUGERENCIA.md)** - ⭐ How to use player autocomplete (Spanish)
- **[Complete OBS Guide](docs/GUIA_OBS.md)** - Detailed streaming configuration (Spanish)
- **[GitHub Configuration](docs/SETUP_GITHUB.md)** - How to configure and deploy with GitHub Pages
- **[Download Guide](docs/DESCARGAR.txt)** - Download and installation instructions
- **[Roadmap v1.0.0](docs/ROADMAP_v1.0.0.md)** - Current development plan

> **Note**: Most documentation is in Spanish as the primary audience is Spanish-speaking streamers. The application interface is also in Spanish.

## 💝 Support the Project

This project is **100% free and open source**. If you find it useful, consider supporting it:

### ☕ Donations
- **PayPal**: [Your link here]
- **Ko-fi**: [Your link here]
- **GitHub Sponsors**: [Your link here]

### 💼 Professional Services

Need help or customization? I offer:

| Service | Price | Description |
|---------|-------|-------------|
| **Quick Setup** | $15 USD | OBS installation + basic configuration (30 min video call) |
| **Customization** | $35 USD | Setup + custom colors + logo + tutorial (1 hour) |
| **Tournament/Business** | $75+ USD | All above + multiple overlays + event support |

**Interested?** Contact me at: [your-email@example.com]

---

## 📞 Community Support

For technical issues or suggestions, open an issue in the repository.

---

**Developed with ❤️ for table tennis streamers**
