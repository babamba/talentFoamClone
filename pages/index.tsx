import type { NextPage } from 'next';
import Head from 'next/head';
import jsonData from '../data.json';
import { useEffect, useRef, useState } from 'react';
import ImageLink from '../components/ImageLink';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useAnimation, motion, useMotionValue, useSpring } from 'framer-motion';
import { defaultTransition } from '../utils/transition';
import { useHorizontalScroll } from '../utils/useHorizontalScroll';

export type DataType = {
    cover: string;
    title: string;
    color: string;
    slug: string;
};

const gridUtils = [600, 400, 600, 800, 600];

const Home: NextPage = () => {
    const [initial, setInitial] = useState(false);
    const [gridVisible, setGridVisible] = useState(true);
    const mapData: DataType[] = Array.from(jsonData);
    const scrollRef = useHorizontalScroll();
    const gridRef = useRef<HTMLDivElement | null>(null);
    // const loaderControls = useAnimation();
    const animation = useAnimation();
    const bgColor = useMotionValue('black');
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        async function sequence() {
            await animation.set((index) => ({
                y: gridUtils[index % 5],
                scale: 1.1,
            }));

            await animation.start(() => ({
                y: 0,
                transition: defaultTransition,
            }));

            bgColor.set('white');

            await animation.start({
                scale: 1,
                transition: defaultTransition,
            });
        }

        sequence();

        // setTimeout(() => {
        //     loaderControls.start({
        //         opacity: 0,
        //         transition: {
        //             defaultTransition,
        //         },
        //     });

        //     sequence();
        // }, 2000);
        console.log('initial : ', initial);
        setInitial(true);
    }, []);

    const handleGridParallax = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (gridRef.current) {
            const speed = 10;
            const { width, height } = gridRef.current.getBoundingClientRect();
            const offsetX = event.pageX - width * 0.5;
            const offsetY = event.pageY - height * 0.5;

            const newTransformX = (offsetX * speed) / 100;
            const newTransformY = (offsetY * speed) / 100;

            x.set(newTransformX);
            y.set(newTransformY);
        }
    };

    const xMotion = useSpring(x, { stiffness: 400, damping: 90 });
    const yMotion = useSpring(y, { stiffness: 400, damping: 90 });

    return (
        <>
            {/* <Loader title={'Cities'} loaderControls={loaderControls} /> */}
            <Header
                view={gridVisible}
                toggleView={(value) => setGridVisible(value)}
            />
            <motion.div
                className="content"
                style={{
                    backgroundColor: bgColor,
                    transition: 'background-color 1.25s ease-in-out',
                }}
            >
                {gridVisible && (
                    <div className="grid-container">
                        <motion.div
                            onMouseMove={handleGridParallax}
                            ref={gridRef}
                            className="grid-elements"
                            transition={defaultTransition}
                            style={{
                                x: xMotion,
                                y: yMotion,
                            }}
                        >
                            {mapData.map((element, index) => (
                                <motion.div
                                    className="element"
                                    key={index}
                                    animate={animation}
                                    custom={index}
                                >
                                    <div className="thumbnail-wrapper">
                                        <ImageLink
                                            element={element}
                                            index={index}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}
                {!gridVisible && (
                    <div
                        className="list-elements"
                        ref={scrollRef}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {mapData.map((element, index) => (
                            <div className="element" key={index}>
                                <ImageLink element={element} index={index} />
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </>
        // <div className={styles.container}>
        //     <Head>
        //         <title>Create Next App</title>
        //         <meta
        //             name="description"
        //             content="Generated by create next app"
        //         />
        //         <link rel="icon" href="/favicon.ico" />
        //     </Head>

        //     <main className={styles.main}>
        //         <h1 className={styles.title}>
        //             Welcome to <a href="https://nextjs.org">Next.js!</a>
        //         </h1>

        //         <p className={styles.description}>
        //             Get started by editing{' '}
        //             <code className={styles.code}>pages/index.tsx</code>
        //         </p>

        //         <div className={styles.grid}>
        //             <a href="https://nextjs.org/docs" className={styles.card}>
        //                 <h2>Documentation &rarr;</h2>
        //                 <p>
        //                     Find in-depth information about Next.js features and
        //                     API.
        //                 </p>
        //             </a>

        //             <a href="https://nextjs.org/learn" className={styles.card}>
        //                 <h2>Learn &rarr;</h2>
        //                 <p>
        //                     Learn about Next.js in an interactive course with
        //                     quizzes!
        //                 </p>
        //             </a>

        //             <a
        //                 href="https://github.com/vercel/next.js/tree/canary/examples"
        //                 className={styles.card}
        //             >
        //                 <h2>Examples &rarr;</h2>
        //                 <p>
        //                     Discover and deploy boilerplate example Next.js
        //                     projects.
        //                 </p>
        //             </a>

        //             <a
        //                 href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        //                 className={styles.card}
        //             >
        //                 <h2>Deploy &rarr;</h2>
        //                 <p>
        //                     Instantly deploy your Next.js site to a public URL
        //                     with Vercel.
        //                 </p>
        //             </a>
        //         </div>
        //     </main>

        //     <footer className={styles.footer}>
        //         <a
        //             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Powered by{' '}
        //             <span className={styles.logo}>
        //                 <Image
        //                     src="/vercel.svg"
        //                     alt="Vercel Logo"
        //                     width={72}
        //                     height={16}
        //                 />
        //             </span>
        //         </a>
        //     </footer>
        // </div>
    );
};

export default Home;
