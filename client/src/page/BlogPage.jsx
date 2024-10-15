import React from 'react';
import MasterLayout from '../layout/MasterLayout';
import BlogListComponents from '../components/blog/BlogListComponents';

const BlogPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-5">
                            <h2>All Blogs</h2>
                            <hr />
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <BlogListComponents/>

        </MasterLayout>
    );
};

export default BlogPage;