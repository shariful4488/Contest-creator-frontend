import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2'; // ইনস্টল না থাকলে: npm i sweetalert2

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        
        if (email) {
            // রিকোয়ারমেন্ট অনুযায়ী এখানে ডাটাবেসে সেভ করার লজিক হবে
            Swal.fire({
                title: 'Success!',
                text: 'Thank you for subscribing to our newsletter.',
                icon: 'success',
                confirmButtonColor: '#3b82f6', // আপনার প্রাইমারি কালার
                confirmButtonText: 'Great!'
            });
            e.target.reset();
        }
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] bg-secondary p-8 md:p-16">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="text-center lg:text-left lg:max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase leading-tight mb-6">
                            Never Miss a <br />
                            <span className="text-primary italic">Creative Contest</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                            Subscribe to our newsletter and get the latest contest updates, winning tips, and creator spotlights directly in your inbox.
                        </p>
                    </div>

                    {/* Subscription Form */}
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubscribe} className="relative group">
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full bg-white/5 border border-white/10 py-5 px-8 rounded-2xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                className="mt-4 md:mt-0 md:absolute md:right-2 md:top-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 w-full md:w-auto"
                            >
                                Join Now <FaPaperPlane className="text-sm" />
                            </button>
                        </form>
                        <p className="text-slate-500 text-xs mt-4 text-center lg:text-left font-bold uppercase tracking-tighter">
                            * We respect your privacy. No spam, only inspiration.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;