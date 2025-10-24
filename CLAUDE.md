# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A professional table tennis (ping pong) overlay system for live streaming with OBS integration. The project consists of two synchronized HTML files that communicate via localStorage:
- **index.html**: The visual overlay displayed in OBS (transparent background)
- **control.html**: The control panel for managing the scoreboard in real-time

## Architecture

### Synchronization Model
Both files share a common state structure stored in `localStorage` under the key `gameState`:

```javascript
{
  player1: { name, role, points, sets, service, flag },
  player2: { name, role, points, sets, service, flag }
}
```

**Data Flow:**
1. User interacts with control.html
2. JavaScript updates gameState object
3. State saved to localStorage via `localStorage.setItem('gameState', JSON.stringify(gameState))`
4. index.html listens for `storage` events via `window.addEventListener('storage')`
5. Overlay updates DOM to reflect new state

**Critical**: Both files must be opened in the **same browser** (different tabs) for synchronization to work. localStorage does not sync across different browsers or incognito mode.

### Key Functions by File

**index.html (Overlay):**
- `updateDisplay()` - Updates DOM elements from gameState
- `loadState()` - Loads gameState from localStorage on page load
- Keyboard shortcuts (keys 1, 2, S) for quick score updates
- Storage event listener for cross-tab synchronization

**control.html (Control Panel):**
- `updateData()` - Captures form inputs and updates gameState
- `changePoints(player, delta)` - Increments/decrements points
- `changeSets(player, delta)` - Increments/decrements sets
- `setService(player)` - Toggles service indicator
- `resetAll()` - Resets all scores and data

## Development Commands

### Running Locally
No build process required. Simply open the HTML files in a browser:
- Open `index.html` in one browser tab (this is the overlay)
- Open `control.html` in another tab (this is the control panel)

### Testing
**Manual testing checklist:**
1. Edit player names in control.html → verify update in index.html
2. Change flags → verify emoji changes in overlay
3. Click +/- buttons for points/sets → verify counters update
4. Toggle service buttons → verify blue ball indicator moves
5. Press keyboard shortcuts (1, 2, S) in index.html → verify updates
6. Click "Reiniciar Todo" → verify reset to defaults

**OBS Integration testing:**
1. Add Browser Source in OBS
2. Use file path: `file:///C:/path/to/index.html` (Windows) or `file:///path/to/index.html` (Mac/Linux)
3. Set resolution: 1920x1080
4. Apply Chroma Key filter to remove background
5. Verify overlay displays correctly

### Debugging localStorage Issues
```javascript
// Open browser DevTools console
// View current state:
JSON.parse(localStorage.getItem('gameState'))

// Clear state:
localStorage.removeItem('gameState')

// Manually set state:
localStorage.setItem('gameState', JSON.stringify({
  player1: { name: 'Test', role: 'Player 1', points: 0, sets: 0, service: true, flag: '🇪🇸' },
  player2: { name: 'Test2', role: 'Player 2', points: 0, sets: 0, service: false, flag: '🇦🇷' }
}))
```

## Design System

**Colors (index.html overlay):**
- Background gradient: `#003d8c` → `#0052CC`
- Text primary: `#ffffff` (white)
- Text secondary: `#5ba3ff` (light blue)
- Service ball active: `#5ba3ff`
- Service ball inactive: `rgba(255, 255, 255, 0.2)`

**Typography:**
- Player name: 28px, bold, white
- Player role: 13px, italic, light blue
- Score values: 36px, bold, white
- Labels: 10px, uppercase, semi-transparent white

**Responsive Breakpoints:**
- Default: 1920x1080+ (full size)
- Medium: ≤1000px (reduced padding and font sizes)

## Important Implementation Notes

### When Modifying gameState Structure
If you add or change fields in the gameState object:
1. Update **both** index.html and control.html
2. Update the initial state definitions (lines ~224-227 in index.html, ~304-307 in control.html)
3. Update `updateDisplay()` in both files
4. Test synchronization thoroughly
5. Consider backward compatibility with existing localStorage data

### When Adding New Features
- Maintain the localStorage synchronization pattern
- Add event listeners for new UI controls in control.html
- Update `updateDisplay()` to reflect new state in index.html
- Preserve the transparent background in index.html for OBS compatibility
- Test responsive design at multiple screen sizes

### Style Modifications
- Keep background `transparent` in index.html body for OBS chroma keying
- Maintain consistent spacing and border-radius values
- Use rgba colors for semi-transparent elements
- Test contrast ratios for overlay readability on various backgrounds

### Common Pitfalls to Avoid
1. **Never** rename `gameState` in one file without updating the other
2. **Always** use `JSON.stringify()` when saving to localStorage
3. **Always** use `JSON.parse()` when reading from localStorage
4. **Don't** rely on DOM state - always derive from gameState object
5. **Don't** forget to call `updateDisplay()` after modifying gameState

## File Structure Notes

All functionality is self-contained in two HTML files - no external dependencies, build tools, or package managers required (package.json is metadata only). This makes the project:
- Easy to deploy (just upload HTML files)
- Compatible with GitHub Pages
- Simple to modify (single-file architecture)
- Portable across environments
