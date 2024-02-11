import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Layout from "../Components/layouts/Layout";
import Hero from "../Components/Homepage/Hero";
import InDemandCourses from "../Components/Homepage/InDemandCourses";
import Trusted from "../Components/Homepage/Trusted";


const UpSkilling = dynamic(() => import("../Components/UpSkilling"), {
  ssr: false,
});
const GetCertified = dynamic(() => import("../Components/GetCertified"), {
  ssr: false,
});
const IndustryLeaders = dynamic(
  () => import("../Components/Homepage/IndustryLeaders"),
  { ssr: false }
);
const DevelopSkills = dynamic(
  () => import("../Components/Homepage/DevelopSkills"),
  { ssr: false }
);
const Perks = dynamic(() => import("../Components/Homepage/Perks"), {
  ssr: false,
});
const Blogs = dynamic(() => import("../Components/Homepage/Blogs"), {
  ssr: false,
});

const Modal = dynamic(() => import('../Components/TestimonialPopUp'), { ssr: false })

import {
  HeaderType,
  image_type,
  TestimonialCardType,
  CourseCardType,
  ReviewType,
  CertificationCardType,
  FooterType,
  ButtonType,
  HeadingType2,
  InstructorCardType,
  SkillCardType,
  CourseTagType,
  images,
  Heading_type,
  SeoType,
  AnalyticsType,
} from "../interfaces/interfaces";

import React, { useEffect } from "react";
import { dispatch } from "../redux/store";
import { scheduleActions } from "../redux/slices/schedule";

type Props = {
  analytics: AnalyticsType;
  header: {
    Header: HeaderType;
  };
  header_courses: {
    courses: {
      btn_text: string;
      course_categories: CourseTagType;
      course_details: {
        data: {
          id: number;
          attributes: CourseCardType;
        }[];
      };
    };
  }
  homepage: {
    seo: SeoType;
    hero: {
      Sub_heading: string;
      highlighted_heading: Heading_type;
      Course_category_desc: {
        Name: string;
        Desc: string;
      }[];
      category_heading_tag: string;
      Reviews: ReviewType[];
    };
    new_heights: {
      Carousel_left: images[];
      Carousel_right: images[];
      highlighted_heading: Heading_type;
      point_heading_tag: string;
      Points: {
        Num: string;
        Desc: string;
        is_icon: boolean;
        Icon: image_type;
      }[];
    };
    trusted: {
      heading: Heading_type;
      Desc: string;
      Stats: {
        Name: string;
        Num: string;
      }[];
      stats_heading_tag: string;
      testimonial_cards: {
        data: TestimonialCardType[];
      };
      Button: ButtonType;
    };
    what_to_expect: {
      heading: Heading_type;
      Perks: HeadingType2[];
    };
    upskilling: {
      Heading: HeadingType2;
      Button: ButtonType;
      icon: {
        original_icon: image_type;
        hover_icon: image_type;
      }[];
    };
    get_certified: {
      Heading: HeadingType2;
      Button: {
        DisplayName: string;
        href: string;
      };
      Certification_Card: CertificationCardType[];
    };
    instructor: {
      Heading: HeadingType2;
      Button: ButtonType;
      in_car: {
        data: InstructorCardType[];
      };
    };
    developskills: {
      Heading: HeadingType2;
      ContainerHeading: HeadingType2;
      Button: ButtonType;
    };
    skill_cards: SkillCardType[];
    Blogs: {
      heading: Heading_type;
      blog_categories: {
        data: {
          attributes: {
            category: string;
          }
        }[]
      }
      view_all_cta: {
        text: string;
        path: string;
      };
      blog_cards: {
        data: {
          attributes: {
            heading: Heading_type;
            description: string;
            date: string;
            views: string;
            read_time: string;
            read_more_link: string;
            tags: {
              text: string;
            }[];
            image: image_type;
            blog_category: {
              data: {
                attributes: {
                  category: string;
                }
              }
            }
          }
        }[]
      }
    }
  };
  courses: {
    attributes: CourseCardType;
  }[];
  footer: FooterType;
  demand_courses: {
    heading: Heading_type;
    course_categories: CourseTagType;
    showfilters: boolean;
    courses: {
      data: {
        id: number;
        attributes: CourseCardType;
      }[];
    };
  };
  schedule_ids: {
    attributes: {
      course_schedule: {
        data: {
          attributes: {
            get_schedule_id: string;
            filter_category: {
              data: {
                attributes: {
                  category: string;
                }
              }
            }
          }
        }
      }
    }
  }[]
};

export default function Home(props: Props) {
  const [showMore, setShowMore] = React.useState(false)
  const [activeTestimonial, setActiveTest] = React.useState<any>();

  const { fetchSchedule, fetchAllSchedule, fetchTimeZone } = scheduleActions;


  // pre fetching schedule data
  useEffect(() => {
    // const getTimezone = async () => {
    //   await dispatch(fetchTimeZone());
    // }
    // getTimezone();

    // // get schedules for different events 
    // props?.schedule_ids?.map(async (id) => {
    //   if (id?.attributes?.course_schedule?.data?.attributes?.get_schedule_id !== null) {
    //     dispatch(fetchSchedule({ id: id?.attributes?.course_schedule?.data?.attributes?.get_schedule_id, filter_category: id?.attributes?.course_schedule?.data?.attributes?.filter_category?.data?.attributes?.category }));
    //   }
    // })

    // // get all schedule data
    // dispatch(fetchAllSchedule());
  }, [])


  return (
    <Layout
      header={props.header}
      header_courses={props.header_courses}
      footer={props.footer}
      courses={props?.courses}
      seo={props?.homepage?.seo}
      analytics={props?.analytics}
    >
      {showMore &&
        <Modal openModal={showMore} setOpenModal={setShowMore} testimonial={activeTestimonial} />
      }
      <Hero
        data={props.homepage.hero}
        new_heights={props.homepage.new_heights}
        header={props.header}
        courses={props?.courses}
      />
      <InDemandCourses
        filter={props.demand_courses.showfilters}
        data={props.demand_courses}
      />
      <div id="pinned_element_homepage">
        <Trusted
          homepage
          data={props.homepage.trusted}
          setActiveTest={setActiveTest}
          setShowMore={setShowMore}
        />
        <Perks data={props.homepage.what_to_expect} toggle={showMore} />
      </div>
      <UpSkilling data={props.homepage.upskilling} />
      <DevelopSkills
        data={props.homepage.developskills}
        skill_cards={props?.homepage?.skill_cards}
      />
      <IndustryLeaders data={props.homepage.instructor} />
      <Blogs data={props?.homepage?.Blogs} />
      <GetCertified
        isHomepage
        color="#ffeeda"
        data={props.homepage.get_certified}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/header?publicationState=${process.env.PUBLICATION}&populate=deep,4`
  );
  const headerres = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/header?publicationState=${process.env.PUBLICATION}&populate[0]=Header&populate[1]=Header.courses
  &populate[2]=Header.courses.course_details,Header.courses.course_categories,Header.courses.btn_text
  &populate[3]=Header.courses.course_details.card
  &populate[4]=Header.courses.course_details.card.course_categories,Header.courses.course_details.card.name,Header.courses.course_details.card.Course_logo
  &populate[5]=Header.courses.course_details.card.Course_logo.mobile_image,Header.courses.course_details.card.Course_logo.desktop_image`
  )
  const header_courses = await headerres.json();
  const header_data = await res1.json();

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/homepage?publicationState=${process.env.PUBLICATION}&populate=deep,5`
  );
  const homepage_data = await res2.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/homepage?publicationState=${process.env.PUBLICATION}&populate[0]=Demand_courses
  &populate[1]=Demand_courses.courses,Demand_courses.course_categories
  &populate[2]=Demand_courses.courses.card
  &populate[3]=Demand_courses.courses.card.course_categories,Demand_courses.courses.card.name,Demand_courses.courses.card.Course_logo,Demand_courses.courses.card.Cover_image,Demand_courses.courses.card.Course_points
  &populate[4]=Demand_courses.courses.card.Course_points.Icon,Demand_courses.courses.card.Course_logo.mobile_image,Demand_courses.courses.card.Course_logo.desktop_image,Demand_courses.courses.card.Cover_image.mobile_image,Demand_courses.courses.card.Cover_image.desktop_image`
  )

  const homepage_courses = await res.json()

  const res3 = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/footer?publicationState=${process.env.PUBLICATION}&populate=deep,10`
  );
  const footer_data = await res3.json();

  const res4 = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/courses?publicationState=${process.env.PUBLICATION}&populate[card][populate][0]=name,10`
  );
  const course_data = await res4.json();
  const analytics = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/seo-page?publicationState=${process.env.PUBLICATION}&populate=deep,10`
  );
  const analytics_data = await analytics.json();

  const idres = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/courses?publicationState=${process.env.PUBLICATION}&populate[course_schedule][populate][0]=get_schedule_id,filter_category`)

  const schedule_ids = await idres.json();

  return {
    // Passed to the page component as props
    props: {
      analytics: analytics_data?.data?.attributes || null,
      header: header_data?.data?.attributes,
      homepage: {
        hero: homepage_data?.data?.attributes?.Hero,
        new_heights: homepage_data?.data?.attributes?.New_heights,
        trusted: homepage_data?.data?.attributes?.Trusted,
        what_to_expect: homepage_data?.data?.attributes?.What_to_expect,
        upskilling: homepage_data?.data?.attributes?.Upskilling,
        get_certified: homepage_data?.data?.attributes?.Get_certified,
        instructor: homepage_data?.data?.attributes?.Instructor_carousel,
        developskills: homepage_data?.data?.attributes?.developskills,
        skill_cards: homepage_data?.data?.attributes?.skill_cards,
        seo: homepage_data?.data?.attributes?.seo,
        Blogs: homepage_data?.data?.attributes?.Blogs
      },
      header_courses: header_courses?.data?.attributes?.Header,
      demand_courses: homepage_courses?.data?.attributes?.Demand_courses,
      schedule_ids: schedule_ids?.data,
      courses: course_data?.data,
      footer: footer_data?.data?.attributes,
    },
  };
};
