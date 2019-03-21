



function remove(span) {
    let list     = span.parentElement.parentElement.parentElement,
        id       = list.dataset.id,
        links    = JSON.parse(localStorage.links),
        spanList = Array.prototype.slice.call( E(`[data-id="${id}"] span`) ),
        index    = spanList.indexOf(span),
        i        = 0;

    for(let link of links) {
        if(link.list == id && i == index) {
            let throwaway = links.splice(i, 1);
            break;
        }
        i++
    }

    localStorage.links = JSON.stringify(links);
    span.parentElement.remove();
}