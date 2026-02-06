import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {
    const { id } = useParams(); 
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // কন্টেস্টের ডিটেইলস নিয়ে আসা
    const { isLoading, data: contest, isError } = useQuery({
        queryKey: ['contest-payment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        if (!contest) return;

        const paymentInfo = {
            cost: contest.contestPrice || contest.price, // আপনার DB অনুযায়ী ফিল্ড নেম চেক করুন
            contestId: contest._id,
            userEmail: user?.email,
            contestName: contest.contestName
        };

        try {
            // ১. সার্ভারে পেমেন্ট সেশন তৈরির রিকোয়েস্ট
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            
            if (res.data.url) {
                // ২. স্ট্রাইপ পেমেন্ট পেজে রিডাইরেক্ট করা
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error("Payment Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: 'Could not initiate payment. Please try again later.',
            });
        }
    };

    // লোডিং অবস্থা
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
        );
    }

    // এরর বা ডাটা না থাকলে
    if (isError || !contest) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <p className="text-red-500 font-bold text-xl">Contest details not found!</p>
                <button onClick={() => navigate(-1)} className="btn btn-link mt-4 text-primary">Go Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-20 font-outfit">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-white text-center">
                    <h2 className="text-4xl font-black text-secondary uppercase italic mb-2">
                        Secure <span className="text-primary">Checkout</span>
                    </h2>
                    
                    <p className="text-slate-400 font-medium mb-10 uppercase tracking-widest text-xs">
                        Please Pay <span className="text-secondary font-bold">${contest?.contestPrice || contest?.price}</span> for: {contest?.contestName}
                    </p>

                    <div className="mb-10 text-left bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500 font-semibold">User Email:</span>
                            <span className="text-secondary font-bold">{user?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 font-semibold">Contest Name:</span>
                            <span className="text-secondary font-bold">{contest?.contestName}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment} 
                        className="w-full py-5 bg-primary text-white font-black rounded-3xl uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex justify-center items-center gap-2"
                    >
                        <span>Proceed to Pay</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    
                    <p className="mt-6 text-[10px] text-slate-300 uppercase font-bold tracking-tighter">
                        Powered by Stripe • Encrypted & Secure
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payment;