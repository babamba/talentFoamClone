import Link from 'next/link';
import { ArrowLeft } from 'react-feather';

export default function HomeButton() {
    return (
        <div className="home-button">
            <div className="custom-button">
                <Link href={'/'} replace>
                    <ArrowLeft />
                </Link>
            </div>
        </div>
    );
}
