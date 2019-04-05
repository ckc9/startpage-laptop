const searchEngines = {
        g: ['https://www.google.com/search?q=', 'google'],
        i: ['https://www.google.com/search?tbm=isch&q=', 'google images'],
        w: ['https://en.wikipedia.org/wiki/', 'wikipedia'],
        y: ['https://www.youtube.com/results?search_query=', 'youtube'],
        d: ['https://duckduckgo.com/?q=', 'duckduckgo']
},
      searchbox = e('#search'),
      shortcuts = E('#shortcuts span');
      shorcutRegex = /^-[giwyd]/;

var defaultEngine = searchEngines.g;

function search(q) {
    let url, 
        shortcut,
        query = q;

    if(shorcutRegex.test(query)) {
        shortcut = query.slice(1, 2);
        query = query.slice(2, query.length).trim();
        url = searchEngines[shortcut][0] + query;
    } else if(/.[.](com|org|net|gov|edu)/i.test(query)) 
        url = /^(http:\/\/|https:\/\/)/.test(query) ? query : 'https://' + query; // prepends "https://" so it can be a functional link
    else
        url = defaultEngine[0] + query;

    if(url) window.location.href = url;
}

searchbox.onkeyup = event => {
    let query = searchbox.value;

    if(event.key == 'Enter') search(query);

    if(shorcutRegex.test(query)) {
        let shortcut = query.slice(0, 2);
        shortcuts.forEach(span => {
            if(span.innerHTML == shortcut) {
                shortcuts.forEach(span => span.classList.remove('spanActive'));
                span.classList.add('spanActive');
            }
        })
    } else
        shortcuts.forEach(span => span.classList.remove('spanActive'));
}

shortcuts.forEach(span => {
    span.onclick = event => {
        let query = searchbox.value;

        if(shorcutRegex.test(query))
            query = query.slice(2);

        if(span.classList.contains('spanActive'))
            searchbox.value = query;
        else {
            searchbox.value = span.innerHTML + query;
            shortcuts.forEach(s => s.classList.remove('spanActive'))
        }

        span.classList.toggle('spanActive');
    }
})