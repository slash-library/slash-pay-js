/**
 *
 * Slash client constructor
 * Parameters are:
 * - options        {object}  containing publicKey of Slash
 * @constructor
 */
var SlashClient = function (options) {
  	options = options || {};
  	this.publicKey = options.publicKey;
  	this.api = 'https://api.slash.us.com/v1/';
  	// this.api = 'https://localhost:1337/v1/';
  	// Logging
  	var getType = {};
  	if (!window.JSEncrypt || getType.toString.call(window.JSEncrypt) !== '[object Function]'){
  		console.error('JSEncrypt is not presented.');
  	}
  	if (!this.publicKey){
  		console.error('You construct Slash client without publicKey');
  	}
};

/**
 * Static method to generate uuid
 */
SlashClient.__generateUUID = function ( ) {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * Static method to encrypt card using rsa public key functions
 * Parameters:
 		{text}: text to encrypt
 		{publicKey}: key for encryption
 */
SlashClient.__encryptRSA = function (text, publicKey) {
    var crypt = new JSEncrypt();
    crypt.setPublicKey(publicKey);
    return crypt.encrypt(text);
};

/**
 * Static method for request
 * Parameters: 
 *		{options}: method, url, data, token
 *		{callback}: success callback
 *		{errorCallback}: error callback
 */
SlashClient.__request = function (options, callback, errorCallback){
	options = options || {};

	var request = new XMLHttpRequest();
	request.onreadystatechange = stateChange;

	request.open(options.method, options.url, true);
	request.setRequestHeader("Authorization","Bearer " + options.token);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(options.data || {}));

	function stateChange()
	{
		if (request.readyState == 4)
	  	{
	  		if (request.status >= 200 && request.status < 300)
	    	{
				if (callback){
					callback(JSON.parse(request.responseText));
				}
	    	}
		  	else{		    	
				if (errorCallback){
					errorCallback(JSON.parse(request.responseText));
				}
		    }
	  	}
	}
};

/**
 * Method to set publicKey for usage
 * Parameters:
 *		{key}: public key from slash endpoint
 */
SlashClient.prototype.setKey = function (key) {
  	if (this.key) {
    	console.warn('Overriding existing key.');
  	}
  	this.publicKey = key;
};

/**
 * Method for tokenize card information
 * Parameters:
 *		{params}: credit card number, first name, last name, expiry month, expiry year, cvv
 *		{callback}: success callback
 *		{errorCallback}: error callback
 */
SlashClient.prototype.tokenize = function (params, callback, errorCallback) {
	params = params || {};

  	if (!params.cc_no) {
    	return console.warn('Card number is required.');
  	}

  	var apiUrl = this.api;
  	var publicKey = this.publicKey;

  	// TODO: Check if card number is a valid card
  	// Generate UUID for this tokenize request
  	var requestUuid = SlashClient.__generateUUID();
  	// Request for server public key
  	SlashClient.__request({
  		method: 'POST',
  		url: apiUrl + 'request-keys',
  		data: {
  			id: requestUuid
  		},
  		token: publicKey
  	}, function (data){
  		if (data.result.key){
  			// Encrypt the card with key from server
  			var encryptedCard = SlashClient.__encryptRSA(params.cc_no, data.result.key);
  			// Request saving card information on the server
  			SlashClient.__request({
  				method: 'POST',
  				url: apiUrl + 'create-token',
  				data: {
  					id: requestUuid,
  					cc_no: encryptedCard,
  					first_name: params.first_name,
  					last_name: params.last_name,
  					cvv: params.cvv,
  					expiry_month: params.expiry_month,
  					expiry_year: params.expiry_year
  				},
  				token: publicKey
  			}, function (data){
  				callback(data);
  			}, function (error){
  				errorCallback('There was a problem with tokenizing the card.', error);
  			})
  		}
  		else{
  			errorCallback('There was a problem with tokenizing the card.');	
  		}
  	}, function (error){	
  		errorCallback('There was a problem with tokenizing the card.', error);
  	});

};