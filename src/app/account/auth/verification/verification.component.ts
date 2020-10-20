import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  sendVerificationEmail(): void {
    this.authService.SendVerificationMail().then((res) => {
      console.log('verification Sent');
    }, (error) => {
      console.log(error);
    });
  }

}
