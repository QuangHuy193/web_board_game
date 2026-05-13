import Header from "@/components/homePage/Header";
import Welcome from "@/components/homePage/Welcome";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/background_home.png')",
      }}
    >
      <div className="fixed top-3 right-3">
        <Header />
      </div>
      <div className=" min-h-screen flex items-center justify-center">
        <Welcome />
      </div>
    </div>
  );
}
