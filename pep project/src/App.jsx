import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  RefreshCcw,
  ArrowRight,
  ArrowLeft,
  Compass,
  Zap,
  Crosshair as Target,
  FileText as ScrollText,
  Navigation,
  Phone,
  Mail,
  User,
  Ticket,
  CheckCircle,
  Shield,
  CloudRain,
  Activity as HeartRate,
  Clock,
  MapPin,
  Info,
  Sun,
  Moon,
  Play,
  ChevronDown
} from 'lucide-react';
import { treeData, getPathToNode, isLeaf, getAllDestinations, getRecommendations } from './dekhoindia';
import DsaDashboard from './components/DsaDashboard';
import LoginPage from './components/LoginPage';
import './dekhoindia-styles.css';
import './login-styles.css';
import { LogOut } from 'lucide-react';

const App = () => {
  // State: Tracking the current location in the N-ary Tree
  const [currentNode, setCurrentNode] = useState(treeData);
  const [showIndex, setShowIndex] = useState(false);
  const [bookedActivities, setBookedActivities] = useState({}); // Tracking booked IDs
  const [userData, setUserData] = useState({ name: '', phone: '' }); // User input details
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'
  const [user, setUser] = useState(null); // Authenticated User data
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect: Sync theme with document body class
  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  // Global Asset Pool for Randomization
  const assetPool = [
    "/src/assets/Bir%20Billing.jpg",
    "/src/assets/rameshwerm.jpg",
    "/src/assets/senturies.jpg",
    "/src/assets/leh.jpg",
    "/src/assets/Spity.jpg",
    "/src/assets/Andaman.jpg",
    "/src/assets/Havelock.jpg",
    "/src/assets/gulmarg.jpg",
    "/src/assets/living%20jungle.jpg",
    "/src/assets/Coorg-1.jpg",
    "/src/assets/Dalhousie.jpg"
  ];

  // Pick random images for Home Page sections
  const heartOfIndiaImages = useMemo(() => {
    const shuffled = [...assetPool].sort(() => 0.5 - Math.random());
    return {
      hero: shuffled[0],
      gallery1: shuffled[1],
      gallery2: shuffled[2]
    };
  }, [currentNode.id === 'dekho-india']); // Only shuffle when hitting home

  // Memoized: Calculating the traversal path (Breadcrumbs) from Root to Current
  const breadcrumbs = useMemo(() =>
    getPathToNode(treeData, currentNode.id) || [],
    [currentNode]
  );

  // Logic: Handle navigation to a child node (Descending the tree)
  const handleNodeClick = (node) => {
    setCurrentNode(node); // Update the active node pointer
    setShowIndex(false); // Close index if open
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Visual scroll reset
  };

  // Logic: Move one level up in the hierarchy (Backtracking)
  const handleBack = () => {
    if (breadcrumbs.length > 1) {
      const parentNode = breadcrumbs[breadcrumbs.length - 2]; // Get immediate parent from path
      setCurrentNode(parentNode); // Jump to parent state
    }
  };

  // Logic: Reset state back to the root of the tree
  const resetJourney = () => {
    setCurrentNode(treeData); // Return to initial state
    setShowIndex(false); // Close index
  };

  // Logic: Functional Booking Handler (Saves to MongoDB)
  const handleBookActivity = async (opt) => {
    if (!userData.name || !userData.phone) {
      alert("⚠️ DATA_ENTRY_ERROR: Please enter Name and Phone to initiate booking kernel.");
      return;
    }

    const activityId = `${currentNode.id}-${opt.activity}`;
    const voucherId = `DB-EXPLORE-${Math.floor(Math.random() * 9000) + 1000}`;

    try {
      const response = await fetch('http://127.0.0.1:4000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userData.name,
          userPhone: userData.phone,
          city: currentNode.city || currentNode.label,
          activity: opt.activity,
          price: opt.price,
          guideName: currentNode.details?.guide?.name || 'Standard Guide',
          voucherId: voucherId
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookedActivities(prev => ({
          ...prev,
          [activityId]: { ...opt, voucherId }
        }));
        alert(`✅ SUCCESS: Booking for ${opt.activity} synced with MongoDB.`);
      } else {
        alert("❌ BACKEND_ERROR: Could not sync with MongoDB.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ NETWORK_ERROR: Backend server not reachable.");
    }
  };

  // Logic: Functional Unbooking Handler (Deletes from MongoDB)
  const handleUnbookActivity = async (opt) => {
    const activityId = `${currentNode.id}-${opt.activity}`;
    const voucherId = bookedActivities[activityId]?.voucherId;

    if (!voucherId) return;

    if (!window.confirm("🗑️ Are you sure you want to cancel this booking and remove it from the database?")) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:4000/api/bookings/${voucherId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        setBookedActivities(prev => {
          const newState = { ...prev };
          delete newState[activityId];
          return newState;
        });
        alert(`🗑️ SUCCESS: Booking for ${opt.activity} removed from MongoDB.`);
      } else {
        alert("❌ BACKEND_ERROR: Could not remove booking.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ NETWORK_ERROR: Backend server not reachable.");
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserData({ ...userData, phone: '' });
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* 0. Premium Background Visuals */}
      <div className="bg-visuals">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* 1. Header & Branding Section */}
      <header className="app-header">
        {breadcrumbs.length > 1 ? (
          <button onClick={handleBack} className="back-btn" title="Go Back">
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div style={{ width: '70px' }}></div> /* Spacer to keep logo centered */
        )}

        <div className="logo" onClick={resetJourney}>
          <h1>DEKHO <span>BHARAT</span></h1>
        </div>

        <div className="header-actions">
          <button
            className={`icon-btn ${showIndex ? 'active' : ''}`}
            onClick={() => setShowIndex(!showIndex)}
            title="Global Destination Index"
          >
            <Navigation size={22} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="icon-btn"
            onClick={handleLogout}
            title="Log Out Terminal"
            style={{ marginLeft: '1rem', background: 'rgba(239, 68, 68, 0.1)' }}
          >
            <LogOut size={20} color="#ef4444" />
          </button>
        </div>
      </header>

      {/* 2. Hierarchical Breadcrumb Navigation (Path Tracing) */}
      <nav className="breadcrumb">
        {(breadcrumbs || []).map((node, index) => (
          <React.Fragment key={node.id}>
            <span
              className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'breadcrumb-active' : ''}`}
              onClick={() => handleNodeClick(node)}
            >
              {node.label || node.city || 'TRAVERSAL NODE'}
            </span>
            {index < breadcrumbs.length - 1 && <ChevronRight size={14} />}
          </React.Fragment>
        ))}
      </nav>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {isLeaf(currentNode) ? (
              <div className="result-view fade-in">
                <div className="result-info">
                  {currentNode.image && (
                    <div className="result-hero-image">
                      <img src={currentNode.image} alt={currentNode.city} />
                    </div>
                  )}
                  <h2>{currentNode.city || currentNode.label || 'Destination'}</h2>
                  <p className="result-meta">{currentNode.state || 'India'}</p>
                  <p className="result-description">{currentNode.description || 'Analyzing discovery node...'}</p>

                  <div className="practical-tips">
                    <h3>🔍 Things to explore</h3>
                    <div className="tips-grid">
                      <div className="tip-box"><strong>Best Season</strong><p>{currentNode.details?.bestSeason}</p></div>
                      <div className="tip-box"><strong>Recommendations</strong><p>{currentNode.details?.mustTry}</p></div>
                      <div className="tip-box"><strong>Weather</strong><p>{currentNode.details?.climate || 'Stable'}</p></div>
                      <div className="tip-box"><strong>Activities</strong><p>{currentNode.details?.activities}</p></div>
                      <div className="tip-box"><strong>Food</strong><p>{currentNode.details?.localFood}</p></div>
                      <div className="tip-box"><strong>Hidden Gem</strong><p>{currentNode.details?.hiddenGem}</p></div>
                      <div className="tip-box"><strong>Coordinates</strong><p>{currentNode.details?.coords}</p></div>
                      <div className="tip-box"><strong>Rating</strong><p>{currentNode.details?.rating}</p></div>
                    </div>
                  </div>

                  <div className="tag-cloud">
                    {currentNode.tags?.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="explorer-compendium">
                    <div className="compendium-header">
                      <Compass size={24} className="accent-text" />
                      <h3>THE EXPLORER'S COMPENDIUM</h3>
                    </div>

                    <div className="compendium-grid">
                      <div className="compendium-card">
                        <div className="card-header"><Zap size={20} /><span>PROTOCOLS</span></div>
                        <p>{currentNode.details?.activities || 'Standard exploration protocols apply.'}</p>
                      </div>
                      <div className="compendium-card">
                        <div className="card-header"><Zap size={20} /><span>GASTRONOMY</span></div>
                        <p>{currentNode.details?.localFood || 'Organic sustaining nodes suggested.'}</p>
                      </div>
                    </div>

                    <div className="guide-insight" style={{ marginTop: '2rem' }}>
                      <div className="insight-header"><ScrollText size={18} /><span>FIELD GUIDE INSIGHT</span></div>
                      <p>
                        To fully synchronize with <strong>{currentNode.city}</strong>, visit during <strong>{currentNode.details?.bestSeason}</strong>.
                        Atmospheric profile: <strong>{currentNode.details?.climate}</strong>.
                        Complexity index: <strong>{currentNode.details?.complexityIdx}</strong>.
                      </p>
                    </div>

                    {currentNode.details?.guide && (
                      <div className="guide-kernel-container" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                        <div className="compendium-header" style={{ marginBottom: '1rem' }}><User size={20} className="accent-text" /><h3>ACTIVE GUIDE ON THE LOCATION</h3></div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                          <div><span style={{ fontSize: '0.7rem', opacity: 0.5 }}>NAME</span><div><strong>{currentNode.details.guide.name}</strong></div></div>
                          <div><span style={{ fontSize: '0.7rem', opacity: 0.5 }}>PHONE</span><div><strong>{currentNode.details.guide.phone}</strong></div></div>
                          <div><span style={{ fontSize: '0.7rem', opacity: 0.5 }}>EMAIL</span><div><strong>{currentNode.details.guide.email}</strong></div></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {currentNode.details?.bookingOptions && (
                    <div className="booking-module" style={{ marginTop: '3rem' }}>
                      <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div className="compendium-header" style={{ marginBottom: '1.5rem' }}><Ticket size={20} className="accent-text" /><h3>FUN ACTIVITIES</h3></div>

                        <div className="user-input-kernel" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                          <span style={{ fontSize: '1rem', opacity: 0.5, display: 'block', marginBottom: '1rem' }}>PASSENGER_MANIFEST</span>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <input type="text" placeholder="Full Name" style={{ flex: 1, padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '6px' }} value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                            <input type="text" placeholder="Phone Number" style={{ flex: 1, padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '6px' }} value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {currentNode.details.bookingOptions.map((opt, i) => (
                            <div key={i}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div><span style={{ fontSize: '0.6rem', opacity: 0.5 }}>{opt.type}</span><strong>{opt.activity}</strong></div>
                                <div>
                                  <span style={{ color: 'var(--primary)', marginRight: '1rem' }}>{opt.price}</span>
                                  <button
                                    className={`btn ${bookedActivities[`${currentNode.id}-${opt.activity}`] ? 'booked' : 'primary-btn'}`}
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}
                                    onClick={() => handleBookActivity(opt)}
                                  >
                                    {bookedActivities[`${currentNode.id}-${opt.activity}`] ? 'BOOKED' : 'BOOK'}
                                  </button>
                                </div>
                              </div>
                              {bookedActivities[`${currentNode.id}-${opt.activity}`] && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1.5rem', marginTop: '0.5rem', background: 'rgba(74, 222, 128, 0.05)', borderRadius: '12px', border: '1px dashed #4ade80' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.75rem' }}>
                                    <div><Clock size={12} /> reporting: 08:30 AM</div>
                                    <div><MapPin size={12} /> meetup: Base Camp, {currentNode.city}</div>
                                    <div style={{ gridColumn: 'span 2' }}><Info size={12} /> protocol: Carry ID, follow safety briefings.</div>
                                  </div>
                                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(74,222,128,0.2)', paddingTop: '0.5rem' }}>
                                    <span style={{ fontSize: '0.6rem' }}>VOUCHER: {bookedActivities[`${currentNode.id}-${opt.activity}`].voucherId}</span>
                                    <button
                                      onClick={() => handleUnbookActivity(opt)}
                                      style={{
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.6rem',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      CANCEL BOOKING
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="safety-protocol" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,100,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <div className="compendium-header" style={{ marginBottom: '1rem' }}><Shield size={20} style={{ color: '#ffcc00' }} /><h3>SAFETY_PROTOCOL</h3></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                      <div><strong>Atmospheric Scan</strong><p>Condition: Optimal for {currentNode.city}</p></div>
                      <div><strong>Acclimatization</strong><p>Status: Level 1 Cleared</p></div>
                    </div>
                  </div>

                  <div className="recommendations-container" style={{ marginTop: '4rem' }}>
                    <div className="compendium-header"><Zap size={24} className="accent-text" /><h3>CHAIN_RECOMMENDATIONS</h3></div>
                    <div className="recommendation-grid">
                      {getRecommendations(currentNode.id).map(rec => (
                        <div key={rec.id} className="rec-card" onClick={() => handleNodeClick(rec)}>
                          <div className="rec-image" style={{ backgroundImage: `url(${rec.image})` }}></div>
                          <div className="rec-info"><h4>{rec.city || rec.label}</h4><span>{rec.state}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={resetJourney} className="btn primary-btn" style={{ marginTop: '3rem' }}>
                    <RefreshCcw size={18} /> Plan New Journey
                  </button>
                </div>
              </div>
            ) : (
              <div className="node-display fade-in">
                {/* SPECIAL CASE: HOME VIEW (ROOT) */}
                {currentNode.id === 'dekho-india' ? (
                  <div className="refined-home">
                    {/* Decorative Background Elements */}
                    <div className="home-decoration">
                      <motion.div
                        className="float-circle circle-1"
                        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />
                      <motion.div
                        className="float-circle circle-2"
                        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                      />
                    </div>

                    {/* Hero Branding */}
                    <div className="home-hero">
                      <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <h1 className="hero-heading">
                          Explore the India <br />
                          <span>Wide Range Of Tours</span>
                        </h1>
                        <p className="hero-subheading">Less planning. 1,00,000 trips are ready for you.</p>

                        <div className="hero-pill-cards">
                          {currentNode.children.map((child, idx) => (
                            <motion.div
                              key={child.id}
                              className="pill-card"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleNodeClick(child)}
                            >
                              <div className="pill-img-circle">
                                <img src={child.image || "/src/assets/backpacke.jpg"} alt={child.label} />
                              </div>
                              <div className="pill-info">
                                <strong>{child.label}</strong>
                                <span>{child.children?.length || 0} Discovery Nodes</span>
                                <ArrowRight size={14} />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        className="hero-image-wrap"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                      >
                        <img src={heartOfIndiaImages.hero} alt="Discovery Visual" className="hero-main-img" />
                        <div className="hero-gradient-overlay"></div>
                      </motion.div>
                    </div>

                    {/* Bottom Gallery Section */}
                    {/* India Showreel Section */}
                    <div className="india-showreel">
                      {[
                        {
                          num: 1,
                          id: '101',
                          title: 'Discover Heritage',
                          desc: 'Experience the heart of Bharat',
                          accent: 'Heritage'
                        },
                        {
                          num: 2,
                          id: '202',
                          title: 'Discover Culture',
                          img: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=1200',
                          desc: 'A vibrant tapestry of local festivals, classical arts, and timeless traditions. From the rhythmic Kathak in the North to the spiritual Carnatic scales of the South.',
                          is3D: true,
                          accent: 'Culture'
                        },
                        {
                          num: 3,
                          id: '303',
                          title: 'How to Navigate',
                          isGuide: true,
                          accent: 'Platform Guide'
                        }
                      ].map((item) => (
                        <motion.div
                          key={`india-${item.id}`}
                          className={`showreel-card card-${item.num} ${item.is3D ? 'perspective-card' : ''}`}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + (item.num * 0.2),
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          whileHover={{ y: -20, scale: 1.02, rotateY: item.is3D ? 10 : 0 }}
                        >
                          <img src={item.img || `/src/assets/india${item.num}.jpg`} alt={item.title} />
                          <div className="showreel-overlay">
                            {item.is3D && <div className="floating-culture-badge">Vibrant Bharat</div>}
                            <span className="showreel-number">India {item.id}</span>
                            <div className="showreel-info">
                              <span className="showreel-accent">{item.accent}</span>
                              <h4>{item.title}</h4>

                              {item.isGuide ? (
                                <ul className="showreel-guide-list">
                                  <li><span>01</span> Click <strong>Division Pills</strong> to descend the tree.</li>
                                  <li><span>02</span> Use <strong>Status Bar</strong> to track DFS search depth.</li>
                                  <li><span>03</span> Click <strong>Book Now</strong> to secure your local guide.</li>
                                  <li><span>04</span> Use <strong>Back Button</strong> to return to previous nodes.</li>
                                </ul>
                              ) : (
                                <p>{item.desc}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="discovery-explorer">
                    {/* DSA Traversal Context - New Premium Status Bar */}
                    <motion.div
                      className="dsa-status-bar"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      <div className="status-segment">
                        <span className="status-label">CURRENT_DEPTH:</span>
                        <span className="status-value">{breadcrumbs.length}</span>
                      </div>
                      <div className="status-segment">
                        <span className="status-label">SEARCH_ALGO:</span>
                        <span className="status-value">DFS_N_ARY</span>
                      </div>
                      <div className="status-segment">
                        <span className="status-label">NODES_DISCOVERED:</span>
                        <span className="status-value">{currentNode.children?.length || 0}</span>
                      </div>
                    </motion.div>

                    {/* DIVISION VIEW: Check if we are at Level 1 (Children of Root) */}
                    {breadcrumbs.length === 2 ? (
                      <div className="division-view">
                        <div className="division-header">
                          <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="division-label"
                          >
                            {currentNode.label}
                          </motion.h2>
                          <p className="division-desc">{currentNode.description}</p>
                        </div>

                        <div className="division-featured-grid">
                          {currentNode.children.map((child, idx) => (
                            <motion.div
                              key={child.id}
                              className="division-card-large"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => handleNodeClick(child)}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="card-image-box">
                                <img src={child.image || "/src/assets/backpacke.jpg"} alt={child.label || child.city} />
                                <div className="card-overlay-gradient"></div>
                              </div>
                              <div className="card-text-overlay">
                                <span className="card-category-tag">{child.state || "Discovery Node"}</span>
                                <h3>{child.label || child.city}</h3>
                                <p>{child.description?.substring(0, 100)}...</p>
                                <div className="card-link">Explore <ArrowRight size={16} /></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="hero-section">
                          {currentNode.image && (
                            <div className="result-hero-image" style={{ height: '300px', marginBottom: '2rem' }}>
                              <img src={currentNode.image} alt={currentNode.label} style={{ objectFit: 'cover' }} />
                            </div>
                          )}
                          <h2>{currentNode.label}</h2>
                          <p>{currentNode.description}</p>
                        </div>
                        <div className="decision-grid">
                          {currentNode.children.map((child) => (
                            <div key={child.id} onClick={() => handleNodeClick(child)} className="card" style={{ backgroundImage: child.image ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url(${child.image})` : 'none' }}>
                              <div className="card-content">
                                <h3>{child.label || child.city}</h3>
                                <p>{child.description}</p>
                              </div>
                              <div className="card-action"><ArrowRight size={20} /></div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <DsaDashboard
        currentPath={breadcrumbs || []}
        currentNode={currentNode}
        onNodeClick={handleNodeClick}
      />

      <footer className="app-footer">
        <p>&copy; 2026 DEKHO BHARAT • Discover the Spirit of Bharat</p>
      </footer>

      <AnimatePresence>
        {showIndex && (
          <motion.div className="global-index-overlay" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <div className="index-container glass-panel">
              <div className="index-header"><h3>DESTINATION_INDEX</h3><button onClick={() => setShowIndex(false)}>×</button></div>
              <div className="index-list">
                {getAllDestinations().map(dest => (
                  <div key={dest.id} className="index-item" onClick={() => handleNodeClick(dest)}>
                    <span>{dest.city}</span><ArrowRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
