import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private emailPattern : any = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  private passPattern : any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/;

  credentials: FormGroup = new FormGroup({
    email: new FormControl(''),
    password : new FormControl(''),
  });

  constructor(
    private authservice: AuthService,
    private formbuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl : LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.credentials = this.formbuilder.group({
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['',[Validators.required,Validators.minLength(this.passPattern)]]
    });
  }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }


  get f(): {[key:string]: AbstractControl} {
    return this.credentials.controls;
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authservice.registar(this.credentials.value.email, this.credentials.value.password);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home');
    }
    else{
      this.alertPresent('Registro fallido','Intentelo nuevamente');
    }
  }

  async alertPresent(header:string, message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['Ok'],
    });
    await alert.present();
  }

}
