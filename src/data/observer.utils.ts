interface IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
}

type TElementConfig = {
    className?: string;
    insertPosition?: InsertPosition;
    tag?: string;
};

const defaultElementConfig: TElementConfig = {
    insertPosition: 'beforeend',
    tag: 'div',
};

const defaultObserverConfig: IntersectionObserverInit = { threshold: 0.25 };

export function intersectionObserver(
    root: HTMLElement,
    callback: IntersectionObserverCallback,
    observerConfig?: IntersectionObserverInit,
    elementConfig?: TElementConfig
): [HTMLElement, IntersectionObserver] {
    const { insertPosition, className, tag } = Object.assign(elementConfig ?? {}, defaultElementConfig);
    const observer = new IntersectionObserver(callback, observerConfig ?? defaultObserverConfig);
    const element = document.createElement(tag);
    element.classList.add('intersection-observer', className);
    root.insertAdjacentElement(insertPosition, element);
    observer.observe(element);

    return [element, observer];
}
