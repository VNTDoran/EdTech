import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() hidden = true;


  getBodyClass(): string {
    let styleClass = '';
    if (this.hidden) {
      styleClass = 'body-hidden';
    }
    else if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    } else if (
      !this.collapsed && this.screenWidth > 768
    ) {
      styleClass = 'body-normal';
    }
    return styleClass;
  }
}
