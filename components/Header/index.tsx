import { Columns, Grid } from 'react-feather';

type Props = {
    toggleView: (view: boolean) => void;
    view: boolean;
};

export default function Header({ toggleView, view }: Props) {
    return (
        <header className="header-container">
            <button className="custom-button" onClick={() => toggleView(!view)}>
                {view ? <Columns /> : <Grid />}
            </button>
        </header>
    );
}
