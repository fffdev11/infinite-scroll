import { getArticle, ArticleItem } from './data/data.utils';
import { db } from './data/db.utils';
import { LazyListComponent } from './lazy';

const template = ({ title, description, author, url }: ArticleItem) => {
    return `
    <div class="item">
        <h2 class="item__title">${title}</h2>
        <h5 class="item__author">by ${author}</h5>
        <p class="item__description">${description}</p>
        <img src="${url}" alt="Article Image" class="item__img" />
    </div>
    `;
};

const DB_SIZE = 1000;
const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
const DB = db(DB_SIZE, DB_SIZE, getArticle);
const feed = new LazyListComponent<ArticleItem>(root, {
    templateFn: template,
    load: (start, limit) => DB.load(start, limit).then((cursor) => cursor.chunk),
    pageSize: 10,
});

feed.render();
