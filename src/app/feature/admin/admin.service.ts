import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public db: AngularFirestore) { }

  // services - start
  addService(service): Promise<any> {
    service.createDate = new Date().getTime();
    service.updateDate = new Date().getTime();
    return this.db.collection('services').add(service);

  }
  updateService(uid, serviceName): Promise<any> {
    const updateDate = new Date().getTime();

    return this.db.collection('services').doc(uid).update({ serviceName, updateDate });


  }
  getServiceByID(serviceID): Observable<any> {
    return this.db.collection('services').doc(serviceID).valueChanges();

  }
  getAllServices(): Observable<any> {
    const servicesRef = this.db.collection('services');
    return servicesRef.valueChanges({ idField: 'uid' });
  }
  batchDeleteServices(selectedServices): Promise<any> {
    const batch = this.db.firestore.batch();
    selectedServices.forEach(element => {
      const documentRef = this.db.firestore.collection('services').doc(element.uid);
      batch.delete(documentRef);
    });

    return batch.commit();
  }
  // services - end

  // countries - start
  addCountry(country): Promise<any> {
    country.createDate = new Date().getTime();
    country.updateDate = new Date().getTime();
    return this.db.collection('countries').add(country);

  }
  updateCountry(uid, countryName): Promise<any> {
    const updateDate = new Date().getTime();
    return this.db.collection('countries').doc(uid).update({ countryName, updateDate });


  }
  getCountryByID(countryID): Observable<any> {
    return this.db.collection('countries').doc(countryID).valueChanges();

  }
  getAllCountries(): Observable<any> {
    const countryRef = this.db.collection('countries');
    return countryRef.valueChanges({ idField: 'uid' });
  }
  batchDeleteCountries(selectedCountries): Promise<any> {
    const batch = this.db.firestore.batch();
    selectedCountries.forEach(element => {
      const documentRef = this.db.firestore.collection('countries').doc(element.uid);
      batch.delete(documentRef);
    });

    return batch.commit();
  }
  // countries - end

  // states - start
  addStateToCountry(countryUID, state): Promise<any> {
    state.createDate = new Date().getTime();
    state.updateDate = new Date().getTime();
    return this.db.collection('countries').doc(countryUID).collection('states').add(state);

  }
  updateCountryState(countryUID, stateUID, stateName): Promise<any> {
    const updateDate = new Date().getTime();
    return this.db.collection('countries').doc(countryUID).collection('states').doc(stateUID).update({ stateName, updateDate });


  }
  getStateByCountryAndStateID(countryUID, stateUID): Observable<any> {
    return this.db.collection('countries').doc(countryUID).collection('states').doc(stateUID).valueChanges();

  }
  getAllStateOfCountry(countryUID): Observable<any> {
    const countryRef = this.db.collection('countries').doc(countryUID).collection('states');
    return countryRef.valueChanges({ idField: 'uid' });
  }
  batchDeleteCountryStates(countryUID, selectedStates): Promise<any> {
    const batch = this.db.firestore.batch();
    selectedStates.forEach(element => {
      const documentRef = this.db.firestore.collection('countries').doc(countryUID).collection('states').doc(element.uid);
      batch.delete(documentRef);
    });

    return batch.commit();
  }
  // states - end


  // cities - start
  addCityToCountryState(countryUID,stateUID, city): Promise<any> {
    city.createDate = new Date().getTime();
    city.updateDate = new Date().getTime();
    return this.db.collection('countries').doc(countryUID).collection('states').doc(stateUID).collection('cities').add(city);

  }
  updateCountryStateCity(countryUID, stateUID,cityUID, cityName): Promise<any> {
    const updateDate = new Date().getTime();
    return this.db.collection('countries').doc(countryUID).collection('states').doc(stateUID)
    .collection('cities').doc(cityUID).update({ cityName, updateDate });


  }
  getCityByCountryStateAndCityID(countryUID, stateUID, cityUID): Observable<any> {
    return this.db.collection('countries').doc(countryUID).collection('states')
    .doc(stateUID).collection('cities').doc(cityUID).valueChanges();

  }
  getAllCitiesOfStatenCountry(countryUID, stateUID): Observable<any> {
    const cityRef = this.db.collection('countries').doc(countryUID).collection('states').doc(stateUID).collection('cities');
    return cityRef.valueChanges({ idField: 'uid' });
  }
  batchDeleteCountryStatCities(countryUID, stateUID, cities): Promise<any> {
    const batch = this.db.firestore.batch();
    cities.forEach(element => {
      const documentRef = this.db.firestore.collection('countries').doc(countryUID)
      .collection('states').doc(stateUID).collection('cities').doc(element.uid);
      batch.delete(documentRef);
    });

    return batch.commit();
  }

  // cities - end

  // tags - start
  addTag(tag): Promise<any> {
    tag.createDate = new Date().getTime();
    tag.updateDate = new Date().getTime();
    return this.db.collection('tags').add(tag);

  }
  updateTag(uid, tag): Promise<any> {
    const updateDate = new Date().getTime();
    return this.db.collection('tags').doc(uid).update({ tag, updateDate });
  }
  getTagByID(tagUID): Observable<any> {
    return this.db.collection('tags').doc(tagUID).valueChanges();

  }
  getAllTags(): Observable<any> {
    const tagRef = this.db.collection('tags');
    return tagRef.valueChanges({ idField: 'uid' });
  }
  batchDeleteTags(selectedTags): Promise<any> {
    const batch = this.db.firestore.batch();
    selectedTags.forEach(element => {
      const documentRef = this.db.firestore.collection('tags').doc(element.uid);
      batch.delete(documentRef);
    });

    return batch.commit();
  }
  // tags - end


}
