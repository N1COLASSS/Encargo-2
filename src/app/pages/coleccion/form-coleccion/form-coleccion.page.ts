import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Personajes } from 'src/app/models/modelos';
import { ColeccionService } from 'src/app/services/coleccion.service';


@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.page.html',
  styleUrls: ['./form-coleccion.page.scss'],
})
export class FormColeccionPage implements OnInit {


  @Input() id: string = '';
  personaje?: Personajes;

  constructor(
    private coleccionService: ColeccionService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getMascota()
  }

  getMascota(){
    this.coleccionService.getColeccionById(this.id).subscribe(data => {
      this.personaje = data;
    });
  }

  async updatePersonaje(){
    this.coleccionService.updateColeccion(this.personaje!);
    this.modalCtrl.dismiss();
    this.toastPresent('Personaje actualizado',2000);
  }

  

  async toastPresent(message:string, duration:number){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    await toast.present();
  }

}
