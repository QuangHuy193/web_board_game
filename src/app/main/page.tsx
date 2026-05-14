import Header from "@/components/mainPage/Header";
import MenuGame from "@/components/mainPage/MenuGame";

export default function Main() {
  return (
    <div className="h-screen bg-[url('/bg_main.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="sticky">
        <Header />
      </div>
      <div className="border w-full border-gray-200 my-3 md:my-5"></div>
      <div>
        <MenuGame />
      </div>
    </div>
  );
}
