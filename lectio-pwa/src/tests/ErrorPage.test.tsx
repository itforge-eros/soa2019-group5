import React from 'react';
import renderer from "react-test-renderer";
import ErrorPage from "../containers/ErrorPage";

it('renders ErrorPage successfully', () => {
	const tree = renderer
		.create(
			<ErrorPage identifier="test" title="Sample Error" body="This is a sample error"/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

export default undefined;
