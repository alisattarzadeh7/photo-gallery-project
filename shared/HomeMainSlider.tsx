import type { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import Image from 'next/image';
import { memo } from 'react';
import pic1 from '../assets/images/1.jpg';
import pic2 from '../assets/images/2.jpg';
import pic3 from '../assets/images/3.jpg';

const HomeMainSlider: NextPage = () => (
    <>
        <Swiper
            direction="vertical"
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="HomeMainSliderStyle"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <Image src={pic1} />
            </SwiperSlide>
            <SwiperSlide>
                <Image src={pic2} />
            </SwiperSlide>
            <SwiperSlide>
                <Image src={pic3} />
            </SwiperSlide>
        </Swiper>
    </>
);

export default memo(HomeMainSlider);
