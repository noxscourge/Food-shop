import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toogleOpen(event:Event)
  {
    this.isOpen = this.Elref.nativeElement.contains(event.target);
  }

  constructor(private Elref:ElementRef) {}
}
