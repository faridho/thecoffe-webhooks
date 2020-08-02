const welcome = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Welcome to the bot korean fans info",
                "subtitle": "Please tap button below to select info",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1596347553/KOREAN%20RESTAURANT/tvN-Logo-South-Korea-BPO.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Select Info",
                        "payload": "menu",
                    }
                ],
            }]
        }
    }
}

const menu = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Itaewon Class - New Episode 8",
                "subtitle": "Bad news strikes DanBam, but Saeroyi isn't one to bow under pressure. Geun-soo learns a horrible truth. Kim Toni deals with discrimination.",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1596348696/KOREAN%20RESTAURANT/b9577f4070b1bb7901f893cabbeca98e.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Show Trailer",
                        "payload": "video",
                    }
                ],
            },
            {
                "title": "BTS Seoul Concert 2021",
                "subtitle": "Going into this, I didn’t know what to expect. I have known bts for a very long time and all army’s know that you should expect the unexpected from bts because they’re all amazing!!!",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1596348698/KOREAN%20RESTAURANT/04e22750296773c471546b7fd4d0f49c.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Buy Ticket",
                        "payload": "tix",
                    }
                ],
            }]
        }
    }
}

const video = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "media",
            "elements": [
                {
                    "media_type": "video",
                    "url": "https://business.facebook.com/103593567765590/videos/630146130875938/"
                }
            ]
        }
    }
}

module.exports = { welcome, menu, video }