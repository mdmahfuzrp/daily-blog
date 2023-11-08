import { toast } from "react-toastify";
import subscribeMail from "../../../assets/subscribe.png";
import { SectionTitle } from "../../../ui";

const Subscribe = () => {
  const handleSubscribe = (e) =>{
    e.preventDefault();
    const form = e.target;
    const email = form.subscribeEmail.value;

    const isValid = email.split('@')[1]
    
    if(isValid !== 'gmail.com'){
      toast.error('We accept only gmail.com')
      return;
    }

    toast.success('Thanks for subscribe')
  }
  return (
    <div className="max-w-[1000px] mx-auto font-ageo mb-[100px] mt-[-20px]">
      <div className="font-ageo w-full flex flex-col items-center justify-center mb-7">
        <SectionTitle section="Subscribe" title="Subscribe Our Newsletter" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-evenly gap-4">
        <div>
          <img
            src={subscribeMail}
            className="w-full max-w-[200px] md:max-w-[250px]"
            alt=""
          />
        </div>
        <form className="w-full max-w-[500px] flex items-center justify-center flex-col " onSubmit={handleSubscribe}>
          <p className="text-center md:text-left text-[#7d7d7d]">
            Unlock exclusive benefits by subscribing to our newsletter today.
            Join our community of enthusiasts and enjoy a world of
            premium content and special events.
          </p>
          <input
            type="text"
            className="border shadow-lg rounded-full outline-none  w-full mt-7 mb-8 py-[10px] px-5 md:px-7 text-[18px] font-ageo"
            placeholder="Join with us using email"
            name="subscribeEmail"
            required
          />
          <button type="submit" className="text-base w-full bg-primary text-white tracking-wide py-[6px] px-[10px] rounded-[20px] hover:shadow-xl font-medium font-dm shadow-md hover:bg-darkPrimary">
            Do Subscribe Newsletter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
