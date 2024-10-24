import { useTypedSelector } from "../hooks/useTypedSelector";
import { CartNotifyModal } from "../components/cartNotifyModal/CartNotifyModal";
import HeroBlocks from "../components/heroBlocks/HeroBlocks";
import Portal from "../components/portal/portal";

const MainPage = () => {
  const { orderStatus } = useTypedSelector((state) => state.cart);

  return (
    <>
      <HeroBlocks />
      {orderStatus === "success" && (
        <Portal>
          <CartNotifyModal>
            <p>Thank you for your order!</p>
          </CartNotifyModal>
        </Portal>
      )}
    </>
  );
};

export default MainPage;
