
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Post extends Component {
	static propTypes = {
		post: PropTypes.object,
	}

	render() {
		const { title, url, score } = this.props.post;
		
		return (
			<div className="post col-md-6">
				<div className="well">
					<strong className="alert alert-info score">{score}</strong>
					<a href={url} target="_blank" rel="noopener">
						<strong>{title}</strong>
					</a>
				</div>
			</div>
		);
	}
}