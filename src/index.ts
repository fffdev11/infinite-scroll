import { ArticleItem } from './data/data.utils';
import { db } from './data/db.utils';
import { VirtualListComponent } from './virtual-list/virtual-list';

const template = (item: ArticleItem) => {
    return `
    <div class="item">
        ${item.title ? `<h2 class="item__title">${item.title}</h2>` : ''}
        ${item.author ? `<h5 class="item__author">by ${item.author}</h5>` : ''}
        ${item.description ? `<p class="item__description">${item.description.slice(0, 350)}</p>` : ''}
        ${item.url ? `<img src="${item.url}" alt="Article Image" class="item__img" />` : ''}
    </div>
    `.trim();
};

const updateItemFn = (element: HTMLElement, { url, description, title }: ArticleItem) => {
    element.style.display = null;
    element.querySelector<HTMLImageElement>('.item_img').src = url;
    element.querySelector('h2').innerHTML = title;
    element.querySelector('p').innerHTML = description;
    return element;
};

const DB_SIZE = 1000;
const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
const DB = db(DB_SIZE, DB_SIZE);

const feed = new VirtualListComponent<ArticleItem>(root, {
    templateFn: template,
    load: (start, limit) => DB.load(start, limit).then((cursor) => cursor.chunk),
    pageSize: 10,
    updateItemFn,
    itemMargin: 16,
});

feed.render();
