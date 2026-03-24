## Voyage Wise – DSA Demo Project

This project demonstrates **core DSA concepts** in a realistic travel‑discovery app.

- **N‑ary Tree** (`treeData` in `dsa.js`):
  - Represents the decision flow: *travel style → sub‑category → exact destination*.
  - Navigation and breadcrumbs use **DFS** to find nodes and build the path.
- **Trie / Prefix Tree** (`Trie` class in `dsa.js`):
  - Indexes all leaf cities from the N‑ary tree.
  - Search bar suggestions use **prefix lookup in O(L)** (where $L$ is query length).

### Project Structure (Consolidated)

- `src/dsa.js`: Single source of truth for DSA logic and data.
  - `treeData`: The N-ary tree structure.
  - `findNodeById`, `getPathToNode`, `isLeaf`: Tree traversal functions (DFS).
  - `Trie`, `buildTrieFromTree`: Prefix tree implementation for city search.
- `src/App.jsx`: Main React component for the travel discovery UI.
- `src/components/DsaDashboard.jsx`: Visualization of the tree structure and algorithm logs.
- `server.js`: Minimal Node.js backend providing API access to the DSA logic.

### Frontend (React + Vite)

- Interactive UI in `App.jsx`:
  - Shows the current node (category or city) from the N‑ary tree.
  - Breadcrumbs = path from root to current node (DFS based).
- `DsaDashboard.jsx`:
  - Visual diagram of **parent → current → children** in the tree.
  - Live **algorithm logs** describing tree navigation.

### Backend (Express)

The project includes `server.js` which reuses the same DSA logic:
- `/api/tree`: Returns the full decision tree.
- `/api/node/:id`: Finds a node by ID using DFS.
- `/api/path/:id`: Returns the breadcrumb path to a node.
- `/api/search?q=...`: Performs a Trie prefix search.

Run the backend:
```bash
node server.js
```

### Verification

You can verify the logic by running the backend or by checking console logs in the React app.
To run a quick CLI verification:
```bash
node -e "import { treeData, findNodeById } from './src/dsa.js'; console.log(findNodeById(treeData, 'hampi'))"
```
