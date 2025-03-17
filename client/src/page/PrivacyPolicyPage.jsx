import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import {Link} from "react-router-dom";

const PrivacyPolicyPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-5">
                            <h2 className="fs-1 fw-bold text-center">Privacy Policy</h2>
                            <hr/>
                            <p><strong>Last Updated: 17th May, 2024</strong></p>

                            <p>Welcome to <strong>Neural Quotes</strong>! Your privacy is important to us, and we are
                                committed to
                                protecting your personal information. This Privacy Policy explains how we collect, use,
                                and
                                safeguard
                                your data when you use our services.</p>

                            <h2>1. Information We Collect</h2>
                            <ul>
                                <li><strong>Personal Information:</strong> If you sign up or interact with certain
                                    features,
                                    we may
                                    collect your name, email address, or other details you provide.
                                </li>
                                <li><strong>Usage Data:</strong> We may collect data related to how you interact with
                                    the
                                    platform, such
                                    as favorite quotes, search history, and app preferences.
                                </li>
                                <li><strong>Device Information:</strong> Information about the device you use, including
                                    model,
                                    operating system, and unique identifiers.
                                </li>
                                <li><strong>Cookies & Tracking Technologies:</strong> We use cookies and similar
                                    technologies to enhance
                                    user experience and analyze usage patterns.
                                </li>
                            </ul>

                            <h2>2. How We Use Your Information</h2>
                            <ul>
                                <li>To personalize your experience and provide relevant quote recommendations.</li>
                                <li>To improve our services, content, and user experience.</li>
                                <li>To communicate updates, promotions, or important notices (if you opt-in).</li>
                                <li>To ensure security, detect fraud, and comply with legal obligations.</li>
                            </ul>

                            <h2>3. Sharing of Information</h2>
                            <p>We do not sell, trade, or rent your personal information to third parties. However, we
                                may
                                share
                                information with:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> Trusted third-party services that help us
                                    operate
                                    and improve
                                    our platform.
                                </li>
                                <li><strong>Legal Requirements:</strong> If required by law, we may disclose information
                                    to
                                    comply with
                                    legal obligations or protect our rights.
                                </li>
                            </ul>

                            <h2>4. Data Security</h2>
                            <p>We take appropriate security measures to protect your personal information from
                                unauthorized
                                access,
                                alteration, or disclosure. However, no method of transmission over the internet is 100%
                                secure.</p>

                            <h2>5. Your Choices & Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access, update, or delete your personal information.</li>
                                <li>Opt-out of receiving promotional communications.</li>
                                <li>Disable cookies through your browser settings.</li>
                            </ul>

                            <h2>6. Third-Party Links</h2>
                            <p>Neural Quotes may contain links to external websites. We are not responsible for the
                                privacy
                                practices of
                                third-party sites.</p>

                            <h2>7. Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this
                                page
                                with a
                                revised date. We encourage you to review it periodically.</p>

                            <h2>8. Contact Us</h2>
                            <p>If you have any questions or concerns about this Privacy Policy, please contact us
                                at:</p>
                            <p><strong>Email:</strong> admin@neuralquotes.com <strong>or</strong> use the <Link to="/contact">contact form</Link> page on our website</p>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>

    );
};

export default PrivacyPolicyPage;