import { Component, Input, OnInit } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Profile } from 'src/app/models/modelos';
import { ProfileService } from 'src/app/services/profile.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  pageTitle = 'Juanito Quiroz';
  image = 'perfil.png'
  pageIcon = `../../assets/img/${this.image}`;

  
  profile: any = null;
  

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private profileService: ProfileService
    ) {}

  ngOnInit() { 
    this.cargarPerfil()
   }

  cargarPerfil(){
    this.profileService.getUserProfile().subscribe(data => {
      this.profile = data;
    })
  }

  

  toggleTheme(event:any) {
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark')
    }else{
      document.body.setAttribute('color-theme','light')
    }
  }

  async changeImage(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    console.log(image);

    if(image){
      const loading = await this.loadingCtrl.create();
      await loading.present();

      const results = await this.profileService.changePhoto(image);
      loading.dismiss();

      if(!results){
        const alert = await this.alertCtrl.create({
          header: 'Carga de imagen fallida',
          message:'Hubo un problema durante la carga de la imagen.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

}