import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';

@Directive({
  selector: '[underline]',
  standalone: true
})
export class UnderlineDirective {

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  @HostListener('mouseenter') onMouseEnter2() {
    this.underline('underline');
  }

  @HostListener('mouseleave') onMouseLeave2() {
    this.underline('none');
  }

  underline(underline: string) {
    this.renderer.setStyle(this.el.nativeElement, 'textDecoration', underline)
  }

}
