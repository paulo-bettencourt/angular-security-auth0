import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';

@Directive({
  selector: '[changeFontColor]',
  standalone: true
})
export class ChangeFontColorDirective {

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#be1e2d')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('black');
  }

  highlight(color: string) {
   this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }

}
