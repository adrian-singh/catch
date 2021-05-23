let counter = 0
let bat_x = 0
let ball_y = 0
let ball_x = 0
let score = 0
let game_over = 0
let difficulty = 10000
let level = 1
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        game_over = 0
        basic.clearScreen()
        score = 0
        ball_x = randint(0, 4)
        ball_y = 0
        bat_x = 2
        led.plot(ball_x, ball_y)
        led.plot(bat_x, 4)
        counter = difficulty
        while (score != 5 && game_over != 1) {
            if (input.buttonIsPressed(Button.A) && bat_x != 0) {
                led.unplot(bat_x, 4)
                bat_x += -1
                led.plot(bat_x, 4)
                basic.pause(200)
            }
            if (input.buttonIsPressed(Button.B) && bat_x != 4) {
                led.unplot(bat_x, 4)
                bat_x += 1
                led.plot(bat_x, 4)
                basic.pause(200)
            }
            counter += -1
            if (counter == 0) {
                led.unplot(ball_x, ball_y)
                ball_y += 1
                led.plot(ball_x, ball_y)
                counter = difficulty
            }
            if (ball_y > 4) {
                game_over = 1
                basic.showString("L:" + ("" + level))
            }
            if (ball_y == 4 && ball_x == bat_x) {
                score += 1
                for (let index = 0; index < 5; index++) {
                    led.unplot(ball_x, ball_y)
                    basic.pause(50)
                    led.plot(ball_x, ball_y)
                    basic.pause(50)
                }
                ball_y = 0
                ball_x = randint(0, 4)
                led.plot(ball_x, ball_y)
            }
        }
        if (game_over == 0) {
            images.iconImage(IconNames.Heart).showImage(0)
            difficulty += -1000
            level += 1
        } else {
            difficulty = 10000
            level = 1
        }
    }
})
