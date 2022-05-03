// import { base64Image } from '../utils/base64';

export type ArticleItem = {
    title?: string;
    description?: string;
    author?: string;
    url?: string;
};

export const demodata: ArticleItem[] = Array(1000).fill({
    title: 'Hilarious Arguments That Would Only Happen Within The Family',
    description:
        'In the Disney movie Lilo and Stitch, it is repeatedly said that “Ohana means family, and family means nobody gets left behind or forgotten.” On the other hand, even though we may agree with that statement, we have probably also heard that a dysfunctional family is any family with more than one person in it. Although this may sound a little over the top, isn’t it true that we argue the most with our closest? Whether one refers to where they come from or where they turn to when things go wrong, one would often say that family is the most important thing in the world; family members give us courage when we need it; they appreciate our success; they pick us up when we fail. In the same way, they’ll also argue and even fight because of the dumbest reasons. So, are you ready to feel good about your crazy family? Take a look at these tweets.',
    url: 'https://img.joesfeed.com/a-clan-and-its-chaos/w700/1.webp',
    author: 'Shelley Thompson',
});

// implementDataArray();

// function implementDataArray() {
//     let arr: ArticleItem[] = [];
//     let initialArticle: ArticleItem = {
//         title: '',
//         description: '',
//         author: '',
//         url: '',
//     };

//     for (let i: number = 0; i < demodata.length; i++) {
//         const art = demodata[i];
//         initialArticle = {
//             title: art.title,
//             description: art.description,
//             author: art.author,
//             // @ts-ignore
//             url: handleBaseUrl(art.url),
//         };

//         arr = [...arr, initialArticle];
//     }

//     console.log(arr.slice(0, 2));
// }

// function handleBaseUrl(url: string) {
//     return base64Image(url)
//         .then((data) => data)
//         .catch((err) => url);
// }
