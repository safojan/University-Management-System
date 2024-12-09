import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Popup from '../../components/Popup';
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux store

const FeeManagement = () => {
    // Get the current user's data from the Redux store (assumes student info is in state.user.currentUser)
    const { currentUser } = useSelector((state) => state.user);
    const [rollNum, setRollNum] = useState(currentUser ? currentUser.rollNum : '');  // Set rollNum from currentUser
    const [feeDetails, setFeeDetails] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [transactionID, setTransactionID] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [receipt, setReceipt] = useState(null);

    // Fetch Fee Details
    const fetchFeeDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fee/${rollNum}`);
            setFeeDetails(response.data.feeStructure);
            setPaymentHistory(response.data.paymentHistory);
            setMessage('Fee details fetched successfully!');
        } catch (error) {
            setMessage('Error fetching fee details. Please try again.');
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    // Handle Payment
    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/fee/payment`, {
                rollNum,
                amount,
                paymentMethod,
                transactionID,
            });
            setMessage('Payment successful!');
            setReceipt(response.data.receipt);
        } catch (error) {
            setMessage('Payment failed. Please check your details and try again.');
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    // Handle Stripe Payment
    const handleStripePayment = async (token) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/fee/stripe-payment`, {
                tokenId: token.id,
                amount,
                rollNum,
            });
            setMessage('Payment successful via Stripe!');
            setReceipt(response.data.receipt);
        } catch (error) {
            setMessage('Stripe payment failed. Please try again.');
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    // Download Receipt
    const downloadReceipt = () => {
        if (receipt) {
            const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `receipt_${transactionID || 'unknown'}.json`;
            link.click();
        }
    };

    return (
        <Container>
            <Card>
                <Form>
                    <Button
                        onClick={fetchFeeDetails}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? 'Fetching...' : 'Fetch Fee Details'}
                    </Button>
                </Form>
            </Card>

            {feeDetails && (
                <DetailsCard>
                    <h2>Fee Structure</h2>
                    <p>Tuition Fee: Rs {feeDetails.tuition}</p>
                    <p>Hostel Fee: Rs {feeDetails.hostel}</p>
                    <p>Other Fees: Rs {feeDetails.otherFees}</p>
                    <p>Total Fee: Rs {feeDetails.totalFee}</p>
                </DetailsCard>
            )}

            {paymentHistory.length > 0 && (
                <DetailsCard>
                    <h2>Payment History</h2>
                    {paymentHistory.map((payment, index) => (
                        <div key={index}>
                            <p>Amount: Rs {payment.amount}</p>
                            <p>Date: {payment.date}</p>
                        </div>
                    ))}
                </DetailsCard>
            )}

            <PaymentSection>
                <h2>Make a Payment</h2>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </Select>
                <Input
                    type="text"
                    value={transactionID}
                    onChange={(e) => setTransactionID(e.target.value)}
                    placeholder="Transaction ID"
                />
                <Button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Submit Payment'}
                </Button>

                <StripeCheckout
                    name="University Fee Payment"
                    description="Pay your fees"
                    amount={amount * 100}
                    token={handleStripePayment}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                />
            </PaymentSection>

            {receipt && (
                <Button onClick={downloadReceipt} style={{ marginTop: '1rem' }}>
                    <Download size={20} /> Download Receipt
                </Button>
            )}

            {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
        </Container>
    );
};

export default FeeManagement;


// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e2f;
    color: white;
    min-height: 100vh;
    padding: 2rem;
`;

const Card = styled(motion.div)`
    background-color: #27293d;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;
    width: 100%;
    max-width: 400px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Label = styled.label`
    font-size: 1.1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #2d2f3e;
    color: white;
    font-size: 1rem;
    outline: none;

    &:focus {
        border-color: #f39c12;
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #2d2f3e;
    color: white;
    font-size: 1rem;
`;

const Button = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    background-color: #F08080;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d35400;
    }
`;

const DetailsCard = styled.div`
    background-color: #27293d;
    padding: 1.5rem;
    border-radius: 10px;
    margin-top: 1rem;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
`;

const PaymentSection = styled.div`
    background-color: #27293d;
    padding: 1.5rem;
    border-radius: 10px;
    margin-top: 1rem;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PopupMessage = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-size: 1rem;
`;
