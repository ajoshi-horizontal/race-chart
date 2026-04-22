type PageHeaderProps = {
    title: string;
}

export default function PageHeader({title}: PageHeaderProps) {
    return (
    <header className="mb-4">
        <h1 className="m-0 text-3xl font-bold">{title}</h1>
    </header>
);
}