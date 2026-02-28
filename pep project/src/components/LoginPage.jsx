import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Facebook, Twitter, Instagram, Github, Chrome, Linkedin } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const assetImages = [
        "/src/assets/Bir%20Billing.jpg",
        "/src/assets/rameshwerm.jpg",
        "/src/assets/senturies.jpg",
        "/src/assets/leh.jpg",
        "/src/assets/Spity.jpg",
        "/src/assets/Andaman.jpg",
        "/src/assets/Havelock.jpg",
        "/src/assets/gulmarg.jpg",
        "/src/assets/living%20jungle.jpg"
    ];

    const [randomHero, setRandomHero] = useState(assetImages[Math.floor(Math.random() * assetImages.length)]);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? '/api/login' : '/api/signup';

        try {
            const response = await fetch(`http://127.0.0.1:4000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                onLogin(data.user);
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Connection to backend failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-v2-wrapper">
            <div className="v2-background">
                <div className="v2-split-bg"></div>
            </div>

            <motion.div
                className="v2-card-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="v2-card">
                    {/* LEFT SIDE: IMAGE & QUOTE */}
                    <div className="v2-left">
                        <div className="v2-overlay"></div>
                        <img src={randomHero} alt="Travel" className="v2-hero-img" />
                        <div className="v2-left-content">
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="v2-quote"
                            >
                                TRAVEL IS THE ONLY THING <br />
                                YOU BUY THAT MAKES YOU <br />
                                RICHER
                            </motion.p>
                            <div className="v2-left-socials">
                                <Facebook size={18} />
                                <Twitter size={18} />
                                <Instagram size={18} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: AUTH FORM */}
                    <div className="v2-right">
                        <div className="v2-right-content">
                            <div className="v2-brand-frame">
                                <span className="frame-bracket">[</span>
                                <h2>DEKHO BHARAT</h2>
                                <span className="frame-bracket">]</span>
                            </div>

                            <div className="v2-social-auth">
                                <div className="v2-social-circle"><Facebook size={16} /></div>
                                <div className="v2-social-circle"><Chrome size={16} /></div>
                                <div className="v2-social-circle"><Linkedin size={16} /></div>
                            </div>

                            <p className="v2-sub-text">or use your email account</p>

                            <form onSubmit={handleSubmit} className="v2-form">
                                {!isLogin && (
                                    <div className="v2-input-group">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <User size={16} />
                                    </div>
                                )}
                                <div className="v2-input-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Mail size={16} />
                                </div>
                                <div className="v2-input-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <Lock size={16} />
                                </div>

                                {error && <div className="v2-error">⚠️ {error}</div>}

                                <div className="v2-form-footer">
                                    <button type="button" className="v2-forgot">Forgot Your Password?</button>
                                </div>

                                <button type="submit" className="v2-enter-btn" disabled={loading}>
                                    {loading ? 'WAITING...' : (isLogin ? 'ENTER' : 'SIGN UP')}
                                </button>

                                <div className="v2-toggle-auth">
                                    <p>
                                        {isLogin ? "Need an account? " : "Already have an account? "}
                                        <span onClick={() => setIsLogin(!isLogin)}>
                                            {isLogin ? 'Register' : 'Login'}
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
