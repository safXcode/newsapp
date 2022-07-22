import React, { Component } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        name: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }



    articles = [
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": null,
            "title": "Women's tests should be played over five days, says ICC's Barclay - Reuters",
            "description": "International Cricket Council (ICC) chair Greg Barclay said women's test matches should be played over five days, but raised doubts over the place of the longer format in the future of women's cricket.",
            "url": "https://www.reuters.com/lifestyle/sports/womens-tests-should-be-played-over-five-days-says-iccs-barclay-2022-06-04/",
            "urlToImage": "https://www.reuters.com/resizer/YzNEE8wi2_c0XueuQJkUc2Ifp68=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/NNW3L43O4NJUDCE6BIZH6KL5LU.jpg",
            "publishedAt": "2022-06-04T03:36:00Z",
            "content": "June 4 (Reuters) - International Cricket Council (ICC) chair Greg Barclay said women's test matches should be played over five days, but raised doubts over the place of the longer format in the futur… [+1825 chars]"
        },
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": null,
            "title": "Yorkshire charged by ECB after investigation into racism claims - Reuters.com",
            "description": "Yorkshire County Cricket Club and a number of individuals have been charged following an investigation into racism claims made by former player Azeem Rafiq, the England and Wales Cricket Board said on Wednesday, without naming the people in question.",
            "url": "https://www.reuters.com/lifestyle/sports/yorkshire-charged-by-ecb-after-investigation-into-racism-claims-2022-06-15/",
            "urlToImage": "https://www.reuters.com/resizer/6WzKyHpnkZoiUZtrIt8aSyzVTi0=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/RMEG7MPQ4FIVJPBK6CEOX6RGAI.jpg",
            "publishedAt": "2022-06-15T13:28:00Z",
            "content": "June 15 (Reuters) - Yorkshire County Cricket Club and a number of individuals have been charged following an investigation into racism claims made by former player Azeem Rafiq, the England and Wales … [+1947 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Kyle Barr",
            "title": "Twitter Employees Aren't Going to Disney, But They Will Get a Visit From a Clown Called 'Musk'",
            "description": "Twitter employees singing “when you wish upon a star” seem to have accidentally performed an eldritch rite, and instead of summoning a magical cricket to whisk them away to a land of fun and wonder, employees have summoned the world’s richest billionaire to t…",
            "url": "https://gizmodo.com/twitter-disney-elon-musk-1849070372",
            "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/7b7317ddafdce1b81130cc1a6620c6a1.jpg",
            "publishedAt": "2022-06-16T14:35:00Z",
            "content": "Twitter employees singing when you wish upon a star seem to have accidentally performed an eldritch rite, and instead of summoning a magical cricket to whisk them away to a land of fun and wonder, em… [+2265 chars]"
        },
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": null,
            "title": "Media giants in pitch battle for India cricket rights - Reuters",
            "description": "Disney <a href=\"https://www.reuters.com/companies/DIS.N\" target=\"_blank\">(DIS.N)</a>, Sony <a href=\"https://www.reuters.com/companies/6758.T\" target=\"_blank\">(6758.T)</a> and India's Reliance <a href=\"https://www.reuters.com/companies/RELI.NS\" target=\"_blank\"…",
            "url": "https://www.reuters.com/lifestyle/sports/media-giants-pitch-battle-india-cricket-rights-2022-06-12/",
            "urlToImage": "https://www.reuters.com/resizer/ijXV0kSzkAjYPdIKEZBvv0DvXJU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/2YPAL4B45NIPJB4LG4Z2NTQ55M.jpg",
            "publishedAt": "2022-06-12T04:54:00Z",
            "content": "MUMBAI/NEW DELHI, June 12 (Reuters) - Disney (DIS.N), Sony (6758.T) and India's Reliance (RELI.NS) will vie on Sunday for media rights to Indian Premier League (IPL), the world's richest cricket leag… [+2978 chars]"
        }
    ]

    constructor(props) {
        super(props);
        console.log('im a constructor')
        this.state = {
            article: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - NewsMan`
    }

    async componentDidMount() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b3a952feb074c63ab402fd16200541f&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData)
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b3a952feb074c63ab402fd16200541f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })

    }




    render() {



        let handlePrevClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b3a952feb074c63ab402fd16200541f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
            this.setState({
                loading: true
            })
            let data = await fetch(url)
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({
                article: parsedData.articles,
                page: this.state.page - 1,
                loading: false
            })

        }

        let handleNextClick = async () => {
            if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

            } else {

                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b3a952feb074c63ab402fd16200541f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
                this.setState({
                    loading: true
                })
                let data = await fetch(url)
                let parsedData = await data.json()
                console.log(parsedData)
                this.setState({
                    article: parsedData.articles,
                    page: this.state.page + 1,
                    loading: false
                })
            }
        }


        return (
            <div className='container my-3'>
                <h2 className='text-center'>NewsMan - Top {this.props.category} Headlines</h2>
                {/* {this.state.loading && <Loading/>} */}
                {/* <Loading/> */}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.totalResults}
                    loader={<Loading />}
                >
                    <div className="row">
                        {this.state.article.map((element) => {
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 85) + "..." : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2022/06/29/1600x900/asteroid-4145080_1920_1646293428986_1656480466378.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}
