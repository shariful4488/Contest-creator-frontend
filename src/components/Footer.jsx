import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-secondary text-slate-400 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">
                        Contest<span className="text-primary font-extrabold">Hub</span>
                    </h2>
                    <p className="text-sm leading-relaxed font-medium">
                        The ultimate platform for creators and innovators. Compete in world-class contests, showcase your expertise, and win prestigious rewards.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
                            <FaTwitter />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Explore Area</h4>
                    <ul className="space-y-4 text-sm font-semibold">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home Arena</Link></li>
                        <li><Link to="/all-contests" className="hover:text-primary transition-colors">All Contests</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Hot Categories</h4>
                    <ul className="space-y-4 text-sm font-semibold">
                        <li><a href="#" className="hover:text-primary transition-colors">Image Design</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Digital Marketing</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Article Writing</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Get Updates</h4>
                    <p className="text-xs mb-4 font-medium">Subscribe to get notified about new contests.</p>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-primary transition-colors"
                        />
                        <button className="absolute right-2 top-2 bg-primary text-secondary text-[10px] font-black px-3 py-1.5 rounded-lg uppercase">Join</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">
                    &copy; 2026 <span className="text-white">ContestHub Global</span>. Created by <span className="text-primary italic underline">ItNabil</span>
                </p>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;