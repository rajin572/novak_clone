import About from "@/component/Home/About";
import Banner from "@/component/Home/Banner";
import Projects from "@/component/Home/Projects";
import StackingCards from "@/component/Home/StackingCards";
import Stickygrid from "@/component/Home/Stickygrid";
import Works from "@/component/Home/Works";
import HorizontalScroll from "@/component/ui/animation/components/HorizontalScroll";

const page = () => {
  return (
    <div>
      <Banner />
      <About />
      {/* <Stickygrid /> */}
      <Works />
      <StackingCards />
      <HorizontalScroll />
      <Projects />
    </div>
  );
};

export default page;
