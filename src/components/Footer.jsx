import { Link } from "react-router"; 
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-secondary text-slate-400 pt-20 pb-10 font-outfit">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* 1. Brand & Description */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">
                        Contest<span className="text-primary font-extrabold">Hub</span>
                    </h2>
                    <p className="text-sm leading-relaxed font-medium">
                        The ultimate platform for creators and innovators. Compete in world-class contests, showcase your expertise, and win prestigious rewards.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: <FaFacebookF />, label: "Facebook" },
                            { icon: <FaTwitter />, label: "Twitter" },
                            { icon: <FaInstagram />, label: "Instagram" },
                            { icon: <FaGithub />, label: "Github" }
                        ].map((social, index) => (
                            <a 
                                key={index}
                                href="#" 
                                aria-label={social.label}
                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary hover:-translate-y-1 transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. Quick Links (Explore Area) */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] border-l-2 border-primary pl-3">Explore Area</h4>
                    <ul className="space-y-4 text-sm font-semibold">
                        <li><Link to="/" className="hover:text-primary transition-colors flex items-center gap-2"><span>›</span> Home Arena</Link></li>
                        <li><Link to="/all-contests" className="hover:text-primary transition-colors flex items-center gap-2"><span>›</span> All Contests</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2"><span>›</span> Our Story</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><span>›</span> Contact Support</Link></li>
                    </ul>
                </div>

                {/* 3. Contact Info (New Section for Professionalism) */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] border-l-2 border-primary pl-3">Contact Us</h4>
                    <ul className="space-y-4 text-sm font-semibold">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="mt-1 text-primary" />
                            <span>123 Innovation St,<br />Sylhet, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-primary" />
                            <span>support@contesthub.com</span>
                        </li>
                    </ul>
                </div>

                {/* 4. Newsletter/Updates */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] border-l-2 border-primary pl-3">Get Updates</h4>
                    <p className="text-xs mb-4 font-medium leading-relaxed">Subscribe to get notified about new contests and winning tips.</p>
                    <form className="relative group">
                        <input 
                            type="email" 
                            required
                            placeholder="Your email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                        <button 
                            type="submit"
                            className="absolute right-2 top-2 bg-primary text-secondary text-[10px] font-black px-4 py-2 rounded-lg uppercase hover:scale-105 active:scale-95 transition-all"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} <span className="text-white">ContestHub Global</span>. Created by <span className="text-primary italic underline">ItNabil</span>
                </p>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;