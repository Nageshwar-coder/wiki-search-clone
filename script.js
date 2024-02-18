let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendResults(result) {
    // creating a link that says 'clear results'
    let {title, link, description} = result;
    // creating result Item
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);
    // creating title Element
    let titleElement = document.createElement('a');
    titleElement.href = link;
    titleElement.target = '_blank';
    titleElement.textContent = title;
    titleElement.classList.add('result-title');
    resultItemEl.appendChild(titleElement);
    // creating break Element
    let breakEl = document.createElement('br');
    resultItemEl.appendChild(breakEl);
    // creating url Element
    let urlElement = document.createElement('a');
    urlElement.href = link;
    urlElement.target = '_blank';
    urlElement.textContent = link;
    urlElement.classList.add('result-url');
    resultItemEl.appendChild(urlElement);
    // creating break Element second time
    let breakEl2 = document.createElement('br');
    resultItemEl.appendChild(breakEl2);
    // creating description Element
    let descriptionElement = document.createElement('p');
    descriptionElement.classList.add('link-description');
    descriptionElement.textContent = description;
    resultItemEl.appendChild(descriptionElement);
}

function displayResult(search_results) {
    spinnerEl.classList.toggle('d-none');
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('text-right', 'mr-2', 'pr-2');
    searchResultsEl.appendChild(buttonDiv);
    let clearResults = document.createElement('button');
    clearResults.textContent = 'clear results';
    clearResults.classList.add('btn', 'btn-primary');
    buttonDiv.appendChild(clearResults);
    clearResults.addEventListener('click', function() {
        searchResultsEl.textContent = '';
    })
    for(let result of search_results) {
        createAndAppendResults(result);
    }
}


function wikiSearch(event) {
    if(event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');
        searchResultsEl.textContent = "";
        let searchValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            let {search_results} = jsondata;
            displayResult(search_results);
        });
    }
}

searchInputEl.addEventListener('keydown', wikiSearch);