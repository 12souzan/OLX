import { useLanguage } from '@/context/languageContext';
import styles from '@/styles/Post.module.css'

function Helper() {
    const { messages } = useLanguage();

    return (
        <div className={styles.helpSidebar}>
            <div className={styles.helpCard}>
                <h3 className={styles.helpTitle}>
                    {messages.post.needHelp}
                </h3>
                <p className={styles.helpText}>
                    {messages.post.helpText}
                </p>

                <ul className={styles.helpLinks}>
                    <li>
                        <a href="#" className={styles.helpLink}>
                            {messages.post.tipsImproving}
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.helpLink}>
                            {messages.post.allYouNeed}
                        </a>
                    </li>
                </ul>

                <p className={styles.helpNote}>
                    {messages.post.alwaysComeBack}
                </p>
            </div>
        </div>
    )
}

export default Helper