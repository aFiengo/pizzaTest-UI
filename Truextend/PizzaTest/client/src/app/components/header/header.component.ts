import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public isMenuCollapsed = true;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  getClass(classes: string) {
    return {
      [classes]: true,
      'collapsed': this.isMenuCollapsed
    };
  }
}