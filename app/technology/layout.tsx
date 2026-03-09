// app/technology/layout.tsx
export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="tech-container">
            <section>{children}</section>
        </div>
    );
}