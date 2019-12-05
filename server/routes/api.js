const express = require('express')
const router = express.Router()

const Transaction = require('../model/Transaction')

router.get('/sort_transactions_by_amount', function(req, res){
    Transaction.find({}).sort({amount: 1}).exec(function(err, transactions) { res.send(transactions) });
})

router.get('/sort_transactions_by_date', function(req, res){
    Transaction.find({}).sort({date: 1}).exec(function(err, transactions) { res.send(transactions) });
})

router.get('/sort_transactions_by_vendor', function(req, res){
    Transaction.find({}).sort({vendor: 1}).exec(function(err, transactions) { res.send(transactions) });
})

router.get('/sort_transactions_by_category', function(req, res){
    Transaction.find({}).sort({category: 1}).exec(function(err, transactions) { res.send(transactions) });
})

router.get('/transactions_by_category', function(req, res){
    Transaction.aggregate([
        {$group:{_id: "$category", amount: {$sum: "$amount", month: {$month: '$date'}}}},{$match: {month: 11}}
    ], function (err, transactions) {
                res.send(transactions)
            }
      )

    // Transaction.aggregate([
    //     {$group:{_id: "$category", amount: {$sum: "$amount"}}}
    // ], function (err, transactions) {
    //             res.send(transactions)
    //         })
})

router.get('/transactions', function(req, res){
    Transaction.find({}, function (err, transactions) {
        res.send(transactions)
    })
})

router.post('/transaction', function(req, res){
    let transactionData = req.body    
    let transaction = new Transaction(transactionData)
    transaction.save()
    res.send(transaction)
})

router.delete('/transaction', function(req, res){
    id = req.body.id    
    Transaction.deleteOne({ _id: id }, function(err, transaction){
        res.send(`Transaction: ${id} was deleted`)
    });

})

module.exports = router