class Weather {
    constructor(z) {
        this.zip = z;
    }

    get display() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&units=imperial&appid=914d3fc4b583ee9d0d8567eb5be08d4c`)
            .then(res => res.json())
            .then(data => {
                let weather = data.weather[0],
                    icon = this.getIcon(weather.icon, weather.id),
                    temp = Math.floor(data.main.temp) + '&deg';

                e('#weather > .wi').classList.add(icon);
                e('#weather > span').innerHTML = weather.main;
                e('#weather > p').innerHTML = temp;
                e('#weather').style.opacity = '1';
            })
            .catch(error => e('#weather > p').innerHTML = 'error')
    }

    getIcon(icon, id) {
        icon = icon[icon.length - 1];
        return icon == 'd' ? `wi-owm-day-${id}` : `wi-owm-night-${id}`;
    }
}