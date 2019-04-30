import { from, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ResponseModel, RepositoryModel } from './models/response.model';

const searchInput = document.querySelector('.search-input');
const repoEl = document.querySelector('.list-group');
const getRepo: string = 'https://api.github.com/search/repositories';

const clearResults = () => {
    if (repoEl) {
        repoEl.innerHTML = "";
    }
};

const sequence1$ = fromEvent(searchInput, 'input');

const sequence2$: Observable<ResponseModel> = sequence1$
    .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(clearResults),
        switchMap((event: KeyboardEvent) => request(event),

        )
    );

sequence2$.subscribe(result => showResult(result));

function request(event: KeyboardEvent): Observable<RepositoryModel> {
    const url: string = `${getRepo}?q=${(event.target as HTMLInputElement).value}`;
    return from(fetch(url).then(res => res.json()));
};

function showResult(response: ResponseModel) {
    if (!response.items) {
        return;
    }

    for (var i = 0; i < response.items.length; i++) {

        const link = document.createElement('a');
        link.href = response.items[i].html_url;
        link.innerText = response.items[i].name;

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