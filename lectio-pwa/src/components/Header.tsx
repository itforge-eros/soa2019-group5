import React, { Component } from 'react';
import styles from './Header.module.sass';

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
