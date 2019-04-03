/**
 * Creates a new Memo.
 * @class
 */
class Memo {
	public name: string;
	public content: string;
	public audio: any; //blob
	public tags: Array<any>;

	constructor(name: string, content: string, audio: any, tags: Array<any>) {
		this.name = name;
		this.content = content;
		this.audio = audio;
		this.tags = tags;
	}
}

export default Memo;
