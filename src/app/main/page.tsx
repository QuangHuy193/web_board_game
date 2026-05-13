import Header from "@/components/mainPage/Header";
import MenuGame from "@/components/mainPage/MenuGame";

export default function Main() {
  return (
    <div>
      <div className="sticky">
        <Header />
      </div>
      <div>
        <MenuGame />
      </div>
    </div>
  );
}
