import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.scss'],
})
export class TestHomeComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAllUsers().subscribe(
      (users) => {
        console.log(users);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
