import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from "../containers/HomePage";

it('renders HomePage with no internet connection', () => {
	const tree = renderer
		.create(
			<HomePage/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
