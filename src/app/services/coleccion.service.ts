import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Personajes } from '../models/modelos';

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  constructor(
    private firestore: Firestore
  ) { }

  getColeccion():Observable<Personajes[]>{
    const personajesRef = collection(this.firestore,'Personajes');
    return collectionData(personajesRef, {idField:'id'}) as Observable<Personajes[]>;
  }

  getColeccionById(id:string): Observable<Personajes> {
    const personajeRef = doc(this.firestore,`Personajes/${id}`);
    return docData(personajeRef, {idField:'id'}) as Observable<Personajes>;
  }

  addColeccion(personajes:Personajes){
    const personajeRef = collection(this.firestore,'Personajes');
    return addDoc(personajeRef,personajes);
  }

  deleteColeccion(personajes:Personajes){
    const personajeRef = doc(this.firestore,`Personajes/${personajes.id}`);
    return deleteDoc(personajeRef);
  }

  updateColeccion(personajes:Personajes){
    const personajeRef = doc(this.firestore,`Personajes/${personajes.id}`);
    return updateDoc(personajeRef,
      {
        nombre: personajes.nombre,
        origen: personajes.origen,
        universo: personajes.universo,
        ocupacion: personajes.ocupacion
      });
  }

}


