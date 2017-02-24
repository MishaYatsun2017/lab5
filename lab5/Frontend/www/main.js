/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    
	var data = {	title:	'Cleaning Supplies',
					supplies:	['mop', 'broom', 'duster']	}
	
	var html = new EJS({url: 'PizzaCart_OneItem.ejs'}).render(data);
	
	$("#pizza_list").html(html);
	
});