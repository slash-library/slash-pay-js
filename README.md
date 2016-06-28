# Slash Pay Js
A client-side javascript library to access Slash endpoints that designed for tokenize card number, and others.

##Update Notes

- Update API endpoint url
- Update readme

##What is Slash.Us?

One API to grow your business
Consume all your digital services with one smart API router.

##Installation

You can easily add a script link to the library file or the cdn url to your website without any dependencies. 

###Bower

`bower install slash-pay-js`

###CDN

Add this link to your website head or where you load your vendor scripts.

`<script src="https://raw.githubusercontent.com/slash-library/slash-pay-js/master/dist/slash-client.min.js" type="text/javascript"></script>`

##How to use

Create and initialize the SlashClient by passing `publicKey` to the constructor.

```javascript

var slashClient = new SlashClient({
		publicKey: 'YOUR_SLASH_PUBLIC_KEY'
});

```

##API Overview

Once you have created and passed the configuration to SlashClient, you can access Slash endpoint from that object, `slashClient`.

```javascript

// Create card token by passing card and card holder information
slashClient.tokenize({
  "first_name": "CARD_HOLDER_FIRST_NAME", 
	"last_name": "CARD_HOLDER_LAST_NAME", 
	"cc_no": "CREDIT_CARD_NUMBER", 
	"cvv": "SECURITY_CODE", 
	"expiry_month": "EXPIRY_MONTH", 
	"expiry_year": "EXPIRY_YEAR"
}, function (success){
	console.info('Slash Tokenize Result:');
	// Success tokenizing card...
	// Your codes...
}, function (error){
	console.info('Slash Tokenize Error:');
	// Error tokenizing card...
	// Your codes...
});

```

###Methods

###Configuration

##Development

##Author

Slash.Us (c) 2016
