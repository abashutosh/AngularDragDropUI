import { Injectable, EventEmitter } from '@angular/core';
import { IMessage, ILoaderMessage } from '../models/viewModels';
import { IMessageService } from '../interfaces/interfaces';
import { page } from '../models/enums';

@Injectable()
export class MessageService implements IMessageService {
	message: IMessage;
	currentPage: page;
	loaderMessage: ILoaderMessage;

	public MessageAdded: EventEmitter<IMessage>;
	public LoaderMessageAdded: EventEmitter<ILoaderMessage>;

	get CurrentPage(): page {
		return this.currentPage;
	}

	set CurrentPage(value: page) {
		this.currentPage = value;
	}

	get Message(): IMessage {
		return this.message;
	}

	set Message(value: IMessage) {
		this.message = value;
		this.MessageAdded.emit(this.message);
	}

	get LoaderMessage(): ILoaderMessage {
		//console.log('LoaderMessage()');
		// uncomment below line to remove loader for dev purpose
		//this.loaderMessage.showLoader = false;
		return this.loaderMessage;
	}

	set LoaderMessage(value: ILoaderMessage) {
		//console.log('LoaderMessage', this.loaderMessage);
		this.loaderMessage = value;
		//console.log('LoaderMessage', this.loaderMessage);
		// uncomment below line to remove loader for dev purpose
		//this.loaderMessage.showLoader = false;
		this.LoaderMessageAdded.emit(this.loaderMessage);
	}

	constructor() {
		var vm = this;
		vm.MessageAdded = new EventEmitter();
		vm.LoaderMessageAdded = new EventEmitter();
	}
}
