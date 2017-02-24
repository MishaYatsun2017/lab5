/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var fs = require('fs');
var ejs = require('ejs');

exports.getPizzaCard = function(req, res) {
	
	var pizzaCard = req.query.pizzaCard;
	
	var html = ""
	
    var pizzaCardItem = ejs.compile(fs.readFileSync('./Backend/views/PizzaCart_OneItem.ejs', "utf8"));
	
	if(!pizzaCard){
		res.send({html: 'Пусто в холодильнику? Замовте піцу!'});
	} 
	
	pizzaCard.forEach(function(item){
		html += pizzaCardItem({pizza: item});
	});
	res.send({html: html});
	
}

exports.getPizzaList = function(req, res) {
	
	var filter = req.query.filter;
	
	var pizzas = Pizza_List.slice();
	
	if(filter){
		pizzas = pizzas.filter(function (item) {
			if(filter === 'pineapple' || filter === 'mushroom'){
				return item.content[filter];
			}
			return item.type == filter;
		});
	}
	
	var html = ""
	
    var pizzaItem = ejs.compile(fs.readFileSync('./Backend/views/PizzaMenu_OneItem.ejs', "utf8"));
	pizzas.forEach(function(item){
		
		html += pizzaItem({pizza: item});
	});
	res.send({html: html, pizzaList:pizzas});
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};

exports.getLiqPayment = function(req, res) {
	//var LiqPay = require('liqpay');
	var crypto = require('crypto');
	
	var public_key = '';
	var private_key = '';
	
	//var liqpay = new LiqPay(public_key, private_key);
	
	var html = cnb_form({
	'action'         : 'pay',
	'amount'         : '1',
	'currency'       : 'USD',
	'description'    : 'description text',
	'order_id'       : 'order_id_1',
	'version'        : '3'
	});
	
	function str_to_sign(str){
		var sha1 = crypto.createHash('sha1');
			sha1.update(str);
		return sha1.digest('base64');			
	};
	
	function cnb_form(params){

		var language = "ru";
		if(params.language)
			language = params.language;

		params.public_key = public_key;	
		
		var data = new Buffer(JSON.stringify(params)).toString('base64');
		var signature = str_to_sign(private_key + data + private_key);

		return '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8">' +
	                '<input type="hidden" name="data" value="'+data+'" />' +
	                '<input type="hidden" name="signature" value="'+signature+'" />' +                
	                '<input type="image" src="//static.liqpay.com/buttons/p1'+language+'.radius.png" name="btn_text" />' +
	            '</form>';

	};
	
	
    res.send(html);
};
