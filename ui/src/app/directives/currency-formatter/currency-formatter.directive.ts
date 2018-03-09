import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";

@Directive({ selector: "[CurrencyFormatter]" })
export class CurrencyFormatterDirective {

  private el: HTMLInputElement;

  constructor( private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.transform(this.el.value);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.transform(value);
  }

  transform(value: number | string): string {
      return '£ ' + value ;
  }

  parse(value: string): string {
    let integer = value.replace(new RegExp("£ ", "g"), "");
    return integer;
  }

}
