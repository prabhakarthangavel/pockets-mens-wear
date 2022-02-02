import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input('submit') submit: string;
  @Input('cancel') cancel: string;
  @Input('valid') valid: boolean;
  @Output('card') card = new EventEmitter<string>();

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  submitClicked(){
    this.card.emit('');
  }

}
