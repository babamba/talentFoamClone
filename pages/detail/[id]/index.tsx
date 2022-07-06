import type { NextPage } from 'next';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { defaultTransition } from '../../../utils/transition';
import HomeButton from '../../../components/HomeButton';
import Loader from '../../../components/Loader';

const variants: Variants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

const Detail: NextPage = () => {
    const router = useRouter();
    const control = useAnimation();

    const {
        query: { id, cover, title },
    } = router;

    useEffect(() => {
        setTimeout(() => {
            control.start({
                opacity: 0,
                transition: defaultTransition,
            });
        }, 2000);
    }, []);

    return (
        <>
            {title && (
                <Loader
                    title={Array.isArray(title) ? title.join() : title}
                    loaderControls={control}
                />
            )}

            <HomeButton />
            <div className="model-conatiner">
                <div className="image-wrapper">
                    {cover && (
                        <motion.img
                            variants={variants}
                            initial={'initial'}
                            animate={'animate'}
                            src={Array.isArray(cover) ? cover.join() : cover}
                            transition={{ defaultTransition, delay: 2 }}
                        ></motion.img>
                    )}
                </div>
            </div>
        </>
    );
};

export default Detail;
