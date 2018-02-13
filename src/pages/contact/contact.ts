import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

	public contactList: any

	constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) {
		this.contacts.find(['*'], { filter: "", multiple: true })
			.then(data => {
				alert(data);
				this.contactList = data;
				console.log(this.contactList);
			}).catch(error => {
				alert(error);
				console.log(error);
			});
  	}

  	addContact() {
		let contact: Contact = this.contacts.create();

		contact.name = new ContactName(null, 'Smith', 'John');
		contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
		contact.save().then(
			() => console.log('Contact saved!', contact),
			(error: any) => console.error('Error saving contact.', error)
		);
  	}

}
