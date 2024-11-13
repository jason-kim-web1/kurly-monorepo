interface Props {
  name: string;
  position?: number;
}

export function getEventName({ name, position }: Props) {
  if (name === 'MAIN_BANNERS') {
    return 'select_recommendation_main_banner';
  }

  if (name === 'TODAY_RECOMMEND_PRODUCTS') {
    return 'select_recommendation_today_recommendation';
  }

  if (name === 'MD_CHOICES') {
    return 'select_recommendation_md_choice';
  }

  if (name === 'LINE_BANNERS') {
    return 'select_recommendation_random_line_banner';
  }

  if (name === 'SPECIAL_DEALS') {
    return `select_recommendation_special_deal_${position ? position + 1 : 1}`;
  }

  if (name === 'INSTAGRAM_REVIEW') {
    return 'select_recommendation_instagram';
  }

  if (name === 'QUICK_MENU') {
    return 'select_recommendation_quick_menu';
  }

  const eventName = `select_recommendation_${name.toLowerCase()}`;

  return eventName;
}
