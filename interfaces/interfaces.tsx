export interface SeoType {
	metaTitle: string;
	metaDescription: string;
	keywords: string;
	metaRobots: string;
	structuredData: any;
	metaViewport: string;
	canonicalURL: string;
	metaImage: image_type;
	metaSocial: {
		socialNetwork: string;
		title: string;
		description: string;
		image: image_type;
	}[];
	languageTag: string;
}
export interface AnalyticsType {
	location_tag: {
		region: string;
		placename: string;
		position: string;
		ICBM: string;
	};
	search_console_id: string;
	favicon: image_type;
	gtmId: string;
};
export interface HeaderType {
	Nav_Links: {
		DisplayName: string;
		href: string;
	}[];
	mobile_menu: {
		DisplayName: string;
		href: string;
	}[];
	Logo: {
		Link: string;
		Image: image_type;
	};
	search_placeholder: string;
}

export interface FooterType {
	Logo: {
		Link: string;
		Image: image_type;
	};
	social_icons: {
		Link: string;
		Image: image_type;
	}[];
	ssl: {
		ssl_text: Heading_type;
	};
	courses: {
		heading: Heading_type;
		Item: {
			DisplayName: string;
			href: string;
		}[];
	};
	our_company: {
		heading: Heading_type;
		Item: {
			DisplayName: string;
			href: string;
		}[];
	};
	payment: {
		heading: Heading_type;
		icons: {
			data: image_type2[];
		};
	};
	our_resources: {
		heading: Heading_type;
		Item: {
			DisplayName: string;
			href: string;
		}[];
	};
	contact_badge: Heading_type;
	pre_registration: {
		heading: Heading_type;
		contact: {
			Phone_email: string;
			Country: image_type;
		}[];
		email: emailType;
	};
	post_registration: {
		heading: Heading_type;
		contact: {
			Phone_email: string;
			Country: image_type;
		}[];
		email: emailType;
	};
	policy_links: {
		DisplayName: string;
		href: string;
	}[];
	refer_earn: {
		DisplayName: string;
		href: string;
	};
	newsletter: {
		heading: string;
		placeholder_text: string;
		btn_text: string;
		ResponseEmail: string;
		ThankYouMessage: {
			Image: image_type;
			Heading: string;
			Description: string;
			ButtonText: string;
		}
	};
	fixed_footer: {
		button_1: {
			Heading: string;
			Link: string;
			Icon: image_type;
			heading_tag: string;
		};
		button_2: {
			Heading: string;
			Link: string;
			Icon: image_type;
			heading_tag: string;
		};
		contacts: {
			Country: image_type;
			Phone_email: string;
		}[]
	};
	consultant_form: {
		form_heading: string;
		name_placeholder: string;
		email_placeholder: string;
		highlighted_heading: Heading_type;
		phone_placeholder: string;
		course_placeholder: string;
		message_placeholder: string;
		btn_text: string;
		course_options: {
			id: number;
			option: string;
		}[];
		ResponseEmail: string;
		ThankYouMessage: {
			Image: image_type;
			Heading: string;
			Description: string;
			ButtonText: string;
		}
	};
}

export interface image_type {
	data: {
		id: string;
		attributes: {
			url: string;
			alternativeText: string;
		};
	};
}

export interface image_type2 {
	attributes: {
		url: string;
		alternativeText: string;
	};
}

export interface BlogsCardType {
	thumbnail: string;
	heading: string;
	label: string[];
	readTime: string;
	desc: string;
	date: string;
	views: string;
}

export interface CourseTagType {
	data: {
		attributes: {
			category: string;
		};
	}[];
}

export interface CourseCardType {
	// id: number;
	// attributes: {
	slug: string;
	sort_key: number;
	card: {
		name: Heading_type;
		Desc: string;
		Difficulty: string;
		Live: string;
		Program_link: string;
		Total_reviews: string;
		Course_logo: images;
		Cover_image: images;
		Review_icons: {
			data: {
				id: number;
				attribbutes: image_type;
			}[];
		};
		Course_points: {
			id: number;
			Text: string;
			Icon: image_type;
		}[];
		course_categories: CourseTagType;
		course_duration: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
	};
}

export interface CoachCardType {
	name: Heading_type;
	position: Heading_type;
	images: images;
}

export interface ReviewType {
	id: number;
	Reviews: string;
	Color: string;
	Rating: number;
	Platform_logo: image_type;
}

export interface TestimonialCardType {
	id: number;
	attributes: {
		designation: string;
		company_name: string;
		name: Heading_type;
		Description: string;
		Rating: number;
		Link: string;
		Platform_logo: image_type;
		image: images;
		course_categories: CourseTagType;
		platform_logo_big: image_type;
	};
}

export interface CertificationCardType {
	Desc: string;
	University_logo: image_type;
	Certi_logo: image_type;
}

export interface HeadingType {
	Text: string;
	Highlight: boolean;
}

export interface Heading_type {
	text: string;
	tag: string;
}

export interface HeadingType2 {
	heading_tag: string;
	Heading: string;
	Desc: string;
}

export interface ButtonType {
	DisplayName: string;
	href: string;
}

export interface InstructorCardType {
	attributes: {
		name: Heading_type;
		position: Heading_type;
		About: string;
		image: images;
		Social: {
			Link: string;
			Image: image_type;
		};
		course_categories: CourseTagType;
	};
}

export interface SkillCardType {
	heading: Heading_type;
	icon: image_type;
}

export interface emailType {
	text: string;
	url: string;
	logo: image_type;
}

export interface contactNumbersType {
	Phone_email: string;
	Country: image_type;
}

export interface contactCardType {
	heading: HeadingType2;
	contacts: contactNumbersType[];
	image: images;
	email: emailType;
}

export interface trainerFeatureType {
	label: string;
	content: string;
	icon: image_type;
}

export interface highlightDataType {
	highlight_images: images[];
}

export interface CourseCategoryType {
	Desc: string;
	heading: Heading_type;
	sub_heading: Heading_type;
	image: images;
	download: {
		Heading: string;
		Link: string;
		Icon: image_type;
		heading_tag: string;
	};
	scroll_id: string;
}

export interface cardType {
	Heading: string;
	Desc: string;
	icon: image_type;
}

export interface programType {
	heading: Heading_type;
	table_heading_1: string;
	table_heading_2: string;
	table_data: {
		course: string;
		duration: string;
		icon: image_type;
	}[];
	Desc: string;
}

export interface images {
	id: string;
	desktop_image: image_type;
	mobile_image: image_type;
}

export interface Formdata {
	first_name_placeholder: string;
	last_name_placeholder: string;
	company_placeholder: string;
	email_placeholder: string;
	phone_placeholder: string;
	course_placeholder: string;
	message_placeholder: string;
	submit_btn: string;
	course_options: {
		option: string;
	}[];
	Button_Text: string;
	ResponseEmail: string;
	ThankYouMessage: {
		Image: image_type;
		Heading: string;
		Description: string;
		ButtonText: string;
	}
}