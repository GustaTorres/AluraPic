import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness: string = '70%';

  constructor(private el: ElementRef, private render: Renderer) {}

  @HostListener('mouseover')
  public darkenOn() {
    this.render.setElementStyle(this.el.nativeElement,'filter',`brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  public darkenOff() {
    this.render.setElementStyle(this.el.nativeElement,'filter','brightness(100%)');
  }

}
