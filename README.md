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

###How to obtain your publicKey

Obtaining your publicKey can be done throught our console website <https://console.slash.us.com>.

If you do not have an Slash account yet, you could register a new Slash account at <https://console.slash.us.com/register>.

Once you have your account registered, you can login and access the Slash console dashboard and will able to see your API Keys in page **API Keys** from your left-hand side menu.

**Notes:** Before you are able to use those keys to request to Slash endpoint, you have to complete two more steps:
- Configuring vendor's API keys from **SERVICE SETTINGS** section
- Selecting the default vendor from **ROUTER** page.

####Configuring vendor's API keys

- Select your prefered vendor name from the menu (Stripe, Braintree, PayPal) (there will be many more in the future).
- Fill in your live API keys into **YOUR PRODUCTION KEYS** section
- Fill in your sandbox API keys into **YOUR SANDBOX KEYS** section
- Click **Save** to save your changes

####Selecting the default vendor

- Select Router menu from the side bar
- Select your prefered default vendor under **SELECT YOUR PAYMENT SERVICE** section
- Click **Save** to save your changes

And now, you are ready to use your API Keys!

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
}, 
// Success callback
function (success){
	console.info('Slash Tokenize Result:');
	// Success tokenizing card...
	// Your codes...
}, 
// Error callback
function (error){
	console.info('Slash Tokenize Error:');
	// Error tokenizing card...
	// Your codes...
});

```

###Security

We ensure that your card information is securely encrypted when requesting to our endpoint. We do not send a bare plain credit card number.

Once you call `slashClient.tokenize` method, we request for a public key for this request from our server to encrypt your card number information, which the encryped card number cannot be decrypted without the private key that we have generated and stored on the server.

After encrypting your card number, the library will continue request to our API endpoint `/tokenize` to tokenizing the card from the specific vender that you have specified in <https://console.slash.us.com> and responding the card token information via the success callback.

###Methods

* Card information
 - tokenize

###Configuration

You can create and pass the configuration to SlashClient by specify `publicKey` to the constructor.

```javascript

var slashClient = new SlashClient({
	publicKey: 'YOUR_SLASH_PUBLIC_KEY'
});

```

Or set the `publicKey` after the object slashClient was created.

```javascript

var slashClient = new SlashClient();
slashClient.setKey('YOUR_SLASH_PUBLIC_KEY');

```

##Development

Build the release

`gulp`

##Author

Slash.Us (c) 2016
