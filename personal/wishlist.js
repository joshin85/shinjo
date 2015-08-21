var com = com || {};
com.epaperflip = com.epaperflip || {};
com.epaperflip.ns = (function() {
    return {
        namespace: function() {
            var arg = arguments,
                w = null,
                i, j, f;
            for (i = 0; i < arg.length; i++) {
                f = arg[i].split(".");
                w = window;
                for (j = 0; j < f.length; j++) {
                    w[f[j]] = w[f[j]] || {};
                    w = w[f[j]]
                }
            }
            return w;
        }
    }
}());
/* Maintain the itemlist data structure  */
com.epaperflip.ns.namespace("com.epaperflip.api.wishlist");
com.epaperflip.api.wishlist.ItemList = function(cont) {
    this.idNum = 0;
    this.itemlist = [];
    this.controllerHtml5 = cont;
    this.addRow = function(number, amount) {
        if (!this.exists(number)) {
            this.add(number, amount);
        }
        cont.refresh();
    }
    this.add = function(number, amount) {
        this.itemlist.push(new com.epaperflip.api.wishlist.item(number, amount, this.idNum));
        this.idNum++;
    };
    this.exists = function(newSku) {
        for (var i = 0; i < this.itemlist.length; i++) {
            if (this.itemlist[i].getSku() === newSku) {
                this.itemlist[i].increment();
                return true;
            }
        }
        return false;
    };
}



/* Maintain and update the item list view given any table */
com.epaperflip.api.wishlist.controller = function(table) {
    this.Table = table;
    this.list = new com.epaperflip.api.wishlist.ItemList(this);
    this.setList = function(nlist) {
        this.list = nlist;
    }
    this.empty = function() {
		 this.Table.empty();
		 this.list.itemlist = [];
	}
    this.refresh = function() {
        this.Table.empty()
        for (var i = 0; i < this.list.itemlist.length; i++) {
            nrow = this.list.itemlist[i];
            createRow(nrow.getSku(), nrow.getAmount(), nrow.getId());
        }
    }
    this.refresh();
}
/* Object to store individual list item data */
com.epaperflip.api.wishlist.item = function item(nSku, nNum, nId) {
    this.amount = nNum;
    this.id = nId;
    this.sku = nSku;
    this.getSku = function() {
        return this.sku;
    };
    this.getId = function() {
        return this.id;
    };
    this.getAmount = function() {
        return this.amount;
    };
    this.increment = function() {
        this.amount++;
    };
    this.decrement = function() {
        this.amount--;
    };
    this.setAmount = function(newAmount) {
        this.amount = newAmount;
    };
};

$(document).ready(function() {
	var g_openwishlistshare = false;
	window.cont = new com.epaperflip.api.wishlist.controller($("#table-body"));
	var Item = function (sku,count){
		this.sku = sku;
		this.count = count;
	};
	/* add item to local storage */
	Item.prototype.storeItem = function() {
		localStorage.setItem(this.sku, this.count);
	};
	/* retrieve item from local storage */
	Item.prototype.getItem = function(sku) {
		this.sku = sku;
		this.count = localStorage.getItem(this.sku);
		return this.count;
	};
	/* delete item from local storege */	
	Item.prototype.removeItem = function() {
		localStorage.removeItem(this.sku);
	};
	/* open print window */
	$('#print-table').on('click', function(){
		printData();
	})
	/* add item to localstorage and update the wishlist item */
	$('#add-cart').on('click', function() {
		var skuval = $(".sku-val").text();
		var count = parseInt($("#amount").val());
		var oItem = new Item();
		var oCount = oItem.getItem(skuval);
		if(oCount == null){
			oItem.count = parseInt(count,10);
		}
		else{
			oItem.count =parseInt(oItem.count,10) + parseInt(count, 10);
		}
		oItem.storeItem();
		$.colorbox.close();
	});
		

	$('#share-wishlist').on('click', function() {
	g_openwishlistshare = true;
	$.colorbox.close();
	});
	
	/* Validate information and send email to client*/
	$('#send-wishlist').on('click', function() {
		var bErrorExists = false;
		var yourname = $('#your-name').val();
		var youremail = $('#your-email').val();
		var emailto = $('#email-to').val();
		if(!yourname){
			$("#your-name").addClass("form-has-error");
			bErrorExists = true;
		}
		else{
			$("#your-name").removeClass("form-has-error");
		}
			
		if(!validateEmail(youremail) ){
			$("#your-email").addClass("form-has-error");
			bErrorExists = true;
		}
		else{
			$("#your-email").removeClass("form-has-error");
		}
			
		if(!validateEmail(emailto)){
			$("#email-to").addClass("form-has-error");
			bErrorExists = true;
		}
		else{
			$("#email-to").removeClass("form-has-error");
		}
		if(bErrorExists)
			return;
			
		var oEmailMessage = 
		{
			CC : "",
			From : "",
			FromName: "",
			Message : "",
			Subject : "Wishlist Items",
			To : "",
			ToName : "",
			h : ""
		};

		var sMessage = '<br/>'+ AppendShippingDetails() +'<br/>' + AppendWishlistItems();
		var sMessageBase64 =  window.btoa(unescape(encodeURIComponent( sMessage )));
		oEmailMessage.Message = sMessageBase64;
		oEmailMessage.YourName = yourname;
		oEmailMessage.From = youremail;
		oEmailMessage.To = emailto;
		//Post to email server to send
		$.post( "http://www.epaperflip.com/ihdpservices/SendMail.aspx",oEmailMessage );
		$.colorbox.close();
	});

	(function($) {
		$('.wish-list .btn:first-of-type').on('click', function() {
			var inp = $(this).parent("div").parent("div").find('input');
			var num = parseInt(inp.val(), 10) + 1;
			inp.attr('value', num);
		});
		$('.wish-list .btn:last-of-type').on('click', function() {
			var inp = $(this).parent("div").parent("div").find('input');
			var num = (parseInt(inp.val()) > 0) ? parseInt(inp.val(), 10) - 1 : 0;
			   inp.attr('value', num);

		});
	})(jQuery);
  

});
 //check for illegal characters
function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}
/* generate string to be emailed to client */
function AppendShippingDetails()
{
	var yourname = $('#your-name').val();
	var youremail = $('#your-email').val();
	var emailto = $('#email-to').val();
	var emailcomments = $('#email-comment').val();
	var shippingDetails= "Your Name:";
	shippingDetails += yourname + '<br/>';
	shippingDetails += "From Email:"+ youremail+'<br/>';
	shippingDetails += "Comments:" + emailcomments+'<br/>';
	return shippingDetails;
}
/* Generate html code for the wishlist table and return*/
function AppendWishlistItems()
{
	var sWishListItems = "<table border=\"1\"><tr><th>SKU</th><th>Quantity</th></tr>";
	var nItemCount = localStorage.length;
	for(var i=0; i < nItemCount; i++)
	{
		var skuNumber = localStorage.key(i);
		var nCount = localStorage.getItem(skuNumber);
		sWishListItems+="<tr>";
		sWishListItems += '<td>'+ skuNumber + '</td>';
		sWishListItems += '<td>'+ nCount + '</td>';
		sWishListItems += "</tr>";
	}
	sWishListItems+= "</table>";
	return sWishListItems;
}

function createRow(number, amount, iid) {
	var tableRef = document.getElementById('insert-table').getElementsByTagName('tbody')[0];
	// Insert a row in the table at the last row
	var newRow = tableRef.insertRow(tableRef.rows.length);
	newRow.className = newRow.className + ' row-style';
	newRow.id = iid;
	// Insert a cell in the row at index 0
	var skuCell = newRow.insertCell(0);
	var ticker = newRow.insertCell(1);
	ticker.className = ticker.className + ' row-style';
	var deleteRow = newRow.insertCell(2);
	// Append a text node to the cell
	skuCell.innerHTML = "<div class='row-style font-style'>" + number + "</div>";
	ticker.innerHTML = '<div class="input-group spinner wish-list" ><input type="text" class="form-control" value="' + amount + '"><div class="input-group-btn-vertical dont-print"> <button class="btn btn-default " type="button"><i class="fa fa-caret-up"></i></button><button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button> </div></div>';
	deleteRow.innerHTML = '<button class="btn btn-default delete-row dont-print">X</span></button>';
}
/* Print the generated table*/ 
 function printData(){
  $(".dont-print").css("display","none"); //remove unnecessary items
   //Format table to better fit the page
  $("#insert-table").css("width","100%");
  $(".row-style").css("text-align","center");
  $(".row-style").css("padding","5px");
  var divToPrint=document.getElementById("insert-table");
  newWin= window.open("");
  newWin.document.write(divToPrint.outerHTML);
  newWin.print();
  newWin.close();
  $(".dont-print").css("display","table-cell"); //add items back to table
}

	