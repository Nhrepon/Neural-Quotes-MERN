import React from 'react';
import {Link} from "react-router-dom";

const DashboardCard = ({data}) => {
    return (
        <div className="card shadow my-2">
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <hr/>
                <p className="card-text">Total quotes found: {data.count}</p>
                <p className="card-text">Total quote love: {data.love}</p>
                <p className="card-text">Total quote views: {data.views}</p>
                <Link to={data.url} className="btn btn-success">{data.text}</Link>
            </div>
        </div>
    );
};

export default DashboardCard;