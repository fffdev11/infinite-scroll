interface IDB<T> {
    load: (start: number, limit: number) => Promise<CursorInfo<T>>;
}

export type CursorInfo<T> = {
    size: number;
    nextCursor: number;
    prevCursor: number;
    chunk: T[];
};

export function db<T>(size: number = 100, pageSize: number = 10, getArticle: (index: number) => T): IDB<T> {
    const items = Array(size)
        .fill(null)
        .map((_, index) => getArticle(index));

    return {
        load: (start: number, limit: number = pageSize): Promise<CursorInfo<T>> => {
            const chunk = items.slice(start, start + limit);
            const cursorInfo = { chunk, nextCursor: start + limit, prevCursor: start - limit, size };
            return new Promise((resolve) => resolve(cursorInfo));
        },
    };
}
