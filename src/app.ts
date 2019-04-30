import { from, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ResponseModel, RepositoryModel } from './models/response.model';

const searchInput = document.querySelector('.search-input');
const repoEl = document.querySelector('.list-group');
const getRepo: string = 'https://api.github.com/search/repositories';

const sequence1$ = fromEvent(searchInput, 'input');

const sequence2$: Observable<ResponseModel> = sequence1$
    .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => clearResults()),
        switchMap((event: KeyboardEvent) => request(event),

        )
    );

sequence2$.subscribe(result => showResult(result));

function clearResults() {
    if(repoEl) {
        repoEl.innerHTML = "";
    }
}

function request(event: KeyboardEvent): Observable<RepositoryModel> {
    const url: string = `${getRepo}?q=${(event.target as HTMLInputElement).value}`;
    return from(fetch(url).then(res => res.json()));
};

function showResult(response: ResponseModel) {
    if (!response.items) {
        return;
    }

    console.log(response.items);
    for (var i = 0; i < response.items.length; i++) {

        const link = document.createElement('a');
        link.href = response.items[i].html_url;
        link.innerText = response.items[i].name;

        console.log(link);

        const language = document.createElement('div');
        language.innerText = response.items[i].language;

        if (repoEl) {

            const listItem = document.createElement('li');
            listItem.className = "list-group-item";

            listItem.appendChild(link);
            listItem.appendChild(language);
            repoEl.appendChild(listItem);

        }
    }
}