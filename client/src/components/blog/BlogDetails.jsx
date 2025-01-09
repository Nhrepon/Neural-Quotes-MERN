import {useParams} from "react-router";
import parse from "html-react-parser";
import './blogDetails.css';
import BlogPostStore from "../../admin/store/BlogPostStore.js";
import {sitename} from "../../config.js";

const BlogDetails = () => {

    const {url} = useParams();

    const {blogPostList} = BlogPostStore();



    const details = blogPostList?.find(blogPostList => blogPostList.url === url);



    return (

            <div className="container">
                <div className="row">
                    <div className="blogDetails col-12">
                        <span className="mt-5 py-3 small">{sitename + " " + window.location.pathname.split("/").join(" > ")}</span>
                        <h2 className="mt-5 fw-bold fs-2 text-center mx-auto col-12 col-md-8">{details.title}</h2>
                        <div className="text-center mx-auto">
                            <span className="me-4">
                                <i className="bi bi-person-circle"> </i> {details.user['userName']}
                            </span>
                            <span className="me-4">
                                <i className="bi bi-calendar"> </i>
                                {
                                    new Date(details.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                }
                            </span>
                            <span>
                                <i className="bi bi-tag"> </i> {details.category["categoryName"]}
                            </span>


                        </div>
                        <div className="d-flex my-5 ">
                            <img className="rounded mx-auto col-12 col-md-6" src={details.thumbnail}
                                 alt={details.title}/>
                        </div>
                        <div className="d-flex content">
                            <div className="mx-auto col-12 col-md-8">{parse(details.details['details'])}</div>
                        </div>


                    </div>
                </div>
            </div>

    );
};

export default BlogDetails;