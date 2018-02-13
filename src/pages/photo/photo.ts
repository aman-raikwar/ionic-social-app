import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

	photo: string = 'assets/imgs/avatar.png';

	constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

	takePhoto() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true,
			saveToPhotoAlbum: true
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.photo = base64Image;
			console.log(this.photo);
		}, (err) => {
			// Handle error
			console.log(err);
		});
	}

	getPhoto() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.photo = base64Image;
			console.log(this.photo);
		}, (err) => {
			// Handle error
			console.log(err);
		});
	}

}
