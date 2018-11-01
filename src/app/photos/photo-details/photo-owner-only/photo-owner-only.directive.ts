import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { User } from 'src/app/core/user/user';
import { UserService } from './../../../core/user/user.service';
import { Photo } from './../../photo/photo';

@Directive({
  selector: '[apPhotoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
  
  @Input()
  ownedPhoto: Photo;
  
  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private userService: UserService
    ) { }
    
  ngOnInit(): void {
    this.userService
        .getUser()
        .subscribe((user: User) => {
          if(!user || (this.ownedPhoto.userId !== user.id)) {
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
          }
      });
    }
}
