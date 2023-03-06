import React from 'react'

export default function Newsitem(props) {
    
    const {title,description,imageUrl,newsurl,author,date}=props;

  return (
    <div>
      <div className="card mx-3 my-3 d-flex">
  <img src={imageUrl?imageUrl:""} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title?title.slice(0,20):""}...</h5>
    <p className="card-text">{description?description:""}...</p>
    <p className='card-text'><small className='text-muted'>By {author?author:"undefined"} on {date?new Date(date).toGMTString():"unKnown"}</small></p>
    <a rel="noreferrer" href={newsurl} target="_blank" className='btn btn-sm btn-dark'>Read More</a>
  </div>
</div>
    </div>
  )
}