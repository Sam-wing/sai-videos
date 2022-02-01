import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const video = {
      title: 'Hi cute dog',
      publishTime: '1990-01-01',
      deccription: 'A big red dog that is super cute, can he get any bigger?',
      channelTitle: 'Paramount Pictures',
      viewCount: 10000,
  }

  const { title, publishTime, deccription, channelTitle, viewCount } = video;
  return (
    <div className={styles.container}>
      video page {router.query.videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
                <div className={styles.col1}>
                    <p className={styles.publishTime}>{publishTime}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{deccription}</p>
                </div>
                <div className={styles.col2}>
                    <p className={clsx(styles.subText, styles.subTextsubTextWrapper)}>
                        <span className={styles.textColor}>Cast: </span>
                        <span className={styles.channelTitle}>{channelTitle}</span>
                    </p>
                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                        <span className={styles.textColor}>View Count: </span>
                        <span className={styles.channelTitle}>{viewCount}</span>
                    </p>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
