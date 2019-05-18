export class Goods {
	title : string;
	brand: string;
	releaseDate: string;
	price: number;
	purchase : number;
	gid: string;
	no : number;
	image : string;
	constructor(
	){}
	toString() {
		return `{ \"title\": \"${this.title}\", 
		\"brand\": "${this.brand}\",
		\"releaseDate\": "${this.releaseDate}\",
		\"price\": "${this.price}\",
		\"gid\": "${this.gid}\"		
		} `;
	}
}