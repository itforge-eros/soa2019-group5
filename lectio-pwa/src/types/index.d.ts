// Type definitions for Lectio PWA
// Project: Lectio PWA

type MemoTag = {
	id: string,
	name: string
}

declare type MemoTranscript = {
	id: string,
	transcript: string,
	summary: string
}

declare type serverMemo = {
	uuid: string,
	title: string,
	content: string,
	summary: string,
	tags: serverMemoTag
};

declare type serverMemoTag = Array<string>;
