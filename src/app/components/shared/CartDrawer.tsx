import { Drawer as MantineDrawer } from "@mantine/core";

interface ICartDrawerProps {
  /** Boolean indicating whether the drawer is open. */
  openDrawer: boolean;
  /** Boolean indicating whether the drawer is open. */
  closeDrawer: () => void;
}

export const CartDrawer: React.FC<ICartDrawerProps> = ({
  openDrawer,
  closeDrawer,
}) => {
  return (
    <>
      <MantineDrawer
        opened={openDrawer}
        onClose={closeDrawer}
        position="right"
        title="My cart"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div>Fon</div>
      </MantineDrawer>
    </>
  );
};
