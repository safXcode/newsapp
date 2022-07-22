import React, { Component } from 'react'


export default class newsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div className="my3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="vamos" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>

    )
  }
}
