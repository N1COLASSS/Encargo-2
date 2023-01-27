import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { Firestore, doc, setDoc, collectionData, docData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private auth:Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  getUserProfile() {
    const profile = this.auth.currentUser;
    const profileDocRef = doc(this.firestore,`Profile/${profile?.uid}`);
    return docData(profileDocRef);
  }
  

  async changePhoto(cameraFile: Photo){  
    const profile = this.auth.currentUser;
    const path = `profiles/${profile?.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String || '', 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      const profileRef = doc(this.firestore,`Profile/${profile?.uid}`);
      await setDoc(profileRef, {imageUrl}, {merge:true});
      return true;
    }
    catch(error){
      return false;
    }

  }


  
}

