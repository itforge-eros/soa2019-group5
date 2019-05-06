/**
 * Memo
 * @class
 */
class Memo {
	public id: string;
	public name: string;
	public content: string;
	public audioId: string;
	public tags: Array<MemoTag>;

	constructor(id: string, name: string, content: string, audioId: string, tags: Array<any>) {
		this.id = id;
		this.name = name;
		this.content = content;
		this.audioId = audioId;
		this.tags = tags;
	}
}

export default Memo;
