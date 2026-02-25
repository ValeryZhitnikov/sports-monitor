import Link from "next/link";

interface Props {
    title: string;
}

export const PageHeading = () => {
    return (
        <ul>
            <li><Link href={`/`}>Главная</Link></li>
            <li><Link href={`/football/teams/`}>Teams</Link></li>
            <li><Link href={`/football/teams/529`}>Barcelona</Link></li>
            <li><Link href={`/football/teams/33`}>MU</Link></li>
        </ul>
    )
}