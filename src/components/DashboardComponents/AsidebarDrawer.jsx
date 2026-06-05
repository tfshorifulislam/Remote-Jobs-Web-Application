'use client';
import { LayoutSideContentLeft } from '@gravity-ui/icons';
import { Button, Drawer } from "@heroui/react";

const AsidebarDrawer = ({ navContent }) => {
    return (
        <Drawer>
            <Button className="lg:hidden" variant="secondary">
                <LayoutSideContentLeft />
                Sidebar
            </Button>
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            {navContent}
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
};

export default AsidebarDrawer;