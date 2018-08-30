import { Collection, Dictionary, build, buildCollection } from '@caiu/core';

import { CurrentUser } from '../models';

export class Tab {
    label = '';
    href = '';
    isActive?= false;
    name?= '';
    submenu?: Tab[];

    static Build({ label, href, isActive = false, name = '', submenu = [] }) {
        return build(Tab, { label, href, isActive, name, submenu });
    }
}

export class Tabs extends Collection<Tab> {

    _order: string[] = [];

    static Build(tabs: Dictionary<Tab>, order?: string[]): Tabs {
        const items = Object.keys(tabs).map(key => build(Tab, tabs[key], { name: key }));
        return build(Tabs, buildCollection(items, 'name'), { order });
    }

    constructor() {
        super(Tab);
    }

    get order() {
        return this._order.length > 0 ? this._order : Object.keys(this.items);
    }

    set order(value: string[]) {
        this._order = value;
    }

    label(name: string): string {
        for (let i = 0; i < this.toArray().length; i++) {
            const tab = this.items[i];
            if (tab.name === name) {
                return tab.label;
            }
        }
        return '';
    }
}
