import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import {Link} from "react-router-dom";

const TermsAndConditionPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="fs-1 fw-bold text-center mt-5">Terms And Condition</h2>
                            <hr/>
                            <p><strong>Last Updated: 17th May, 2024</strong></p>

                            <p>Welcome to <strong>Neural Quotes</strong>. By using our platform, you agree to comply
                                with and be bound by the following terms and conditions. Please read them carefully.</p>

                            <h2>1. Acceptance of Terms</h2>
                            <p>By accessing or using Neural Quotes, you acknowledge that you have read, understood, and
                                agreed to these Terms and Conditions. If you do not agree, please do not use our
                                services.</p>

                            <h2>2. Use of Services</h2>
                            <ul>
                                <li>Neural Quotes provides quotes for personal inspiration and educational purposes.
                                </li>
                                <li>You agree not to misuse the platform or engage in unlawful activities while using
                                    our services.
                                </li>
                                <li>We reserve the right to modify, suspend, or discontinue any part of the service
                                    without prior notice.
                                </li>
                            </ul>

                            <h2>3. User Content</h2>
                            <ul>
                                <li>Users may interact with quotes and save favorites, where applicable.</li>
                                <li>Any content you submit should not violate any laws or infringe upon the rights of
                                    others.
                                </li>
                                <li>We reserve the right to remove any content that is inappropriate or violates our
                                    policies.
                                </li>
                            </ul>

                            <h2>4. Intellectual Property</h2>
                            <p>All content on Neural Quotes, including text, design, and logos, is the property of
                                Neural Quotes or its content providers. You may not use, reproduce, or distribute it
                                without permission.</p>

                            <h2>5. Disclaimer of Warranties</h2>
                            <p>Neural Quotes is provided "as is" without warranties of any kind. We do not guarantee the
                                accuracy, completeness, or reliability of any quotes or content.</p>

                            <h2>6. Limitation of Liability</h2>
                            <p>We are not liable for any damages resulting from the use or inability to use our
                                services, including direct, indirect, incidental, or consequential damages.</p>

                            <h2>7. Changes to Terms</h2>
                            <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be
                                posted on this page, and continued use of our services constitutes acceptance of the
                                updated terms.</p>

                            <h2>8. Contact Us</h2>
                            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                            <p><strong>Email:</strong> admin@neuralquotes.com <strong>or</strong> use the <Link to="/contact">contact form</Link> page on our website</p>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default TermsAndConditionPage;