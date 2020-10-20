import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-locate-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  @Input() breadcrumbItems: Array<{}>;
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
