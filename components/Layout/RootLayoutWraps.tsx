import Navbar from "../Navbar";
import Footer from "../Footer";
import FloatingWidgets from "../Provider/FloatingWidgets/FloatingWidgets";

// app/technology/layout.tsx
export default function RootLayoutWraps({ children }: { children: React.ReactNode }) {

    return (
        <main className="tech-container">
            <Navbar />
            {children}
            <Footer />

            <FloatingWidgets />
        </main>
    );
}