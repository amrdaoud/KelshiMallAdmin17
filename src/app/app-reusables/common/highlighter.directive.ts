import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ColumnDef, Highlight } from '../data-table/data-table.models';

@Directive({
  selector: '[appHighlighter]',
  standalone: true
})
export class HighlighterDirective implements OnInit {
  @Input() appHighlighter: Highlight[] | undefined;
  @Input() value!: string;
  @Input() col!: ColumnDef;
  private el = inject(ElementRef);
  constructor() {}
  ngOnInit(): void {
    if(this.appHighlighter) {
      this.el.nativeElement.style.lineHeight = '20px';
      this.el.nativeElement.style.padding = '5px 10px';
    }
    const highlight = this.comparer();
    if(highlight) {
      this.el.nativeElement.style.borderRadius = '5px'
      this.el.nativeElement.style.backgroundColor = highlight.BackgroundColor;
      this.el.nativeElement.style.color = highlight.Color;
      if(highlight.AltText) {
        this.el.nativeElement.innerText = highlight.AltText;
      }
    }
  }
  comparer(): Highlight | undefined {
    if(!this.appHighlighter) {
      return undefined;
    }
    const result = this.appHighlighter.find(x => (x.Operation === '>' && this.value > x.Value)
                                              || (x.Operation === '<' && this.value < x.Value)
                                              || (x.Operation === '>=' && this.value >= x.Value)
                                              || (x.Operation === '<=' && this.value <= x.Value)
                                              || (x.Operation === '<>' && this.value !== x.Value)
                                              || (x.Operation === '=' && this.value === x.Value));
    return result;
  }

}
