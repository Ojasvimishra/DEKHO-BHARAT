import React from 'react';
import {
    Network,
    ArrowDown,
    Database,
    Cpu,
    Activity,
    Share2,
    ChevronDown,
    GitCommit,
    History,
    Zap,
    FileText as ScrollText,
    Compass,
    Crosshair as Target,
    RotateCcw,
    CornerRightDown
} from 'lucide-react';

/**
 * ==========================================
 * N-ARY TREE EXPLORATION KERNEL
 * ==========================================
 * 
 * This component visualizes the hierarchical search path as a 
 * physical tree structure (Level-wise discovery).
 */

const DsaDashboard = ({ currentPath, currentNode, onNodeClick }) => {
    // Logic: DFS Terminal check
    const isLeaf = !currentNode.children || currentNode.children.length === 0;

    // Logic: Branching Factor (N-ary Degree)
    const childCount = currentNode.children ? currentNode.children.length : 0;

    return (
        <div className="dsa-dashboard discovery-kernel">
            <div className="kernel-container glass-panel">

                {/* 1. KERNEL HEADER */}
                <div className="kernel-header">
                    <div className="kernel-title-group">
                        <div className="icon-pulse">
                            <Network size={24} className="accent-text" />
                        </div>
                        <div>
                            <h3>DEKHOINDIA EXPLORATION PATH</h3>
                            <p>REAL-TIME RECURSIVE TRAVERSAL ANALYSIS</p>
                        </div>
                    </div>
                </div>

                <div className="kernel-grid">

                    {/* 2. HIERARCHICAL TREE SECTOR (Level-wise Graph) */}
                    <div className="visual-sector">
                        <div className="tree-graph-container">

                            {/* LEVEL 1: PARENT CONTEXT (The Pre-Recursive Call) */}
                            {currentPath.length > 1 && (
                                <div className="tree-level parent-level">
                                    <div
                                        className="node-box historical trace-node"
                                        onClick={() => onNodeClick && onNodeClick(currentPath[currentPath.length - 2])}
                                    >
                                        <div className="trace-pulse"></div>
                                        <div className="node-header-mini">
                                            <History size={12} className="accent-text" />
                                            <span className="node-label-small">PARENT_STATE_MEMORY</span>
                                        </div>
                                        <span className="node-content text-glitch">{(currentPath[currentPath.length - 2].label || currentPath[currentPath.length - 2].city || 'PARENT_NODE').toUpperCase()}</span>
                                        <div className="base-pointer">RECURSION_DEPTH: {currentPath.length - 1}</div>
                                    </div>

                                    <div className="flow-gate-container">
                                        <div className="connection-pipe active-pipe flowing-signal">
                                            <div className="flow-label side-left">RECURSIVE_CALL</div>
                                        </div>
                                        <div className="logic-diamond">
                                            <span>IF child exists</span>
                                        </div>
                                        <div className="connection-pipe active-pipe">
                                            <CornerRightDown size={14} className="pipe-arrow signal-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* LEVEL 2: ACTIVE TARGET (Current Pointer) */}
                            <div className="tree-level active-level">
                                <div className="node-box active-pointer rich-node">
                                    <div className="scanner-line"></div>
                                    <span className="node-label-small active">ACTIVE_TARGET_KERNEL</span>
                                    <span className="node-content">{(currentNode.label || currentNode.city || 'Active Point').toUpperCase()}</span>

                                    {/* Embedded Data for Active Node */}
                                    {currentNode.details ? (
                                        <div className="node-internal-data">
                                            <div className="data-row"><strong>BEST_WINDOW:</strong> {currentNode.details.bestSeason || 'Year-round'}</div>
                                            <div className="data-row"><strong>CORE_EXPERIENCE:</strong> {currentNode.details.mustTry || 'Exploration'}</div>
                                            <div className="data-row"><strong>ATMOSPHERIC_P:</strong> {currentNode.details.climate || 'Stable'}</div>
                                            <div className="data-row"><strong>COORDINATES:</strong> {currentNode.details.coords || '00.0000° N, 00.0000° E'}</div>
                                            <div className="data-row"><strong>NODE_RATING:</strong> {currentNode.details.rating || '4.5/5.0'}</div>
                                            <div className="data-row"><strong>COMPLEXITY_IDX:</strong> {currentNode.details.complexityIdx || '0.50 (Standard)'}</div>
                                            <div className="data-row" style={{ color: 'hsl(var(--primary))' }}><strong>LOCAL_GUIDE:</strong> {currentNode.details.guide?.name || 'Standard Field Guide'}</div>
                                        </div>
                                    ) : (
                                        <p className="node-desc-mini">{currentNode.description ? currentNode.description.substring(0, 100) + '...' : 'System initialized. Awaiting user traversal.'}</p>
                                    )}
                                </div>
                            </div>

                            {/* DYNAMIC PIPES: Branching Visualization */}
                            <div className="branch-logic-gate">
                                <div className="flow-line vertical active-pipe"></div>
                                <div className="logic-diamond secondary">
                                    <span>DFS_BRANCH</span>
                                </div>
                                <div className="branch-visualizer">
                                    <div className="main-pipe"></div>
                                    <div className="branch-arms" style={{ width: `${Math.min(childCount * 80, 600)}px` }}></div>
                                </div>
                            </div>

                            {/* LEVEL 3: THE FRONTIER (Sub-tree Branches) */}
                            <div className="tree-level frontier-level">
                                {currentNode.children ? (
                                    <div className="frontier-grid">
                                        {currentNode.children.map(child => (
                                            <div
                                                key={child.id}
                                                className="node-box frontier multi-info"
                                                onClick={() => onNodeClick && onNodeClick(child)}
                                            >
                                                <div className="frontier-top">
                                                    <GitCommit size={12} className="accent-text" />
                                                    <span className="node-content-small">{child.label || child.city}</span>
                                                </div>
                                                {child.tags && (
                                                    <div className="node-tags-nano">
                                                        {child.tags.slice(0, 3).join(" / ")}
                                                    </div>
                                                )}
                                                {child.details && (
                                                    <div className="hint-text">EXP: {child.details.bestSeason.split(' ')[0]}...</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="terminal-case-flow">
                                        <div className="flow-line vertical dashed"></div>
                                        <div className="logic-diamond base-case">
                                            <span>BASE_CASE</span>
                                        </div>
                                        <div className="terminal-node">
                                            <div className="terminal-badge">TERMINUS_REACHED</div>
                                            <p>NO FURTHER SUB-TREES</p>
                                            <div className="backtrack-flow">
                                                <RotateCcw size={14} />
                                                <span>BACKTRACKING_TRIGGERED</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3. METRICS SECTOR */}
                    <div className="metrics-sector">
                        <div className="metric-card">
                            <Database size={18} />
                            <div className="metric-info">
                                <span className="m-label">DATA STRUCTURE</span>
                                <span className="m-val">N-ary Tree</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <Cpu size={18} />
                            <div className="metric-info">
                                <span className="m-label">LOGIC PATTERN</span>
                                <span className="m-val">Recursive DFS</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <Activity size={18} />
                            <div className="metric-info">
                                <span className="m-label">TIME COMPLEXITY</span>
                                <span className="m-val">O(N) Traversal</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <Share2 size={18} />
                            <div className="metric-info">
                                <span className="m-label">BRANCH DEGREE</span>
                                <span className="m-val">{childCount} Children</span>
                            </div>
                        </div>

                        <div className="depth-meter-box">
                            <div className="meter-header">
                                <div className="header-with-icon">
                                    <Compass size={14} className="accent-text" />
                                    <span>TRAVERSAL DEPTH</span>
                                </div>
                                <span>LVL {currentPath.length}</span>
                            </div>
                            <div className="meter-track">
                                <div
                                    className="meter-fill"
                                    style={{ width: `${(currentPath.length / 3) * 100}%` }}
                                ></div>
                            </div>
                            <p className="meter-desc">Maximum search depth optimized at Level 3.</p>
                        </div>

                        {/* 4. DISCOVERY LOG (Algorithm Monitor) */}
                        <div className="discovery-log-container">
                            <div className="log-header">
                                <ScrollText size={16} />
                                <span>KERNEL_REAL_TIME_LOG</span>
                            </div>
                            <div className="log-body">
                                <div className="log-entry success">
                                    <span className="log-time">[0ms]</span> System initialized at Root.
                                </div>
                                {currentPath.map((node, i) => (
                                    <div key={node.id} className="log-entry">
                                        <span className="log-time">[{i * 120}ms]</span> Entering node: {node.id.toUpperCase()}
                                    </div>
                                ))}
                                {!isLeaf && (
                                    <div className="log-entry active-log">
                                        <span className="log-time">[{currentPath.length * 120}ms]</span> Calculating branching factor... ({childCount} branches)
                                    </div>
                                )}
                                {isLeaf && (
                                    <div className="log-entry terminal-log">
                                        <span className="log-time">[{currentPath.length * 120}ms]</span> Target confirmed. Recursion terminated.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 5. STRATEGY GUIDE */}
                        <div className="strategy-guide glass-sub">
                            <div className="guide-header">
                                <Target size={16} className="accent-text" />
                                <span>EXPLORER_STRATEGY</span>
                            </div>
                            <div className="guide-content">
                                {isLeaf ? (
                                    <p>You have reached a <strong>Leaf Node</strong>. Our DFS algorithm has stopped descending. The current path represents a complete journey through the hierarchy.</p>
                                ) : (
                                    <p>This is a <strong>Branch Node</strong>. You can descend further into {childCount} different paths. The complexity index is {currentNode.details?.complexityIdx || 'Standard'}.</p>
                                )}
                                <div className="guide-tip">
                                    <strong>TIP:</strong> Click on any node in the graph below to jump directly to that state.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER STATUS */}
                <div className="kernel-footer">
                    <p>
                        <strong>Kernel Feedback:</strong> Pointer <code>{currentNode.id}</code> is currently active.
                        {isLeaf ? " Recursion base case found." : " Pushing child nodes to exploration stack."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DsaDashboard;
