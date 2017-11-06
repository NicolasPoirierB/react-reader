
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostTable from './PostTable';

export default class RedditPostTable extends Component {
	static propTypes = {
		subreddit: PropTypes.string,
	};

	formatData(data) {
		return data.data.children.map(post => post.data);
	}

	render() {
		const name = `/r/${this.props.subreddit}`;
		const url = `https://www.reddit.com/r/${this.props.subreddit}/.json?json=p&limit=3`;

		return (
			<PostTable name={name} url={url} formatData={this.formatData} />
		);
	}
}