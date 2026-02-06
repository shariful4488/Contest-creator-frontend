import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";



const CheckoutForm = ({ contestId, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosPublic = useAxiosSecure();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosPublic.post('/create-payment-intent', { price: price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosPublic, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            Swal.fire("Error", error.message, "error");
        } else {
            // ২. পেমেন্ট কনফার্ম করা
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: { email: user?.email || 'anonymous', name: user?.displayName || 'anonymous' }
                }
            });

            if (confirmError) {
                Swal.fire("Error", confirmError.message, "error");
            } else if (paymentIntent.status === "succeeded") {
               
                const paymentInfo = {
                    contestId,
                    userEmail: user.email,
                    transactionId: paymentIntent.id,
                    price,
                    date: new Date(),
                    submissionStatus: 'Pending'
                };

                const res = await axiosPublic.post('/payments', paymentInfo);
                if (res.data.insertedId) {
                    Swal.fire("Success", "Registration Successful!", "success");
                    navigate(`/contest-details/${contestId}`); // আবার ডিটেইলস পেজে ফিরে যাবে
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 border-2 border-slate-100 rounded-3xl bg-slate-50">
                <CardElement options={{
                    style: { base: { fontSize: '18px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } } }
                }} />
            </div>
            <button 
                type="submit" 
                disabled={!stripe || !clientSecret}
                className="w-full py-5 bg-primary text-white font-black rounded-3xl uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:bg-slate-300"
            >
                Confirm Payment ${price}
            </button>
        </form>
    );
};

export default CheckoutForm;