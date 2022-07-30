import { useState, useEffect } from 'react';
import './Form.css';

function Form() {

    const getData = () => {
        const data = localStorage.getItem('items')
        if (data) {
            return JSON.parse(data);
        }
        else {
            return []
        }
    }

    const [items, setItems] = useState(getData());

    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [payment, setPayment] = useState('')
    const [remark, setRemark] = useState('')

    const [error, setErrors] = useState({ date: '', amount: '', payment: '', remark: '' })

    const getFormData = (e) => {
        e.preventDefault();
        let errorCount = 0;
        if (date === '') {
            errorCount++
            setErrors((prevState) => {
                return { ...prevState, date: "Date is required" }
            })
        }
        else {
            setErrors((prevState) => {
                return { ...prevState, date: "" }
            })
        }
        if (amount.length === 0) {
            errorCount++
            setErrors((prevState) => {
                return { ...prevState, amount: "Amount is required" }
            })
        }
        else {
            setErrors((prevState) => {
                return { ...prevState, amount: "" }
            })
        }
        if (payment === '') {
            errorCount++
            setErrors((prevState) => {
                return { ...prevState, payment: "Payment mode is required" }
            })
        } else {
            setErrors((prevState) => {
                return { ...prevState, payment: "" }
            })
        }
        if (errorCount === 0) {
            let item = {
                date,
                amount,
                payment,
                remark
            }
            setItems([...items, item]);
            setDate('')
            setAmount('')
            setPayment('')
            setRemark('')

        }
    }

    const cancelFormData = (e) => {
        e.preventDefault();
        setDate('')
        setAmount('')
        setPayment('')
        setRemark('')
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(items))
    }, [items])

    return (
        <div className="container">
            <div className="form">
                <h1>Receipt Details</h1>
                <form onSubmit={getFormData}>
                    <label>Date<span>*</span></label><input type="text" placeholder="Enter Date" name='date' value={date} onChange={(e) => setDate(e.target.value)} /><br></br>{error.date && <span className='error'>{error.date}</span>}<br></br>
                    <label>Amount<span>*</span></label><input type="number" placeholder="Enter Amount(in INR)" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} /><br></br>{error.amount && <span className='error'>{error.amount}</span>}<br></br>
                    <label>Payment Mode<span>*</span></label><select name='payment' value={payment} onChange={(e) => setPayment(e.target.value)}>
                        <option>Cash</option>
                        <option>Online</option>
                        <option>Emi</option>
                    </select><br></br>{error.payment && <span className='error'>{error.payment}</span>}<br></br>
                    <label>Remark</label><input type="text" placeholder="Enter Remark" value={remark} name='remark' onChange={(e) => setRemark(e.target.value)} /><br></br>
                    <div className='buttons'><button className="cancle" type="clear" onClick={cancelFormData}>Cancel</button> <button className="submit" type="submit">Submit</button> </div>
                </form>
            </div>
            <div className='userdata'>
                <h1>Registered Receipt Details</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment Mode</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    {
                        items.map((elem, ind) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{elem.date}</td>
                                        <td>{elem.amount}</td>
                                        <td>{elem.payment}</td>
                                        <td>{elem.remark}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
}

export default Form;