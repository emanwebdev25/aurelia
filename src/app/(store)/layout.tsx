import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AnnouncementBar />
            <Navbar />
            {children}
        </>
    );
}