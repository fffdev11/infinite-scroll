export abstract class Component<P extends {}, S extends object = {}> {
    protected state: S = null;
    protected element: HTMLElement = null;
    protected props: P = null;

    constructor(protected root: HTMLElement, props: P) {
        this.element = document.createElement(this.getComponentTag());
        this.element.id = this.getComponentId();
        this.props = props;
        this.init();
    }

    init(): void {}

    protected update(...args: any): void {}

    render(): void {
        if (this.exist()) {
            throw Error('Component already exists');
        }

        this.root.insertAdjacentElement('afterbegin', this.element);
        this.effect();
    }

    protected exist(): boolean {
        return this.element.offsetParent !== null; // Just checker if component is rendered
    }

    protected getComponentTag(): string {
        return 'div';
    }

    abstract getComponentId(): string;

    effect(): void {}
}
