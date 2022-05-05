import { ArticleItem, getArticles } from './data/data';
import { db } from './utils/db.utils';
import { VirtualListComponent } from './virtual-list/virtual-list';

const templateFn = (item: ArticleItem) => {
    return `
    <section class="feed__item">
        <img class="feed__item__img" alt="Avatar for logo" src="${item.url}" />
        <h2 class="h2-header">${item.name}</h2>
        <p class="p-text">${item.description}</p>
    </section>`.trim();
};

const updateItemFn = (element: HTMLElement, { url, description, name }: ArticleItem) => {
    element.style.display = null;
    element.querySelector<HTMLImageElement>('.feed__item__img').src = url;
    element.querySelector('h2').innerHTML = name;
    element.querySelector('p').innerHTML = description;
    return element;
};

export const DB_SIZE = 1000;
const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
const DB = db(DB_SIZE, DB_SIZE, getArticles);

const feed = new VirtualListComponent<ArticleItem>(root, {
    templateFn,
    load: (start, limit) => DB.load(start, limit).then((cursor) => cursor.chunk),
    pageSize: 10,
    itemMargin: 20,
    updateItemFn,
});

feed.render();
