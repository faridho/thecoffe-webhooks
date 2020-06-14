'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    request = require('request');

app.get("/", (req, res) => {
    res.send("Deployed!");
});

app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }

});

app.get('/webhook', (req, res) => {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === process.env.VERIFICATION_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

function handleMessage(sender_psid, received_message) {
    let
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Welcome to best Korean Resraurant",
                        "subtitle": "Fresh, Organic & Delicious",
                        "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592147855/KOREAN/CARD/cafe-984275_640.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Select Menu",
                                "payload": "menu",
                            },
                            {
                                "type": "postback",
                                "title": "Check Wallet",
                                "payload": "wallet",
                            }
                        ],
                    }]
                }
            }
        }


    callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'menu') {
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Humbergur",
                        "subtitle": "Price: S 40K, M 45K, L 50K",
                        "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592148833/KOREAN/CARD/hamburger-494706_640.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Pick",
                                "payload": "pick",
                            }
                        ],
                    },
                    {
                        "title": "Pizza",
                        "subtitle": "Price: S 40K, M 45K, L 50K",
                        "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592148832/KOREAN/CARD/pizza-2068272_640.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Pick",
                                "payload": "pick",
                            }
                        ],
                    }]
                }
            }
        }
    } else if (payload === 'wallet') {
        response = { "text": "Will soon" }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
