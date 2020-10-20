import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { FirebaseUserModel } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) { }

  // getCurrentUserModel(): Promise<any> {
  //   const user = new FirebaseUserModel();

  //   return new Promise((resolve, reject) => {
  //     firebase.auth().onAuthStateChanged(
  //       (res) => {
  //         if (res.providerData[0].providerId === 'password') {
  //           user.image = 'https://via.placeholder.com/400x300';
  //           // user.name = res.displayName;
  //           user.provider = res.providerData[0].providerId;
  //           return resolve(user);
  //         } else {
  //           user.image = res.photoURL;
  //           // user.name = res.displayName;
  //           user.provider = res.providerData[0].providerId;
  //           return resolve(user);
  //         }
  //       },
  //       (err) => {
  //         return reject(err);
  //       }
  //     );
  //   });
  // }
  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const userRes = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  getUserByID(user): Observable<any> {
    // return this.db.collection('users', ref => ref.where('uid', '==', user.uid )).valueChanges();
    // return this.db.collection('users', ref => ref.where(admin).valueChanges();
    return this.db.collection<FirebaseUserModel>('users').doc(user.uid).valueChanges();
  }

  updateCurrentUser(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name,
          photoURL: user.photoURL,
        })
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }
}
