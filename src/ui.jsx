import { Link } from "react-router-dom";

// It's a common title for all section
export const SectionTitle = ({section, title}) => {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-[16px] tracking-widest text-gray-400 font-medium uppercase">
          {section}
        </p>
        <h2 className="text-[25px] capitalize lg:text-[35px] font-bold text-secondBlack">
          {title}
        </h2>
      </div>
    );
  };

  // For Dark Logo
  export const LogoDark = ()=>{
    return(
        <Link to="/" className="text-secondBlack font-[700] text-[22px]">Daily <span className="text-primary">Blog</span></Link>
    )
  }

  // For White Logo
  export const LogoWhite = ()=>{
    return(
        <Link to="/" className="text-secondBlack font-[700] text-[22px]">Daily <span className="text-white">Blog</span></Link>
    )
  }