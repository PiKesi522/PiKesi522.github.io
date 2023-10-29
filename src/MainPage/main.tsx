import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const BlogDom = (props: { title: string }): JSX.Element => {
  const { title } = { ...props } || "";
  return (
    <div className={"BlogDom-" + title}>
      {title}
    </div>
  )
}

const BlogContent = (): JSX.Element => {
  return (
    <Router>
      <Link to={'/resume'}>
        <BlogDom title="resume" />
      </Link>
      <Link to={'/study'}>
        <BlogDom title="study" />
      </Link>
      <Link to={'/article'}>
        <BlogDom title="article" />
      </Link>
      <Link to={'/gallery'}>
        <BlogDom title="gallery" />
      </Link>
      <Routes>
        <Route path='/resume' element={<BlogDom title="resume1" />} />
        <Route path='/study' element={<BlogDom title="resume2" />} />
        <Route path='/article' element={<BlogDom title="resume3" />} />
        <Route path='/gallery' element={<BlogDom title="resume4" />} />
      </Routes>

    </Router>
  )
}

const Title = (): JSX.Element => {
  return (
    <>
      <div className='title'>
        This is my Blog
      </div>
    </>
  );
}

function Main(): JSX.Element {
  return (
    <div className='layout'>
      <Title />
      <BlogContent />
    </div>
  );
}

export default Main;
