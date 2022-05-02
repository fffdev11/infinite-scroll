export abstract class Component<P extends {}, S extends object = {}> {
    protected element: HTMLElement = null;
    protected props: P = null;
    protected state: S = null;

    constructor(protected root: HTMLElement, props: P) {
        this.element = document.createElement(this.getComponentTag());
        this.element.id = this.getComponentId();
        this.props = props;
        this.init();
    }

    protected update(...args: any): void {}

    render(): void {
        if (this.exists()) {
            throw Error('component already exists');
        }
        this.root.insertAdjacentElement('afterbegin', this.element);
        this.effect();
    }

    protected exists(): boolean {
        return this.element.offsetParent !== null;
    }

    protected getComponentTag(): string {
        return 'div';
    }

    abstract getComponentId(): string;

    effect(): void {}

    init(): void {}
}
