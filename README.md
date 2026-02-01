# Clue Scroll Helper - How to Update

This guide explains how to add or edit clue data. No programming knowledge required!

---

## Quick Start

To add or edit clue data, you only need to edit **ONE file**: `clue_data.js`

---

## How to Edit Clue Data

### 1. Open the file `clue_data.js` in any text editor (Notepad works fine!)

### 2. Find the section you want to edit:
   - **SPEAK TO NPCs** - Who to talk to
   - **ANAGRAMS** - Anagram solutions  
   - **CHALLENGE ANSWERS** - Math/counting questions
   - **RIDDLES** - Riddle clues and solutions
   - **EMOTE & OUTFIT CLUES** - Emote clues (not released yet)
   - **TREASURE TRAIL MAPS** - Map clue locations

### 3. To ADD a new entry:
   - Find the section
   - Copy an existing entry
   - Paste it on a new line (before the `// ADD NEW ENTRIES` comment)
   - Change the values inside the quotes
   - **Important:** Add a comma at the end of your new entry!

### 4. Save the file and refresh your browser

---

## Examples

### Adding a new "Speak To" NPC:
```javascript
{ person: "New NPC Name", location: "Where to find them" },
```

### Adding a new Anagram:
```javascript
{ anagram: "The Anagram Text", npc: "Solution NPC Name", location: "Where to find them" },
```

### Adding a new Challenge:
```javascript
{ problem: "The question", answer: "The answer" },
```

### Adding a new Riddle:
```javascript
{
  riddle: "The riddle text here",
  answer: "The solution/location"
},
```

---

## How to Add a New Map

1. **Add the image file** to the `maps` folder
2. **Add entry to clue_data.js** in the mapsData section:
   ```javascript
   { name: "Map Name", description: "Location description", image: "maps/yourfile.png", tier: "easy" },
   ```
3. **Add the HTML** in `index.html` - find the maps section and copy/paste an existing map-item, then update:
   ```html
   <div class="map-item" data-name="Your Map Name" data-desc="Description" data-img="maps/yourfile.png">
     <div class="map-name">Short Name</div>
     <div class="map-description">Brief description</div>
     <img src="maps/yourfile.png" alt="Your Map Name">
   </div>
   ```

---

## Common Mistakes to Avoid

1. **Missing comma** - Each entry needs a comma at the end (except the very last one)
2. **Missing quotes** - All text values must be in quotes: `"like this"`
3. **Deleting brackets** - Don't delete the `[` and `]` around each section
4. **Special characters** - If your text has quotes, use single quotes instead: `'like this'`

---

## File Structure

```
treasure v3/
├── index.html          - Main page (edit for maps HTML)
├── clue_data.js        - ALL CLUE DATA (edit this!)
├── popup.js            - App logic (don't edit)
├── puzzle_solver.js    - Puzzle solver (don't edit)
├── maps/               - Map images folder
│   ├── champ_guild.png
│   ├── varrock_mine.png
│   └── (add new maps here)
└── puzzle_solver/      - Puzzle tile images
    ├── castle/
    ├── tree/
    └── troll/
```

---

## Need Help?

If something breaks after editing:
1. Check for missing commas or quotes
2. Make sure brackets `[ ]` are still there
3. Restore from backup: `popup_old_backup.js` has the original code
