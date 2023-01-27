import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Personajes } from 'src/app/models/modelos';
import { ColeccionService } from 'src/app/services/coleccion.service';
import { FormColeccionPage } from './form-coleccion/form-coleccion.page';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.page.html',
  styleUrls: ['./coleccion.page.scss'],
})

export class ColeccionPage implements OnInit {
  

  personajes: Personajes[] = [];
  
  pageTitle = 'Mi Colecciones';
  image = 'marvel.png'
  pageIcon = `../../assets/img/${this.image}`;

  constructor(private coleccionService: ColeccionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
    
    ) {
      
      this.getPersonajes();
  }

  ngOnInit() {
  }


  getPersonajes(){
    this.coleccionService.getColeccion()
    .subscribe(data => {
      console.log(data);
      this.personajes = data
    })
  }

  async addPersonaje(){
    const alert = await this.alertCtrl.create({
      header: 'Registrar personaje',
      inputs: [
        {
          name:'nombre',
          type:'text',
          placeholder:'Nombre del personaje...'
        },
        {
          name:'origen',
          type:'text',
          placeholder:'Origen del personaje'
        },
        {
          name:'universo',
          type:'number',
          placeholder:'Numero de tierra'
        },
        {
          name:'ocupacion',
          type:'text',
          placeholder:'Ocupacion del personaje'
        },  
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Save',
          role:'confirm',
          handler: (data) => {
            this.coleccionService.addColeccion(data)
          }
        }
      ]
    });
    await alert.present();
  }

  async deletePersonaje(personaje:Personajes){
    const alert = await this.alertCtrl.create({
      header: 'Eliminando Personaje',
      message:'Estas seguro que deseas eliminar el personaje?',
      buttons: [
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Delete',
          role:'confirm',
          handler: () => {
            this.coleccionService.deleteColeccion(personaje);
            this.modalCtrl.dismiss();
            this.toastPresent('Personaje eliminado',2000);
          }
        }
      ]
    });
    await alert.present();
  }

  async toastPresent(message:string, duration:number){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    await toast.present();
  }

  async openPersonaje(personaje: Personajes){
    const modal = await this.modalCtrl.create({
      component: FormColeccionPage,
      componentProps: {id:personaje.id},
      initialBreakpoint: 0.8,
      breakpoints: [0,0.5,0.8],
    });
    await modal.present();
  }

  

}
