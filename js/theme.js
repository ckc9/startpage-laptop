class Theme {
    constructor(r = true, t = 1) {
        this.random = r;
        this.theme = t;
        this.max = 7;
    }

    get display() {
        this.random ? this.rand : this.setTheme
    }

    get setTheme() { e('#theme').setAttribute('href', `css/theme${this.theme}.css`) }

    get next() {
        this.theme == this.max ? this.theme = 1 : this.theme++;
        this.setTheme;
    }

    get prev() {
        this.theme == 1 ? this.theme = this.max : this.theme--;
        this.setTheme;
    }

    get rand() { 
        this.theme = Math.floor(Math.random() * this.max) + 1;
        this.setTheme;
    }
}