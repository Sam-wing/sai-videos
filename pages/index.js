import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import { getVideos, getPopularVideos, getWatchItAgainVideos } from "../lib/videos";
import useRedirectUser from "../utils/redirectUser";

export async function GetServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: { watchItAgainVideos, disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
}

export default function Home({
  watchItAgainVideos,
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />

        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
