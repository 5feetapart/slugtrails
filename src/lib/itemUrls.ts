export type Items = {
    'basketball': "/img/head/basketball.png",
    'football': "/img/head/football.png",
    'battery': "/img/body/battery.png",
    'paddle': "/img/body/paddle.png",
    'ticket': "/img/body/ticket.png",
    'skateboard': "/img/under/skateboard.png",
    'surfboard': "/img/under/surfboard.png",
}

export type ItemUrls = {
    [key in keyof Items]: string
}
