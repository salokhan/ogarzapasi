import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-locate-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() tags: any[];
  constructor() { }

  ngOnInit() {
  }

}
