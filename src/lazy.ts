import { Component } from './component';
import { intersectionObserver } from './data/observer.utils';

type Props<T> = {
    pageSize: number;
    load: (start: number, limit: number) => Promise<T[]>;
    templateFn: (item: T) => string;
};

type State = {
    end: number;
};

export class LazyListComponent<T> extends Component<Props<T>, State> {
    state = {
        end: 0,
    };

    update(items: T[]) {
        this.state.end += this.props.pageSize;
        const content = this.#generate(items);
        this.element.insertAdjacentHTML('beforeend', content);
    }

    getComponentId(): string {
        return 'feed';
    }

    #generate = (items: T[]) => items.map(this.props.templateFn).join('').trim();

    init(): void {
        intersectionObserver(this.root, async ([entry]) => {
            if (entry.intersectionRatio > 0.1) {
                const { end } = this.state;
                const data = await this.props.load(end, this.props.pageSize);
                this.update(data);
            }
        });
    }
}
