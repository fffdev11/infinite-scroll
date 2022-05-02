import { Component } from './component';

type Props<T> = {
    load: () => Promise<T[]>;
    templateFn: (item: T) => string;
};

export class ListComponent<T> extends Component<Props<T>> {
    update(items: T[]) {
        const content = this.#generate(items);
        this.element.insertAdjacentHTML('afterend', content);
    }

    #generate = (items: T[]) => items.map(this.props.templateFn).join('').trim();

    effect() {
        this.props.load().then((items) => this.update(items));
    }

    getComponentId(): string {
        return 'feed';
    }
}
