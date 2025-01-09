import {useEffect} from "react";
import {Link} from "react-router-dom";





const BlogListComponents = () => {

    const {getBlogPost, blogPostList} = BlogPostStore();

    useEffect(() => {
        (async () => {
            await getBlogPost();
        })()
    }, []);



    return (
        <div className="container-fluid">
            <div className="container blog">
                <div className="row">
                    <div className="col-12">
                        <p>Total blogs: {blogPostList != null && blogPostList.length}</p>
                    </div>
                </div>
                <div className="row gx-4 gy-3">
                    {
                        blogPostList !== null && blogPostList.map((item, i) => {
                        return (
                            <>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card shadow-sm mb-4 overflow-hidden" key={i}>
                                        <img className="zoom card-img" src={item.thumbnail}/>
                                        <div className="card-body">
                                            <div className="card-text my-2 d-flex justify-content-between">
                                                <span className="me-4 text-success">
                                                  <i className="bi bi-person-circle"></i>By: {item.user['userName']}
                                                </span>
                                                <span className="text-success">
                                                    <i className="bi bi-tag"></i>{item.category["categoryName"]}
                                                </span>
                                            </div>
                                            <Link className="nav-link" to={"/blog/"+item.url}>
                                                <h3 className=" card-title fs-5">{item.title}</h3>
                                            </Link>
                                            {/*<p className="card-text">{parse(item.details['details'])}</p>*/}
                                            <div className="card-text my-2 d-flex justify-content-between">
                                                <span className="me-4 text-success">
                                                  <i className="bi bi-calendar"></i>
                                                    {
                                                        new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })
                                                    }
                                                </span>
                                                <span className="text-success">
                                                    <Link className="nav-link" to={item.url}>Read more</Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlogListComponents;
