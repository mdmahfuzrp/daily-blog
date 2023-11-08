import { SectionTitle } from "../../../ui";

const reviewData = [
    {
      clientPhoto: "https://s3-alpha-sig.figma.com/img/cff8/bdd8/96f5730df623c29a513f900e76096e77?Expires=1700438400&Signature=qQlcNh2pR3dcCKlTMhVOFYXpYCb-A5rg0bMGcQj6W36f-n~j5b7lBTudkaIsSlmwuU8k6tOsNEaVPXSUIEiwlFmbbaivNfpEB9MqZuv4BOPLGcNipIFO~05uduW42i9wxaKWzAe6hzxThuKVr2mgqNh6VFJ13H3bpCgESzSMGGXWPlZKVjia6X0gB-YxsM~ooNu9JyvcHxSHbavXHrQZrI3Qxdnuc7n4Buf2NMDWo5FKigo6vfE5riT7nzZax-F4NGJaKOgF1szI5x9GFiuzv4lwMBWq55rEphNP0NLHY33qKQeFHC4e8JfYi3kney-u4zLlTJdtbaqrhYtVeDvxjQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      subject: "Product Feedback",
      message: "Get a fully retina-ready site when you build with Startup Framework. Websites look sharper and more gorgeous.",
      name: "John Smith",
    },
    {
      clientPhoto: "https://s3-alpha-sig.figma.com/img/7f1c/d52c/3abc0c088574114b6e075e47d3f56e2d?Expires=1700438400&Signature=g4-a-YBCEe8VmBNpIWCpBF4DuRYXyqXjCwbL1FGLqdCwC1BZHvgBVdqWltiu5OREdiuxWK4AxQeCObmc3CzRjexRekVf0AzPQkJJGJspB~J23udfrfFt9AWQrrUjXQ7fPLXivsgpYztcLFBjR6gR4ZYd-YvHz9i5yV8Oc7~2rsy5fVUUYiveZNvE832pCl5eDg2uS6OkO4mHqszAdfs627Rw1CF6wbp61KXaEEA8S3WT-q1Ueb0pVgbSWWlK5Nga75rfO4NlwoCFQnucDC7jv-6D41oDOfmaDUiXB7vDe3CuaiCkaO0UxVf0E2AJM2-M4BrNHAHFRAdzdZI~rnbLDg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      subject: "Customer Support",
      message: "Your customer support team is amazing. They resolved my issue in no time. Get a fully retina-ready site when you build with Startup.",
      name: "Emily Johnson",
    },
    {
      clientPhoto: "https://s3-alpha-sig.figma.com/img/7564/5600/72a370fe89de05f070dc21b436a016f9?Expires=1700438400&Signature=pP1bhMwVjwWBDxhzDbWiwN6mPlWB6SsrZDyYlMr-xhbkBNJjbp8yTCha-p-xVcCBtRa1Ny4Il3jveDXtpfVjEkUKdgRdoaqHZDTYMi3zKfE~Ig~i0fOCIgw508-ZFo1b6XbsoeI9SLz4QTBB9eguep1VvKnG4ZX~zK9o-beUFXlEviSi4uMbtC-OTRzX8v4S4jZ0sJDIlqbOUnqFpGHHheD5Vt3McwS2XKpSHMuEZWRe9rw1OFvLMpkUkGV2W18nDCFETf3FVNlfONg8HdCUyUUoOH6SwCXP8MPW6ELx6QRLQnqEylYSP959r3LBA8eaOsDcqnVDJDjZ5~pWvtebpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      subject: "Thank You Note",
      message: "Thank you for the outstanding service. I'm a happy customer! Get a fully retina-ready site when you build with Startup Framework.",
      name: "Sarah Davis",
    },
    {
      clientPhoto: "https://s3-alpha-sig.figma.com/img/52f4/8851/823c044130bb9c6a45382f0ac4b4cc12?Expires=1700438400&Signature=XWAL15sbucEgXtpmBEZB2N6REmH284rMmIBv7YwR7~3O2rp5aFh1-fchxkKmS2CdGCGohzZjtj2i~IqEKCCt2w~wShdSm9LR-vWoU6ORrBka19gYbdB7OzqvJOcZEgCsKxJkBADRNH8iHL7EAgZlpQSLGfqz-uRdRKbgB5IzcM~g~ueR3-3vnJZXo5jvJ5WgYcMm0ahMWQdy2QWKOD7VciHXdrxcuZTd7dGM8sqpuhF7QkY~nWk5OT5fr5UJWPPJfheDAkosH8LSvFuXi5SUxzskD0AADK1AG1jIrXBfnfGV5fsTl13S0rI4Wo8ib~hPFAqwZpMI0LGPX3~nmgeSCA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      subject: "Testimonial",
      message: "I highly recommend your services to everyone. Exceptional quality! Get a fully retina-ready site when you build with Startup Framework.",
      name: "David Brown",
    },
  ];

  
const Testimonial = () => {
  return (
    <div className="max-w-[1000px] mx-auto font-ageo my-[100px]">
      
      <SectionTitle section="Testimonial" title="Our Most Popular Reviews" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-7 mt-5">
{
    reviewData.map((review, i) =>(
        <div key={i} className="flex flex-col sm:flex-row gap-[20px] items-start w-full sm:max-w-[450px]">
            <div>
                <img src={review?.clientPhoto} className="max-w-[50px] mt-[5px] rounded-md" alt="" />
            </div>
            <div className="text-left">
                <p className="text-[15px] leading-6 text-secondary tracking-wide font-medium mb-2">{review?.message}</p>
                <h3 className="text-[16px] tracking-wider text-gray-400 font-medium uppercase">{review?.name}</h3>
            </div>
        </div>
    ))
}
      </div>
    </div>
  );
};

export default Testimonial;
