const welcome = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Welcome to the best Korean Restaurant",
                "subtitle": "Please tap button below to select menus",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592231983/KOREAN%20RESTAURANT/Welcome.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Select Menu",
                        "payload": "menu",
                    }
                ],
            }]
        }
    }
}

const orderAgain = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "SIAP!😊",
                "subtitle": "Please tap button below to another choices",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Select Menu",
                        "payload": "menu",
                    },
                    {
                        "type": "postback",
                        "title": "ORDER",
                        "payload": "order",
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
                "title": "Bulgogi",
                "subtitle": "Price: IDR 45.000",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592231892/KOREAN%20RESTAURANT/Bulgogi.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Pick",
                        "payload": "Bulgogi",
                    }
                ],
            },
            {
                "title": "Samgyetang",
                "subtitle": "Price: IDR 55.000",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592231889/KOREAN%20RESTAURANT/Samgyetang.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Pick",
                        "payload": "Samgyetang",
                    }
                ],
            },
            {
                "title": "Kimchi",
                "subtitle": "Price: IDR 30.000",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592231890/KOREAN%20RESTAURANT/Kimchi.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Pick",
                        "payload": "Kimchi",
                    }
                ],
            },
            {
                "title": "Bibimpab",
                "subtitle": "Price: IDR 42.000",
                "image_url": "https://res.cloudinary.com/duzt2dvg6/image/upload/v1592231890/KOREAN%20RESTAURANT/Bibimbap.jpg",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Pick",
                        "payload": "Bibimpab",
                    }
                ],
            }]
        }
    }
}

module.exports = { welcome, menu, orderAgain }