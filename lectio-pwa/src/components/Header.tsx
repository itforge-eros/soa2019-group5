import React, { Component } from 'react';
import styles from './Header.module.sass';

/**
 * A page header component, mainly used as a page title
 */
class Header extends Component {
	render() {
		return (
			<div className={styles.header}>
				{this.props.children}
			</div>
		)
	}
}

export default Header;
