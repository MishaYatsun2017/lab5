/**
 * Created by chaika on 09.02.16.
 */
 
var fs = require('fs');
var ejs = require('ejs'); 
 
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Оформлення замовлення',
		
    });
};

exports.pizzaPage = function(req, res) {
    res.render('pizzaPage', {
        pageTitle: 'Вибір Піци'
    });
};

