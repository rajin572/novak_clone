import About from "@/component/Home/About";
import Banner from "@/component/Home/Banner";
import Projects from "@/component/Home/Projects";
import Works from "@/component/Home/Works";

const page = () => {
  return (
    <div>
      <Banner />
      <About />
      <Works />
      <Projects />
    </div>
  );
};

export default page;
