const e = e => document.querySelector(e),
      E = e => document.querySelectorAll(e);

Object.prototype.toggleClass = function() { arguments[0].split(' ').forEach(arg => this.classList.toggle(arg)) }
Object.prototype.pad = function(x = 2) { return (Array(x).join('0') + this).substr(-x) }
Object.prototype.show = function(d = '') { this.style.display = d }
Object.prototype.hide = function() { this.style.display = 'none' }
Object.prototype.addLink = function(url, name) {
    this.innerHTML += `<li>
                            <span class="edit material-icons" onclick="Modal.edit(this)">edit</span>
                            <a href="${url}">${name}</a>
                        </li>`
}

const Modal = {
    modal      : e('#modal'),
    content    : e('#new-link'),
    linkName   : e('#link-name'),
    linkUrl    : e('#link-url'),
    submit     : e('#submit'),
    deleteBtn  : e('#delete-btn'),
    form       : e('#modal form'),
    forecast   : e('#forecast'),

    get show() {
        this.modal.show('block');
        this.linkName.focus();
    },

    isEmpty : function(s) { return (s.length == 0 || !s.trim()) },

    new : function(button) {
        let list  = button.parentElement.childNodes[3],
            id    = button.parentElement.dataset.id,
            links = JSON.parse(localStorage.links);

        this.content.style.width = '600px';
        this.show;

        this.submit.onclick = () => {
            let name = this.linkName.value,
                url  = this.linkUrl.value;      

            if( !(this.isEmpty(name) && this.isEmpty(url)) ) {
                list.addLink(url, name);
                links.push({"list": id, "name": name, "url": url});
                localStorage.links = JSON.stringify(links);
            }
            modal.hide();
            this.linkName.value = this.linkUrl.value = '';              
        }
    },

    edit : function(span) {
        let list = span.parentElement.parentElement.parentElement,
            li = span.parentElement,
            a  = li.lastElementChild,
            id = list.dataset.id,
            links = JSON.parse(localStorage.links),
            spanList = Array.prototype.slice.call( E(`[data-id="${id}"] .edit`) ),
            index = spanList.indexOf(span),
            i = 0;

        this.content.style.width = '600px';
        this.deleteBtn.show();
        this.linkName.value = a.innerHTML;
        this.linkUrl.value = a.getAttribute('href');
        this.show;

        this.submit.onclick = () => {
            let name = this.linkName.value,
                url  = this.linkUrl.value;

            for(let link of links) {
                if(link.list == id && i == index) {
                    link.name = name;
                    link.url  = url;
                    break;
                }
                i++;
            }

            li.lastElementChild.innerHTML = name;
            li.lastElementChild.setAttribute('href', url);
            localStorage.links = JSON.stringify(links);
            this.linkName.value = this.linkUrl.value = '';
            modal.hide();
        }

        this.deleteBtn.onclick = () => {
            for(let link of links) {
                if(link.list == id && i == index) {
                    let throwaway = links.splice(i, 1);
                    break;
                }
                i++;
            }

            localStorage.links = JSON.stringify(links);
            span.parentElement.remove();
            modal.hide();
        }
    },

    weather : function() {
        e('#new-link').style.width = '1200px';
        this.form.hide();
        this.forecast.show();
        this.show;
    }
}

window.onclick = event => {
    if(event.target == e('#modal')) {
        e('#modal').hide();
        e('#delete-btn').hide();
        e('#forecast').hide();
        e('#modal form').show();
    }
}

E('section > button').forEach(button => 
    button.onclick = () => Modal.new(button))

E('#new-link input').forEach(input => {
    input.onkeyup = event => {
        if(event.key == 'Enter') 
            e('#submit').click();
    }
})

E('.edit').forEach(span =>
    span.onclick = () => Modal.edit(span))

// theme navigation
e('#next').onclick = () => t.next;
e('#prev').onclick = () => t.prev;

////////////////////////////////////////////////////////////////////////////

if(localStorage.links == undefined) 
    localStorage.links = JSON.stringify([]);

// links initialize
JSON.parse(localStorage.links).forEach(link => 
    e(`[data-id="${link.list}"] ul`).addLink(link.url, link.name))

var w = new Weather('07470');
var k = new Keybind();
var t = new Theme(false, 13);

w.display;
k.default;
t.display;