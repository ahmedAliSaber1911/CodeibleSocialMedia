import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codeibleSocialMedia';
  auth = new FirebaseTSAuth;
  constructor(private loginSheet: MatBottomSheet , private router: Router){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState({
          whenSignedIn : user =>{
          },
          whenSignedOut:user =>{
          },
          whenSignedInAndEmailVerified: user =>{

          },
          whenSignedInAndEmailNotVerified: user =>{
            this.router.navigateByUrl('emailVertification')
          },
          whenChanged: user =>{

          }
        })
      }
    )
  }
  isLogin(){
    return this.auth.isSignedIn(); // to see if the user login successfuly (method in auth)
  }
  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent)
  }
  onLogoutClick(){
    this.auth.signOut() // also method in auth (the power of firebase)
  }
}
