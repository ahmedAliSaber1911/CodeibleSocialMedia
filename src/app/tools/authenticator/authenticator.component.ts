import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent implements OnInit {
  state!: boolean;
  login = true;
  register = false;
  forget = false;
  stateText="Login";
  firbasetsAuth!: FirebaseTSAuth;

  constructor(private bottomSheet: MatBottomSheetRef) {
    this.firbasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {}
  onResetEmailClick(resetEmail:HTMLInputElement){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firbasetsAuth.sendPasswordResetEmail(
        {
        email: email,
        onComplete: (err)=>{
          this.bottomSheet.dismiss(); // this for closing the bottom sheet if every thing is ok.
        }
      })
    }
  }
  onLogin(loginEmail: HTMLInputElement, loginPassword:HTMLInputElement){
    let email = loginEmail.value;
    let password = loginPassword.value;
    if(
      this.isNotEmpty(email)&&
      this.isNotEmpty(password)){
        this.firbasetsAuth.signInWith({
          email:email,
          password:password,
          onComplete: (uc)=>{
            this.bottomSheet.dismiss(); // this for closing the bottom sheet if every thing is ok.
          },
          onFail: (err)=>{
            alert(err)
          }
        })
      }

  }
  onRegisterClick(
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConformPassword:HTMLInputElement,
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConformPassword.value;
    if(
      this.isNotEmpty(email)&&
      this.isNotEmpty(password)&&
      this.isNotEmpty(confirmPassword)&&
      this.isMatch(password, confirmPassword)
    ){
      this.firbasetsAuth.createAccountWith({
        email:email,
        password:password,
        onComplete :(uc)=>{
          this.bottomSheet.dismiss(); // this for closing the bottom sheet if every thing is ok.
        },
        onFail: (err)=>{
          alert('Failed to create an account.')
        }
      })
    }

  }
  isNotEmpty(text:string){
    return text!=null && text.length > 0
  }
  isMatch(text:string , compared: string){
    return text.length == compared.length;
  }
  onForgetPasswordClick() {
    this.forget = true;
    this.login = false;
    this.register = false;
    this.stateText = "Reset Password";
 }
  onCreateAccountClick() {
    this.register = true;
    this.forget = false;
    this.login = false;
    this.stateText = "Register";

  }
  onLoginClick() {
    this.login = true;
    this.register = false;
    this.forget = false;
    this.stateText = "Login";
  }
  isLoginState() {
    return (this.state = this.login);
  }
  isRegisterState() {
    return (this.state = this.register);
  }
  isForgetPasswordState() {
    return (this.state = this.forget);
  }

  }

