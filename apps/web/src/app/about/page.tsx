import styles from './About.module.css';
import 'devicon/devicon.min.css';

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            <section className={styles.aboutSection}>
                <div className={styles.aboutContent}>
                    <h2>About</h2>
                    <p>
                        This application was developed as part of a <span>Node.js traineeship </span> @Innowise
                        by <span>Hubert Michalski</span>, from July to December 2025.
                    </p>
                    <br />
                    <p>
                        Innogram is a modern social media platform that aims to mimic <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>.
                        It replicates the core features of the app while being built with
                        scalable architecture and real-time capabilities.
                    </p>
                    <br />
                    <p>
                        For source code click <a href="https://github.com/hubertmichalski/innogram" target="_blank" rel="noopener noreferrer">here</a>.
                    </p>
                </div>
                <div className={styles.logoContainer}>
                    <a href="https://innowise.com" target="_blank" rel="noopener noreferrer">
                        <img src="/Innowise-logo.png" alt="Innowise Logo" className={styles.logo} />
                    </a>
                </div>
            </section>

            <section className={styles.functionalitiesSection}>
                <div className={styles.functionalitiesLogoContainer}>
                    <img src="/cogs.png" alt="Functionalities Logo" className={styles.functionalitiesLogo} />
                </div>
                <div className={styles.functionalitiesContent}>
                    <h2>Main functionalities</h2>
                    <ul>
                        <li><strong>User Accounts:</strong> Register, log in (including Google and GitHub), profile editing, and followers management.</li>
                        <li><strong>Posts:</strong> Creation, editing, and deletion of posts with images, likes, and comments.</li>
                        <li><strong>Real-Time Chat:</strong> Sending and receiving direct messages instantly.</li>
                        <li><strong>Notifications:</strong> Receiving updates for likes, comments, follows, and messages in real time.</li>
                        <li><strong>Admin Panel:</strong> Content moderation, user management and access to app statistics.</li>
                        <li><strong>Performance:</strong> Optimized with caching, message queues, and a microservices-based backend.</li>
                    </ul>
                </div>
            </section>

            <section className={styles.techSection}>
                <h2>Tech Used</h2>
                <div className={styles.techIcons}>
                    <a href="https://nestjs.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-nestjs-plain colored"></i>
                        <span>NestJS</span>
                    </a>
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-nextjs-plain colored"></i>
                        <span>Next.js</span>
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-react-original colored"></i>
                        <span>React</span>
                    </a>
                    <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-nodejs-plain colored"></i>
                        <span>Node.js</span>
                    </a>
                    <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-typescript-plain colored"></i>
                        <span>TypeScript</span>
                    </a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-javascript-plain colored"></i>
                        <span>JavaScript</span>
                    </a>
                    <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-postgresql-plain colored"></i>
                        <span>PostgreSQL</span>
                    </a>
                    <a href="https://jestjs.io" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-jest-plain colored"></i>
                        <span>Jest</span>
                    </a>
                    <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-docker-plain colored"></i>
                        <span>Docker</span>
                    </a>
                    <a href="https://www.rabbitmq.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-rabbitmq-original colored"></i>
                        <span>RabbitMQ</span>
                    </a>
                    <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-git-plain colored"></i>
                        <span>Git</span>
                    </a>
                    <a href="https://grafana.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-grafana-plain colored"></i>
                        <span>Grafana</span>
                    </a>
                    <a href="https://prometheus.io" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-prometheus-original colored"></i>
                        <span>Prometheus</span>
                    </a>
                    <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer" className={styles.techItem}>
                        <i className="devicon-mongodb-plain colored"></i>
                        <span>MongoDB</span>
                    </a>
                </div>
            </section>
        </div>
    );
}

