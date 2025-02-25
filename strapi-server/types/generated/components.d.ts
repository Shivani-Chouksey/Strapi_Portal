import type { Schema, Struct } from '@strapi/strapi';

export interface BannerButton extends Struct.ComponentSchema {
  collectionName: 'components_banner_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    link: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BannerOffer extends Struct.ComponentSchema {
  collectionName: 'components_banner_offers';
  info: {
    displayName: 'offer';
  };
  attributes: {
    text: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface CategoryCategoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_category_categories_sections';
  info: {
    displayName: 'categories_section';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Categories'>;
    sub_heading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Browse by Category'>;
  };
}

export interface CommonSeo extends Struct.ComponentSchema {
  collectionName: 'components_common_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface FooterInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_infos';
  info: {
    description: '';
    displayName: 'info';
  };
  attributes: {
    link: Schema.Attribute.Component<'banner.button', true>;
    section_name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ProductProductsSection extends Struct.ComponentSchema {
  collectionName: 'components_product_products_sections';
  info: {
    displayName: 'products_section';
  };
  attributes: {
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'This Week\u2019s'>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface TagTag extends Struct.ComponentSchema {
  collectionName: 'components_tag_tags';
  info: {
    description: '';
    displayName: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestimonialProfile extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_profiles';
  info: {
    displayName: 'profile';
  };
  attributes: {
    profile_image: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    username: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestimonialTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonial_cards';
  info: {
    displayName: 'testimonial_card';
  };
  attributes: {
    content: Schema.Attribute.Text;
    profile: Schema.Attribute.Component<'testimonial.profile', false>;
    rating: Schema.Attribute.Decimal;
  };
}

export interface TestimonialTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonial_sections';
  info: {
    description: '';
    displayName: 'testimonial_section';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    sub_heading: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<
      'testimonial.testimonial-card',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'banner.button': BannerButton;
      'banner.offer': BannerOffer;
      'category.categories-section': CategoryCategoriesSection;
      'common.seo': CommonSeo;
      'footer.info': FooterInfo;
      'product.products-section': ProductProductsSection;
      'tag.tag': TagTag;
      'testimonial.profile': TestimonialProfile;
      'testimonial.testimonial-card': TestimonialTestimonialCard;
      'testimonial.testimonial-section': TestimonialTestimonialSection;
    }
  }
}
