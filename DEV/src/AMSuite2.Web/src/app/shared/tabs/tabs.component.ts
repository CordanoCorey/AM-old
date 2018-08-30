import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Tab, Tabs } from './tabs.model';

@Component({
  selector: 'am-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @Input() model: Tabs = new Tabs();
  @Input() url = '';
  hoverIndex = -1;

  constructor(private router: Router) {
  }

  get activeIndex(): number {
    return this.tabs.findIndex(tab => this.isActive(tab));
  }

  get activeTab(): Tab {
    return this.tabs.find(tab => tab.isActive) || this.tabs[0] || new Tab();
  }

  get currentUrl(): string {
    return this.router.url;
  }

  get submenu(): Tab[] {
    return this.activeTab.submenu;
  }

  get tabs(): Tab[] {
    return this.model.order.map(tab => this.model.get(tab));
  }

  ngOnChanges() {
  }

  onEnter(index: number) {
    this.hoverIndex = index;
  }

  onExit() {
    this.hoverIndex = -1;
  }

  isActive(tab: Tab): boolean {
    return this.currentUrl.includes(tab.href);
  }

  isBeforeActive(index: number): boolean {
    return index === this.activeIndex - 1;
  }

  isAfterActive(index: number): boolean {
    return index === this.activeIndex + 1;
  }

  isBeforeHover(index: number): boolean {
    return this.hoverIndex !== -1 && index === this.hoverIndex - 1;
  }

  isAfterHover(index: number): boolean {
    return this.hoverIndex !== -1 && index === this.hoverIndex + 1;
  }

}
