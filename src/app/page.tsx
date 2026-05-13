import Welcome from "@/components/homePage/Welcome";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/background_home.png')",
      }}
    >
      <div className="fixed top-3 right-3">
        <Button variant="primary" size="sm" scale={105}>
          Đăng nhập
        </Button>
      </div>
      <div className=" min-h-screen flex items-center justify-center">
        <Welcome />
      </div>
    </div>
  );
}
