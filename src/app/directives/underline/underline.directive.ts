import {Directive, ElementRef, EventEmitter, HostListener, inject, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[underline]',
  standalone: true
})
export class UnderlineDirective {

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Output() appEmit = new EventEmitter;

  constructor() { }

  @HostListener('click') onClick() {
    this.appEmit.emit();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.underline('underline');
  }

  @HostListener('mouseleave') onMouseLeave2() {
    this.underline('none');
  }

  underline(underline: string) {
    this.renderer.setStyle(this.el.nativeElement, 'textDecoration', underline)
  }
}
