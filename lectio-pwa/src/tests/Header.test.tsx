import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../components/Header";

it('renders Header successfully', () => {
	const tree = renderer
		.create(
			<Header/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders Header with child successfully', () => {
	const tree = renderer
		.create(
			<Header>Hello</Header>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

export default undefined
