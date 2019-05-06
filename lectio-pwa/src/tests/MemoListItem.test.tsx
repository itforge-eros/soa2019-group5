import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import MemoListItem from "../components/MemoListItem";
import Memo from "../model/Memo";

const localMemo: Memo = new Memo(
	'sample-id',
	'Lorem Ipsum',
	'This is the content',
	'sample-id',
	[
		{id: 'tag-id-1', name: 'Tag 1'},
		{id: 'tag-id-2', name: 'Tag 2'}
		]
);

const serverMemo: serverMemo = {
	uuid: 'sample-id',
	title: 'Lorem Ipsum',
	content: 'This is the content',
	tags: ['Tag 1', 'Tag 2']
};

it('renders MemoListItem with server schema successfully', () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<MemoListItem memo={serverMemo} selected={false} schema="server"/>
			</BrowserRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders MemoListItem with local schema successfully', () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<MemoListItem memo={localMemo} selected={false} schema="local"/>
			</BrowserRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

export default undefined;
