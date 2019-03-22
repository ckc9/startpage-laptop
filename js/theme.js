class Theme {
    constructor(r = true, t = 1) {
        this.random = r;
        this.theme = t;
    }

    get display() {
        if(this.random)
            this.rand
    }

    get setTheme() { e('#theme').setAttribute('href', `css/theme${this.theme}.css`) }

    get next() {
        this.theme == 6 ? this.theme = 1 : this.theme++;
        this.setTheme;
    }

    get prev() {
        this.theme == 1 ? this.theme = 6 : this.theme--;
        this.setTheme;
    }

    get rand() { 
        this.theme = Math.floor(Math.random() * 6) + 1;
        this.setTheme;
    }
}