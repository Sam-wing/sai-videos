import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canClick, setCanClick] = useState("");
  const router = useRouter();

  useEffect(() => {
      const handleComplete = () => {
          setIsLoading(false);
          setCanClick("");
      }
      router.events.on('routeChangeComplete', 
      handleComplete);
      router.events.on('routeChangeError', 
      handleComplete);

      return () => {
          router.events.off('routeChangeComplete',
          handleComplete);
          router.events.off('routeChangeError',
          handleComplete);
      }
  }, [router]);
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    console.log("hi button");
    e.preventDefault();
    setIsLoading(true);
    setCanClick("disabled");
    if (email) {
        try {
          setIsLoading(true);
          setCanClick("disabled");
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log(didToken);
          if (didToken) {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${didToken}`,
                'Content-Type': 'application/json'
              }
            });

            const loggedInResponse = await response.json();
            if (loggedInResponse.done) {
              console.log({ loggedInResponse });
              router.push("/");
            } else {
              console.error("something went wrong logging in");
              setIsLoading(false);
            }
          }
        } catch (error) {
          // Handle errors if required!
          console.error("something went wrong logging in", error);
          setIsLoading(false);
          setCanClick("");
        }
    } else {
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
      setCanClick("");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src={"/static/netflix.svg"}
                  alt="Netfiex logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          ></input>

          <p className={styles.userMsg}>{userMsg}</p>

          <button disabled={canClick} onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
