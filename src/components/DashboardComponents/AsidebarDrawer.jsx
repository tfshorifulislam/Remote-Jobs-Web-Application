"use client";

import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

const AsidebarDrawer = ({ navContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeDrawer = () => setIsOpen(false);

    return (
        <>

            <Button
                className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-lg border border-zinc-200 rounded-2xl p-3 hover:bg-zinc-50 transition"
                variant="secondary"
                onClick={() => setIsOpen(true)}
            >
                <LayoutSideContentLeft className="text-2xl text-zinc-700" />
            </Button>

            <Drawer
                key={isOpen ? "open" : "close"}
                isOpen={isOpen}
                onClose={closeDrawer}
                placement="left"
            >
                <Drawer.Backdrop
                    className="bg-black/50"
                    onClick={() => setIsOpen(false)}   // ← এটা ফিক্স করা হয়েছে
                />

                <Drawer.Content placement="left" className="w-72 max-w-[85vw]">
                    <Drawer.Dialog className="bg-[#F8FAFC] h-full">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-zinc-200 transition text-xl"
                        >
                            ✕
                        </button>

                        <div
                            className="p-5 h-full overflow-y-auto pt-16"
                            onClick={() => setIsOpen(false)}>
                            {navContent}
                        </div>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer>
        </>
    );
};

export default AsidebarDrawer;