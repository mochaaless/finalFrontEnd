import { PageProps } from "$fresh/server.ts";


export default function Layout ({Component}: PageProps) {
    return (
        <div className="layout">
            <div className="header">
                <nav>
                    <a href="/">Todos</a>
                    <a href="/favorites">Favorites</a>
                </nav>
            </div>
            <Component />
        </div>
    )
}