
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const TIME_TO_REFRESH = 5 * 60000;

export default class PostTable extends Component {
	static propTypes = {
		url: PropTypes.string,
		name: PropTypes.string,
		postType: PropTypes.func,
		formatData: PropTypes.func,
		afterFetch: PropTypes.func,
	};

	static defaultProps = {
		formatData: data => data,
		afterFetch: data => Promise.resolve(data),
	}

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		if (!this.state.posts || this.state.posts.length === 0) {
			this.requireData();
		}

		this.timer = setInterval(() => { this.requireData(); }, TIME_TO_REFRESH);
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer);
	}

	requireData() {
		fetch(this.props.url)
			.then((res) => {
				if (res.ok) {
					res.json().then(this.props.afterFetch).then((data) => {
						this.setState({
							posts: this.props.formatData(data),
						});
					});
				} else {
					res.json().then((data) => {
						throw new Error(`${data.message} : ${data.explanation}`);
					});
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
		
	render() {
		return (
			<div className="post-table">
				<h1>{this.props.name}</h1>
				<div className="row">
					{
						this.state.posts.map((post, i) => <Post post={post} key={i} />) 
					}
				</div>
			</div>
		);
	}
}