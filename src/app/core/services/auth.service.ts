import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseUserModel } from '../models/user.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  doFacebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doTwitterLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          const newUser = new FirebaseUserModel();
          newUser.uid = res.user.uid;
          newUser.email = res.user.email;
          newUser.firstName = res.user.displayName ? res.user.displayName.split(' ')[0] : '';
          newUser.lastName = res.user.displayName ? res.user.displayName.split(' ')[1] : '';
          this.db.collection('users').doc(newUser.uid).set(JSON.parse(JSON.stringify(newUser)));
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail(): Promise<any> {
    return this.afAuth.currentUser.then((user) => {
      user.sendEmailVerification();
    }, (error) => {

    });
  }

  doRegister(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            this.SendVerificationMail();
            const newUser = new FirebaseUserModel();
            newUser.uid = res.user.uid;
            newUser.email = value.email;
            newUser.firstName = value.firstName;
            newUser.lastName = value.lastName;
            this.db.collection('users').doc(newUser.uid).set(JSON.parse(JSON.stringify(newUser)));
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doLogin(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            // if (res.user.emailVerified !== true) {
            // this.SendVerificationMail();
            // resolve(res)
            // } else {
            resolve(res);
            // }
          },
          (err) => reject(err)
        );
    });
  }

  doLogout(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
