import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Message Sent");
    };

    return (
        <div className="font-outfit bg-base-100 min-h-screen">
            {/* Header Section */}
            <section className="py-20 bg-secondary relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                        Get In <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-slate-300 mt-4 max-w-xl mx-auto">
                        Have questions about a contest or need technical support? We're here to help you 24/7.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                <FaPhoneAlt />
                            </div>
                            <h4 className="text-xl font-bold text-secondary">Call Us</h4>
                            <p className="text-slate-500 mt-1">+880 1234 567 890</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                <FaEnvelope />
                            </div>
                            <h4 className="text-xl font-bold text-secondary">Email Us</h4>
                            <p className="text-slate-500 mt-1">support@contestpro.com</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                <FaMapMarkerAlt />
                            </div>
                            <h4 className="text-xl font-bold text-secondary">Visit Us</h4>
                            <p className="text-slate-500 mt-1">123 Talent Street, Dhaka, BD</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-bold text-slate-700">Your Name</label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold text-slate-700">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-slate-700">Subject</label>
                                <input type="text" placeholder="How can we help?" className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-slate-700">Message</label>
                                <textarea className="textarea textarea-bordered rounded-2xl h-40 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Write your message here..." required></textarea>
                            </div>
                            <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-black uppercase italic tracking-widest text-lg shadow-lg shadow-primary/30">
                                Send Message <FaPaperPlane className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto h-[400px] rounded-[3rem] overflow-hidden shadow-inner border-4 border-white shadow-xl">
                    <iframe 
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.953388867!2d90.3372881180292!3d23.780620650379664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa5694540406d0!2sDhaka!5e0!3m2!1sen!2sbd!4v1715456789012!5m2!1sen!2sbd" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;