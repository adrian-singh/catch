counter = 0
bat_x = 0
ball_y = 0
ball_x = 0
score = 0
game_over = 0
difficulty = 10000
level = 1

def on_forever():
    global game_over, score, ball_x, ball_y, bat_x, counter, difficulty, level
    if input.button_is_pressed(Button.AB):
        game_over = 0
        basic.clear_screen()
        score = 0
        ball_x = randint(0, 4)
        ball_y = 0
        bat_x = 2
        led.plot(ball_x, ball_y)
        led.plot(bat_x, 4)
        counter = difficulty
        while score != 5 and game_over != 1:
            if input.button_is_pressed(Button.A) and bat_x != 0:
                led.unplot(bat_x, 4)
                bat_x += -1
                led.plot(bat_x, 4)
                basic.pause(200)
            if input.button_is_pressed(Button.B) and bat_x != 4:
                led.unplot(bat_x, 4)
                bat_x += 1
                led.plot(bat_x, 4)
                basic.pause(200)
            counter += -1
            if counter == 0:
                led.unplot(ball_x, ball_y)
                ball_y += 1
                led.plot(ball_x, ball_y)
                counter = difficulty
            if ball_y > 4:
                game_over = 1
                basic.show_string("L:" + str(level))
            if ball_y == 4 and ball_x == bat_x:
                score += 1
                for index in range(5):
                    led.unplot(ball_x, ball_y)
                    basic.pause(50)
                    led.plot(ball_x, ball_y)
                    basic.pause(50)
                ball_y = 0
                ball_x = randint(0, 4)
                led.plot(ball_x, ball_y)
        if game_over == 0:
            images.icon_image(IconNames.HEART).show_image(0)
            difficulty += -1000
            level += 1
        else:
            difficulty = 10000
            level = 1
basic.forever(on_forever)
