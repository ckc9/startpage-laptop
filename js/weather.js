class Weather {
    constructor(z) { 
        this.zip = z;
        this.sunrise;
        this.sunset;
    }

    get display() {
        e('#weather').onclick = () => this.hourly;

        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&units=imperial&appid=914d3fc4b583ee9d0d8567eb5be08d4c`)
            .then(res => res.json())
            .then(data => {
                let weather = data.weather[0],
                    icon = this.getIcon(weather.icon, weather.id),
                    temp = Math.floor(data.main.temp) + '&deg',
                    rise = new Date(data.sys.sunrise * 1000),
                    set  = new Date(data.sys.sunset * 1000);

                this.sunrise = `${rise.getHours()}:${rise.getMinutes().pad()}`;
                this.sunset  = `${set.getHours()}:${set.getMinutes().pad()}`;

                e('#weather > .wi').classList.add(icon);
                e('#weather > span').innerHTML = weather.main;
                e('#weather > p').innerHTML = temp;
                e('#weather').style.opacity = '1';
            })
            .catch(error => e('#weather > p').innerHTML = 'error')
    }

    get hourly() {
        let forecast = e('#forecast');

        if( !(forecast.hasChildNodes()) ) {
            forecast.innerHTML += `<div class="suntime">
                                        <i class="wi wi-sunrise"></i>
                                        <p>sunrise</p>
                                        <p>${this.sunrise}</p>
                                   </div>
                                   <div class="suntime">
                                        <i class="wi wi-sunset"></i>
                                        <p>sunset</p>
                                        <p>${this.sunset}</p>
                                   </div>`

            fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${this.zip}&units=imperial&cnt=5&appid=914d3fc4b583ee9d0d8567eb5be08d4c`)
                .then(res => res.json())
                .then(data => {
                    data.list.forEach(list => {
                        let weather = list.weather[0],
                            desc = weather.description,
                            icon = this.getIcon(weather.icon, weather.id),
                            temp = Math.floor(list.main.temp),
                            d    = new Date(list.dt * 1000),
                            time = d.getHours();
                        
                        if(time > 12) {
                            time -= 12;
                            time += ':00 PM'
                        } else 
                            time += ':00 AM'

                        forecast.innerHTML += `<div class="weatherBlock">
                                                    <i class="wi ${icon}"></i>
                                                    <p>${temp}&deg</p>
                                                    <p>${desc}</p>
                                                    <p>${time}</p>
                                               </div>`
                    })
                })
                .catch(err => forecast.innerHTML += 'error')
        }

        Modal.weather();
    }

    getIcon(icon, id) {
        icon = icon[icon.length - 1];
        return icon == 'd' ? `wi-owm-day-${id}` : `wi-owm-night-${id}`;
    }
}