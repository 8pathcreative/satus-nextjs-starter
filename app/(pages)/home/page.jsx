import { Wrapper } from '../(components)/wrapper'
import SectionHeadingTitle from '../../../components/section-heading/section-heading-title';
import styles from './home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <Wrapper theme="red" lenis={{}}>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className={`${styles.threadPattern} ${styles.animated}`}></div>
      <SectionHeadingTitle title="Design Engineer" subtitle="Design by day, Code by night." />
      </section>
    </Wrapper>
  )
}
