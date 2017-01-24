// I assume This is a downloadUrl for a file on the server.
const downloadUrl = `https://devstgaccount.blob.core.windows.net/chat-storage/IMG_0925.JPG?st=2017-01-24T13%3A57%3A00Z&se=2017-01-25T13%3A57%3A00Z&sp=rl&sv=2015-12-11&sr=b&sig=LN5Qx4n8FH6TgOt5h4uylZXcTCt0jsOHjKetCE4YG6U%3D`;

FileUpload.CustomAPI = class FileUploadCustomAPI extends FileUploadBase {
	constructor(meta, file) {
		super(meta, file);
		console.log(this)
	}

	start() {
		var file, item, uploading;

		file = _.pick(this.meta, 'type', 'size', 'name', 'identify', 'description');
		file._id = this.id
		file.url = downloadUrl;

		Meteor.call('sendFileMessage', this.meta.rid, 'API', file, () => {
			Meteor.setTimeout(() => {
				uploading = Session.get('uploading');
				if (uploading !== null) {
					item = _.findWhere(uploading, {
						id: this.id
					});
					return Session.set('uploading', _.without(uploading, item));
				}
			}, 2000);
		});
	}

	onProgress() {}

	stop() {
	}
};
