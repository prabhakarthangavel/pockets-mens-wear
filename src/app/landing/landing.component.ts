import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

  goProducts(value: string) {
    this._router.navigate(
      ['/products'],
      { queryParams: { category: value } }
    );
  }

}
