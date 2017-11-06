
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import PostTable from './PostTable';

export default class HackerNewsList extends Component {
	afterFetch(data) {
		console.log(data);
		return new Promise((resolve) => {
			const ids = data.splice(0, 4);
			const promises = ids.map((id) => {
				return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
			});
	
			Promise.all(promises)
				.then((postRes) => {
					Promise.all(postRes.map(pr => pr.json())).then((posts) => {
						resolve(posts);
					})
				})
				.catch((err) => {
					throw new Error(err);
				});		
		});
	}

	render() {
		const name = 'Hacker News';
		const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';

		return (
			<PostTable name={name} url={url} afterFetch={this.afterFetch} />
		);
	}
}