
import React, { Component } from 'react';
import './style/App.css';

import RedditPostList from './components/RedditPostList';
import HackerNewsList from './components/HackerNewsList';

class App extends Component {
	render() {
		return (
			<div className="app">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<RedditPostList subreddit="webdev" />
							<RedditPostList subreddit="javascript" />
							<HackerNewsList />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
