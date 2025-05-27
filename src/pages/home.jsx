import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  return (
    <>
      <div id="home" className="relative flex h-full p-4 lg:h-screen lg:p-0  content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-white bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-white bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-0 md:mt-14 lg:mt-10   ">
            <div className="ml-auto mr-auto w-full flex flex-col gap-3 px-4 text-left lg:w-8/12">
              <Typography
                variant="h1"
                color="black"
                className="mb-3 font-black main-text"
              >
                Hitung Keuangan Gak Pake Ribet!
              </Typography>
              <Typography variant="lead" color="black" className="opacity-80 mb-1 lg:mb-6">
              Bergabunglah dengan komunitas SnapCash dan nikmati kemudahan mengelola keuangan dalam sekejap.
              </Typography>
              <div className="flex flex-col justify-start items-start w-full sm:flex-col md:flex-col lg:flex-row-reverse lg:justify-end lg:items-center  gap-3">
                <Typography variant="lead" color="black" className="opacity-80 ">
                  Money management app that is integrated with <strong>OCR Make it easier</strong>
                </Typography>
                <a href="https://play.google.com/store/apps/details?id=com.parkshare.id">
                  <div className="w-auto rounded-lg gap-2 p-2 bg-black flex shrink-0">
                      <img src="https://logospng.org/download/play-store/logo-play-store-2048.png" alt="" width={50}/>
                      <div className="flex flex-col  w-full">
                        <Typography variant="small" color="white" className="opacity-80 w-full">
                          GET IT ON
                        </Typography>
                        <Typography variant="h4" color="white" className="opacity-80 w-full">
                          Google Play
                        </Typography>
                      </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="phone-image max-w-full mt-10 ml-auto mr-auto px-4">
              <img src="/img/img-phone-2.png" alt="" className="w-max" />
            </div>
          </div>
        </div>
      </div>
      <section className=" -mt-25 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center mt-10 lg:mt-0">
            <Typography
                variant="h3"
                color="black"
                className="mb-3  relative "
              >
                Fitur Unggulan SnapCash
              </Typography>
              <Typography
                variant="lead"
                color="black"
                className="mb-10 lg:mb-24  relative "
              >
                Nikmati berbagai fitur canggih yang membuat pengalaman pengelolaan keuangan Anda lebih mudah dan efisien.
              </Typography>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-10 h-10  text-white",
                })}
                description={description}
              />
            ))}
          </div>
        
          <div id="about" className="mt-32 flex flex-row-reverse flex-wrap justify-between gap-10 items-center">
            <div className=" -mt-8 w-full lg:w-3/5 flex flex-col items-start px-4 ">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                About App
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                SnapCash adalah aplikasi keuangan yang dirancang untuk membantu Anda mengelola keuangan dengan mudah dan efisien. Dengan teknologi OCR, Anda dapat memindai struk atau invoice untuk mencatat pengeluaran atau pemasukan secara otomatis. Aplikasi ini juga dilengkapi dengan dashboard analitik yang intuitif, memungkinkan Anda untuk memantau dan menganalisis pengeluaran Anda dengan mudah.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
           <div className="phone-image ml-auto mr-auto flex justify-start p-10">
            <img src="/img/image-2.png"  alt="" />
           </div>
          </div>
           
          <div id="cara-pakai" className="mt-32 flex flex-wrap justify-between gap-10 items-center">
            <div className=" -mt-8 w-full lg:w-3/5 flex flex-col items-start px-4 ">
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Cara Kerja
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Mudah dan Cepat: Catat Keuangan dalam Beberapa Langkah Sederhana
              </Typography>
              <div className="flex justify-start items-center gap-5 mb-14">
                <div>
                  <img src="/img/icon-download.png" alt="" width={50} />
                </div>
                <Typography variant="h5" className="font-normal text-blue-gray-500">
                Unduh aplikasi SnapCash dari Google Play atau App Store.
                </Typography>
              </div>
              <div className="flex justify-start items-center gap-5 mb-14 ">
                <div>
                  <img src="/img/icon-account.png" alt="" width={50} />
                </div>
                <Typography variant="h5" className="font-normal text-blue-gray-500">
                Daftarkan akun dan lengkapi profil Anda.
                </Typography>
              </div>
              <div className="flex justify-start items-center gap-5">
                <div>
                  <img src="/img/icon-order.png" alt="" width={50} />
                </div>
                <Typography variant="h5" className="font-normal text-blue-gray-500">
                Scan, Catat, dan Analisa keuangan sesuai kebutuhan Anda.
                </Typography>
              </div>  

            </div>
           <div className="phone-image ml-auto mr-auto flex justify-end">
            <img src="/img/img-home-1.png" className="w-72"  alt="" />
           </div>
          </div>
        </div>
      </section>
      <section id="profile" className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Tim Kami" heading="Here are our heroes">
          Kami bangga memperkenalkan tim pengembang aplikasi kami yang luar biasa. Dengan keahlian dan dedikasi mereka, kami terus berinovasi untuk memberikan solusi terbaik bagi Anda
          </PageTitle>
          <div className="w-full flex flex-wrap justify-center mt-24">
          <div className="w-full md:w-1/4 lg:w-1/5">
          <TeamCard
                
                key={"Hasbi Andi Muttaqin"}
                img={"/img/profile-hasbi.jpg"}
                name={"Hasbi Andi Muttaqin"}
                position={"CEO "}
                socials={
                  <div className="flex items-center gap-2">
                    <a href="https://www.linkedin.com/in/yahyaalfon/">
                      <IconButton key={"linkedin"} color={"blue"} variant="text">
                        <i className={`fa-brands text-xl fa-linkedin`} />
                      </IconButton>
                      </a>
                      <a href="https://www.instagram.com/codeyzx/">
                      <IconButton key={"instagram"} color={"pink"} variant="text">
                        <i className={`fa-brands text-xl fa-instagram`} />
                      </IconButton>
                      </a>
                  </div>
                }
              />
              </div>
          </div>
          <div className="w-full flex flex-wrap justify-center mt-24 gap-28">
            {teamData.map(({ img, name, position, socials }) => (
              <div className="w-full md:w-1/4 lg:w-1/5">
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name, link }) => (
                      <a href={link}>
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                      </a>
                    ))}
                  </div>
                }
              />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
