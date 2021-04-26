import payment from '../models/payment_model';
import Payment from '../models/payment_model';

export async function getPayment(req, res){
    try {
        const payments = await Payment.findAll();
        res.json({
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function getOnePayment(req, res){
    const { id } = req.params;
    try {
        const payment = await Payment.findOne({
            where: {
                payment_id: id
            }
        });
        res.json({
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function create(req, res){
    const { pay_description, payment_date, pay_time, pay_status } = req.body;
    try {
        let newPayment = await Payment.create({
            pay_description,
            payment_date,
            pay_time,
            pay_status
        })
        if(newPayment){
            res.json({
                message: 'SUCCESS!!',
                data: newPayment
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function updatePayment(req, res){
    const { id } = req.params;
    const { pay_description, payment_date, pay_time, pay_status } = req.body;

    const paymentFound = await Payment.findAll({
        attributes: ['pay_description','payment_date','pay_time','pay_status'],
        where: {
            payment_id: id
        }
    });
    if(paymentFound.length > 0){
        paymentFound.forEach(async paymentFound =>{
            await Payment.update({
                pay_description,
                payment_date,
                pay_time,
                pay_status
            }, {
                where: {
                    payment_id: id
                }
            });
        })
    }
    return res.json({
        message: 'payment updated succesfully'
    })
};

export async function deletePayment(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = Payment.destroy({
            where: {
                payment_id: id
            }
        });
        res.json({
            message: 'Payment deleted succesfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error
        })
    }
}