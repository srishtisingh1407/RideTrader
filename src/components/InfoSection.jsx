import React from "react";

function InfoSection() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src="https://cdn.prod.website-files.com/5eb4cf4dd47d715c00e6548b/620d13b8cc4a22d5086c0228_first-test-drive-handsome-young-man-ready-to-make-2021-09-02-11-59-34-utc.JPG"   className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
               Go hassle free on your car purchase!
              </h2>

              <p className="mt-4 text-gray-600">
              Our car trading and renting company offers a seamless experience for buying, selling, and renting vehicles. With a diverse selection of high-quality cars, competitive pricing, and exceptional customer service, we ensure a hassle-free journey for all your automotive needs.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded bg-blue1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue2 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



export default InfoSection