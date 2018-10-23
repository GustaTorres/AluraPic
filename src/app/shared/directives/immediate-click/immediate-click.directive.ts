import { PlatformDetectorService } from './../../../core/platform-detector/platform-detector.service';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[apImmediateClick]'
})
export class ImmediateClickDirective implements OnInit{
  
  constructor(
    private el: ElementRef,
    private platformDetectorService: PlatformDetectorService) {}

  ngOnInit(): void {
      this.platformDetectorService.isPlatFormBrowser && this.el.nativeElement.click();
  }
}
