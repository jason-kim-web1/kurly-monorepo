import { useDispatch } from 'react-redux';

import { PersonalInquiryListItem } from '../../types';
import MoInquiryQnaNormal from '../mo/InquiryQnaNormal';
import PCInquiryQnaNormal from '../pc/inquiry/InquiryQnaNormal';

import { toggleExpanded } from '../../slice';

interface Props {
  item: PersonalInquiryListItem;
  isPC: boolean;
}

export default function InquiryQna({ item, isPC }: Props) {
  const {
    id,
    title,
    type,
    status,
    date,
    orderNo,
    orderType,
    orderProducts,
    contents,
    expanded,
    comments,
    inquiryTypeName,
    inquiryTypeSubName,
    images,
    inquiryTypeSubCode,
    inquiryTypeCode,
    allowsNotification,
  } = item;
  const dispatch = useDispatch();

  const onClickItem = () => {
    const targetId = `${type}-${id}`;
    dispatch(toggleExpanded(targetId));
  };

  const InquiryQnaNormal = isPC ? PCInquiryQnaNormal : MoInquiryQnaNormal;

  return (
    <InquiryQnaNormal
      id={id}
      expanded={expanded}
      title={title}
      date={date}
      status={status}
      orderNo={orderNo}
      orderType={orderType}
      orderProducts={orderProducts}
      contents={contents}
      comments={comments}
      inquiryTypeName={inquiryTypeName}
      inquiryTypeCode={inquiryTypeCode}
      inquiryTypeSubName={inquiryTypeSubName}
      inquiryTypeSubCode={inquiryTypeSubCode}
      onClickItem={onClickItem}
      images={images}
      allowsNotification={allowsNotification}
    />
  );
}
