import Image from 'next/image';
import { DataType } from '../../pages';
import { motion } from 'framer-motion';
import { defaultTransition } from '../../utils/transition';
import { useRouter } from 'next/router';

type Props = {
    element: DataType;
    index: number;
};

export default function ImageLink({ index, element }: Props) {
    const router = useRouter();
    const navigateTo = () => {
        router.push({
            pathname: `/detail/${element.slug}`,
            query: { cover: element.cover, title: element.title },
        });
    };
    return (
        <motion.img
            whileHover={{ scale: 1.1 }}
            onClick={() => navigateTo()}
            className="image-link-item"
            layoutId={`container-${index}`}
            transition={defaultTransition}
            src={element.cover}
            alt={element.slug}
        />
    );
}
