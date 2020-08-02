'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    request = require('request');

const resources = require('./resources');

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
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {

        if (mode === 'subscribe' && token === process.env.VERIFICATION_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            res.sendStatus(403);
        }
    }
});

function handleMessage(sender_psid, received_message) {
    let response = resources.welcome;
    callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
    let response;
    let payload = received_postback.payload;

    const postbackData = {
        'menu': resources.menu,
        'location': resources.location
        //'qty': resources.orderAgain,
        //'order': { "text": "Ask Address" }
    }

    /*if (payload === 'menu' || payload === 'qty' || payload === 'order') {
        response = postbackData[payload]
    } else {
        response = {
            "text": `Great 👍 You chosen the best menu is ${payload}. So, how many you will order?`,
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Just one",
                    "payload": "qty",
                }, {
                    "content_type": "text",
                    "title": "Maybe two",
                    "payload": "qty",
                }
            ]
        }

    }*/

    if(payload === 'menu') {
        response = postbackData[payload]
    } else {
        response = {
            "mid": "m_AG5Hz2Uq7tuwNEhXfYYKj8mJEM_QPpz5jdCK48PnKAjSdjfipqxqMvK8ma6AC8fplwlqLP_5cgXIbu7I3rBN0P",
            "attachments": [
                {
                    "title": "Facebook HQ",
                    "type": "location",
                    "payload": {
                        "coordinates": {
                            "lat": 37.483872693672,
                            "long": -122.14900441942
                        }
                    }
                }
            ]
        }
    }

    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

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

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
