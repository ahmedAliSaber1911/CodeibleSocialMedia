import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-email-vertification',
  templateUrl: './email-vertification.component.html',
  styleUrls: ['./email-vertification.component.css']
})
export class EmailVertificationComponent implements OnInit {
  auth = new FirebaseTSAuth
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(
      this.auth.isSignedIn() &&
      !this.auth.getAuth().currentUser?.emailVerified
    ){
      this.auth.sendVerificationEmail();
    }else {
      this.router.navigate([""]);
    }
  }
  onResendClick(){
    this.auth.sendVerificationEmail();
  }
}
