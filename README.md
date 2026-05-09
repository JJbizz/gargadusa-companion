# Gargadusa Companion

**Guild Synergy Optimizer & Save Editor** — Version 1.0.0
A free, community-built companion tool for Gargadusa players.

---

## Table of Contents

1. [Installation & First Launch](#1-installation--first-launch)
2. [Interface Overview](#2-interface-overview)
3. [Synergy Optimizer](#3-synergy-optimizer)
   - [Single Party Finder](#single-party-finder)
   - [Raid Roster Planner](#raid-roster-planner)
4. [Save Editor](#4-save-editor)
   - [Loading a Save File](#loading-a-save-file)
   - [Navigating the Entity List](#navigating-the-entity-list)
   - [Editing an Entity](#editing-an-entity)
   - [Guild Info & Buildings](#guild-info--buildings)
   - [Rival Adventurers](#rival-adventurers)
   - [Creating New Units](#creating-new-units)
   - [Deleting Units](#deleting-units)
   - [Exporting Your Save](#exporting-your-save)
5. [Settings & Preferences](#5-settings--preferences)
6. [Keyboard Shortcuts & Tips](#6-keyboard-shortcuts--tips)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Installation & First Launch

There are four ways to run Gargadusa Companion. Choose the one that suits you.

### Option A — Portable `.exe` (recommended)

Download the standalone `.exe` from the Releases page and run it directly — no installation required. The app has full access to your file system, so you can set a save folder and export directly to your Gargadusa saves directory without any extra steps.

| Platform | File |
|----------|------|
| Windows  | Portable `.exe` |
| macOS    | `.dmg` |
| Linux    | `.AppImage` or `.deb` |

**macOS security note:** If macOS blocks the app on first launch ("unidentified developer"), right-click the app and choose **Open**, then confirm. This is a standard Gatekeeper prompt for unsigned community tools. If you see "App is damaged and can't be opened" instead, run the following in Terminal and try again:

```
xattr -cr /Applications/Gargadusa\ Companion.app
```

### Option B — Installed desktop app

If you prefer a traditional installation (Start Menu shortcut, uninstaller entry in Windows settings, etc.), download and run the `.exe` installer from the Releases page. The installed app is functionally identical to the portable version.

### Option C — Open `app.html` directly in a browser

If you'd rather not download an executable at all, you can open `app.html` directly in **Chromium or Microsoft Edge** without any setup.

1. Download and unzip the release archive.
2. Open Chromium or Edge.
3. Press `Ctrl+O` (or `Cmd+O` on Mac) and navigate to `app.html` inside the unzipped folder — or drag and drop the file into a browser tab.
4. The tool loads immediately. No server, no install, no internet needed.

**Important limitations when running in-browser:**

- The **Set Folder** button (direct folder export) is not available. Instead, use the **Download** button to save the exported file, then move it manually to your Gargadusa saves folder.
- The Raid Roster Planner's direct export works the same way — use **Download (Browser)** rather than the folder export.
- Other browsers (Firefox, Safari) may work but are not officially supported. Chromium and Edge are recommended because of their full implementation of the File System Access API.

### Option D — Run from source

Requires [Node.js](https://nodejs.org/) v18 or newer.

```
git clone https://github.com/JJbizz/gargadusa-companion.git
cd gargadusa-companion
npm install
npm start
```

---

## 2. Interface Overview

The tool is divided into two main tabs, accessible at the top of the window:

- **Synergy Optimizer** — Plan parties and raid rosters without touching your save file.
- **Save Editor** — Load, inspect, modify, and export your actual Gargadusa save files.

A theme toggle in the top-right corner switches between dark and light mode. Your preference is saved between sessions.

---

## 3. Synergy Optimizer

The Synergy Optimizer is a standalone planning tool — it does **not** require a save file to use, though you can import one to pull in your real roster data.

### Single Party Finder

This tab helps you find the single highest-synergy party from a pool of adventurers.

**Party Size** — Select how many members your party will have (e.g. 3, 4, 5) from the dropdown. The slot grid updates automatically.

**Slot Templates** — Each slot in the party can be:

- A **specific class** (e.g. Holy Paladin, Shadow Rogue) — drag or click a class from the class list.
- A **role placeholder** — drag Tank, Healer, Melee, Ranged, or DPS to fill a slot with any class that fits that role.
- A **dual-class adventurer** — use the Dual-Class section to combine two classes into one slot. The adventurer counts as both classes for every synergy calculation.

**Banning classes** — Click any class in the roster list to toggle it as **banned** (greyed out, crossed through). Banned classes are excluded from optimization. Use **Ban All / Unban All** per role section or the global **Ban All Roster** button.

**Finding the best party** — Once your slots are configured, click **Find Best Raid Parties**. The optimizer runs through all valid class combinations and ranks them by total synergy score, displaying the top results.

**Synergy reference** — Scroll down below the optimizer to see every synergy in the game. Hover over a synergy to see which classes trigger it and any minimum party-size requirements.

**Saving your configuration** — Your current banned classes, party template, and party size can be saved via **Save Search Config** and reloaded later. Use **Clear All Saved Configs** to reset.

---

### Raid Roster Planner

This tab optimizes parties across your entire guild roster simultaneously — useful for planning multiple quest parties at once.

**Importing your roster**

The planner can pull directly from your save file so you don't have to enter adventurers by hand:

1. Click **Import Save File (JSON)** in the Raid Roster Planner section.
2. Select your `save_1.json` (or whichever slot) from your Gargadusa saves folder.
3. If successful, the status bar shows how many adventurers were imported.

Alternatively, add adventurers to the queue manually using the class picker — click any class to add an adventurer with that class. Dual-class adventurers are supported here too.

**The queue** — All adventurers available for optimization appear in the **Queued Roster** panel. Each entry shows name (if imported), class, OVR, and skill. You can remove any individual entry, or **Clear All** to start over.

**Party size & composition** — Set how many members per party. Toggle **Require Tank + Healer + DPS** to enforce a balanced composition in every output party.

**Running the planner** — Click **Optimize All Parties**. The planner assigns adventurers to parties to maximize synergy across all of them simultaneously. Results appear below, each party showing its synergy score, average OVR, and member breakdown.

**Exporting results to your save** — If you imported a save, you can write the optimized party assignments back to it. Set the save folder and slot number the same way as the Save Editor (see [Exporting Your Save](#exporting-your-save) below), then click **Export** (desktop/portable) or **Download (Browser)** (browser/HTML mode). A backup of your original file is created automatically.

---

## 4. Save Editor

The Save Editor lets you directly inspect and modify Gargadusa save files. Changes you make here are written back to disk when you export.

> **Always keep backups.** The tool creates a backup file automatically on every export, but it is good practice to keep your own copies before making large changes. Editing saves may cause unexpected behavior — use at your own risk.

### Loading a Save File

1. Go to the **Save Editor** tab.
2. Click **Import** in the top toolbar.
3. Navigate to your Gargadusa saves folder and select the `.json` save file (e.g. `save_1.json`).
4. The tool parses the file and loads all entities. A summary shows how many guild entities and rival adventurers were found. If the file contains any structural issues (type mismatches, legacy field names), the tool silently auto-repairs them on load.

Once a save is loaded, a status bar in the toolbar displays the guild name, tier, current date, and ranking points at a glance.

---

### Navigating the Entity List

The left sidebar shows all entities in your save. Two view tabs sit at the top of the sidebar:

- **Guild** — Shows your own guild's entities (default).
- **Rivals** — Switches to rival guild members (read-only; see [Rival Adventurers](#rival-adventurers)).

Below the view tabs:

- **Search bar** — Filter by name, class, type, profession, guild name, or ID. Results update instantly as you type.
- **Category tabs** — Filter by All, Adventurers, Staff, Scouts, Crafters, or Gatherers.
- **Entity count** — Shows how many entities match your current filter out of the total.

**Filters** — Click the **Filters** button to expand the filter panel and narrow by class/profession, potential tier (S-Tier through F-Tier), OVR range, minimum level, maximum age, rarity, status, gender, and role.

**Sorting** — Use the **Sort** dropdown to order the list by name, OVR, level, age, potential, class, wage, or status.

**Selecting an entity** — Click any row in the list to open their full profile in the right panel. The selected row is highlighted in purple.

---

### Editing an Entity

When an entity is selected, their profile appears on the right. The tabs available depend on the entity type:

- **Adventurers:** Identity · Vitals · Contract · Traits · Career · Activity
- **Staff / Scouts / Crafters / Gatherers:** Identity · Details · Activity

#### Identity Tab

The primary information panel. All fields are editable inline:

- **Name** — The adventurer's display name.
- **Class / Role / Type** — The entity's class or profession. For adventurers, a **Switch Class** dropdown lets you swap to any class in the database (updates rarity, roles, emoji, and abilities automatically; stats are preserved).
- **ID** — Internal save ID. Edit with caution.
- **Age** — Current age.
- **Gender** — M / F selector.
- **Emoji / Icon** — The emoji displayed next to the entity's name.
- **Status** — Current status (available, injured, resting, on_quest, etc.).
- **Level / XP** — Experience progress.
- **Condition** — HP (current and max), morale, injury weeks, rest weeks. The **Full Heal** button restores HP to max, morale to 100, and clears all injury/rest weeks.
- **Potential** — Potential tier (S through F) and numeric potential ceiling. The ceiling grade chart updates live as you edit.
- **Classification** — Roles (comma-separated), rarity (Common through Legendary).
- **Class Abilities** — Read-only display of the selected class's passive and active abilities with cooldowns.
- **Class Tags** — Primary, secondary, and general tags for the class.
- **Possible Synergies** — Lists every synergy this entity's class participates in.

For **staff members and scouts**, the Identity tab includes a **Switch Role** dropdown (Scout, Bartender, Receptionist, Astrologer, Instructor, Tactician, Foreman, Quartermaster, Treasurer) instead of a class switcher.

#### Vitals Tab *(adventurers only)*

Stat editor for adventurers. Displays all combat stats grouped by category (e.g. Offense, Defense), each editable individually. The OVR (Overall Rating) is calculated and displayed live. The **Max All** button sets every stat to the current stat cap.

Each stat group also shows an optional **category ceiling** input — the maximum that stat group can reach for this adventurer. If the adventurer has level-up stat gains recorded, those appear alongside each stat as a secondary editable field.

#### Contract Tab *(adventurers only)*

Wage, contract years, requested wage, preferred term, negotiation cooldown, and sun/moon signs. Also shows relationship data — other entities this character has a relationship with, the relationship type, and its strength.

#### Traits Tab *(adventurers only)*

Manage zodiac traits and flaws. Displays current traits as removable tags — click the **✕** on any trait to remove it. A **Trait Encyclopedia** button opens a searchable full-screen reference of all traits and flaws (also accessible from the **Traits** toolbar button). Click any entry in the encyclopedia to add it to the selected entity.

#### Career Tab *(adventurers only)*

Read-only career statistics: quests completed, total gold earned, total prestige earned, kills, and other lifetime stats. Also displays the entity's personal **Ambition** (current goal and reward on completion) and ranking history.

#### Details Tab *(staff, scouts, crafters, gatherers)*

This tab covers everything specific to non-adventurer entities:

- **Skill** — An editable field with a visual progress bar showing how the current skill value compares to the potential ceiling. A range slider lets you scrub the value quickly. The tier name auto-updates as you change skill.
- **Potential** — Potential tier and ceiling, same as adventurers. A **Rank Progression** chart shows the skill ranges for each tier name for this role.
- **Tier Reference table** — Shows what each skill tier provides for this specific role. Examples:
  - *Scouts* — Scouting time, accuracy penalty, and base wage per tier.
  - *Instructors* — Stat bonus, XP bonus, max trainees, and wage per tier.
  - *Tacticians / Astrologers / Receptionists / Bartenders* — Role-specific bonus tables.
- **Profile** — Tier name (auto-calculated from skill), Specialization (for Instructors and Tacticians, this is a switchable dropdown), Personality, and any extra fields present in the save.
- **Contract** — Wage and contract years for this unit.

#### Activity Tab

A chronological log of all recent activity for this entity (quests, training, injuries, etc.).

---

### Reference Panels

Two toolbar buttons open full-screen reference panels available at any time, regardless of which entity is selected:

- **Classes** — A searchable database of all 42 classes, filterable by rarity. Also includes a full **Class Synergies** reference listing all 17 synergy combos with their bonus percentages and class requirements.
- **Traits** — The **Trait & Flaw Encyclopedia**, showing all available traits and flaws with descriptions. Toggle between the Traits and Flaws lists using the tabs at the top. Clicking any entry adds it to the currently selected entity (if one is selected).

---

### Guild Info & Buildings

Click the **Guild** button in the Save Editor toolbar to open the Guild Info panel as an overlay.

**General** — Editable fields for guild name, guild tier, gold, reputation, prestige, year, season (0–3), week, and difficulty.

> The **Gold**, **Rep**, and **Prestige** fields in the toolbar header also let you edit these three values at a glance without opening the Guild panel.

**Rankings** — Editable fields for current Ranking Points, Year-End Points, and quests/raids/tower runs completed this year.

**Ranking History** — If your save includes past seasonal competition results, they appear as an editable table. Every field (rank, tier, points, gold reward, prestige reward, bonus) can be changed inline.

**Year Stats** — If your save includes a year stats block, it appears here as editable fields covering quests, raids, tower floors, gold earned/spent, adventurers recruited/lost/retired, injuries, levels gained, reputation changes, materials gathered, items crafted, and trades completed.

**Buildings** — All buildings in your guild are listed with their current tier. Use the upgrade button to increment a tier (construction history is recorded automatically), or **Remove** to delete a building entirely.

---

### Rival Adventurers

Click the **Rivals** tab in the sidebar to switch the entity list to rival guild members. Use the guild dropdown that appears to filter by a specific rival guild. Rivals are fully read-only — they cannot be edited or deleted.

---

### Creating New Units

Four **Create** buttons appear in the Save Editor toolbar (enabled once a save is loaded):

- **Adventurer** — Creates a new adventurer with a class picker, stat array, and all standard adventurer fields. The new unit is added to the `roster` array in your save.
- **Staff** — Creates a new staff member with a role selector and skill field.
- **Gatherer** — Creates a new gatherer with a type selector.
- **Crafter** — Creates a new crafter with a profession selector.

After filling out the creation form, click **Create** to add the unit to the save and the entity list. The new unit is immediately selected and ready to edit.

---

### Deleting Units

You can permanently remove any guild entity from your save using three methods:

**Delete button on the list** — Hover over any entity row in the sidebar. A small **✕** button appears on the right edge of the row. Click it to open the confirmation dialog.

**Delete button in the detail panel** — When an entity is selected, a **Delete** button appears in the top-right corner of their profile header.

**Delete key** — With an entity selected and focus not on a text field, press the `Delete` key on your keyboard.

All three methods open a **confirmation dialog** showing the unit's name and source array. You must confirm before any deletion occurs:

- Click **Delete** or press `Enter` to confirm.
- Click **Cancel** or press `Escape` to dismiss.

Deleted units are removed from both the display list and the underlying save data array (e.g. `roster`, `staff`, `crafters`). They will not appear in the exported save file.

> Rivals cannot be deleted — the delete button does not appear on rival entries.

---

### Exporting Your Save

Once you're done editing, export the save back to disk.

**Portable or installed app:**

1. Click **Set Folder** in the toolbar and select the folder where your Gargadusa saves live. This is remembered between sessions.
2. Set the **Slot** number — this determines the output filename (`save_1.json`, `save_2.json`, etc.). The tool tries to auto-detect the slot from the filename of the imported file.
3. Click **Export**.

**Browser / HTML mode:** Direct folder access is not available in-browser. Click **Download** to download the file, then move it manually to your Gargadusa saves folder.

Either way, two files are produced:

- **`save_N.json`** — Your updated save file.
- **`save_N (backup).json`** — A copy of the original file before your changes, for safety.

An export status message confirms success or reports any errors.

---

## 5. Settings & Preferences

| Setting | How to access |
|---------|---------------|
| Dark / Light theme | Theme toggle, top-right of window |
| Save folder | **Set Folder** button in Save Editor toolbar |
| Export slot number | **Slot** field in Save Editor toolbar |
| Party size (Optimizer) | Party Size dropdown in Synergy Optimizer |
| Saved search configs | **Save Search Config** / **Clear All Saved Configs** in Optimizer |

Configuration (save folder, theme, banned classes, party template) is persisted locally in the tool's IndexedDB storage and restored automatically on next launch.

---

## 6. Keyboard Shortcuts & Tips

| Key | Action |
|-----|--------|
| `Delete` | Open delete confirmation for the currently selected entity (Save Editor) |
| `Enter` | Confirm the delete dialog (when dialog is open) |
| `Escape` | Close the delete dialog without deleting |

**Tips:**

- The **search bar** in the Save Editor filters across name, class, type, profession, guild name, and ID simultaneously — it's the fastest way to find a specific unit.
- The **OVR badge** in the Save Editor entity list updates live as you edit stats — no need to save or refresh.
- The **Classes** panel is a handy reference even when you're not editing anything — it lists every class with its roles, tags, abilities, and synergies.
- In the Raid Roster Planner, adventurers already assigned to established (non-quest, non-training) parties are flagged automatically. You can choose to exclude them from optimization to preserve existing party compositions.
- The **Score** badge on each output party in the optimizer represents the total synergy multiplier — higher is better. A synergy that stacks multiple times shows its tier in brackets (e.g. `[T2]`).

---

## 7. Troubleshooting

**"Could not find a roster/adventurer list in this JSON"**
The imported file doesn't appear to be a valid Gargadusa save, or uses an unexpected structure. Make sure you're selecting a save file from the correct game version.

**The Export button is greyed out**
A save file must be loaded before you can export. Click **Import** and load a save first.

**My changes aren't showing after export**
Check that the slot number matches the file the game reads. Also verify the save folder path is the actual folder the game looks in (not a subfolder or desktop copy). In browser/HTML mode, make sure you moved the downloaded file to the correct location.

**A unit's type or profession looks wrong after loading**
The tool silently repairs certain legacy field values on load (e.g. old "overseer" entries become "foreman", mismatched profession types for crafters/gatherers are corrected). If you see unexpected values, this may be why — review the entity and adjust as needed before exporting.

**Deleting a unit caused unexpected behavior**
Units that are referenced by active quests or party assignments may leave orphaned references in the save. Check party and quest data after deleting units that were actively assigned.

**Browser mode: the Set Folder button doesn't work**
Direct folder access is only available in the portable or installed desktop app. Use **Download** to save the file and move it manually to your saves folder.

---

## License & Credits

All rights reserved © 2026 JJbizz. This is a free community tool for Gargadusa players and is not affiliated with or endorsed by the game's developers. Use at your own risk and always keep save backups.
