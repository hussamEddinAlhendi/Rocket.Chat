import { HTTP } from 'meteor/http'

const uri = "http://stgenvwebapisite.azurewebsites.net/api/Resource/UploadChatResource"
FileUpload.CustomAPI = class FileUploadCustomAPI extends FileUploadBase {
	constructor(meta, file) {
		super(meta, file);
	}

	start() {
		var file, item, uploading;
		var data;
		console.log('meta', JSON.stringify(this.meta), 'file', this.file);
		readAsDataURL(this.file, function (fileContent) {
			HTTP.post(uri, {
				data: {fileContent: fileContent.split(',')[1], meta: this.meta},
				headers: {"Content-Type": "application/json"}
			}, function (error, response) {
				if (error) {
					console.log(error)
				} else {
					console.log(response)
					// file = _.pick(this.meta, 'type', 'size', 'name', 'identify', 'description');
					// file._id = this.id
					// file.url = response.url;
                    //
					// Meteor.call('sendFileMessage', this.meta.rid, 'API', file, () => {
					// 	Meteor.setTimeout(() => {
					// 		uploading = Session.get('uploading');
					// 		if (uploading !== null) {
					// 			item = _.findWhere(uploading, {
					// 				id: this.id
					// 			});
					// 			return Session.set('uploading', _.without(uploading, item));
					// 		}
					// 	}, 2000);
					// });
				}
			})
		})
	}

	onProgress() {}

	stop() {
	}
};
var readAsDataURL = (file, callback) => {
	reader = new FileReader();
	reader.onload = (ev) => {
		callback (ev.target.result, file);
	}

	reader.readAsDataURL(file);
}
