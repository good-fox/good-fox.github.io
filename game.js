function game() {

    var cvs = document.getElementById('canvas');
    var ctx = cvs.getContext('2d');

    var car = new Image();
    var bg = new Image();
    var car0 = new Image();

    car.src = 'img/car.png';
    car0.src = 'img/car0.png';
    bg.src = 'img/bg.png';

    document.addEventListener('keydown', z);
    document.addEventListener('keyup', x);

    document.addEventListener('touchstart', function (e) {
        if (e.changedTouches[0].pageX != null) {
            z();
        }
    });
    document.addEventListener('touchend', function (e) {
        if (e.changedTouches[0].pageX) {
            x();
        }
    });

    function z() {
        if (carGame.x <= 65) {
            carGame.x += 100;
        }
    }

    function x() {
        carGame.x -= 100;
    }

    var carGame = {
        x: 65,
        y: cvs.height - 130,
        speed: 2,
        lvl: 0
    };

    var cars = [];
    cars.push({
        x: 65,
        y: 0 - car0.height
    });

    function draw() {
        ctx.drawImage(bg, 0, 0);

        for (var i = 0; i < cars.length; i++) {
            ctx.drawImage(car0, cars[i].x, cars[i].y);
            cars[i].y += carGame.speed;

            if (cars[i].y == 200) {
                cars.push({
                    x: 65 + Math.floor(Math.random() * 2) * 100,
                    y: 0 - car0.height
                });
            }

            if (carGame.y <= cars[i].y + car0.height &&
                carGame.y + car.height >= cars[i].y &&
                carGame.x == cars[i].x) {
                location.reload();
            }

            if (cars[i].y == cvs.height) {
                carGame.lvl++;
            }
        }

        ctx.drawImage(car, carGame.x, carGame.y);

        ctx.fillStyle = '#000';
        ctx.font = '24px Verdana';
        ctx.fillText('Рахунок: ' + carGame.lvl, 60, 60);

        var gameOwer = document.getElementById('gameText');
        gameOwer.innerHTML = 'Game lvl: ' + carGame.lvl;

        requestAnimationFrame(draw);
    }

    bg.onload = draw;

}