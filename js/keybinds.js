class Keybind {
    constructor() {}

    get default() {
        E('section').forEach(sec => 
            sec.onclick = event => this.setActive(event.target))

        document.onkeyup = event => {
            const k = event.key;

            if(!(e('input') == document.activeElement)) {
                if(k === 's') 
                    e('input').focus() 
                else if(k === 'ArrowLeft')
                    t.prev;
                else if(k === 'ArrowRight') 
                    t.next;
                else if(parseInt(k) < 5) 
                    this.setActive( e(`[data-id="${k}"]`) );
                else if( e('.active') ) {
                    let links = E('.active a');

                    switch(k) {
                        case 'q':
                            links[0].click();
                            break;
                        case 'w':
                            links[1].click();
                            break;
                        case 'e':
                            links[2].click();
                            break;
                        case 'r':
                            links[3].click();
                            break;
                        case 't':
                            links[4].click();
                            break;
                        case 'y':
                            links[5].click();
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    setActive(section) {
        if(section.tagName != "SECTION") 
            return;

        if(section.classList.contains('open')) {
            E('section:not(.active)').forEach(sec => sec.classList.remove('active'));
            section.classList.remove('open', 'active');
        } else {
            E('section').forEach(sec => sec.classList.remove('active'));
            section.classList.add('open', 'active');
        }
    }
}