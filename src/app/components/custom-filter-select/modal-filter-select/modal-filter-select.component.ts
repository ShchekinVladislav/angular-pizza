import {Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-modal-filter-select',
  templateUrl: './modal-filter-select.component.html',
  styleUrls: ['../../../app.component.less']
})
export class ModalFilterSelectComponent implements OnInit {

  @Input() list: boolean = false;
  @Output() openList = new EventEmitter<boolean>();
  @Output() chooseSort = new EventEmitter<string>();
  select: string = 'popular';

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.list && event.target.id !== 'list') {
      this.emitChoose();
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  emitChoose() {
    this.openList.emit();
    this.chooseSort.emit(this.select);
  }

  choose(select: string) {
    this.select = select;
    this.emitChoose();
  }
}
