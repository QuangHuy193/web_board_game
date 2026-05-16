import { useUserStore } from "@/stores/useUserStore";
import Button from "../ui/Button";
import UserName from "../ui/UserName";
import { useOpenForm } from "@/stores/useOpenForm";

const Header = () => {
  const { user } = useUserStore();
  const { setopenForm } = useOpenForm();

  return (
    <div className="flex justify-end px-3 py-3">    
      <div>
        {user ? (
          <UserName />
        ) : (
          <Button
            onClick={() => {
              setopenForm("login");
            }}
            variant="primary"
            size="sm"
            scale={105}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
