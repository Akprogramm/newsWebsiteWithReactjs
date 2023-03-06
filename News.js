import React, {useEffect, useState} from 'react'

import NewsItem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7decbbaa90446eacbfc3017ee43b35&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
          }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7decbbaa90446eacbfc3017ee43b35&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {
                          articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })
                        }
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News


// function News(props) {

//   const [state,setState]=useState({"articles": []});
//   const pagesize=10;
//   // let [page,setPage]=useState(1);
//   let page=1;
//   // console.log("page no : ",page);
//   const [totalresults,settotalresults]=useState(0);
//   const [loading,setLoading]=useState(false);
  
//   const update =()=>{
//     setLoading(true);

//     axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7decbbaa90446eacbfc3017ee43b35&page=${page}&pageSize=${pagesize}`).then((response) => {
//       console.log("respoonse is : ",response.data);
//       setState(response.data);
//       settotalresults(response.totalResults);
//       console.log("state is : ",state);
//     });


//   //   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7decbbaa90446eacbfc3017ee43b35&page=${page}&pageSize=${pagesize}`;
//   //   const data=await fetch(url);
//   //   const users = await data.json();
//   //  console.log("users are : ",users);
//   //  setState(users);

//   //  settotalresults(users.totalResults);
//    setLoading(false);
//   //  console.log("totalresults are : ",users.totalResults);
//   }


// /*
//   const prevClick=()=>{
//   //   setLoading(true);
//   //   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e421034d0fd24e56a8ca95916e8e85aa&page=${setPage(page-1)}&pageSize=${pagesize}`;
//   //   const data=await fetch(url);
//   //   const users = await data.json();
//   //  setLoading(false);
//   //  setState(users);
//   setPage(page-1);
//   console.log("page is : ",page);
//   update();
//   };
//   */

//   /*
//   const nextClick=()=>{
//   //   setLoading(true);
//   //   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e421034d0fd24e56a8ca95916e8e85aa&page=${setPage(page+1)}&pageSize=${pagesize}`;
//   //   const data=await fetch(url);
//   //   const users2 = await data.json();
//   //  console.log("users are : ",users2);
//   //  console.log("nextClick");
//   //  setLoading(false);
//   //  setState(users2);
//   setPage(page+1);
//   console.log("page is : ",page);
//   update();
//   };
//   */

//   const fetchMoreData = () => {
//     page=page+1;
//     console.log("page is: ",page);
//     // console.log("page no: ",page);
//     axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7decbbaa90446eacbfc3017ee43b35&page=${page}&pageSize=${pagesize}`).then((response) => {
//       // setState(response.data);
//       // state.articles.concat(response.data);
//       // setState(response.data.articles);
//       console.log("concat : ",response.data);
//       settotalresults(response.totalResults);
//       console.log("state iss : ",state);
//       console.log(state.concat(response.data.articles));
//       setState(state.concat(response.data.articles));
//     });
//   };


//   useEffect(() => {
//     console.log("loading");
//     setLoading(true);
//     update();
//     // eslint-disable-next-line 
//   },[]);


//   return (
//     <div className='container'>
//      <h1 className='mx-3'>NEWS TOP-Headings</h1>
//       {loading && <Spinner/>}

//       <InfiniteScroll
//           dataLength={state.articles.length}
//           next={fetchMoreData}
//           hasMore={state.articles.length!==state.totalResults}
//           loader={<Spinner/>}
//         >

//       <div className="row my-3 mx-3 ">
 
//       {state.articles.map((state)=>{  
//          return  <div className="col-md-4 d-flex flex-wrap" key={state.url}>
//          <Newsitem title={state.title} description={state.description} imageurl={state.urlToImage} newsurl={state.url} date={state.publishedAt} author={state.author}/>
//          </div>
//       })}
//       </div>
//          </InfiniteScroll>

//        {/* <div className="container d-flex justify-content-between">
//       <button type="button" disabled={page<=1} className="btn btn-dark btn-lg" onClick={prevClick}>&larr;Prev</button>
//       <button type="button" className="btn btn-dark btn-lg" onClick={nextClick}>Next&rarr;</button>
//       </div> */}
     
//     </div>
//   )
// }

// News.defaultProps = {
//  country: "in",
//  category: "general"
// }

// News.propTypes = {
//   country: PropTypes.string,
//   category: PropTypes.string
// };

// export default News;