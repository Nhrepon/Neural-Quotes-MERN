import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";


const AboutPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center my-5">
                            <h2 className='fs-1 fw-bold'>About us</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                Neural Quotes is more than just a collection of words—it's a source of daily
                                inspiration, motivation, and wisdom. Our carefully curated library features quotes from
                                great minds across history, including philosophers, authors, leaders, and visionaries.
                                Whether you're seeking encouragement, deep reflection, or a fresh perspective, our
                                platform ensures you find the right words at the right time.
                            </p>
                            <h2>
                                Why Neural Quotes?
                            </h2>
                            <p><strong>Curated Wisdom</strong> – A diverse collection of quotes spanning various topics,
                                emotions, and life experiences.
                            </p>
                            <p><strong>Smart Recommendations</strong> – Discover quotes that match your mood and
                                interests through an intelligent suggestion system.
                            </p>
                            <p><strong>Daily Inspiration</strong> – Start your day with powerful words that encourage
                                personal growth and positivity.
                            </p>
                            <p><strong>Share & Save</strong> – Keep your favorite quotes close and share them with
                                others to spread inspiration.
                            </p>
                            <p><strong>Timeless & Modern Voices</strong> – Explore both classic wisdom and contemporary
                                insights from thought leaders around the world.
                            </p>
                            <p>At Neural Quotes, we believe that the right words have the power to inspire change, spark
                                ideas, and transform lives. Let these words accompany you on your journey of
                                self-discovery and motivation.
                            </p>
                            <p>Stay inspired. Stay empowered.</p>


                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default AboutPage;