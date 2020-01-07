const express = require('express')
const router = express.Router()

const Transaction = require('../model/Transaction')


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